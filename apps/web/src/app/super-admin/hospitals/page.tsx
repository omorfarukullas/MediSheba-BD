import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Building2, CheckCircle, Clock } from 'lucide-react';

export function SuperAdminHospitalsPage() {
  const hospitals = [
    { id: '1', name: 'Dhaka Medical College & Hospital', city: 'Dhaka', status: 'Approved', beds: 2400 },
    { id: '2', name: 'BSMMU (PG Hospital)', city: 'Dhaka', status: 'Approved', beds: 1800 },
    { id: '3', name: 'National Institute of Cardiovascular Diseases (NICVD)', city: 'Dhaka', status: 'Approved', beds: 650 },
    { id: '4', name: 'Chittagong Medical College Hospital', city: 'Chittagong', status: 'Pending Review', beds: 1200 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Hospital Verification & Management</h1>
          <p className="text-[13px] text-ink-secondary">Review and approve hospital accounts and resource tracking credentials</p>
        </div>
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-ground-muted text-ink-secondary border-b border-rule text-[12px] font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Hospital Name</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Total Beds</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule/60 text-ink">
              {hospitals.map((h) => (
                <tr key={h.id} className="hover:bg-ground-muted/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-accent" />
                    {h.name}
                  </td>
                  <td className="py-3.5 px-4">{h.city}</td>
                  <td className="py-3.5 px-4">{h.beds}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={h.status === 'Approved' ? 'success' : 'warning'} size="sm">
                      {h.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {h.status === 'Pending Review' ? (
                      <Button size="sm" variant="primary">Approve</Button>
                    ) : (
                      <Button size="sm" variant="outline">Manage</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
