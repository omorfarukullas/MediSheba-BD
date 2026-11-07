import React from 'react';
import { useLanguageStore } from '../../../stores/language.store';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { CreditCard, TrendingUp, Users, Calendar } from 'lucide-react';

export function DoctorEarningsPage() {
  const { lang } = useLanguageStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          {lang === 'bn' ? 'কনসালটেশন ও ফি হিসাব' : 'Earnings & Consultations'}
        </h1>
        <p className="text-[14px] text-ink-secondary">
          {lang === 'bn'
            ? 'চেম্বার ও অনলাইন টেলিমেডিসিন থেকে আয় এবং পেমেন্ট রিপোর্ট'
            : 'Track revenue collected from physical appointments and telemedicine visits'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="space-y-2">
          <div className="text-[12px] font-semibold text-ink-secondary uppercase">Today's Revenue</div>
          <div className="font-display text-3xl font-bold text-accent">৳18,400</div>
          <div className="flex items-center gap-1.5 text-[12px] text-emerald-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5" /> +14% vs yesterday
          </div>
        </Card>

        <Card className="space-y-2">
          <div className="text-[12px] font-semibold text-ink-secondary uppercase">Patients Served</div>
          <div className="font-display text-3xl font-bold text-ink">23</div>
          <div className="text-[12px] text-ink-secondary font-medium">18 Chamber · 5 Telemedicine</div>
        </Card>

        <Card className="space-y-2">
          <div className="text-[12px] font-semibold text-ink-secondary uppercase">This Month</div>
          <div className="font-display text-3xl font-bold text-ink">৳342,000</div>
          <Badge variant="success" size="sm">Settled</Badge>
        </Card>

        <Card className="space-y-2">
          <div className="text-[12px] font-semibold text-ink-secondary uppercase">Pending Payout</div>
          <div className="font-display text-3xl font-bold text-ink">৳24,500</div>
          <div className="text-[12px] text-ink-secondary font-medium">bKash Merchant / Bank</div>
        </Card>
      </div>
    </div>
  );
}
