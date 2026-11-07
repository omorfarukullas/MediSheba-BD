import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/auth.store';
import { useLanguageStore, useTranslation } from '../../../stores/language.store';
import { Card, StatCard } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { AlertBanner } from '../../../components/ui/AlertBanner';
import {
  Calendar,
  Clock,
  FileText,
  FileBadge,
  ArrowRight,
  Activity,
  CheckCircle2,
  CalendarCheck,
  Stethoscope
} from 'lucide-react';

export function PatientDashboardPage() {
  const { t } = useTranslation();
  const { lang } = useLanguageStore();
  const { user, profile } = useAuthStore();

  const patientName = profile?.fullName || user?.displayName || (lang === 'bn' ? 'রোগী' : 'Patient');

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold text-ink leading-tight">
            {lang === 'bn' ? `স্বাগতম, ${patientName}` : `Welcome back, ${patientName}`}
          </h1>
          <p className="text-sm text-text-2 mt-1">
            {t('patient.dashboard_desc', 'Your health at a glance.')}
          </p>
        </div>
        <div>
          <Link to="/patient/doctors">
            <Button variant="primary" leftIcon={<Calendar className="w-4 h-4" />}>
              {t('patient.book_appointment', 'Book appointment')}
            </Button>
          </Link>
        </div>
      </div>

      {/* ─── 4 Identical Stat Cards (Single Row) ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={lang === 'bn' ? 'আসন্ন অ্যাপয়েন্টমেন্ট' : 'Next Appointment'}
          value={lang === 'bn' ? '১টি' : '1'}
          caption={lang === 'bn' ? 'আজ বিকাল ৫:০০ টা' : 'Today 05:00 PM'}
        />
        <StatCard
          label={lang === 'bn' ? 'সক্রিয় প্রেসক্রিপশন' : 'Active Prescriptions'}
          value={lang === 'bn' ? '৩টি' : '3'}
          caption={lang === 'bn' ? 'নভেম্বর ২০২৪' : 'Nov 2024'}
        />
        <StatCard
          label={lang === 'bn' ? 'সংরক্ষিত রিপোর্ট' : 'Saved Records'}
          value={lang === 'bn' ? '৮টি' : '8'}
          caption={lang === 'bn' ? 'প্রেসক্রিপশন ভল্ট' : 'Prescription Vault'}
        />
        <StatCard
          label={lang === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'}
          value="A+"
          caption={lang === 'bn' ? 'যাচাইকৃত প্রোফাইল' : 'Verified Profile'}
        />
      </div>

      {/* ─── Primary Block: Next Appointment / Active Chamber Serial ─── */}
      <Card padding="lg" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {lang === 'bn' ? 'আসন্ন ভিজিট' : 'Next Appointment'}
              </span>
              <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>
                {t('status.confirmed', 'Confirmed')}
              </Badge>
            </div>
            <h2 className="text-xl font-semibold text-ink">
              {lang === 'bn' ? 'অধ্যাপক ডা. মোঃ রফিকুল ইসলাম' : 'Prof. Dr. Md. Rafiqul Islam'}
            </h2>
            <p className="text-sm text-text-3">
              {lang === 'bn'
                ? 'মেডিসিন ও হৃদরোগ বিশেষজ্ঞ · ঢাকা মেডিকেল কলেজ ও হাসপাতাল (কক্ষ ৪০২)'
                : 'Cardiology Specialist · Dhaka Medical College & Hospital (Room 402)'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/patient/appointments">
              <Button variant="secondary" size="compact" leftIcon={<Clock className="w-3.5 h-3.5" />}>
                {lang === 'bn' ? 'সিরিয়াল ট্র্যাকার' : 'Live Queue'}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
          <div>
            <div className="text-xs text-text-3">{lang === 'bn' ? 'তারিখ' : 'Date'}</div>
            <div className="text-sm font-semibold text-ink mt-0.5">
              {lang === 'bn' ? 'আজ, ৯ নভেম্বর ২০২৪' : 'Today, Nov 9'}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-3">{lang === 'bn' ? 'সময়' : 'Time'}</div>
            <div className="text-sm font-semibold text-ink mt-0.5">05:00 PM</div>
          </div>
          <div>
            <div className="text-xs text-text-3">{lang === 'bn' ? 'আপনার সিরিয়াল' : 'Your Serial'}</div>
            <div className="text-sm font-semibold text-accent mt-0.5">#18</div>
          </div>
          <div>
            <div className="text-xs text-text-3">{lang === 'bn' ? 'বর্তমান সিরিয়াল' : 'Now Serving'}</div>
            <div className="text-sm font-semibold text-ink mt-0.5">#14</div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
          <Link to="/patient/appointments">
            <Button variant="ghost" size="compact">
              {t('action.cancel', 'Cancel')}
            </Button>
          </Link>
          <Link to="/patient/appointments">
            <Button variant="secondary" size="compact">
              {lang === 'bn' ? 'সময় পরিবর্তন' : 'Reschedule'}
            </Button>
          </Link>
        </div>
      </Card>

      {/* ─── Two-Column Section: Recent Prescriptions & Latest Records ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Prescriptions */}
        <Card padding="md" className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <FileBadge className="w-4 h-4 text-text-3" />
              <h3 className="text-base font-semibold text-ink">
                {t('patient.recent_prescriptions', 'Recent prescriptions')}
              </h3>
            </div>
            <Link
              to="/patient/documents"
              className="text-xs font-medium text-accent hover:underline flex items-center gap-1"
            >
              <span>{t('action.view_all', 'View all')}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-border">
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-ink">
                  {lang === 'bn' ? 'ডা. ফারহানা আহমেদ' : 'Dr. Farhana Ahmed'}
                </div>
                <div className="text-xs text-text-3">
                  {lang === 'bn' ? 'উচ্চ রক্তচাপ পর্যবেক্ষণ · ২রা নভেম্বর' : 'Hypertension Checkup · 2 Nov 2024'}
                </div>
              </div>
              <Badge variant="neutral">3 {lang === 'bn' ? 'ওষুধ' : 'Meds'}</Badge>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-ink">
                  {lang === 'bn' ? 'অধ্যাপক ডা. মোঃ রফিকুল ইসলাম' : 'Prof. Dr. Md. Rafiqul Islam'}
                </div>
                <div className="text-xs text-text-3">
                  {lang === 'bn' ? 'নিয়মিত পরামর্শ · ১৫ই অক্টোবর' : 'Routine Consultation · 15 Oct 2024'}
                </div>
              </div>
              <Badge variant="neutral">2 {lang === 'bn' ? 'ওষুধ' : 'Meds'}</Badge>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-ink">
                  {lang === 'bn' ? 'ডা. তানভীর হাসান চৌধুরী' : 'Dr. Tanvir Hasan Chowdhury'}
                </div>
                <div className="text-xs text-text-3">
                  {lang === 'bn' ? 'অর্থোপেডিক ফলো-আপ · ২৮শে আগস্ট' : 'Orthopedic Follow-up · 28 Aug 2024'}
                </div>
              </div>
              <Badge variant="neutral">1 {lang === 'bn' ? 'ওষুধ' : 'Med'}</Badge>
            </div>
          </div>
        </Card>

        {/* Latest Records */}
        <Card padding="md" className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-text-3" />
              <h3 className="text-base font-semibold text-ink">
                {t('patient.latest_records', 'Latest records')}
              </h3>
            </div>
            <Link
              to="/patient/documents"
              className="text-xs font-medium text-accent hover:underline flex items-center gap-1"
            >
              <span>{t('action.view_all', 'View all')}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-border">
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-ink">
                  {lang === 'bn' ? 'লিপিড প্রোফাইল টেস্ট রিপোর্ট' : 'Lipid Profile Test Report'}
                </div>
                <div className="text-xs text-text-3">
                  {lang === 'bn' ? 'ল্যাব টেস্ট · ৩রা নভেম্বর' : 'Lab Test · 3 Nov 2024'}
                </div>
              </div>
              <span className="text-xs text-text-3">PDF (1.2 MB)</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-ink">
                  {lang === 'bn' ? 'ইসিজি রিপোর্ট (১২-লিড)' : 'ECG Report (12-Lead)'}
                </div>
                <div className="text-xs text-text-3">
                  {lang === 'bn' ? 'ডায়াগনস্টিক · ১৫ই অক্টোবর' : 'Diagnostics · 15 Oct 2024'}
                </div>
              </div>
              <span className="text-xs text-text-3">PDF (840 KB)</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-ink">
                  {lang === 'bn' ? 'সিবিসি রক্তের রিপোর্ট' : 'CBC Complete Blood Count'}
                </div>
                <div className="text-xs text-text-3">
                  {lang === 'bn' ? 'ল্যাব টেস্ট · ২৮শে আগস্ট' : 'Lab Test · 28 Aug 2024'}
                </div>
              </div>
              <span className="text-xs text-text-3">PDF (620 KB)</span>
            </div>
          </div>
        </Card>
      </div>

      {/* ─── Emergency Safety Callout ─── */}
      <AlertBanner
        variant="warning"
        message={t('emergency.note', 'In an emergency, call 999. Do not use this portal for urgent life-threatening care.')}
      />
    </div>
  );
}
