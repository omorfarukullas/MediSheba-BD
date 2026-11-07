import { router, protectedProcedure } from '../trpc.js';
import { prisma } from '../lib/prisma.js';
import { CreateTelemedicineSessionSchema } from '@medisheba/zod-schemas';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import crypto from 'crypto';

export const telemedicineRouter = router({
  // Patient or Doctor opens video call room for an appointment
  getOrCreateSession: protectedProcedure
    .input(CreateTelemedicineSessionSchema)
    .mutation(async ({ ctx, input }) => {
      const appointment = await prisma.appointment.findUnique({
        where: { id: input.appointmentId },
        include: {
          doctor: { include: { user: true } },
          patient: { include: { user: true } },
          telemedicineSession: true
        }
      });

      if (!appointment) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Appointment not found' });
      }

      // Check if user is either the doctor or the patient (or super admin)
      const isDoctor = appointment.doctor.userId === ctx.user.id;
      const isPatient = appointment.patient.userId === ctx.user.id;

      if (!isDoctor && !isPatient && ctx.user.role !== 'SUPER_ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not a participant in this telemedicine consultation'
        });
      }

      // If session exists, return it
      if (appointment.telemedicineSession) {
        return {
          session: appointment.telemedicineSession,
          doctorName: appointment.doctor.user.fullName,
          patientName: appointment.patient.user.fullName,
          isDoctor
        };
      }

      // Create new session with unique secure roomId
      const roomId = `medisheba_${appointment.id.replace(/-/g, '').slice(0, 12)}_${crypto.randomBytes(4).toString('hex')}`;

      const session = await prisma.telemedicineSession.create({
        data: {
          appointmentId: appointment.id,
          roomId,
          status: 'SCHEDULED'
        }
      });

      return {
        session,
        doctorName: appointment.doctor.user.fullName,
        patientName: appointment.patient.user.fullName,
        isDoctor
      };
    }),

  // Mark session active when call begins
  startSession: protectedProcedure
    .input(z.object({ sessionId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return prisma.telemedicineSession.update({
        where: { id: input.sessionId },
        data: {
          status: 'IN_PROGRESS',
          startedAt: new Date()
        }
      });
    }),

  // Mark session completed when call ends
  endSession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string().uuid(),
        doctorNotes: z.string().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return prisma.telemedicineSession.update({
        where: { id: input.sessionId },
        data: {
          status: 'COMPLETED',
          endedAt: new Date(),
          doctorNotes: input.doctorNotes
        }
      });
    })
});

