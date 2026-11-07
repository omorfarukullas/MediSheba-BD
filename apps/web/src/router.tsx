import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { UserRole } from '@medisheba/types';

// Guards & Fallbacks
import { ProtectedRoute, RoleGuard, PublicOnlyRoute } from './components/shared/RouteGuards';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { NotFoundPage } from './components/shared/NotFoundPage';

// Layout Shells
import { PatientLayout } from './components/layout/PatientLayout';
import { DoctorLayout } from './components/layout/DoctorLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { SuperAdminLayout } from './components/layout/SuperAdminLayout';

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

// Shared Settings & Help Views
import { SettingsPage } from './app/settings/page';
import { HelpPage } from './app/help/page';
import { useAuthStore, getRoleDashboardUrl } from './stores/auth.store';

function DashboardRedirect() {
  const { profile, user } = useAuthStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={getRoleDashboardUrl(profile?.role)} replace />;
}

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
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardRedirect />
      </ProtectedRoute>
    ),
  },
  {
    path: '/help',
    element: (
      <ErrorBoundary>
        <div className="min-h-screen bg-canvas p-4 sm:p-6 lg:p-8">
          <HelpPage />
        </div>
      </ErrorBoundary>
    ),
  },

  // ─── Patient Nested Routes ───
  {
    path: '/patient',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.PATIENT]}>
          <ErrorBoundary>
            <PatientLayout />
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/patient/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <PatientDashboardPage />,
      },
      {
        path: 'doctors',
        element: <PatientDoctorsPage />,
      },
      {
        path: 'appointments',
        element: <PatientAppointmentsPage />,
      },
      {
        path: 'documents',
        element: <PatientDocumentsPage />,
      },
      {
        path: 'telemedicine',
        element: <PatientTelemedicinePage />,
      },
      {
        path: 'vitals',
        element: <PatientVitalsPage />,
      },
      {
        path: 'resources',
        element: <PatientResourcesPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'help',
        element: <HelpPage />,
      },
    ],
  },

  // ─── Doctor Nested Routes ───
  {
    path: '/doctor',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.DOCTOR]}>
          <ErrorBoundary>
            <DoctorLayout />
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/doctor/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DoctorDashboardPage />,
      },
      {
        path: 'queue',
        element: <DoctorQueuePage />,
      },
      {
        path: 'appointments',
        element: <DoctorAppointmentsPage />,
      },
      {
        path: 'slots',
        element: <DoctorSlotsPage />,
      },
      {
        path: 'prescriptions',
        element: <DoctorPrescriptionsPage />,
      },
      {
        path: 'earnings',
        element: <DoctorEarningsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'help',
        element: <HelpPage />,
      },
    ],
  },

  // ─── Hospital Admin Nested Routes ───
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.HOSPITAL_ADMIN]}>
          <ErrorBoundary>
            <AdminLayout />
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <AdminDashboardPage />,
      },
      {
        path: 'resources',
        element: <AdminResourcesPage />,
      },
      {
        path: 'ambulances',
        element: <AdminAmbulancesPage />,
      },
      {
        path: 'doctors',
        element: <AdminDoctorsPage />,
      },
      {
        path: 'tests',
        element: <AdminTestsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'help',
        element: <HelpPage />,
      },
    ],
  },

  // ─── Super Admin Nested Routes ───
  {
    path: '/super-admin',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]}>
          <ErrorBoundary>
            <SuperAdminLayout />
          </ErrorBoundary>
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/super-admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <SuperAdminDashboardPage />,
      },
      {
        path: 'hospitals',
        element: <SuperAdminHospitalsPage />,
      },
      {
        path: 'audit',
        element: <SuperAdminAuditPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'help',
        element: <HelpPage />,
      },
    ],
  },

  // ─── Wildcard 404 Route ───
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
