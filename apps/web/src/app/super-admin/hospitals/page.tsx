import React from 'react';
import { useLanguageStore } from '../../../stores/language.store';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Building2, CheckCircle2, Clock } from 'lucide-react';

export function SuperAdminHospitalsPage() {
  const { lang } = useLanguageStore();

  const hospitals = [
    { id: '1', name: 'Dhaka Medical College & Hospital', city: 'Dhaka', status: 'Approved', beds: 2400 },
    { id: '2', name: 'BSMMU (PG Hospital)', city: 'Dhaka', status: 'Approved', beds: 1800 },
    { id: '3', name: 'National Institute of Cardiovascular Diseases (NICVD)', city: 'Dhaka', status: 'Approved', beds: 650 },
    { id: '4', name: 'Chittagong Medical College Hospital', city: 'Chittagong', status: 'Pending Review', beds: 1200 },
  ];

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold text-ink leading-tight">
            {lang === 'bn' ? 'হাসপাতাল অনুমোদন ও ব্যবস্থাপনা' : 'Hospital Verification & Governance'}
          </h1>
          <p className="text-sm text-text-2 mt-1">
            {lang === 'bn'
              ? 'হাসপাতাল অ্যাকাউন্ট পর্যালোচনা, অনুমোদন এবং প্রাতিষ্ঠানিক সনদ যাচাই।'
              : 'Review and approve hospital accounts and resource tracking credentials.'}
          </p>
        </div>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-subtle text-xs text-text-3 font-medium border-b border-border">
              <tr>
                <th className="px-5 py-3">{lang === 'bn' ? 'হাসপাতালের নাম' : 'Hospital Name'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'শহর' : 'Location'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'মোট বেড' : 'Total Beds'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'অনুমোদন অবস্থা' : 'Status'}</th>
                <th className="px-5 py-3 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {hospitals.map((h) => (
                <tr key={h.id} className="hover:bg-subtle/50 transition-colors h-[52px]">
                  <td className="px-5 py-3 font-medium text-ink flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-accent" />
                    <span>{h.name}</span>
                  </td>
                  <td className="px-5 py-3 text-xs text-text-3">{h.city}</td>
                  <td className="px-5 py-3 font-mono text-xs text-text-2">{h.beds}</td>
                  <td className="px-5 py-3">
                    <Badge variant={h.status === 'Approved' ? 'success' : 'warning'}>
                      {h.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {h.status === 'Pending Review' ? (
                      <Button size="compact" variant="primary">
                        {lang === 'bn' ? 'অনুমোদন করুন' : 'Approve'}
                      </Button>
                    ) : (
                      <Button size="compact" variant="secondary">
                        {lang === 'bn' ? 'পরিচালনা' : 'Manage'}
                      </Button>
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
