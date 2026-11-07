import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { UserRole } from '@medisheba/types';

// Guards & Fallbacks
import { ProtectedRoute, RoleGuard, PublicOnlyRoute } from './components/shared/RouteGuards';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { NotFoundPage } from './components/shared/NotFoundPage';

// Public Views
import { PublicLandingPage } from './app/page';
import { EmergencyAmbulanceView } from './components/patient/EmergencyAmbulanceView';
import { LoginPage } from './app/(auth)/login/page';
import { RegisterPage } from './app/(auth)/register/page';
import { OnboardingPage } from './app/onboarding/page';

// Patient Views
import { PatientDashboardPage } from './app/patient/dashboard/page';
import { PatientDoctorsPage } from './app/patient/doctors/page';
import { PatientAppointmentsPage } from './app/patient/appointments/page';
import { PatientDocumentsPage } from './app/patient/documents/page';
import { PatientTelemedicinePage } from './app/patient/telemedicine/page';
import { PatientVitalsPage } from './app/patient/vitals/page';
import { PatientResourcesPage } from './app/patient/resources/page';

// Doctor Views
import { DoctorDashboardPage } from './app/doctor/dashboard/page';
import { DoctorQueuePage } from './app/doctor/queue/page';
import { DoctorAppointmentsPage } from './app/doctor/appointments/page';
import { DoctorSlotsPage } from './app/doctor/slots/page';
import { DoctorPrescriptionsPage } from './app/doctor/prescriptions/page';
import { DoctorEarningsPage } from './app/doctor/earnings/page';

// Hospital Admin Views
import { AdminDashboardPage } from './app/admin/dashboard/page';
import { AdminResourcesPage } from './app/admin/resources/page';
import { AdminAmbulancesPage } from './app/admin/ambulances/page';
import { AdminDoctorsPage } from './app/admin/doctors/page';
import { AdminTestsPage } from './app/admin/tests/page';

// Super Admin Views
import { SuperAdminDashboardPage } from './app/super-admin/dashboard/page';
import { SuperAdminHospitalsPage } from './app/super-admin/hospitals/page';
import { SuperAdminAuditPage } from './app/super-admin/audit/page';

export const router = createBrowserRouter([
  // ─── Public Routes ───
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <PublicLandingPage />
      </ErrorBoundary>
    ),
  },
  {
    path: '/emergency',
    element: (
      <ErrorBoundary>
        <div className="min-h-screen bg-ground p-4 sm:p-6">
          <EmergencyAmbulanceView />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicOnlyRoute>
        <RegisterPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/onboarding',
    element: (
      <ProtectedRoute>
        <OnboardingPage />
      </ProtectedRoute>
    ),
  },

  // ─── Patient Routes ───
  {
    path: '/patient',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.PATIENT]}>
          <Navigate to="/patient/dashboard" replace />
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/patient/dashboard',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.PATIENT]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <PatientDashboardPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/patient/doctors',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.PATIENT]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <PatientDoctorsPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/patient/appointments',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.PATIENT]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <PatientAppointmentsPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/patient/documents',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.PATIENT]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <PatientDocumentsPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/patient/telemedicine',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.PATIENT]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <PatientTelemedicinePage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/patient/vitals',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.PATIENT]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <PatientVitalsPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/patient/resources',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.PATIENT]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <PatientResourcesPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },

  // ─── Doctor Routes ───
  {
    path: '/doctor',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.DOCTOR]}>
          <Navigate to="/doctor/dashboard" replace />
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/doctor/dashboard',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.DOCTOR]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <DoctorDashboardPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/doctor/queue',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.DOCTOR]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <DoctorQueuePage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/doctor/appointments',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.DOCTOR]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <DoctorAppointmentsPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/doctor/slots',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.DOCTOR]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <DoctorSlotsPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/doctor/prescriptions',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.DOCTOR]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <DoctorPrescriptionsPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/doctor/earnings',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.DOCTOR]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <DoctorEarningsPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },

  // ─── Hospital Admin Routes ───
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.HOSPITAL_ADMIN]}>
          <Navigate to="/admin/dashboard" replace />
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.HOSPITAL_ADMIN]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <AdminDashboardPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/resources',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.HOSPITAL_ADMIN]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <AdminResourcesPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/ambulances',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.HOSPITAL_ADMIN]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <AdminAmbulancesPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/doctors',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.HOSPITAL_ADMIN]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <AdminDoctorsPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/tests',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.HOSPITAL_ADMIN]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <AdminTestsPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },

  // ─── Super Admin Routes ───
  {
    path: '/super-admin',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]}>
          <Navigate to="/super-admin/dashboard" replace />
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/super-admin/dashboard',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <SuperAdminDashboardPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/super-admin/hospitals',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <SuperAdminHospitalsPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/super-admin/audit',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]}>
          <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <SuperAdminAuditPage />
            </div>
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },

  // ─── 404 Catch All ───
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
