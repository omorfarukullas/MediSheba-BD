import { router, publicProcedure, protectedProcedure } from '../trpc.js';
import { prisma } from '../lib/prisma.js';
import {
  RegisterPatientSchema,
  RegisterDoctorSchema,
  LoginSchema
} from '@medisheba/zod-schemas';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
  // Verify/Login user via Firebase ID token or session identifier
  login: publicProcedure
    .input(LoginSchema)
    .mutation(async ({ input }) => {
      // Find matching user record
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { firebaseUid: input.firebaseToken },
            { email: input.firebaseToken }
          ]
        },
        include: {
          patient: true,
          doctor: true,
          hospitalAdmin: true
        }
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User profile not found. Please complete registration.'
        });
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          avatarUrl: user.avatarUrl,
          patientId: user.patient?.id,
          doctorId: user.doctor?.id,
          hospitalId: user.hospitalAdmin?.hospitalId
        }
      };
    }),

  // Current logged in user session
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.user.id },
      include: {
        patient: true,
        doctor: true,
        hospitalAdmin: true
      }
    });

    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
    }

    return user;
  }),

  // Register a new patient
  registerPatient: publicProcedure
    .input(RegisterPatientSchema)
    .mutation(async ({ input }) => {
      const existing = await prisma.user.findUnique({
        where: { email: input.email }
      });

      if (existing) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'An account with this email already exists'
        });
      }

      const user = await prisma.user.create({
        data: {
          firebaseUid: `uid_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          email: input.email,
          fullName: input.fullName,
          phone: input.phone,
          role: 'PATIENT',
          patient: {
            create: {
              dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : undefined,
              bloodGroup: input.bloodGroup,
              height: input.height,
              weight: input.weight
            }
          }
        },
        include: { patient: true }
      });

      return { success: true, user };
    }),

  // Register a new doctor
  registerDoctor: publicProcedure
    .input(RegisterDoctorSchema)
    .mutation(async ({ input }) => {
      const existing = await prisma.user.findUnique({
        where: { email: input.email }
      });

      if (existing) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'An account with this email already exists'
        });
      }

      const user = await prisma.user.create({
        data: {
          firebaseUid: `uid_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          email: input.email,
          fullName: input.fullName,
          phone: input.phone,
          role: 'DOCTOR',
          doctor: {
            create: {
              bmdcNumber: input.bmdcNumber,
              specialization: input.specialization,
              subSpecialization: input.subSpecialization,
              experienceYears: input.experienceYears,
              degrees: input.degrees,
              languages: input.languages,
              consultationFeeOnline: input.consultationFeeOnline,
              consultationFeePhysical: input.consultationFeePhysical,
              hospitalId: input.hospitalId
            }
          }
        },
        include: { doctor: true }
      });

      return { success: true, user };
    })
});

