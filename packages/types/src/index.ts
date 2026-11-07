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

export enum DocumentVisibility {
  ONLY_ME = 'ONLY_ME',
  DOCTOR_ACCESS = 'DOCTOR_ACCESS',
  PUBLIC = 'PUBLIC'
}

export enum TelemedicineStatus {
  SCHEDULED = 'SCHEDULED',
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum EmergencyStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DISPATCHED = 'DISPATCHED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
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

export interface TestPriceItem {
  id: string;
  hospitalId: string;
  testName: string;
  category: string;
  description?: string | null;
  price: number;
  deliveryHours?: number | null;
  isActive: boolean;
}

export interface EmergencyRequestItem {
  id: string;
  callerName?: string | null;
  callerPhone: string;
  latitude: number;
  longitude: number;
  addressText?: string | null;
  patientCondition?: string | null;
  status: EmergencyStatus;
  hospitalId?: string | null;
  ambulanceId?: string | null;
  createdAt: string;
}

export interface AmbulanceLocationItem {
  ambulanceId: string;
  latitude: number;
  longitude: number;
  heading?: number | null;
  speed?: number | null;
  updatedAt: string;
}

export interface TelemedicineSessionItem {
  id: string;
  appointmentId: string;
  roomId: string;
  status: TelemedicineStatus;
  startedAt?: string | null;
  endedAt?: string | null;
  doctorNotes?: string | null;
}

export interface DocumentItem {
  id: string;
  patientId: string;
  title: string;
  fileUrl: string;
  fileType: string;
  visibilityMode: DocumentVisibility;
  sharedDoctorIds: string[];
  isPrivate: boolean;
  uploadedAt: string;
}

