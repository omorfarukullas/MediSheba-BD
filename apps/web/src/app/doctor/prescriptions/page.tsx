import React from 'react';
import { DoctorPortalView } from '../../../components/doctor/DoctorPortalView';

export function DoctorPrescriptionsPage() {
  return (
    <div className="space-y-6">
      <DoctorPortalView initialTab="prescribe" />
    </div>
  );
}

