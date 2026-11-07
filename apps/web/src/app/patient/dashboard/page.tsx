import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/auth.store';
import { useLanguageStore } from '../../../stores/language.store';
import { Card } from '../../../components/ui/Card';
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
  Stethoscope
} from 'lucide-react';

export function PatientDashboardPage() {
  const { lang } = useLanguageStore();
  const { user, profile } = useAuthStore();

  return (
    <div className="space-y-8 font-sans">
      {/* ─── Hero Welcome Plate with Hand-Drawn Flourish ─── */}
      <div className="rounded-[20px] bg-[#f1f0ec] border border-[#e5e7eb] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Badge variant="indigo" size="sm">
            {lang === 'bn' ? 'রোগী ড্যাশবোর্ড' : 'Patient Workspace'}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-medium text-[#000000] tracking-tight">
            {lang === 'bn' ? (
              <>
                স্বাগতম, {profile?.fullName || user?.displayName || 'রোগী'}! আপনার সিরিয়াল{' '}
                <span className="font-script text-[30px] text-[#ff6808] leading-none inline-block">
                  লাইভ প্রস্তুত
                </span>
              </>
            ) : (
              <>
                Welcome back, {profile?.fullName || user?.displayName || 'Patient'}! Queues are{' '}
                <span className="font-script text-[30px] text-[#ff6808] leading-none inline-block">
                  live today.
                </span>
              </>
            )}
          </h1>
          <p className="text-[14px] text-[#6e6d6c] max-w-xl">
            {lang === 'bn'
              ? 'চেম্বারের লাইভ সিরিয়াল ট্র্যাক করুন, প্রেসক্রিপশন ভল্টে মেডিকেল রিপোর্ট সংরক্ষণ করুন।'
              : 'Monitor real-time chamber wait windows and manage confidential clinical records.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link to="/patient/doctors">
            <Button variant="primary" leftIcon={<Calendar className="w-4 h-4" />}>
              {lang === 'bn' ? 'সিরিয়াল বুক করুন' : 'Book Appointment'}
            </Button>
          </Link>
          <Link to="/emergency">
            <Button variant="orange" leftIcon={<AlertCircle className="w-4 h-4" />}>
              {lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স' : 'Emergency 999'}
            </Button>
          </Link>
        </div>
      </div>

      {/* ─── 4-Column Rotating KPI & Portal Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Lavender Mist (#ebdcff) - Live Queue Tracker */}
        <Link to="/patient/appointments" className="block group">
          <Card variant="lavender" padding="md" className="h-full flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-[10px] bg-[#ffffff] text-[#000000] flex items-center justify-center font-medium">
                <Clock className="w-5 h-5 text-[#4570ff]" />
              </div>
              <h3 className="text-lg font-medium text-[#000000] group-hover:underline">
                {lang === 'bn' ? 'লাইভ সিরিয়াল ট্র্যাকার' : 'Live Queue Tracker'}
              </h3>
              <p className="text-[13px] text-[#555555] leading-relaxed">
                {lang === 'bn' ? 'চেম্বারের লাইভ সিরিয়াল ও অপেক্ষার সময় দেখুন' : 'Live token queue with estimated arrival timer'}
              </p>
            </div>
            <div className="text-[12px] font-medium text-[#000000] flex items-center gap-1">
              <span>View Queue</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        {/* Card 2: Ice Blue (#d6e0ff) - Medical Records Vault */}
        <Link to="/patient/documents" className="block group">
          <Card variant="ice-blue" padding="md" className="h-full flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-[10px] bg-[#ffffff] text-[#000000] flex items-center justify-center font-medium">
                <FolderLock className="w-5 h-5 text-[#4570ff]" />
              </div>
              <h3 className="text-lg font-medium text-[#000000] group-hover:underline">
                {lang === 'bn' ? 'প্রেসক্রিপশন ভল্ট' : 'Prescription Vault'}
              </h3>
              <p className="text-[13px] text-[#555555] leading-relaxed">
                {lang === 'bn' ? 'রিপোর্ট সংরক্ষণ ও ডাক্তারের সাথে গোপনীয় শেয়ার' : 'Strict privacy controls (Only Me / Doctor Access)'}
              </p>
            </div>
            <div className="text-[12px] font-medium text-[#000000] flex items-center gap-1">
              <span>Open Vault</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        {/* Card 3: Lilac Bloom (#c293f1) - Beds & Tests */}
        <Link to="/patient/resources" className="block group">
          <Card variant="lilac" padding="md" className="h-full flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-[10px] bg-[#ffffff] text-[#000000] flex items-center justify-center font-medium">
                <Hospital className="w-5 h-5 text-[#000000]" />
              </div>
              <h3 className="text-lg font-medium text-[#000000] group-hover:underline">
                {lang === 'bn' ? 'বেড ও ডায়াগনস্টিক ফি' : 'Beds & Test Prices'}
              </h3>
              <p className="text-[13px] text-[#000000] leading-relaxed">
                {lang === 'bn' ? 'আইসিইউ ও সকল ডায়াগনস্টিক পরীক্ষার সরকারি/বেসরকারি ফি' : 'Live hospital bed occupancy & diagnostic catalogs'}
              </p>
            </div>
            <div className="text-[12px] font-medium text-[#000000] flex items-center gap-1">
              <span>Check Rates</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        {/* Card 4: Deep Navy (#193f78) - Telemedicine */}
        <Link to="/patient/telemedicine" className="block group">
          <Card variant="navy" padding="md" className="h-full flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-[10px] bg-[#ffffff]/10 text-white flex items-center justify-center font-medium">
                <Video className="w-5 h-5 text-[#c6ff94]" />
              </div>
              <h3 className="text-lg font-medium text-white group-hover:underline">
                {lang === 'bn' ? 'টেলিমেডিসিন ভিডিও' : 'Telemedicine Room'}
              </h3>
              <p className="text-[13px] text-[#d6e0ff] leading-relaxed">
                {lang === 'bn' ? 'অনলাইন চিকিৎসকের সাথে সরাসরি ভিডিও পরামর্শ' : 'Immediate secure video consultation with doctor'}
              </p>
            </div>
            <div className="text-[12px] font-medium text-[#c6ff94] flex items-center gap-1">
              <span>Join Room</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>
      </div>

      {/* ─── Active Chamber Session / Upcoming Status ─── */}
      <Card variant="default" padding="lg" className="border border-[#e5e7eb]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#e5e7eb]">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#ff6808] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff6808] animate-ping" />
              Active Chamber Serial Today
            </div>
            <h3 className="text-xl font-medium text-[#000000]">
              Prof. Dr. Md. Rafiqul Islam (Serial #18)
            </h3>
            <p className="text-[13px] text-[#6e6d6c]">
              Dhaka Medical College & Hospital · Chamber 402
            </p>
          </div>
          <Link to="/patient/appointments">
            <Button variant="primary" size="sm">
              Open Board
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          <div className="p-3.5 rounded-[12px] bg-[#f1f0ec]">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#6e6d6c]">
              Now Serving
            </div>
            <div className="text-2xl font-medium text-[#000000] mt-0.5">
              #14
            </div>
          </div>
          <div className="p-3.5 rounded-[12px] bg-[#d6e0ff]">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#000000]">
              Your Serial
            </div>
            <div className="text-2xl font-medium text-[#000000] mt-0.5">
              #18
            </div>
          </div>
          <div className="p-3.5 rounded-[12px] bg-[#f1f0ec]">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#6e6d6c]">
              Patients Ahead
            </div>
            <div className="text-2xl font-medium text-[#ff6808] mt-0.5">
              3 Patients
            </div>
          </div>
          <div className="p-3.5 rounded-[12px] bg-[#f1f0ec]">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#6e6d6c]">
              Est. Call Time
            </div>
            <div className="text-2xl font-medium text-[#4570ff] mt-0.5">
              ~25 mins
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
