import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/auth.store';
import { useLanguageStore } from '../../../stores/language.store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  Calendar,
  Clock,
  FolderLock,
  Video,
  Hospital,
  AlertCircle,
  Activity,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export function PatientDashboardPage() {
  const { lang } = useLanguageStore();
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-panel border border-rule rounded-panel p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1.5">
          <Badge variant="accent" size="sm" dot>
            {lang === 'bn' ? 'রোগী ড্যাশবোর্ড' : 'Patient Portal'}
          </Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            {lang === 'bn'
              ? `স্বাগতম, ${user?.displayName || 'রোগী'}`
              : `Welcome, ${user?.displayName || 'Patient'}`}
          </h1>
          <p className="text-[14px] text-ink-secondary">
            {lang === 'bn'
              ? 'আপনার সিরিয়াল, অ্যাপয়েন্টমেন্ট এবং প্রেসক্রিপশন এক জায়গায় ম্যানেজ করুন'
              : 'Track active chamber queues, upcoming doctor visits, and clinical records'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/patient/doctors">
            <Button variant="primary" leftIcon={<Calendar className="w-4 h-4" />}>
              {lang === 'bn' ? 'সিরিয়াল বুক করুন' : 'Book Appointment'}
            </Button>
          </Link>
          <Link to="/emergency">
            <Button variant="danger" leftIcon={<AlertCircle className="w-4 h-4" />}>
              {lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স' : 'Emergency 999'}
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/patient/appointments" className="block group">
          <Card variant="interactive" className="h-full">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-ink group-hover:text-accent transition-colors">
                {lang === 'bn' ? 'লাইভ সিরিয়াল ট্র্যাকার' : 'Live Queue Tracker'}
              </h3>
            </div>
            <p className="text-[13px] text-ink-secondary">
              {lang === 'bn' ? 'ডাক্তারের চেম্বারের বর্তমান সিরিয়াল রিয়েলটাইমে দেখুন' : 'Track live serial position and arrival window'}
            </p>
          </Card>
        </Link>

        <Link to="/patient/documents" className="block group">
          <Card variant="interactive" className="h-full">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <FolderLock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-ink group-hover:text-accent transition-colors">
                {lang === 'bn' ? 'প্রেসক্রিপশন ভল্ট' : 'Prescription Vault'}
              </h3>
            </div>
            <p className="text-[13px] text-ink-secondary">
              {lang === 'bn' ? 'রিপোর্ট ও প্রেসক্রিপশন সুরক্ষিত রাখুন ও শেয়ার নিয়ন্ত্রণ করুন' : 'Store medical files with strict privacy toggles'}
            </p>
          </Card>
        </Link>

        <Link to="/patient/resources" className="block group">
          <Card variant="interactive" className="h-full">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Hospital className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-ink group-hover:text-accent transition-colors">
                {lang === 'bn' ? 'বেড ও টেস্ট তালিকা' : 'Beds & Diagnostic Tests'}
              </h3>
            </div>
            <p className="text-[13px] text-ink-secondary">
              {lang === 'bn' ? 'আইসিইউ, সিসিইউ, কেবিন ও সকল ডায়াগনস্টিক পরীক্ষার ফি' : 'Hospital bed capacity & test prices across BD'}
            </p>
          </Card>
        </Link>

        <Link to="/patient/telemedicine" className="block group">
          <Card variant="interactive" className="h-full">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-ink group-hover:text-accent transition-colors">
                {lang === 'bn' ? 'টেলিমেডিসিন ভিডিও' : 'Telemedicine Room'}
              </h3>
            </div>
            <p className="text-[13px] text-ink-secondary">
              {lang === 'bn' ? 'অনলাইন চিকিৎসকের সাথে সরাসরি লাইভ ভিডিও পরামর্শ' : 'Connect directly with on-duty physicians'}
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
