import { router, protectedProcedure } from '../trpc.js';
import { prisma } from '../lib/prisma.js';
import {
  CreateAppointmentSchema,
  DemoPaymentSchema
} from '@medisheba/zod-schemas';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const appointmentRouter = router({
  // Book an appointment (adds to queue automatically)
  book: protectedProcedure
    .input(CreateAppointmentSchema)
    .mutation(async ({ ctx, input }) => {
      // Find patient record for current user
      const patient = await prisma.patient.findUnique({
        where: { userId: ctx.user.id }
      });

      if (!patient) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Only registered patients can book appointments'
        });
      }

      // Count existing appointments for that doctor on that date to assign serial queue number
      const targetDate = new Date(input.appointmentDate);
      const existingCount = await prisma.appointment.count({
        where: {
          doctorId: input.doctorId,
          appointmentDate: targetDate
        }
      });
      const nextQueueNumber = existingCount + 1;

      // Create Appointment + Queue entry in a transaction
      const appointment = await prisma.$transaction(async (tx) => {
        const appt = await tx.appointment.create({
          data: {
            patientId: patient.id,
            doctorId: input.doctorId,
            appointmentDate: targetDate,
            appointmentTime: input.appointmentTime,
            consultationType: input.consultationType,
            reasonForVisit: input.reasonForVisit,
            queueNumber: nextQueueNumber,
            status: 'PENDING',
            paymentStatus: 'UNPAID'
          }
        });

        await tx.queue.create({
          data: {
            doctorId: input.doctorId,
            appointmentId: appt.id,
            position: nextQueueNumber,
            status: 'WAITING'
          }
        });

        return appt;
      });

      return {
        success: true,
        appointment,
        queueNumber: nextQueueNumber
      };
    }),

  // Process demo payment (bKash/Nagad mock)
  processDemoPayment: protectedProcedure
    .input(DemoPaymentSchema)
    .mutation(async ({ input }) => {
      const updated = await prisma.$transaction(async (tx) => {
        const payment = await tx.payment.create({
          data: {
            appointmentId: input.appointmentId,
            amount: input.amount,
            method: input.paymentMethod,
            senderNumber: input.senderNumber,
            transactionId: input.transactionId,
            status: 'PAID'
          }
        });

        const appt = await tx.appointment.update({
          where: { id: input.appointmentId },
          data: {
            status: 'CONFIRMED',
            paymentStatus: 'PAID'
          }
        });

        return { payment, appt };
      });

      return { success: true, ...updated };
    }),

  // Patient's appointments list
  myAppointments: protectedProcedure.query(async ({ ctx }) => {
    const patient = await prisma.patient.findUnique({
      where: { userId: ctx.user.id }
    });

    if (!patient) {
      return [];
    }

    return prisma.appointment.findMany({
      where: { patientId: patient.id },
      include: {
        doctor: {
          include: {
            user: { select: { fullName: true, avatarUrl: true } },
            hospital: { select: { name: true, city: true } }
          }
        },
        queue: true,
        payment: true,
        prescription: true
      },
      orderBy: { appointmentDate: 'desc' }
    });
  }),

  // Cancel appointment
  cancel: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const appt = await prisma.appointment.findUnique({
        where: { id: input.id },
        include: { patient: true }
      });

      if (!appt) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Appointment not found' });
      }

      // Check if user is either the patient or the doctor
      const isOwner = appt.patient.userId === ctx.user.id;
      if (!isOwner && ctx.user.role !== 'DOCTOR' && ctx.user.role !== 'SUPER_ADMIN') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Unauthorized cancellation' });
      }

      await prisma.$transaction([
        prisma.appointment.update({
          where: { id: input.id },
          data: { status: 'CANCELLED' }
        }),
        prisma.queue.updateMany({
          where: { appointmentId: input.id },
          data: { status: 'SKIPPED' }
        })
      ]);

      return { success: true, message: 'Appointment cancelled' };
    })
});

