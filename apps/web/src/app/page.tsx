import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../stores/language.store';
import { useAuthStore, getRoleDashboardUrl } from '../stores/auth.store';
import { LanguageToggle } from '../components/shared/LanguageToggle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AlertBanner } from '../components/ui/AlertBanner';
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
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export function PublicLandingPage() {
  const { lang, t } = useLanguageStore();
  const { user, profile, logout } = useAuthStore();
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState('all');

  // Section 9.0: Signed-in users who open / are sent to /dashboard
  React.useEffect(() => {
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
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-sans antialiased pb-20 sm:pb-0">
      {/* ─── Top Bar (64px, Section 9.0) ─── */}
      <header className="h-16 border-b border-border px-4 sm:px-8 flex items-center justify-between bg-canvas sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-ink text-white grid place-items-center text-sm font-semibold">
            M
          </div>
          <span className="text-base font-semibold text-ink tracking-tight">
            {t('app_name')}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* One-click LanguageToggle */}
          <LanguageToggle />

          <a href="tel:01700000000" className="hidden sm:inline-flex">
            <Button variant="secondary" size="compact" leftIcon={<Phone className="w-4 h-4" />}>
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

      {/* ─── SECTION 1: HERO (Section 9.0) ─── */}
      <section className="bg-canvas border-b border-border py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-[1120px] mx-auto">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-[44px] font-semibold text-ink tracking-tight leading-[1.15]">
              {t('landing.h1')}
            </h1>
            <p className="text-base sm:text-lg text-text-2 leading-relaxed max-w-xl">
              {t('landing.sub')}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <Link to="/patient/doctors" className="w-full sm:w-auto">
                <Button variant="primary" size="comfort" fullWidth className="sm:w-auto">
                  {t('action.book')}
                </Button>
              </Link>
              <a href="tel:01700000000" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="comfort"
                  fullWidth
                  className="sm:w-auto"
                  leftIcon={<Phone className="w-5 h-5 text-ink" />}
                >
                  {t('landing.call')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: HOW IT WORKS (Section 9.0) ─── */}
      <section className="bg-sidebar border-b border-border py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-[1120px] mx-auto space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-ink">
              {t('how.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <Card padding="lg" className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <div className="w-10 h-10 rounded-lg bg-subtle flex items-center justify-center text-text-2">
                  <Calendar className="w-5 h-5 text-ink" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">{t('how.step1')}</h3>
                <p className="text-sm text-text-2 mt-1 leading-relaxed">{t('how.step1Sub')}</p>
              </div>
            </Card>

            {/* Step 2 */}
            <Card padding="lg" className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <div className="w-10 h-10 rounded-lg bg-subtle flex items-center justify-center text-text-2">
                  <Clock className="w-5 h-5 text-ink" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">{t('how.step2')}</h3>
                <p className="text-sm text-text-2 mt-1 leading-relaxed">{t('how.step2Sub')}</p>
              </div>
            </Card>

            {/* Step 3 */}
            <Card padding="lg" className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <div className="w-10 h-10 rounded-lg bg-subtle flex items-center justify-center text-text-2">
                  <CheckCircle2 className="w-5 h-5 text-ink" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">{t('how.step3')}</h3>
                <p className="text-sm text-text-2 mt-1 leading-relaxed">{t('how.step3Sub')}</p>
              </div>
            </Card>
          </div>

          {/* Repeat Primary Action */}
          <div className="pt-2 text-center sm:text-left">
            <Link to="/patient/doctors">
              <Button variant="primary" size="comfort">
                {t('action.book')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: WHAT YOU CAN DO (Section 9.0) ─── */}
      <section className="bg-canvas border-b border-border py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-[1120px] mx-auto space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-ink">
              {t('svc.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Appointments */}
            <Link to="/patient/appointments" className="block group">
              <Card padding="lg" className="h-full space-y-4 hover:border-border-strong transition-colors">
                <div className="w-12 h-12 rounded-full bg-subtle flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-ink" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink group-hover:underline">
                    {t('svc.appts')}
                  </h3>
                  <p className="text-sm text-text-2 mt-1 leading-relaxed">
                    {t('svc.apptsSub')}
                  </p>
                </div>
              </Card>
            </Link>

            {/* Card 2: Prescriptions */}
            <Link to="/patient/documents" className="block group">
              <Card padding="lg" className="h-full space-y-4 hover:border-border-strong transition-colors">
                <div className="w-12 h-12 rounded-full bg-subtle flex items-center justify-center">
                  <FileText className="w-6 h-6 text-ink" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink group-hover:underline">
                    {t('svc.rx')}
                  </h3>
                  <p className="text-sm text-text-2 mt-1 leading-relaxed">
                    {t('svc.rxSub')}
                  </p>
                </div>
              </Card>
            </Link>

            {/* Card 3: Reports */}
            <Link to="/patient/documents" className="block group">
              <Card padding="lg" className="h-full space-y-4 hover:border-border-strong transition-colors">
                <div className="w-12 h-12 rounded-full bg-subtle flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-ink" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink group-hover:underline">
                    {t('svc.reports')}
                  </h3>
                  <p className="text-sm text-text-2 mt-1 leading-relaxed">
                    {t('svc.reportsSub')}
                  </p>
                </div>
              </Card>
            </Link>

            {/* Card 4: Bills */}
            <Link to="/patient/resources" className="block group">
              <Card padding="lg" className="h-full space-y-4 hover:border-border-strong transition-colors">
                <div className="w-12 h-12 rounded-full bg-subtle flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-ink" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink group-hover:underline">
                    {t('svc.bills')}
                  </h3>
                  <p className="text-sm text-text-2 mt-1 leading-relaxed">
                    {t('svc.billsSub')}
                  </p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: OUR DOCTORS (Section 9.0) ─── */}
      <section className="bg-sidebar border-b border-border py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-[1120px] mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-ink">
              {t('doctors.title')}
            </h2>

            {/* Department Filter Chips (Scroll sideways on mobile) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              {departments.map((dept) => {
                const isSelected = selectedDept === dept.id;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDept(dept.id)}
                    className={`h-10 px-4 rounded-full text-xs font-medium whitespace-nowrap transition-colors border cursor-pointer ${
                      isSelected
                        ? 'bg-accent-tint text-accent border-accent font-semibold'
                        : 'bg-canvas text-text-2 border-border hover:border-border-strong hover:text-ink'
                    }`}
                  >
                    {dept.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 Doctor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredDoctors.map((doc) => (
              <Card key={doc.id} padding="lg" className="flex flex-col justify-between space-y-4 bg-canvas">
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-full bg-subtle border border-border flex items-center justify-center font-semibold text-base text-ink">
                    {doc.initials}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-ink">{doc.name}</h3>
                    <p className="text-xs text-text-2 font-medium mt-0.5">{doc.dept}</p>
                    <p className="text-xs text-text-3 mt-0.5">{doc.hospital}</p>
                  </div>
                  <div className="pt-2 border-t border-border text-xs text-text-3">
                    <span className="text-text-2 font-medium">{lang === 'bn' ? 'পরবর্তী খালি:' : 'Next free:'}</span> {doc.nextFree}
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/patient/doctors" className="block w-full">
                    <Button variant="secondary" size="compact" fullWidth>
                      {lang === 'bn' ? 'সিরিয়াল নিন' : 'Book'}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="pt-2 text-center">
            <Link to="/patient/doctors">
              <Button variant="secondary" size="comfort">
                {t('doctors.seeAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: VISIT US (Section 9.0) ─── */}
      <section className="bg-canvas border-b border-border py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-[1120px] mx-auto space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-ink">
              {t('visit.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Opening Hours */}
            <Card padding="lg" className="space-y-3">
              <div className="flex items-center gap-2 text-text-3 text-xs font-semibold uppercase tracking-wider">
                <Clock className="w-4 h-4 text-ink" />
                <span>{t('visit.hours')}</span>
              </div>
              <p className="text-sm font-medium text-ink">
                {t('visit.hoursVal')}
              </p>
            </Card>

            {/* Address */}
            <Card padding="lg" className="space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-text-3 text-xs font-semibold uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-ink" />
                  <span>{t('visit.address')}</span>
                </div>
                <p className="text-sm font-medium text-ink mt-2">
                  {t('visit.addressVal')}
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Dhanmondi+27+Dhaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="secondary" size="compact" leftIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    {t('visit.directions')}
                  </Button>
                </a>
              </div>
            </Card>

            {/* Phone */}
            <Card padding="lg" className="space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-text-3 text-xs font-semibold uppercase tracking-wider">
                  <Phone className="w-4 h-4 text-ink" />
                  <span>{t('visit.phone')}</span>
                </div>
                <p className="text-sm font-medium text-ink mt-2">
                  +880 1700-000000 / 02-9876543
                </p>
              </div>
              <div className="pt-2">
                <a href="tel:01700000000" className="block">
                  <Button variant="secondary" size="compact" leftIcon={<Phone className="w-3.5 h-3.5" />}>
                    {t('landing.callUs')}
                  </Button>
                </a>
              </div>
            </Card>
          </div>

          {/* Clinical Safety Emergency Strip (Danger style, not dismissible) */}
          <AlertBanner
            variant="danger"
            message={t('emergency.note')}
          />
        </div>
      </section>

      {/* ─── SECTION 6: FOOTER (Section 9.0) ─── */}
      <footer className="bg-sidebar py-8 px-4 sm:px-8 border-t border-border">
        <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-2">
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} MediSheba BD</span>
            <Link to="/help" className="hover:text-ink">{t('footer.privacy')}</Link>
            <Link to="/help" className="hover:text-ink">{t('footer.help')}</Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />
          </div>
        </div>
      </footer>

      {/* ─── Mobile Sticky Bottom Bar (Fixed at bottom on phones, Section 9.0) ─── */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden z-40 bg-canvas border-t border-border p-3 flex items-center gap-3">
        <Link to="/patient/doctors" className="flex-1">
          <Button variant="primary" size="compact" fullWidth>
            {t('action.book')}
          </Button>
        </Link>
        <a href="tel:01700000000" className="shrink-0">
          <Button variant="secondary" size="compact" leftIcon={<Phone className="w-4 h-4" />}>
            {lang === 'bn' ? 'কল' : 'Call'}
          </Button>
        </a>
      </div>
    </div>
  );
}
