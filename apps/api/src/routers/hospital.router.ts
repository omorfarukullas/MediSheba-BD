import { router, publicProcedure, protectedProcedure } from '../trpc.js';
import { prisma } from '../lib/prisma.js';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const hospitalRouter = router({
  // Public directory of hospitals with live bed counts and ambulances
  list: publicProcedure
    .input(
      z.object({
        city: z.string().optional(),
        type: z.enum(['PUBLIC', 'PRIVATE', 'CLINIC']).optional(),
        search: z.string().optional()
      }).optional()
    )
    .query(async ({ input }) => {
      return prisma.hospital.findMany({
        where: {
          isApproved: true,
          ...(input?.city && { city: { contains: input.city, mode: 'insensitive' } }),
          ...(input?.type && { type: input.type }),
          ...(input?.search && {
            OR: [
              { name: { contains: input.search, mode: 'insensitive' } },
              { address: { contains: input.search, mode: 'insensitive' } }
            ]
          })
        },
        include: {
          resources: true,
          ambulances: {
            where: { status: 'AVAILABLE' }
          },
          _count: {
            select: { doctors: true }
          }
        }
      });
    }),

  // Get hospital details & bed breakdown
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const hospital = await prisma.hospital.findUnique({
        where: { id: input.id },
        include: {
          resources: true,
          ambulances: true,
          doctors: {
            include: { user: { select: { fullName: true, avatarUrl: true } } }
          }
        }
      });

      if (!hospital) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Hospital not found' });
      }

      return hospital;
    }),

  // Hospital Admin updates bed/resource availability
  updateResource: protectedProcedure
    .input(
      z.object({
        resourceId: z.string().uuid(),
        availableCount: z.number().min(0)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const resource = await prisma.hospitalResource.findUnique({
        where: { id: input.resourceId }
      });

      if (!resource) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Resource not found' });
      }

      // Verify admin status
      const admin = await prisma.hospitalAdmin.findUnique({
        where: { userId: ctx.user.id }
      });

      if (!admin || (admin.hospitalId !== resource.hospitalId && ctx.user.role !== 'SUPER_ADMIN')) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Unauthorized hospital admin' });
      }

      return prisma.hospitalResource.update({
        where: { id: input.resourceId },
        data: { availableCount: input.availableCount }
      });
    }),

  // Hospital Admin: Get their hospital dashboard data (resources, ambulances, doctors, test prices)
  getAdminDashboard: protectedProcedure.query(async ({ ctx }) => {
    const admin = await prisma.hospitalAdmin.findUnique({
      where: { userId: ctx.user.id }
    });

    if (!admin && ctx.user.role !== 'SUPER_ADMIN') {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'Hospital Admin access required' });
    }

    const hospitalId = admin?.hospitalId;
    if (!hospitalId) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'No hospital assigned to this admin' });
    }

    return prisma.hospital.findUnique({
      where: { id: hospitalId },
      include: {
        resources: true,
        ambulances: true,
        doctors: {
          include: {
            user: { select: { fullName: true, email: true, phone: true, avatarUrl: true } }
          }
        },
        testPrices: true
      }
    });
  }),

  // Hospital Admin: Update ambulance status & driver details
  updateAmbulance: protectedProcedure
    .input(
      z.object({
        ambulanceId: z.string().uuid(),
        status: z.enum(['AVAILABLE', 'BUSY', 'ON_THE_WAY', 'MAINTENANCE']).optional(),
        driverName: z.string().optional(),
        phone: z.string().optional(),
        type: z.enum(['ICU', 'AC', 'NON_AC', 'FREEZER']).optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ambulance = await prisma.ambulance.findUnique({
        where: { id: input.ambulanceId }
      });

      if (!ambulance) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Ambulance not found' });
      }

      const admin = await prisma.hospitalAdmin.findUnique({
        where: { userId: ctx.user.id }
      });

      if (admin && admin.hospitalId !== ambulance.hospitalId && ctx.user.role !== 'SUPER_ADMIN') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Unauthorized for this hospital' });
      }

      return prisma.ambulance.update({
        where: { id: input.ambulanceId },
        data: {
          ...(input.status && { status: input.status }),
          ...(input.driverName && { driverName: input.driverName }),
          ...(input.phone && { phone: input.phone }),
          ...(input.type && { type: input.type })
        }
      });
    }),

  // Hospital Admin: Add a new ambulance to fleet
  addAmbulance: protectedProcedure
    .input(
      z.object({
        driverName: z.string().min(2),
        phone: z.string().min(11),
        plateNumber: z.string().min(4),
        type: z.enum(['ICU', 'AC', 'NON_AC', 'FREEZER']),
        hospitalId: z.string().uuid().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const admin = await prisma.hospitalAdmin.findUnique({
        where: { userId: ctx.user.id }
      });

      if (!admin && ctx.user.role !== 'SUPER_ADMIN') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Hospital Admin access required' });
      }

      const hospitalId = admin ? admin.hospitalId : input.hospitalId;
      if (!hospitalId) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Hospital ID is required' });
      }

      return prisma.ambulance.create({
        data: {
          hospitalId,
          driverName: input.driverName,
          phone: input.phone,
          plateNumber: input.plateNumber,
          type: input.type,
          status: 'AVAILABLE'
        }
      });
    }),

  // Hospital Admin: Create or update bed resource (ICU, CCU, Cabin, General Bed, Ward)
  upsertResource: protectedProcedure
    .input(
      z.object({
        resourceId: z.string().uuid().optional(),
        type: z.enum(['ICU_BED', 'CCU_BED', 'GENERAL_BED', 'CABIN', 'OPERATION_THEATER']),
        totalCount: z.number().int().min(0),
        availableCount: z.number().int().min(0),
        ward: z.string().optional(),
        pricePerDay: z.number().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const admin = await prisma.hospitalAdmin.findUnique({
        where: { userId: ctx.user.id }
      });

      if (!admin && ctx.user.role !== 'SUPER_ADMIN') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Hospital Admin access required' });
      }

      if (input.resourceId) {
        return prisma.hospitalResource.update({
          where: { id: input.resourceId },
          data: {
            totalCount: input.totalCount,
            availableCount: input.availableCount,
            ward: input.ward,
            pricePerDay: input.pricePerDay
          }
        });
      }

      return prisma.hospitalResource.create({
        data: {
          hospitalId: admin!.hospitalId,
          type: input.type,
          totalCount: input.totalCount,
          availableCount: input.availableCount,
          ward: input.ward,
          pricePerDay: input.pricePerDay
        }
      });
    })
});

