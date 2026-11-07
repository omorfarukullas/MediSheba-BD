import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { ShieldCheck, User } from 'lucide-react';

export function SuperAdminAuditPage() {
  const logs = [
    { id: '1', action: 'RESOURCE_UPDATE', user: 'admin@dmc.gov.bd', details: 'Updated ICU bed count to 8 available', time: '10 mins ago' },
    { id: '2', action: 'EMERGENCY_DISPATCH', user: 'system_dispatcher', details: 'Dispatched Ambulance DHA-METRO-1234 to Dhanmondi 27', time: '24 mins ago' },
    { id: '3', action: 'DOCTOR_APPROVAL', user: 'superadmin@medisheba.bd', details: 'Approved BMDC credential A-45912', time: '1 hour ago' },
    { id: '4', action: 'DOCUMENT_UPLOAD', user: 'patient_09124', details: 'Uploaded prescription with DOCTOR_ACCESS visibility', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">System Audit Logs</h1>
        <p className="text-[13px] text-ink-secondary">Complete tamper-proof record of clinical operations and resource changes</p>
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-ground-muted text-ink-secondary border-b border-rule text-[12px] font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Initiator</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule/60 text-ink">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-ground-muted/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[12px]">
                    <Badge variant="accent" size="sm">{log.action}</Badge>
                  </td>
                  <td className="py-3.5 px-4 font-medium flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-ink-secondary" />
                    {log.user}
                  </td>
                  <td className="py-3.5 px-4 text-ink-secondary">{log.details}</td>
                  <td className="py-3.5 px-4 text-ink-secondary text-[12px]">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
