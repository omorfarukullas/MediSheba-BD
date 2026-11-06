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
    })
});

