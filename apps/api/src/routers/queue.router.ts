import { router, publicProcedure, protectedProcedure } from '../trpc.js';
import { prisma } from '../lib/prisma.js';
import { UpdateQueueStatusSchema } from '@medisheba/zod-schemas';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const queueRouter = router({
  // Live tracker for patients: get current serving and patient's serial status
  getStatus: publicProcedure
    .input(z.object({ doctorId: z.string().uuid() }))
    .query(async ({ input }) => {
      const currentInConsultation = await prisma.queue.findFirst({
        where: {
          doctorId: input.doctorId,
          status: 'IN_CONSULTATION'
        },
        include: {
          appointment: {
            include: { patient: { include: { user: { select: { fullName: true } } } } }
          }
        }
      });

      const waitingList = await prisma.queue.findMany({
        where: {
          doctorId: input.doctorId,
          status: { in: ['WAITING', 'CALLED'] }
        },
        orderBy: { position: 'asc' },
        include: {
          appointment: {
            include: { patient: { include: { user: { select: { fullName: true } } } } }
          }
        }
      });

      return {
        currentlyServing: currentInConsultation?.position || null,
        activePatientName: currentInConsultation?.appointment.patient.user.fullName || null,
        waitingCount: waitingList.length,
        nextInLine: waitingList.slice(0, 5).map((q) => ({
          position: q.position,
          status: q.status
        }))
      };
    }),

  // Doctor changes queue status: Next Patient / Call / Complete
  updateStatus: protectedProcedure
    .input(UpdateQueueStatusSchema)
    .mutation(async ({ ctx, input }) => {
      const queueItem = await prisma.queue.findUnique({
        where: { id: input.queueId },
        include: { doctor: true }
      });

      if (!queueItem) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Queue item not found' });
      }

      if (queueItem.doctor.userId !== ctx.user.id && ctx.user.role !== 'SUPER_ADMIN') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Only this doctor can manage this queue' });
      }

      const updated = await prisma.queue.update({
        where: { id: input.queueId },
        data: {
          status: input.status,
          ...(input.status === 'CALLED' && { calledAt: new Date() }),
          ...(input.status === 'COMPLETED' && { completedAt: new Date() })
        }
      });

      // Synchronize appointment status
      if (input.status === 'IN_CONSULTATION') {
        await prisma.appointment.update({
          where: { id: queueItem.appointmentId },
          data: { status: 'IN_PROGRESS' }
        });
      } else if (input.status === 'COMPLETED') {
        await prisma.appointment.update({
          where: { id: queueItem.appointmentId },
          data: { status: 'COMPLETED' }
        });
      }

      return { success: true, queue: updated };
    })
});

