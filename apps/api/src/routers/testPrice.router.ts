import { router, publicProcedure, protectedProcedure } from '../trpc.js';
import { prisma } from '../lib/prisma.js';
import { CreateTestPriceSchema, UpdateTestPriceSchema } from '@medisheba/zod-schemas';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const testPriceRouter = router({
  // Public/Patient: View diagnostic test price list of a specific hospital
  getByHospital: publicProcedure
    .input(z.object({ hospitalId: z.string().uuid() }))
    .query(async ({ input }) => {
      return prisma.testPriceList.findMany({
        where: {
          hospitalId: input.hospitalId,
          isActive: true
        },
        orderBy: [{ category: 'asc' }, { testName: 'asc' }]
      });
    }),

  // Public/Patient: Search and compare test prices across all registered hospitals
  searchTests: publicProcedure
    .input(
      z.object({
        searchQuery: z.string().optional(),
        category: z.string().optional()
      }).optional()
    )
    .query(async ({ input }) => {
      const tests = await prisma.testPriceList.findMany({
        where: {
          isActive: true,
          hospital: { isApproved: true },
          ...(input?.searchQuery && {
            testName: { contains: input.searchQuery, mode: 'insensitive' }
          }),
          ...(input?.category && {
            category: { equals: input.category, mode: 'insensitive' }
          })
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
          }
        },
        orderBy: { price: 'asc' }
      });

      return tests;
    }),

  // Hospital Admin: Create a new test price
  create: protectedProcedure
    .input(CreateTestPriceSchema)
    .mutation(async ({ ctx, input }) => {
      // Validate hospital admin ownership
      const admin = await prisma.hospitalAdmin.findUnique({
        where: { userId: ctx.user.id }
      });

      if (!admin && ctx.user.role !== 'SUPER_ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only hospital administrators can add diagnostic tests'
        });
      }

      const targetHospitalId = admin ? admin.hospitalId : input.hospitalId;

      const newTest = await prisma.testPriceList.create({
        data: {
          hospitalId: targetHospitalId,
          testName: input.testName,
          category: input.category,
          description: input.description,
          price: input.price,
          deliveryHours: input.deliveryHours
        }
      });

      return { success: true, test: newTest };
    }),

  // Hospital Admin: Update test price details
  update: protectedProcedure
    .input(UpdateTestPriceSchema)
    .mutation(async ({ ctx, input }) => {
      const test = await prisma.testPriceList.findUnique({
        where: { id: input.id }
      });

      if (!test) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Test not found' });
      }

      const admin = await prisma.hospitalAdmin.findUnique({
        where: { userId: ctx.user.id }
      });

      if (admin && admin.hospitalId !== test.hospitalId && ctx.user.role !== 'SUPER_ADMIN') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Unauthorized for this hospital' });
      }

      const updated = await prisma.testPriceList.update({
        where: { id: input.id },
        data: {
          ...(input.testName && { testName: input.testName }),
          ...(input.category && { category: input.category }),
          ...(input.description !== undefined && { description: input.description }),
          ...(input.price !== undefined && { price: input.price }),
          ...(input.deliveryHours !== undefined && { deliveryHours: input.deliveryHours }),
          ...(input.isActive !== undefined && { isActive: input.isActive })
        }
      });

      return { success: true, test: updated };
    }),

  // Hospital Admin: Delete test
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const test = await prisma.testPriceList.findUnique({
        where: { id: input.id }
      });

      if (!test) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Test not found' });
      }

      const admin = await prisma.hospitalAdmin.findUnique({
        where: { userId: ctx.user.id }
      });

      if (admin && admin.hospitalId !== test.hospitalId && ctx.user.role !== 'SUPER_ADMIN') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Unauthorized for this hospital' });
      }

      await prisma.testPriceList.delete({
        where: { id: input.id }
      });

      return { success: true };
    })
});

