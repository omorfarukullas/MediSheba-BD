import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../stores/language.store';
import { useAuthStore, getRoleDashboardUrl } from '../stores/auth.store';
import { LanguageToggle } from '../components/shared/LanguageToggle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  MapPin,
  FileText,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  Activity,
  Stethoscope,
  ChevronRight,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { AiHealthAssistantView } from '../components/patient/AiHealthAssistantView';

export function PublicLandingPage() {
  const { lang, t } = useLanguageStore();
  const { user, profile, logout } = useAuthStore();
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState('all');

  // Ease Health / Section 9.0: Signed-in users who open / are sent to /dashboard
  useEffect(() => {
    if (user && profile) {
      navigate(getRoleDashboardUrl(profile.role), { replace: true });
    }
  }, [user, profile, navigate]);

  const departments = [
    { id: 'all', label: lang === 'bn' ? 'সকল বিভাগ' : 'All Departments' },
    { id: 'medicine', label: lang === 'bn' ? 'মেডিসিন' : 'Medicine' },
    { id: 'cardiology', label: lang === 'bn' ? 'কার্ডিওলজি' : 'Cardiology' },
    { id: 'orthopedic', label: lang === 'bn' ? 'অর্থোপেডিক' : 'Orthopedics' },
    { id: 'pediatric', label: lang === 'bn' ? 'শিশু রোগ' : 'Pediatrics' },
  ];

  const doctors = [
    {
      id: 'doc-1',
      name: lang === 'bn' ? 'অধ্যাপক ডা. মোঃ রফিকুল ইসলাম' : 'Prof. Dr. Md. Rafiqul Islam',
      dept: lang === 'bn' ? 'মেডিসিন ও হৃদরোগ' : 'Medicine & Cardiology',
      deptKey: 'medicine',
      hospital: lang === 'bn' ? 'ঢাকা মেডিকেল কলেজ' : 'Dhaka Medical College',
      nextFree: lang === 'bn' ? 'আজ বিকাল ৫:০০ টা' : 'Today 5:00 PM',
      initials: 'RI',
    },
    {
      id: 'doc-2',
      name: lang === 'bn' ? 'ডা. ফারহানা আহমেদ' : 'Dr. Farhana Ahmed',
      dept: lang === 'bn' ? 'কার্ডিওলজিস্ট' : 'Cardiologist',
      deptKey: 'cardiology',
      hospital: lang === 'bn' ? 'জাতীয় হৃদরোগ ইনস্টিটিউট' : 'NICVD, Dhaka',
      nextFree: lang === 'bn' ? 'আগামীকাল সকাল ১০:০০ টা' : 'Tomorrow 10:00 AM',
      initials: 'FA',
    },
    {
      id: 'doc-3',
      name: lang === 'bn' ? 'ডা. তানভীর হাসান চৌধুরী' : 'Dr. Tanvir Hasan Chowdhury',
      dept: lang === 'bn' ? 'অর্থোপেডিক সার্জন' : 'Orthopedic Surgeon',
      deptKey: 'orthopedic',
      hospital: lang === 'bn' ? 'বিএসএমএমইউ (পিজি)' : 'BSMMU, Shahbag',
      nextFree: lang === 'bn' ? 'আগামীকাল সন্ধ্যা ৬:৩০ টা' : 'Tomorrow 6:30 PM',
      initials: 'TC',
    },
    {
      id: 'doc-4',
      name: lang === 'bn' ? 'ডা. সুমাইয়া খানম' : 'Dr. Sumaiya Khanam',
      dept: lang === 'bn' ? 'শিশু রোগ বিশেষজ্ঞ' : 'Pediatric Specialist',
      deptKey: 'pediatric',
      hospital: lang === 'bn' ? 'ঢাকা শিশু হাসপাতাল' : 'Dhaka Shishu Hospital',
      nextFree: lang === 'bn' ? 'আজ সন্ধ্যা ৭:০০ টা' : 'Today 7:00 PM',
      initials: 'SK',
    },
  ];

  const filteredDoctors = selectedDept === 'all' 
    ? doctors 
    : doctors.filter((d) => d.deptKey === selectedDept);

  return (
    <div className="min-h-screen bg-[#fffefc] text-[#222222] flex flex-col font-sans antialiased pb-20 sm:pb-0">
      {/* ─── Top Bar (Ease Health Navigation) ─── */}
      <header className="h-16 border-b border-[#efeeeb] px-4 sm:px-8 flex items-center justify-between bg-[#fffefc] sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[7px] bg-[#0f3e17] text-[#fffefc] grid place-items-center text-sm font-semibold">
            M
          </div>
          <span className="font-serif text-lg font-normal text-[#0f3e17] tracking-tight">
            {t('app_name')}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* One-click LanguageToggle (Pill in Keylime Wash) */}
          <LanguageToggle />

          <a href="tel:01700000000" className="hidden sm:inline-flex">
            <Button
              variant="secondary"
              size="compact"
              leftIcon={<Phone className="w-4 h-4 text-[#0f3e17]" />}
            >
              {t('landing.callUs')}
            </Button>
          </a>

          {user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="compact"
                onClick={() => navigate(getRoleDashboardUrl(profile?.role))}
              >
                {t('nav.dashboard')}
              </Button>
              <Button variant="ghost" size="compact" onClick={() => logout()}>
                {t('action.signOut')}
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="secondary" size="compact">
                {t('landing.signIn')}
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* ─── SECTION 1: HERO (Two-Column Botanical Layout) ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Panel: Keylime Wash Panel with Serif Headline + Actions */}
          <div className="lg:col-span-7 rounded-[14px] bg-[#e1f4df] p-7 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
                {lang === 'bn' ? 'সহজ স্বাস্থ্য সেবা নেটওয়ার্ক' : 'BOTANICAL CLINICAL DESK'}
              </div>

              <h1 className="font-serif text-3xl sm:text-[52px] font-light text-[#0f3e17] leading-[1.08] tracking-tight">
                {t('landing.h1')}
              </h1>

              <p className="text-base sm:text-lg text-[#222222] font-normal leading-relaxed max-w-xl">
                {t('landing.sub')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <Link to="/patient/doctors" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="comfort"
                  fullWidth
                  className="sm:w-auto"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#fffefc]" />}
                >
                  {t('action.book')}
                </Button>
              </Link>
              <a href="tel:01700000000" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="comfort"
                  fullWidth
                  className="sm:w-auto"
                  leftIcon={<Phone className="w-4 h-4 text-[#0f3e17]" />}
                >
                  {t('landing.call')}
                </Button>
              </a>
            </div>
          </div>

          {/* Right Panel: Slate Hush Cool Counterpart with Floating Product Preview Cards */}
          <div className="lg:col-span-5 rounded-[14px] bg-[#b6ced5] p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#0f3e17]/10">
              <span className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
                {lang === 'bn' ? 'লাইভ চেম্বার ট্র্যাকার' : 'LIVE CLINIC DESK'}
              </span>
              <span className="h-2 w-2 rounded-full bg-[#0f3e17] animate-pulse" />
            </div>

            <div className="space-y-3">
              {/* Product Preview Card 1: Token Serial */}
              <div className="rounded-[14px] bg-[#fffefc] p-5 space-y-2 border border-transparent">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#5a6e5e] uppercase tracking-wider">
                    {lang === 'bn' ? 'বর্তমান সিরিয়াল' : 'Now Serving'}
                  </span>
                  <Badge variant="success">✓ {lang === 'bn' ? 'লাইভ রুম' : 'In Consultation'}</Badge>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="font-serif text-3xl font-light text-[#0f3e17]">Token #18</div>
                  <div className="text-xs text-[#5a6e5e]">Room 402 · DMC</div>
                </div>
              </div>

              {/* Product Preview Card 2: Doctor Card */}
              <div className="rounded-[14px] bg-[#fffefc] p-5 space-y-2 border border-transparent">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm text-[#222222]">
                    {lang === 'bn' ? 'অধ্যাপক ডা. মোঃ রফিকুল ইসলাম' : 'Prof. Dr. Md. Rafiqul Islam'}
                  </div>
                  <span className="text-xs font-semibold text-[#0f3e17]">5:00 PM</span>
                </div>
                <p className="text-xs text-[#5a6e5e]">
                  {lang === 'bn' ? 'মেডিসিন ও হৃদরোগ বিশেষজ্ঞ' : 'Cardiology Specialist'}
                </p>
              </div>

              {/* Product Preview Card 3: Vault Record */}
              <div className="rounded-[14px] bg-[#fffefc] p-5 flex items-center justify-between border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e1f4df] flex items-center justify-center text-[#0f3e17]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#222222]">
                      {lang === 'bn' ? 'ডিজিটাল প্রেসক্রিপশন ভল্ট' : 'Digital Prescription Vault'}
                    </div>
                    <div className="text-[11px] text-[#5a6e5e]">
                      {lang === 'bn' ? 'শুধুমাত্র অনুমোদিত ডাক্তার' : 'Doctor Access Protected'}
                    </div>
                  </div>
                </div>
                <Badge variant="neutral">EHR</Badge>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-[#0f3e17]/80">
              {lang === 'bn' ? 'এনক্রিপ্টেড ও বিএমডিসি নিবন্ধিত' : 'Encrypted & BMDC Verified Network'}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: HOW IT WORKS (Sage & Mint Surface Rhythm) ─── */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 border-t border-[#efeeeb] bg-[#f9fbf8]">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <div className="max-w-xl space-y-2">
            <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
              {lang === 'bn' ? 'কার্যপদ্ধতি' : 'THREE-STEP PROCESS'}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17] tracking-tight">
              {t('how.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="rounded-[14px] bg-[#fffefc] border border-[#efeeeb] p-7 sm:p-9 space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-full bg-[#0f3e17] text-[#fffefc] flex items-center justify-center font-serif text-base font-light">
                  1
                </div>
                <div className="w-10 h-10 rounded-[10px] bg-[#e1f4df] flex items-center justify-center text-[#0f3e17]">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-light text-[#0f3e17]">{t('how.step1')}</h3>
                <p className="text-sm text-[#222222] leading-relaxed">{t('how.step1Sub')}</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-[14px] bg-[#fffefc] border border-[#efeeeb] p-7 sm:p-9 space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-full bg-[#0f3e17] text-[#fffefc] flex items-center justify-center font-serif text-base font-light">
                  2
                </div>
                <div className="w-10 h-10 rounded-[10px] bg-[#e1f4df] flex items-center justify-center text-[#0f3e17]">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-light text-[#0f3e17]">{t('how.step2')}</h3>
                <p className="text-sm text-[#222222] leading-relaxed">{t('how.step2Sub')}</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-[14px] bg-[#fffefc] border border-[#efeeeb] p-7 sm:p-9 space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-full bg-[#0f3e17] text-[#fffefc] flex items-center justify-center font-serif text-base font-light">
                  3
                </div>
                <div className="w-10 h-10 rounded-[10px] bg-[#e1f4df] flex items-center justify-center text-[#0f3e17]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-light text-[#0f3e17]">{t('how.step3')}</h3>
                <p className="text-sm text-[#222222] leading-relaxed">{t('how.step3Sub')}</p>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center sm:text-left">
            <Link to="/patient/doctors">
              <Button variant="primary" size="comfort" rightIcon={<ArrowRight className="w-4 h-4 text-[#fffefc]" />}>
                {t('action.book')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: WHAT YOU CAN DO (Keylime Soft Cards) ─── */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 border-t border-[#efeeeb] bg-[#fffefc]">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <div className="max-w-xl space-y-2">
            <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
              {lang === 'bn' ? 'সিস্টেম মডিউল' : 'CLINICAL ECOSYSTEM'}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17] tracking-tight">
              {t('svc.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Appointments */}
            <Link to="/patient/appointments" className="block group">
              <div className="h-full rounded-[14px] bg-[#e1f4df] p-7 space-y-5 transition-transform duration-150 group-hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-full bg-[#fffefc] flex items-center justify-center text-[#0f3e17]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-light text-[#0f3e17] group-hover:underline">
                    {t('svc.appts')}
                  </h3>
                  <p className="text-sm text-[#222222] leading-relaxed">
                    {t('svc.apptsSub')}
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 2: Prescriptions */}
            <Link to="/patient/documents" className="block group">
              <div className="h-full rounded-[14px] bg-[#e1f4df] p-7 space-y-5 transition-transform duration-150 group-hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-full bg-[#fffefc] flex items-center justify-center text-[#0f3e17]">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-light text-[#0f3e17] group-hover:underline">
                    {t('svc.rx')}
                  </h3>
                  <p className="text-sm text-[#222222] leading-relaxed">
                    {t('svc.rxSub')}
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 3: Reports */}
            <Link to="/patient/documents" className="block group">
              <div className="h-full rounded-[14px] bg-[#e1f4df] p-7 space-y-5 transition-transform duration-150 group-hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-full bg-[#fffefc] flex items-center justify-center text-[#0f3e17]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-light text-[#0f3e17] group-hover:underline">
                    {t('svc.reports')}
                  </h3>
                  <p className="text-sm text-[#222222] leading-relaxed">
                    {t('svc.reportsSub')}
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 4: Bills */}
            <Link to="/patient/resources" className="block group">
              <div className="h-full rounded-[14px] bg-[#e1f4df] p-7 space-y-5 transition-transform duration-150 group-hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-full bg-[#fffefc] flex items-center justify-center text-[#0f3e17]">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-light text-[#0f3e17] group-hover:underline">
                    {t('svc.bills')}
                  </h3>
                  <p className="text-sm text-[#222222] leading-relaxed">
                    {t('svc.billsSub')}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: AI HEALTH ASSISTANT & SYMPTOM TRIAGE (Botanical Greenhouse) ─── */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 border-t border-[#efeeeb] bg-[#f9fbf8]">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
              {lang === 'bn' ? 'বুদ্ধিমান স্বাস্থ্য ট্রায়াজ' : 'AI-POWERED CLINICAL TRIAGE'}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17] tracking-tight">
              {lang === 'bn' 
                ? 'ডাক্তার দেখানোর আগেই এআই লক্ষণ পরামর্শ' 
                : 'Instant Clinical Guidance Before Your Visit'}
            </h2>
            <p className="text-base text-[#222222]/70 leading-relaxed">
              {lang === 'bn'
                ? 'আপনার শারীরিক লক্ষণ বা উপসর্গগুলো লিখুন। মেডিসেবা এআই আপনাকে সম্ভাব্য কারণ, প্রয়োজনীয় সতর্কতা ও সঠিক বিশেষজ্ঞ চিকিৎসকের কাছে যাওয়ার পথ দেখাবে।'
                : 'Tell our AI assistant what you are feeling. Receive empathetic triage, preliminary precautions, and direct routing to the appropriate medical specialist.'}
            </p>
          </div>

          {/* Interactive AI View */}
          <AiHealthAssistantView />
        </div>
      </section>

      {/* ─── SECTION 5: OUR DOCTORS ─── */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 border-t border-[#efeeeb] bg-[#f9fbf8]">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
                {lang === 'bn' ? 'বিশেষজ্ঞ চিকিৎসক' : 'VERIFIED SPECIALISTS'}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17] tracking-tight">
                {t('doctors.title')}
              </h2>
            </div>

            <Link to="/patient/doctors">
              <Button variant="secondary" size="compact" rightIcon={<ChevronRight className="w-4 h-4" />}>
                {t('doctors.seeAll')}
              </Button>
            </Link>
          </div>

          {/* Department Chips (Pills in Cream Paper) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {departments.map((dept) => {
              const isSelected = selectedDept === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.id)}
                  className={`h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap transition-colors border cursor-pointer ${
                    isSelected
                      ? 'bg-[#0f3e17] text-[#fffefc] border-[#0f3e17]'
                      : 'bg-[#fffefc] text-[#222222] border-[#efeeeb] hover:border-[#b1dbb8]'
                  }`}
                >
                  {dept.label}
                </button>
              );
            })}
          </div>

          {/* 4 Doctor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="rounded-[14px] bg-[#fffefc] border border-[#efeeeb] p-6 flex flex-col justify-between space-y-4 hover:border-[#b1dbb8] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-[14px] bg-[#e1f4df] text-[#0f3e17] font-serif text-base font-light grid place-items-center">
                      {doc.initials}
                    </div>
                    <Badge variant="accent">✓ Verified</Badge>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-light text-[#0f3e17] leading-snug">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-[#222222] font-medium mt-0.5">{doc.dept}</p>
                    <p className="text-xs text-[#5a6e5e] mt-0.5">{doc.hospital}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#efeeeb] space-y-3">
                  <div className="text-xs text-[#5a6e5e]">
                    <span className="font-semibold text-[#0f3e17]">{doc.nextFree}</span>
                  </div>
                  <Link to="/patient/doctors" className="block">
                    <Button variant="secondary" size="compact" fullWidth>
                      {t('action.book')}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: VISIT US & EMERGENCY ─── */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 border-t border-[#efeeeb] bg-[#fffefc]">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="max-w-xl space-y-2">
            <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
              {lang === 'bn' ? 'ঠিকানা ও জরুরি সেবা' : 'LOCATION & 24/7 SUPPORT'}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17] tracking-tight">
              {t('visit.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Opening hours */}
            <div className="rounded-[14px] bg-[#e1f4df] p-7 space-y-3">
              <div className="flex items-center gap-2.5 text-[#0f3e17]">
                <Clock className="w-5 h-5" />
                <h3 className="font-serif text-lg font-light text-[#0f3e17]">{t('visit.hours')}</h3>
              </div>
              <p className="text-sm text-[#222222] leading-relaxed">{t('visit.hoursVal')}</p>
            </div>

            {/* Address */}
            <div className="rounded-[14px] bg-[#e1f4df] p-7 space-y-3">
              <div className="flex items-center gap-2.5 text-[#0f3e17]">
                <MapPin className="w-5 h-5" />
                <h3 className="font-serif text-lg font-light text-[#0f3e17]">{t('visit.address')}</h3>
              </div>
              <p className="text-sm text-[#222222] leading-relaxed">{t('visit.addressVal')}</p>
            </div>

            {/* Phone */}
            <div className="rounded-[14px] bg-[#e1f4df] p-7 space-y-3">
              <div className="flex items-center gap-2.5 text-[#0f3e17]">
                <Phone className="w-5 h-5" />
                <h3 className="font-serif text-lg font-light text-[#0f3e17]">{t('visit.phone')}</h3>
              </div>
              <p className="text-sm text-[#222222] leading-relaxed">01700-000000 / 01800-000000</p>
            </div>
          </div>

          {/* Emergency 999 Hotline Banner */}
          <div className="rounded-[14px] bg-[#fef3f2] border border-[#fecdca] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b42318] text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sm text-[#b42318]">{t('emergency.hotline')}</div>
                <div className="text-xs text-[#b42318]/90">{t('emergency.note')}</div>
              </div>
            </div>
            <Link to="/emergency">
              <Button variant="danger" size="compact">
                {lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স ডাকুন' : 'Dispatch Ambulance'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: FOOTER (Clean Botanical Cream) ─── */}
      <footer className="border-t border-[#efeeeb] bg-[#fffefc] py-10 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5a6e5e]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-base text-[#0f3e17] font-normal">{t('app_name')}</span>
            <span>·</span>
            <span>© {new Date().getFullYear()} MediSheba BD</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/help" className="hover:text-[#0f3e17] transition-colors">
              {t('footer.help')}
            </Link>
            <Link to="/help" className="hover:text-[#0f3e17] transition-colors">
              {t('footer.privacy')}
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </footer>

      {/* ─── Mobile Sticky Bottom Bar (Cream Paper with 14px Forest Button) ─── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fffefc] border-t border-[#efeeeb] p-3 flex items-center gap-3">
        <Link to="/patient/doctors" className="flex-1">
          <Button variant="primary" size="comfort" fullWidth>
            {t('action.book')}
          </Button>
        </Link>
        <a href="tel:01700000000" className="shrink-0">
          <Button variant="secondary" size="comfort" leftIcon={<Phone className="w-4 h-4 text-[#0f3e17]" />}>
            {t('landing.callUs')}
          </Button>
        </a>
      </div>
    </div>
  );
}
