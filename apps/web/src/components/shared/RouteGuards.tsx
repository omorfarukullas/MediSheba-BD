import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, getRoleDashboardUrl } from '../../stores/auth.store';
import { UserRole } from '@medisheba/types';
import { Spinner } from '../ui/Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Ensures the user is logged into Firebase.
 * Redirects unauthenticated visitors to /login.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ground">
        <Spinner size="lg" label="Checking authentication..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

/**
 * Ensures the logged-in user matches the authorized role for this section.
 * If unauthorized, safely redirects to the user's role dashboard.
 */
export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { profile, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ground">
        <Spinner size="lg" label="Verifying role permissions..." />
      </div>
    );
  }

  // If user has a profile with a role and it's not allowed, redirect
  if (profile?.role && !allowedRoles.includes(profile.role)) {
    return <Navigate to={getRoleDashboardUrl(profile.role)} replace />;
  }

  return <>{children}</>;
}

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

/**
 * Route only accessible when signed out (e.g., login, register).
 * If signed in, redirects immediately to their designated dashboard.
 */
export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { user, profile, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ground">
        <Spinner size="lg" />
      </div>
    );
  }

  if (user) {
    return <Navigate to={getRoleDashboardUrl(profile?.role)} replace />;
  }

  return <>{children}</>;
}

