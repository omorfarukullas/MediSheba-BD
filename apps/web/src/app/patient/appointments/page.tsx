import React from 'react';
import { LiveQueueTrackerView } from '../../../components/patient/LiveQueueTrackerView';

export function PatientAppointmentsPage() {
  return (
    <div className="space-y-6">
      <LiveQueueTrackerView />
    </div>
  );
}

