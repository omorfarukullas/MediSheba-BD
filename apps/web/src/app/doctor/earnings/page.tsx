import React from 'react';
import { useLanguageStore } from '../../../stores/language.store';
import { Card, StatCard } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { CheckCircle2, Clock, AlertCircle, Printer, Download } from 'lucide-react';

export function DoctorEarningsPage() {
  const { lang } = useLanguageStore();

  const invoices = [
    { id: 'INV-2024-001', patient: 'Rahim Uddin', date: '9 Nov 2024', amount: 800, type: 'Chamber Consultation', status: 'paid' as const },
    { id: 'INV-2024-002', patient: 'Sultana Begum', date: '9 Nov 2024', amount: 500, type: 'Telemedicine Call', status: 'paid' as const },
    { id: 'INV-2024-003', patient: 'Tanvir Ahmed', date: '8 Nov 2024', amount: 800, type: 'Chamber Consultation', status: 'paid' as const },
    { id: 'INV-2024-004', patient: 'Nasima Akter', date: '8 Nov 2024', amount: 800, type: 'Follow-up Consultation', status: 'due' as const },
  ];

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold text-ink leading-tight">
            {lang === 'bn' ? 'কনসালটেশন ও ফি হিসাব' : 'Consultation Billing & Earnings'}
          </h1>
          <p className="text-sm text-text-2 mt-1">
            {lang === 'bn'
              ? 'চেম্বার ও অনলাইন টেলিমেডিসিন পরামর্শ থেকে আয় ও ইনভয়েস বিবরণী।'
              : 'Track consultation fees, settled payouts, and billing invoices.'}
          </p>
        </div>

        <Button variant="secondary" size="default" leftIcon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>
          {lang === 'bn' ? 'রিপোর্ট প্রিন্ট' : 'Print Statement'}
        </Button>
      </div>

      {/* ─── 4 Identical Stat Cards ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={lang === 'bn' ? 'আজকের মোট আয়' : "Today's Revenue"}
          value="৳18,400"
          caption={lang === 'bn' ? '২৩ জন রোগী' : '23 Patients'}
        />
        <StatCard
          label={lang === 'bn' ? 'এই মাসের আয়' : 'This Month'}
          value="৳342,000"
          caption={lang === 'bn' ? 'নভেম্বর ২০২৪' : 'Nov 2024'}
        />
        <StatCard
          label={lang === 'bn' ? 'বকেয়া পে-আউট' : 'Pending Payout'}
          value="৳24,500"
          caption={lang === 'bn' ? 'ব্যাংক ট্রান্সফার' : 'Bank Transfer'}
        />
        <StatCard
          label={lang === 'bn' ? 'গড় পরামর্শ ফি' : 'Average Fee'}
          value="৳760"
          caption={lang === 'bn' ? 'চেম্বার ও অনলাইন' : 'Combined'}
        />
      </div>

      {/* ─── Recent Consultation Invoices Table (Section 9.8) ─── */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-4 border-b border-border bg-subtle flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">
            {lang === 'bn' ? 'সাম্প্রতিক কনসালটেশন ইনভয়েস' : 'Recent Invoices'}
          </h2>
          <span className="text-xs text-text-3">BDT (৳)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-subtle text-xs text-text-3 font-medium border-b border-border">
              <tr>
                <th className="px-5 py-3">{lang === 'bn' ? 'ইনভয়েস নং' : 'Invoice No.'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'রোগী' : 'Patient'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'তারিখ' : 'Date'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'সেবার বিবরণ' : 'Description'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'পরিমাণ' : 'Amount'}</th>
                <th className="px-5 py-3 text-right">{lang === 'bn' ? 'অবস্থা' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-subtle/50 transition-colors h-[52px]">
                  <td className="px-5 py-3 font-mono text-xs text-text-2">{inv.id}</td>
                  <td className="px-5 py-3 font-medium text-ink">{inv.patient}</td>
                  <td className="px-5 py-3 text-xs text-text-3">{inv.date}</td>
                  <td className="px-5 py-3 text-xs text-text-2">{inv.type}</td>
                  <td className="px-5 py-3 font-semibold text-ink">৳{inv.amount}</td>
                  <td className="px-5 py-3 text-right">
                    {inv.status === 'paid' ? (
                      <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>
                        {lang === 'bn' ? 'পরিশোধিত' : 'Paid'}
                      </Badge>
                    ) : (
                      <Badge variant="warning">
                        {lang === 'bn' ? 'বকেয়া' : 'Due'}
                      </Badge>
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
