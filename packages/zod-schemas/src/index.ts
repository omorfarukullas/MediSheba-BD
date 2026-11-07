import { z } from 'zod';

export const UserRoleSchema = z.enum(['PATIENT', 'DOCTOR', 'HOSPITAL_ADMIN', 'SUPER_ADMIN']);
export const ConsultationTypeSchema = z.enum(['PHYSICAL', 'ONLINE']);
export const AppointmentStatusSchema = z.enum([
  'PENDING',
  'CONFIRMED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'MISSED'
]);

export const LoginSchema = z.object({
  firebaseToken: z.string().min(1, 'Firebase token is required')
});

export const RegisterPatientSchema = z.object({
  fullName: z.string().min(2, 'Full name must have at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  bloodGroup: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional()
});

export const RegisterDoctorSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  bmdcNumber: z.string().min(3, 'BMDC registration number is required'),
  specialization: z.string().min(2),
  subSpecialization: z.string().optional(),
  experienceYears: z.number().min(0),
  degrees: z.array(z.string()).min(1),
  languages: z.array(z.string()).default(['Bengali', 'English']),
  consultationFeeOnline: z.number().min(0),
  consultationFeePhysical: z.number().min(0),
  hospitalId: z.string().uuid()
});

export const CreateAppointmentSchema = z.object({
  doctorId: z.string().uuid(),
  appointmentDate: z.string(), // ISO format YYYY-MM-DD
  appointmentTime: z.string(), // e.g. "10:30"
  consultationType: ConsultationTypeSchema,
  reasonForVisit: z.string().optional()
});

export const UpdateQueueStatusSchema = z.object({
  queueId: z.string().uuid(),
  status: z.enum(['WAITING', 'CALLED', 'IN_CONSULTATION', 'COMPLETED', 'SKIPPED'])
});

export const CreatePrescriptionSchema = z.object({
  appointmentId: z.string().uuid(),
  diagnosis: z.string().min(2),
  medicines: z.array(
    z.object({
      name: z.string(),
      dosage: z.string(),
      duration: z.string(),
      instruction: z.string()
    })
  ).min(1),
  notes: z.string().optional(),
  isPrivate: z.boolean().default(false)
});

export const DemoPaymentSchema = z.object({
  appointmentId: z.string().uuid(),
  amount: z.number().positive(),
  paymentMethod: z.enum(['BKASH', 'NAGAD', 'ROCKET', 'CARD']),
  senderNumber: z.string().min(11, 'Mobile account number required'),
  transactionId: z.string().min(6, 'Transaction ID required')
});

export const LlamaChatPromptSchema = z.object({
  message: z.string().min(1),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
  })).optional(),
  lang: z.enum(['en', 'bn']).default('bn')
});

export const DocumentVisibilitySchema = z.enum(['ONLY_ME', 'DOCTOR_ACCESS', 'PUBLIC']);

export const CreateDocumentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  fileUrl: z.string().url('Valid file URL is required'),
  fileType: z.string().default('PRESCRIPTION'),
  visibilityMode: DocumentVisibilitySchema.default('ONLY_ME'),
  sharedDoctorIds: z.array(z.string()).default([])
});

export const UpdateDocumentVisibilitySchema = z.object({
  documentId: z.string().uuid(),
  visibilityMode: DocumentVisibilitySchema,
  sharedDoctorIds: z.array(z.string()).default([])
});

export const CreateTestPriceSchema = z.object({
  hospitalId: z.string().uuid(),
  testName: z.string().min(1, 'Test name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be greater than 0'),
  deliveryHours: z.number().int().positive().default(24)
});

export const UpdateTestPriceSchema = z.object({
  id: z.string().uuid(),
  testName: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  deliveryHours: z.number().int().positive().optional(),
  isActive: z.boolean().optional()
});

export const CreateEmergencyRequestSchema = z.object({
  callerName: z.string().optional(),
  callerPhone: z.string().min(11, 'Mobile phone number is required'),
  latitude: z.number(),
  longitude: z.number(),
  addressText: z.string().optional(),
  patientCondition: z.string().optional()
});

export const UpdateEmergencyStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['PENDING', 'ACCEPTED', 'DISPATCHED', 'COMPLETED', 'CANCELLED']),
  ambulanceId: z.string().uuid().optional()
});

export const UpdateAmbulanceLocationSchema = z.object({
  ambulanceId: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
  heading: z.number().optional(),
  speed: z.number().optional()
});

export const CreateTelemedicineSessionSchema = z.object({
  appointmentId: z.string().uuid()
});

export const UpdateResourceAvailabilitySchema = z.object({
  id: z.string().uuid(),
  availableCount: z.number().min(0),
  totalCount: z.number().min(0).optional(),
  pricePerDay: z.number().optional()
});


