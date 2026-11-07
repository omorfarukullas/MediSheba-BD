import { router, protectedProcedure } from '../trpc.js';
import { prisma } from '../lib/prisma.js';
import { CreateDocumentSchema, UpdateDocumentVisibilitySchema } from '@medisheba/zod-schemas';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const documentRouter = router({
  // Patient views their own medical records / reports / prescriptions
  listMyDocuments: protectedProcedure.query(async ({ ctx }) => {
    const patient = await prisma.patient.findUnique({
      where: { userId: ctx.user.id }
    });

    if (!patient) {
      return [];
    }

    return prisma.document.findMany({
      where: { patientId: patient.id },
      orderBy: { uploadedAt: 'desc' }
    });
  }),

  // Doctor views patient's medical records (strictly respects patient visibility settings)
  listPatientDocuments: protectedProcedure
    .input(z.object({ patientId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      // Find doctor record if caller is doctor
      const doctor = await prisma.doctor.findUnique({
        where: { userId: ctx.user.id }
      });

      if (!doctor && ctx.user.role !== 'SUPER_ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only registered doctors can access patient records'
        });
      }

      // Filter documents: Show if visibilityMode is DOCTOR_ACCESS or PUBLIC,
      // or if doctor's ID is explicitly included in sharedDoctorIds
      return prisma.document.findMany({
        where: {
          patientId: input.patientId,
          OR: [
            { visibilityMode: 'DOCTOR_ACCESS' },
            { visibilityMode: 'PUBLIC' },
            ...(doctor ? [{ sharedDoctorIds: { has: doctor.id } }] : [])
          ]
        },
        orderBy: { uploadedAt: 'desc' }
      });
    }),

  // Upload/Save a new document record
  create: protectedProcedure
    .input(CreateDocumentSchema)
    .mutation(async ({ ctx, input }) => {
      const patient = await prisma.patient.findUnique({
        where: { userId: ctx.user.id }
      });

      if (!patient) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Patient profile not found. Please complete profile registration.'
        });
      }

      const document = await prisma.document.create({
        data: {
          patientId: patient.id,
          title: input.title,
          fileUrl: input.fileUrl,
          fileType: input.fileType,
          visibilityMode: input.visibilityMode as any,
          sharedDoctorIds: input.sharedDoctorIds,
          isPrivate: input.visibilityMode === 'ONLY_ME'
        }
      });

      return { success: true, document };
    }),

  // Change visibility between "Only Me" and "Doctor Can Access"
  updateVisibility: protectedProcedure
    .input(UpdateDocumentVisibilitySchema)
    .mutation(async ({ ctx, input }) => {
      const patient = await prisma.patient.findUnique({
        where: { userId: ctx.user.id }
      });

      if (!patient) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Patient not found' });
      }

      const doc = await prisma.document.findUnique({
        where: { id: input.documentId }
      });

      if (!doc || doc.patientId !== patient.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only update visibility of your own documents'
        });
      }

      const updated = await prisma.document.update({
        where: { id: input.documentId },
        data: {
          visibilityMode: input.visibilityMode as any,
          sharedDoctorIds: input.sharedDoctorIds,
          isPrivate: input.visibilityMode === 'ONLY_ME'
        }
      });

      return { success: true, document: updated };
    }),

  // Delete a document
  delete: protectedProcedure
    .input(z.object({ documentId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const patient = await prisma.patient.findUnique({
        where: { userId: ctx.user.id }
      });

      const doc = await prisma.document.findUnique({
        where: { id: input.documentId }
      });

      if (!doc || (patient && doc.patientId !== patient.id && ctx.user.role !== 'SUPER_ADMIN')) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Cannot delete this document' });
      }

      await prisma.document.delete({
        where: { id: input.documentId }
      });

      return { success: true };
    })
});

