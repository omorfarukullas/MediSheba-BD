import { router, publicProcedure, protectedProcedure } from '../trpc.js';
import { prisma } from '../lib/prisma.js';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const doctorRouter = router({
  // Public directory search & filter
  list: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        specialization: z.string().optional(),
        city: z.string().optional(),
        isTelemedicine: z.boolean().optional()
      }).optional()
    )
    .query(async ({ input }) => {
      return prisma.doctor.findMany({
        where: {
          status: 'ACTIVE',
          ...(input?.specialization && {
            specialization: { contains: input.specialization, mode: 'insensitive' }
          }),
          ...(input?.isTelemedicine !== undefined && {
            isTelemedicineEnabled: input.isTelemedicine
          }),
          ...(input?.city && {
            hospital: { city: { contains: input.city, mode: 'insensitive' } }
          }),
          ...(input?.search && {
            OR: [
              { user: { fullName: { contains: input.search, mode: 'insensitive' } } },
              { specialization: { contains: input.search, mode: 'insensitive' } },
              { hospital: { name: { contains: input.search, mode: 'insensitive' } } }
            ]
          })
        },
        include: {
          user: {
            select: { fullName: true, email: true, avatarUrl: true, phone: true }
          },
          hospital: {
            select: { id: true, name: true, city: true, address: true }
          },
          slots: {
            where: { isActive: true }
          }
        }
      });
    }),

  // Get specific doctor details by ID
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const doctor = await prisma.doctor.findUnique({
        where: { id: input.id },
        include: {
          user: true,
          hospital: true,
          slots: { where: { isActive: true } },
          reviews: {
            include: {
              patient: { include: { user: { select: { fullName: true } } } }
            },
            take: 10,
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      if (!doctor) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Doctor not found' });
      }

      return doctor;
    }),

  // Get current doctor's dashboard overview (slots, earnings, today's appointments)
  getDashboard: protectedProcedure.query(async ({ ctx }) => {
    const doctor = await prisma.doctor.findUnique({
      where: { userId: ctx.user.id },
      include: {
        appointments: {
          include: {
            patient: { include: { user: { select: { fullName: true, phone: true } } } },
            payment: true
          },
          orderBy: { appointmentDate: 'desc' },
          take: 50
        },
        queues: {
          where: { status: { in: ['WAITING', 'CALLED', 'IN_CONSULTATION'] } },
          include: {
            appointment: {
              include: { patient: { include: { user: { select: { fullName: true } } } } }
            }
          },
          orderBy: { position: 'asc' }
        }
      }
    });

    if (!doctor) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Doctor profile not found' });
    }

    // Calculate total earnings
    const totalEarnings = doctor.appointments
      .filter((a) => a.paymentStatus === 'PAID')
      .reduce((sum, a) => sum + (a.consultationType === 'ONLINE' ? doctor.consultationFeeOnline : doctor.consultationFeePhysical), 0);

    return {
      doctor,
      totalEarnings,
      activeQueueCount: doctor.queues.length,
      appointments: doctor.appointments
    };
  }),

  // Doctor sets weekly availability slots
  updateSchedule: protectedProcedure
    .input(
      z.object({
        slots: z.array(
          z.object({
            dayOfWeek: z.number().min(0).max(6),
            startTime: z.string(), // "09:00"
            endTime: z.string(), // "13:00"
            slotDuration: z.number().default(15),
            consultationType: z.enum(['PHYSICAL', 'ONLINE']),
            isActive: z.boolean().default(true),
            maxPatients: z.number().default(20)
          })
        ),
        isTelemedicineEnabled: z.boolean().optional(),
        consultationFeeOnline: z.number().optional(),
        consultationFeePhysical: z.number().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const doctor = await prisma.doctor.findUnique({
        where: { userId: ctx.user.id }
      });

      if (!doctor) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Doctor profile not found' });
      }

      // Update doctor profile fees and telemedicine toggle
      await prisma.doctor.update({
        where: { id: doctor.id },
        data: {
          ...(input.isTelemedicineEnabled !== undefined && {
            isTelemedicineEnabled: input.isTelemedicineEnabled
          }),
          ...(input.consultationFeeOnline !== undefined && {
            consultationFeeOnline: input.consultationFeeOnline
          }),
          ...(input.consultationFeePhysical !== undefined && {
            consultationFeePhysical: input.consultationFeePhysical
          })
        }
      });

      // Clear old slots and insert new schedule
      await prisma.doctorSlot.deleteMany({
        where: { doctorId: doctor.id }
      });

      await prisma.doctorSlot.createMany({
        data: input.slots.map((s) => ({
          doctorId: doctor.id,
          dayOfWeek: s.dayOfWeek,
          startTime: s.startTime,
          endTime: s.endTime,
          slotDuration: s.slotDuration,
          consultationType: s.consultationType,
          isActive: s.isActive,
          maxPatients: s.maxPatients
        }))
      });

      return { success: true };
    }),

  // Doctor views patient medical history with permission check
  getPatientHistory: protectedProcedure
    .input(z.object({ patientId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const doctor = await prisma.doctor.findUnique({
        where: { userId: ctx.user.id }
      });

      if (!doctor && ctx.user.role !== 'SUPER_ADMIN') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Unauthorized access' });
      }

      const patient = await prisma.patient.findUnique({
        where: { id: input.patientId },
        include: {
          user: { select: { fullName: true, email: true, phone: true } },
          vitals: { orderBy: { recordedAt: 'desc' }, take: 10 },
          // Prescriptions issued to this patient
          appointments: {
            where: { status: 'COMPLETED' },
            include: {
              prescription: true,
              doctor: {
                include: { user: { select: { fullName: true } } }
              }
            },
            orderBy: { appointmentDate: 'desc' }
          },
          // Documents filtered by patient visibility rules:
          // ONLY_ME documents are NEVER returned
          documents: {
            where: {
              OR: [
                { visibilityMode: 'DOCTOR_ACCESS' },
                { visibilityMode: 'PUBLIC' },
                ...(doctor ? [{ sharedDoctorIds: { has: doctor.id } }] : [])
              ]
            },
            orderBy: { uploadedAt: 'desc' }
          }
        }
      });

      if (!patient) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Patient not found' });
      }

      return patient;
    })
});

