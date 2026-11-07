import React from 'react';
import { useLanguageStore } from '../../../stores/language.store';
import { Card, StatCard } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Building2, UserCheck, ShieldCheck, Activity } from 'lucide-react';

export function SuperAdminDashboardPage() {
  const { lang } = useLanguageStore();

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Page Header ─── */}
      <div className="space-y-1">
        <h1 className="text-[28px] font-semibold text-ink leading-tight">
          {lang === 'bn' ? 'সুপার অ্যাডমিন কন্ট্রোল সেন্টার' : 'Super Admin Control Center'}
        </h1>
        <p className="text-sm text-text-2">
          {lang === 'bn'
            ? 'সারাদেশের স্বাস্থ্য নেটওয়ার্ক মনিটরিং, হাসপাতাল অনুমোদন এবং নিরাপত্তা নিরীক্ষা।'
            : 'Nationwide healthcare platform monitoring, hospital approvals, and compliance logs.'}
        </p>
      </div>

      {/* ─── 4 Identical Stat Cards ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={lang === 'bn' ? 'নিবন্ধিত হাসপাতাল' : 'Registered Hospitals'}
          value="48"
          caption={lang === 'bn' ? '৪২ অনুমোদিত · ৬ অপেক্ষমাণ' : '42 Approved · 6 Pending'}
        />
        <StatCard
          label={lang === 'bn' ? 'যাচাইকৃত চিকিৎসক' : 'Verified Physicians'}
          value="314"
          caption={lang === 'bn' ? '১০০% বিএমডিসি নিবন্ধিত' : '100% BMDC Verified'}
        />
        <StatCard
          label={lang === 'bn' ? 'জরুরি ডিসপ্যাচ' : 'Emergency Dispatches'}
          value="1,289"
          caption={lang === 'bn' ? 'গড় প্রতিক্রিয়া ৮.৪ মিনিট' : 'Avg 8.4 mins response'}
        />
        <StatCard
          label={lang === 'bn' ? 'সিস্টেম আপটাইম' : 'System Health'}
          value="99.98%"
          caption={lang === 'bn' ? 'সকেট ও ওয়েবআরটিসি স্বাভাবিক' : 'Sockets & WebRTC Normal'}
        />
      </div>

      {/* ─── Platform Activity Log Preview ─── */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-4 border-b border-border bg-subtle">
          <h2 className="text-sm font-semibold text-ink">
            {lang === 'bn' ? 'সাম্প্রতিক সিস্টেম অ্যাকশন' : 'Recent System Actions'}
          </h2>
        </div>

        <div className="divide-y divide-border">
          <div className="p-4 flex items-center justify-between hover:bg-subtle/50 transition-colors">
            <div>
              <div className="font-semibold text-sm text-ink">
                {lang === 'bn' ? 'ঢাকা মেডিকেল কলেজ আইসিইউ আপডেট' : 'Dhaka Medical College ICU Update'}
              </div>
              <div className="text-xs text-text-3">admin@dmc.gov.bd · 10 mins ago</div>
            </div>
            <Badge variant="accent">RESOURCE_UPDATE</Badge>
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-subtle/50 transition-colors">
            <div>
              <div className="font-semibold text-sm text-ink">
                {lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স প্রেরণ' : 'Emergency Ambulance Dispatched'}
              </div>
              <div className="text-xs text-text-3">system_dispatcher · 24 mins ago</div>
            </div>
            <Badge variant="warning">EMERGENCY</Badge>
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-subtle/50 transition-colors">
            <div>
              <div className="font-semibold text-sm text-ink">
                {lang === 'bn' ? 'চিকিৎসক বিএমডিসি অনুমোদন' : 'Doctor BMDC Credential Verified'}
              </div>
              <div className="text-xs text-text-3">superadmin@medisheba.bd · 1 hour ago</div>
            </div>
            <Badge variant="success">APPROVAL</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
