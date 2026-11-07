import { router, publicProcedure, protectedProcedure } from '../trpc.js';
import { prisma } from '../lib/prisma.js';
import {
  CreateEmergencyRequestSchema,
  UpdateEmergencyStatusSchema,
  UpdateAmbulanceLocationSchema
} from '@medisheba/zod-schemas';
import { broadcastEmergencyUpdate } from '../services/socket.service.js';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const emergencyRouter = router({
  // Public (NO LOGIN REQUIRED): Find available nearby ambulances & hospitals
  getNearbyAmbulances: publicProcedure
    .input(
      z.object({
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        type: z.enum(['ICU', 'AC', 'NON_AC', 'FREEZER']).optional()
      }).optional()
    )
    .query(async ({ input }) => {
      const ambulances = await prisma.ambulance.findMany({
        where: {
          hospital: { isApproved: true },
          ...(input?.type && { type: input.type })
        },
        include: {
          hospital: {
            select: {
              id: true,
              name: true,
              address: true,
              city: true,
              phone: true
            }
          },
          locationTrack: true
        },
        orderBy: { status: 'asc' } // AVAILABLE comes first alphabetically
      });

      return ambulances.map((amb) => ({
        id: amb.id,
        driverName: amb.driverName,
        phone: amb.phone,
        plateNumber: amb.plateNumber,
        type: amb.type,
        status: amb.status,
        rating: amb.rating,
        hospital: amb.hospital,
        latitude: amb.latitude || amb.locationTrack?.latitude || null,
        longitude: amb.longitude || amb.locationTrack?.longitude || null
      }));
    }),

  // Public (NO LOGIN REQUIRED): Instant emergency ambulance request
  createRequest: publicProcedure
    .input(CreateEmergencyRequestSchema)
    .mutation(async ({ input }) => {
      // Find nearest approved hospital with an available ambulance if possible
      const availableAmbulance = await prisma.ambulance.findFirst({
        where: {
          status: 'AVAILABLE',
          hospital: { isApproved: true }
        },
        include: { hospital: true }
      });

      const request = await prisma.emergencyRequest.create({
        data: {
          callerName: input.callerName || 'Emergency Caller',
          callerPhone: input.callerPhone,
          latitude: input.latitude,
          longitude: input.longitude,
          addressText: input.addressText,
          patientCondition: input.patientCondition,
          status: availableAmbulance ? 'ACCEPTED' : 'PENDING',
          hospitalId: availableAmbulance?.hospitalId || null,
          ambulanceId: availableAmbulance?.id || null
        },
        include: {
          hospital: true,
          ambulance: true
        }
      });

      // If an ambulance was matched, update its status to ON_THE_WAY
      if (availableAmbulance) {
        await prisma.ambulance.update({
          where: { id: availableAmbulance.id },
          data: { status: 'ON_THE_WAY' }
        });
      }

      broadcastEmergencyUpdate({
        type: 'EMERGENCY_DISPATCH',
        request
      });

      return {
        success: true,
        requestId: request.id,
        status: request.status,
        assignedHospital: request.hospital?.name || 'Nearest hospital alert dispatched',
        ambulancePhone: request.ambulance?.phone || null,
        driverName: request.ambulance?.driverName || null
      };
    }),

  // Check status of an emergency request (public)
  getRequestStatus: publicProcedure
    .input(z.object({ requestId: z.string().uuid() }))
    .query(async ({ input }) => {
      const request = await prisma.emergencyRequest.findUnique({
        where: { id: input.requestId },
        include: {
          hospital: true,
          ambulance: {
            include: { locationTrack: true }
          }
        }
      });

      if (!request) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Emergency request not found' });
      }

      return request;
    }),

  // Admin: View all active emergency requests
  listActiveRequests: protectedProcedure.query(async ({ ctx }) => {
    return prisma.emergencyRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        hospital: true,
        ambulance: true
      }
    });
  }),

  // Admin/Driver: Update emergency status
  updateStatus: protectedProcedure
    .input(UpdateEmergencyStatusSchema)
    .mutation(async ({ input }) => {
      const updated = await prisma.emergencyRequest.update({
        where: { id: input.id },
        data: {
          status: input.status,
          ...(input.ambulanceId && { ambulanceId: input.ambulanceId })
        },
        include: { hospital: true, ambulance: true }
      });

      if (input.status === 'COMPLETED' || input.status === 'CANCELLED') {
        if (updated.ambulanceId) {
          await prisma.ambulance.update({
            where: { id: updated.ambulanceId },
            data: { status: 'AVAILABLE' }
          });
        }
      }

      broadcastEmergencyUpdate({
        type: 'STATUS_CHANGED',
        request: updated
      });

      return { success: true, request: updated };
    }),

  // Driver/Simulator: Update live ambulance location
  updateLocation: publicProcedure
    .input(UpdateAmbulanceLocationSchema)
    .mutation(async ({ input }) => {
      const location = await prisma.ambulanceLocation.upsert({
        where: { ambulanceId: input.ambulanceId },
        update: {
          latitude: input.latitude,
          longitude: input.longitude,
          heading: input.heading,
          speed: input.speed
        },
        create: {
          ambulanceId: input.ambulanceId,
          latitude: input.latitude,
          longitude: input.longitude,
          heading: input.heading,
          speed: input.speed
        }
      });

      await prisma.ambulance.update({
        where: { id: input.ambulanceId },
        data: {
          latitude: input.latitude,
          longitude: input.longitude
        }
      });

      return { success: true, location };
    })
});

