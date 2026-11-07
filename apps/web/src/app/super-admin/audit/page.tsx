import React from 'react';
import { useLanguageStore } from '../../../stores/language.store';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { ShieldCheck, User } from 'lucide-react';

export function SuperAdminAuditPage() {
  const { lang } = useLanguageStore();

  const logs = [
    { id: '1', action: 'RESOURCE_UPDATE', user: 'admin@dmc.gov.bd', details: 'Updated ICU bed count to 8 available', time: '10 mins ago' },
    { id: '2', action: 'EMERGENCY_DISPATCH', user: 'system_dispatcher', details: 'Dispatched Ambulance DHA-METRO-1234 to Dhanmondi 27', time: '24 mins ago' },
    { id: '3', action: 'DOCTOR_APPROVAL', user: 'superadmin@medisheba.bd', details: 'Approved BMDC credential A-45912', time: '1 hour ago' },
    { id: '4', action: 'DOCUMENT_UPLOAD', user: 'patient_09124', details: 'Uploaded prescription with DOCTOR_ACCESS visibility', time: '2 hours ago' },
  ];

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold text-ink leading-tight">
          {lang === 'bn' ? 'সিস্টেম অডিট ও নিরীক্ষা লগ' : 'System Audit & Compliance Logs'}
        </h1>
        <p className="text-sm text-text-2 mt-1">
          {lang === 'bn'
            ? 'ক্লিনিক্যাল অপারেশন এবং রিসোর্স পরিবর্তনের নির্ভরযোগ্য ও সুরক্ষিত অডিট লগ।'
            : 'Tamper-proof record of clinical operations, bed updates, and access security.'}
        </p>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-subtle text-xs text-text-3 font-medium border-b border-border">
              <tr>
                <th className="px-5 py-3">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'ব্যবহারকারী' : 'Initiator'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'বিবরণ' : 'Details'}</th>
                <th className="px-5 py-3 text-right">{lang === 'bn' ? 'সময়' : 'Timestamp'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-subtle/50 transition-colors h-[52px]">
                  <td className="px-5 py-3 font-mono text-xs">
                    <Badge variant="accent">{log.action}</Badge>
                  </td>
                  <td className="px-5 py-3 font-medium text-ink flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-text-3" />
                    <span>{log.user}</span>
                  </td>
                  <td className="px-5 py-3 text-xs text-text-2">{log.details}</td>
                  <td className="px-5 py-3 text-xs text-text-3 text-right">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
