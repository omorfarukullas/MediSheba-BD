export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  HOSPITAL_ADMIN = 'HOSPITAL_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  MISSED = 'MISSED'
}

export enum ConsultationType {
  PHYSICAL = 'PHYSICAL',
  ONLINE = 'ONLINE'
}

export enum QueueStatus {
  WAITING = 'WAITING',
  CALLED = 'CALLED',
  IN_CONSULTATION = 'IN_CONSULTATION',
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED'
}

export enum HospitalType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  CLINIC = 'CLINIC'
}

export enum ResourceType {
  ICU_BED = 'ICU_BED',
  CCU_BED = 'CCU_BED',
  GENERAL_BED = 'GENERAL_BED',
  CABIN = 'CABIN',
  OPERATION_THEATER = 'OPERATION_THEATER'
}

export enum AmbulanceType {
  ICU = 'ICU',
  AC = 'AC',
  NON_AC = 'NON_AC',
  FREEZER = 'FREEZER'
}

export enum AmbulanceStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  ON_THE_WAY = 'ON_THE_WAY',
  MAINTENANCE = 'MAINTENANCE'
}

export interface UserProfile {
  id: string;
  firebaseUid: string;
  email: string;
  phone?: string | null;
  fullName: string;
  role: UserRole;
  avatarUrl?: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorDetails {
  id: string;
  userId: string;
  bmdcNumber: string;
  specialization: string;
  subSpecialization?: string | null;
  experienceYears: number;
  degrees: string[];
  languages: string[];
  consultationFeeOnline: number;
  consultationFeePhysical: number;
  isAvailable: boolean;
  isTelemedicineEnabled: boolean;
  rating: number;
  hospitalId: string;
  hospitalName?: string;
  user?: UserProfile;
}

export interface QueueItem {
  id: string;
  doctorId: string;
  appointmentId: string;
  position: number;
  status: QueueStatus;
  estimatedTime?: string | null;
  patientName: string;
  consultationType: ConsultationType;
}

export interface MedicineItem {
  name: string;
  dosage: string;
  duration: string;
  instruction: string;
}

export interface LanguagePreference {
  lang: 'en' | 'bn';
}

