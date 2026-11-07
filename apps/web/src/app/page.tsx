import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../stores/language.store';
import { useAuthStore, getRoleDashboardUrl } from '../stores/auth.store';
import { LanguageToggle } from '../components/shared/LanguageToggle';
import { Button } from '../components/ui/Button';
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
  Sparkles,
  Building2,
  Truck,
  HeartPulse,
  Lock,
  Check,
  X,
  UserCheck
} from 'lucide-react';
import { AiHealthAssistantView } from '../components/patient/AiHealthAssistantView';

export function PublicLandingPage() {
  const { lang, t } = useLanguageStore();
  const { user, profile, logout } = useAuthStore();
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState('all');

  // Auto-redirect authenticated users to their role workspace
  useEffect(() => {
    if (user && profile) {
      navigate(getRoleDashboardUrl(profile.role), { replace: true });
    }
  }, [user, profile, navigate]);

  const departments = [
    { id: 'all', label: lang === 'bn' ? 'সকল বিভাগ' : 'All Departments' },
    { id: 'medicine', label: lang === 'bn' ? 'মেডিসিন' : 'Internal Medicine' },
    { id: 'cardiology', label: lang === 'bn' ? 'কার্ডিওলজি' : 'Cardiology' },
    { id: 'orthopedic', label: lang === 'bn' ? 'অর্থোপেডিক' : 'Orthopedics' },
    { id: 'pediatric', label: lang === 'bn' ? 'শিশু রোগ' : 'Pediatrics' },
  ];

  const doctors = [
    {
      id: 'doc-1',
      name: lang === 'bn' ? 'অধ্যাপক ডা. মোঃ রফিকুল ইসলাম' : 'Prof. Dr. Md. Rafiqul Islam',
      dept: lang === 'bn' ? 'মেডিসিন ও হৃদরোগ বিশেষজ্ঞ' : 'Medicine & Cardiology',
      deptKey: 'medicine',
      hospital: lang === 'bn' ? 'ঢাকা মেডিকেল কলেজ ও হাসপাতাল' : 'Dhaka Medical College & Hospital',
      nextFree: lang === 'bn' ? 'আজ বিকাল ৫:০০ টা' : 'Today 5:00 PM',
      initials: 'RI',
      bmdc: 'BMDC #A-28491'
    },
    {
      id: 'doc-2',
      name: lang === 'bn' ? 'ডা. ফারহানা আহমেদ' : 'Dr. Farhana Ahmed',
      dept: lang === 'bn' ? 'কার্ডিওলজিস্ট' : 'Cardiologist',
      deptKey: 'cardiology',
      hospital: lang === 'bn' ? 'জাতীয় হৃদরোগ ইনস্টিটিউট ও হাসপাতাল' : 'NICVD, Dhaka',
      nextFree: lang === 'bn' ? 'আগামীকাল সকাল ১০:০০ টা' : 'Tomorrow 10:00 AM',
      initials: 'FA',
      bmdc: 'BMDC #A-41902'
    },
    {
      id: 'doc-3',
      name: lang === 'bn' ? 'ডা. তানভীর হাসান চৌধুরী' : 'Dr. Tanvir Hasan Chowdhury',
      dept: lang === 'bn' ? 'অর্থোপেডিক সার্জন' : 'Orthopedic Surgeon',
      deptKey: 'orthopedic',
      hospital: lang === 'bn' ? 'বিএসএমএমইউ (পিজি হাসপাতাল)' : 'BSMMU, Shahbag',
      nextFree: lang === 'bn' ? 'আগামীকাল সন্ধ্যা ৬:৩০ টা' : 'Tomorrow 6:30 PM',
      initials: 'TC',
      bmdc: 'BMDC #A-33810'
    },
    {
      id: 'doc-4',
      name: lang === 'bn' ? 'ডা. সুমাইয়া খানম' : 'Dr. Sumaiya Khanam',
      dept: lang === 'bn' ? 'শিশু রোগ বিশেষজ্ঞ' : 'Pediatric Specialist',
      deptKey: 'pediatric',
      hospital: lang === 'bn' ? 'ঢাকা শিশু হাসপাতাল' : 'Dhaka Shishu Hospital',
      nextFree: lang === 'bn' ? 'আজ সন্ধ্যা ৭:০০ টা' : 'Today 7:00 PM',
      initials: 'SK',
      bmdc: 'BMDC #A-50124'
    },
  ];

  const filteredDoctors = selectedDept === 'all' 
    ? doctors 
    : doctors.filter((d) => d.deptKey === selectedDept);

  const faqs = [
    {
      q: lang === 'bn' ? 'মেডিসেবা বিডি (MediSheba BD) কী?' : 'What is MediSheba BD?',
      a: lang === 'bn' 
        ? 'মেডিসেবা বিডি হলো বাংলাদেশের সমন্বিত স্মার্ট ডিজিটাল স্বাস্থ্যসেবা প্ল্যাটফর্ম। এটি চেম্বারের লাইভ সিরিয়াল ট্র্যাকিং, বিএমডিসি-নিবন্ধিত বিশেষজ্ঞ ডাক্তারের অ্যাপয়েন্টমেন্ট, হাসপাতালের আইসিইউ/বেড প্রাপ্যতা, ডিজিটাল প্রেসক্রিপশন ভল্ট এবং জরুরি ৯৯৯ অ্যাম্বুলেন্সকে একটি একক সিস্টেমে সংযুক্ত করেছে।'
        : 'MediSheba BD is Bangladesh’s unified digital healthcare network. It connects patients with live chamber queue tracking, BMDC-verified specialist consultations, hospital ICU/bed capacity, permanent encrypted prescription vaults, and emergency 999 ambulance dispatch in a single platform.'
    },
    {
      q: lang === 'bn' ? 'লাইভ চেম্বার সিরিয়াল ট্র্যাকিং কীভাবে কাজ করে?' : 'How does the Live Chamber Queue work?',
      a: lang === 'bn' 
        ? 'অ্যাপয়েন্টমেন্ট বুকিংয়ের পর আপনি একটি ডিজিটাল সিরিয়াল টোকেন পান। চেম্বারে ডাক্তার রোগী দেখার সাথে সাথে আপনার ফোনে বর্তমান সিরিয়াল নম্বর লাইভ আপডেট হয়। ফলে আপনাকে ঘণ্টার পর ঘণ্টা হাসপাতালে বসে থাকতে হয় না — সিরিয়ালের ১৫ মিনিট আগে পৌঁছালেই চলে।'
        : 'When you book an appointment, you receive a digital token. As the doctor consults each patient, the live token board updates on your phone in real time via WebSockets. You can arrive just 15 minutes before your turn instead of waiting for hours.'
    },
    {
      q: lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স ডাকতে কি লগইন করতে হবে?' : 'Do I need an account to call an emergency ambulance?',
      a: lang === 'bn' 
        ? 'না। জরুরি সেবায় কোন লগইন বা পাসওয়ার্ডের প্রয়োজন নেই। যেকোনো নাগরিক যেকোনো সময় সরাসরি নিকটস্থ হাসপাতালের আইসিইউ বা এসি অ্যাম্বুলেন্সে কল করতে পারেন অথবা জরুরি রিকোয়েস্ট পাঠাতে পারেন।'
        : 'No. The emergency ambulance system requires no login or password. Anyone can access nearby ICU/AC ambulances, click to call the driver immediately, or dispatch emergency assistance.'
    },
    {
      q: lang === 'bn' ? 'আমার প্রেসক্রিপশন ও মেডিকেল রিপোর্ট কতটা সুরক্ষিত?' : 'How secure are my medical prescriptions and records?',
      a: lang === 'bn' 
        ? 'আপনার স্বাস্থ্য তথ্য সম্পূর্ণ ব্যক্তিগত ও এনক্রিপ্টেড। ডিফল্টভাবে আপনার রেকর্ড শুধুমাত্র আপনি দেখতে পাবেন। কেবলমাত্র চেম্বারে ভিজিটের সময় আপনি সম্মতি দিলে উপস্থিত চিকিৎসক আপনার ইতিহাস পর্যালোচনা করতে পারবেন।'
        : 'Your records are stored in a private, encrypted digital vault. By default, records are set to "Only Me". Attending physicians can only review your medical history when you explicitly grant "Doctor Access".'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fffefc] text-[#222222] flex flex-col font-sans antialiased pb-20 sm:pb-0">
      {/* ─── Top Bar (Ease Health Botanical Navigation) ─── */}
      <header className="h-16 border-b border-[#efeeeb] px-4 sm:px-8 flex items-center justify-between bg-[#fffefc] sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[7px] bg-[#0f3e17] text-[#fffefc] grid place-items-center text-sm font-semibold">
            M
          </div>
          <div className="leading-tight">
            <span className="font-serif text-[17px] font-normal text-[#0f3e17] tracking-tight block">
              {t('app_name')}
            </span>
            <span className="text-[10px] text-[#222222]/60 hidden sm:block">
              {lang === 'bn' ? 'ডিজিটাল স্বাস্থ্য নেটওয়ার্ক' : 'National Health Platform'}
            </span>
          </div>
        </Link>

        {/* Center Quick Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] text-[#222222]/70 font-medium">
          <a href="#about" className="hover:text-[#0f3e17] transition-colors">
            {lang === 'bn' ? 'পরিচিতি' : 'About MediSheba'}
          </a>
          <a href="#pillars" className="hover:text-[#0f3e17] transition-colors">
            {lang === 'bn' ? 'সেবা মডিউল' : 'Ecosystem'}
          </a>
          <a href="#ai-assistant" className="hover:text-[#0f3e17] transition-colors flex items-center gap-1 text-[#0f3e17]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'এআই ট্রায়াজ' : 'AI Assistant'}</span>
          </a>
          <a href="#doctors" className="hover:text-[#0f3e17] transition-colors">
            {lang === 'bn' ? 'বিশেষজ্ঞ ডাক্তার' : 'Doctors'}
          </a>
          <Link to="/emergency" className="text-[#b42318] hover:text-[#912018] transition-colors font-semibold">
            {lang === 'bn' ? 'জরুরি ৯৯৯' : 'Emergency 999'}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* One-click LanguageToggle */}
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

      {/* ─── SECTION 1: HERO — INTRODUCING MEDISHEBA BD ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Panel: Keylime Wash Botanical Surface */}
          <div className="lg:col-span-7 rounded-[14px] bg-[#e1f4df] p-7 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="eyebrow flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
                <span className="w-2 h-2 rounded-full bg-[#0f3e17]" />
                <span>{lang === 'bn' ? 'বাংলাদেশের আধুনিক স্বাস্থ্য বিপ্লব' : 'INTRODUCING MEDISHEBA BD'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-[48px] lg:text-[52px] font-light text-[#0f3e17] leading-[1.08] tracking-tight">
                {lang === 'bn' 
                  ? 'সম্মানজনক স্বাস্থ্যসেবা। চেম্বারে বসে থাকার অবসান।' 
                  : 'Healthcare with dignity. Zero hours lost in waiting rooms.'}
              </h1>

              <p className="text-base sm:text-[17px] text-[#222222] font-normal leading-relaxed max-w-xl">
                {lang === 'bn'
                  ? 'মেডিসেবা বিডি (MediSheba BD) হলো বাংলাদেশের প্রথম সমন্বিত ডিজিটাল স্বাস্থ্য নেটওয়ার্ক। বিএমডিসি-নিবন্ধিত বিশেষজ্ঞ চিকিৎসকের সিরিয়াল ট্র্যাকিং, হাসপাতালের লাইভ বেড ও আইসিইউ প্রাপ্যতা, সুরক্ষিত প্রেসক্রিপশন ভল্ট এবং ২৪/৭ এআই ক্লিনিকাল পরামর্শ — সবকিছু এখন আপনার হাতের মুঠোয়।'
                  : 'MediSheba BD is Bangladesh’s unified digital healthcare network. Connect with BMDC-verified specialists, track live chamber queue tokens from your phone, view real-time hospital ICU & bed capacity, and access 24/7 AI health guidance across all 64 districts.'}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link to="/patient/doctors" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="comfort"
                    fullWidth
                    className="sm:w-auto"
                    rightIcon={<ArrowRight className="w-4 h-4 text-[#fffefc]" />}
                  >
                    {lang === 'bn' ? 'ডাক্তার অ্যাপয়েন্টমেন্ট নিন' : 'Book a Consultation'}
                  </Button>
                </Link>
                <Link to="/emergency" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="comfort"
                    fullWidth
                    className="sm:w-auto text-[#b42318] border-[#efeeeb]"
                    leftIcon={<AlertTriangle className="w-4 h-4 text-[#b42318]" />}
                  >
                    {lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স ৯৯৯' : 'Emergency 999 Dispatch'}
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#222222]/70 pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0f3e17]" />
                  {lang === 'bn' ? 'কোন অগ্রিম ফি ছাড়া নিবন্ধন' : 'Free Patient Portal'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0f3e17]" />
                  {lang === 'bn' ? '১০০% বিএমডিসি যাচাইকৃত' : 'BMDC Verified'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel: Slate Hush Cool Counterpart with Real System Previews */}
          <div className="lg:col-span-5 rounded-[14px] bg-[#b6ced5] p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#0f3e17]/10">
              <span className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
                {lang === 'bn' ? 'সরাসরি প্ল্যাটফর্ম ড্যাশবোর্ড' : 'LIVE ECOSYSTEM MONITOR'}
              </span>
              <span className="h-2 w-2 rounded-full bg-[#0f3e17] animate-pulse" />
            </div>

            <div className="space-y-3">
              {/* Product Card 1: Live Chamber Queue Token */}
              <div className="rounded-[14px] bg-[#fffefc] p-5 space-y-2 border border-transparent">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[10px] font-semibold text-[#0f3e17] uppercase tracking-wider">
                    {lang === 'bn' ? 'লাইভ চেম্বার সিরিয়াল' : 'Live Chamber Token'}
                  </span>
                  <Badge variant="success">✓ {lang === 'bn' ? 'রুম ৪০০ — বর্তমান রোগী' : 'In Consultation'}</Badge>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="font-serif text-3xl font-light text-[#0f3e17]">Token #18</div>
                  <div className="text-xs text-[#222222]/60">Room 402 · DMCH Dhaka</div>
                </div>
                <div className="text-[11px] text-[#0f3e17] font-medium pt-1">
                  {lang === 'bn' ? 'আপনার সিরিয়াল #20 (আনুমানিক অপেক্ষা ~15 মিনিট)' : 'Your Serial #20 (~15 mins wait)'}
                </div>
              </div>

              {/* Product Card 2: Hospital Bed & ICU Live Matrix */}
              <div className="rounded-[14px] bg-[#fffefc] p-5 space-y-2 border border-transparent">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-[#222222] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0f3e17]" />
                    <span>{lang === 'bn' ? 'ডিএমসিএইচ সেন্ট্রাল আইসিইউ' : 'DMCH Central ICU'}</span>
                  </div>
                  <Badge variant="accent">6 Beds Free</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-[#e1f4df]/50 p-2 rounded-[10px]">
                    <div className="text-[#222222]/60">CCU Beds</div>
                    <div className="font-semibold text-[#0f3e17]">4 Available</div>
                  </div>
                  <div className="bg-[#e1f4df]/50 p-2 rounded-[10px]">
                    <div className="text-[#222222]/60">General Ward</div>
                    <div className="font-semibold text-[#0f3e17]">82 Available</div>
                  </div>
                </div>
              </div>

              {/* Product Card 3: Encrypted Medical Vault */}
              <div className="rounded-[14px] bg-[#fffefc] p-5 flex items-center justify-between border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[10px] bg-[#e1f4df] flex items-center justify-center text-[#0f3e17] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#222222]">
                      {lang === 'bn' ? 'লাইফটাইম প্রেসক্রিপশন ভল্ট' : 'Encrypted Medical EHR'}
                    </div>
                    <div className="text-[11px] text-[#222222]/60">
                      {lang === 'bn' ? 'শুধুমাত্র রোগীর অনুমতিতে প্রবেশযোগ্য' : 'Zero Data Leak · Patient Controlled'}
                    </div>
                  </div>
                </div>
                <Badge variant="neutral">EHR</Badge>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-[#0f3e17]/80">
              {lang === 'bn' ? 'জাতীয় বিএমডিসি ও সরকারি হাসপাতাল ডাটাবেজ সংযুক্ত' : 'Interconnected National Healthcare Infrastructure'}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: STATS STRIP — NATIONAL SCALE ─── */}
      <section className="py-6 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-[14px] bg-[#fffefc] border border-[#efeeeb] p-6 text-center space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17]">64</div>
            <div className="text-xs font-medium text-[#222222]/70">
              {lang === 'bn' ? 'জেলা জুড়ে ডিজিটাল স্বাস্থ্য কাভারেজ' : 'Districts Covered in Bangladesh'}
            </div>
          </div>

          <div className="rounded-[14px] bg-[#fffefc] border border-[#efeeeb] p-6 text-center space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17]">100%</div>
            <div className="text-xs font-medium text-[#222222]/70">
              {lang === 'bn' ? 'বিএমডিসি নিবন্ধিত বিশেষজ্ঞ ডাক্তার' : 'BMDC Verified Physicians'}
            </div>
          </div>

          <div className="rounded-[14px] bg-[#fffefc] border border-[#efeeeb] p-6 text-center space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17]">~15 Min</div>
            <div className="text-xs font-medium text-[#222222]/70">
              {lang === 'bn' ? 'চেম্বারে আগমনের গড় সময়' : 'Arrival Time vs 4hr Waiting'}
            </div>
          </div>

          <div className="rounded-[14px] bg-[#fffefc] border border-[#efeeeb] p-6 text-center space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17]">24/7</div>
            <div className="text-xs font-medium text-[#222222]/70">
              {lang === 'bn' ? 'এআই লক্ষণ পরীক্ষা ও ৯৯৯ অ্যাম্বুলেন্স' : 'AI Triage & 999 Ambulance'}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: THE PROBLEM & WHY MEDISHEBA BD WAS BUILT ─── */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-8 border-t border-[#efeeeb] bg-[#f9fbf8]">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <div className="max-w-2xl space-y-2">
            <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
              {lang === 'bn' ? 'কেন মেডিসেবা বিডি?' : 'WHY WE BUILT MEDISHEBA BD'}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17] tracking-tight">
              {lang === 'bn' 
                ? 'চেম্বারের চিরাচরিত দুর্ভোগের বিরুদ্ধে একটি টেকসই প্রযুক্তিগত সমাধান' 
                : 'A permanent technological solution to clinic waiting room agony'}
            </h2>
            <p className="text-base text-[#222222]/70 leading-relaxed">
              {lang === 'bn'
                ? 'বাংলাদেশে ডাক্তার দেখানোর অভিজ্ঞতা বহু বছর ধরে ক্লান্তিকর ও অনিশ্চিত। অসুস্থ শরীর নিয়ে ৫ ঘণ্টা বসে থাকা, পুরোনো প্রেসক্রিপশন হারিয়ে ফেলা এবং জরুরি সময়ে আইসিইউ খোঁজার অসহায়ত্ব দূর করতেই মেডিসেবা বিডির সৃষ্টি।'
                : 'For decades, seeing a doctor in Bangladesh has meant arriving at 3 PM for serial #22, waiting 5 hours in suffocating corridors, and having no visibility if emergency surgeries cause delays. MediSheba BD re-engineers this experience from the ground up.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Reality */}
            <div className="rounded-[14px] bg-[#fffefc] border border-[#efeeeb] p-7 sm:p-9 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#efeeeb]">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#b42318]">
                  {lang === 'bn' ? 'প্রচলিত হাসপাতালের ভোগান্তি' : 'The Old Clinic Agony'}
                </div>
                <span className="w-6 h-6 rounded-full bg-[#fef3f2] text-[#b42318] flex items-center justify-center font-bold text-xs">
                  <X className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#fef3f2] text-[#b42318] flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3" />
                  </span>
                  <div className="text-sm text-[#222222]/80">
                    {lang === 'bn' ? 'বিকাল ৪টায় সিরিয়াল নিয়ে রাত ৯টা পর্যন্ত ভিড় ও কোলাহলে বসে থাকা।' : 'Arriving at 4 PM to get serial #20 and waiting until 9 PM.'}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#fef3f2] text-[#b42318] flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3" />
                  </span>
                  <div className="text-sm text-[#222222]/80">
                    {lang === 'bn' ? 'ডাক্তার কখন চেম্বারে আসবেন বা কোনো জরুরি রোগী দেখছেন কি না তার কোনো খবর না থাকা।' : 'No visibility on doctor arrival, surgery delays, or current serving serial.'}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#fef3f2] text-[#b42318] flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3" />
                  </span>
                  <div className="text-sm text-[#222222]/80">
                    {lang === 'bn' ? 'কাগজের প্রেসক্রিপশন ও টেস্ট রিপোর্ট হারিয়ে ফেলে একই টেস্ট বারবার করানো।' : 'Losing physical paper prescriptions and having to repeat expensive tests.'}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#fef3f2] text-[#b42318] flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3" />
                  </span>
                  <div className="text-sm text-[#222222]/80">
                    {lang === 'bn' ? 'জরুরি মুমূর্ষু রোগীর জন্য এক হাসপাতাল থেকে আরেক হাসপাতালে বেড ও আইসিইউর সন্ধানে ছোটাছুটি।' : 'Frantic phone calls to hospital receptions searching for vacant ICU beds.'}
                  </div>
                </div>
              </div>
            </div>

            {/* The MediSheba BD Standard (Keylime Wash) */}
            <div className="rounded-[14px] bg-[#e1f4df] border border-[#0f3e17]/15 p-7 sm:p-9 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#0f3e17]/15">
                <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
                  {lang === 'bn' ? 'মেডিসেবা বিডি আধুনিক সমাধান' : 'The MediSheba BD Standard'}
                </div>
                <span className="w-6 h-6 rounded-full bg-[#0f3e17] text-[#fffefc] flex items-center justify-center font-bold text-xs">
                  <Check className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#0f3e17] text-[#fffefc] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <div className="text-sm text-[#0f3e17] font-medium">
                    {lang === 'bn' ? 'ফোনে লাইভ টোকেন ট্র্যাকিং — নিজের সিরিয়ালের মাত্র ১৫ মিনিট আগে চেম্বারে পৌঁছান।' : 'Live queue counter on phone — arrive 15 minutes before your turn.'}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#0f3e17] text-[#fffefc] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <div className="text-sm text-[#0f3e17] font-medium">
                    {lang === 'bn' ? 'ডাক্তারের চেম্বারে উপস্থিতির রিয়েল-টাইম পুশ নোটিফিকেশন ও এসএমএস আপডেট।' : 'Real-time push notifications on doctor arrival and chamber delays.'}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#0f3e17] text-[#fffefc] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <div className="text-sm text-[#0f3e17] font-medium">
                    {lang === 'bn' ? 'আজীবন সুরক্ষিত ডিজিটাল প্রেসক্রিপশন ভল্ট যা কেবল আপনার অনুমতিতেই ডাক্তার দেখতে পারেন।' : 'Encrypted lifetime prescription vault accessible with your explicit permission.'}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#0f3e17] text-[#fffefc] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <div className="text-sm text-[#0f3e17] font-medium">
                    {lang === 'bn' ? 'এক ক্লিকে নিকটস্থ হাসপাতালের আইসিইউ বেড অনুসন্ধান এবং ৯৯৯ জরুরি অ্যাম্বুলেন্স প্রেরণ।' : 'Transparent live hospital ICU capacity and 1-tap emergency 999 ambulance dispatch.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: THE 5 CORE PILLARS OF THE PLATFORM ─── */}
      <section id="pillars" className="py-12 sm:py-20 px-4 sm:px-8 border-t border-[#efeeeb] bg-[#fffefc]">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <div className="max-w-2xl space-y-2">
            <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
              {lang === 'bn' ? 'সমন্বিত সেবা কাঠামো' : 'THE 5 PILLARS OF MEDISHEBA'}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17] tracking-tight">
              {lang === 'bn' 
                ? 'একটি একক প্ল্যাটফর্মে আপনার যাবতীয় চিকিৎসাগত প্রয়োজন' 
                : 'Everything you need to navigate Bangladesh healthcare'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1: Live Queue */}
            <div className="rounded-[14px] bg-[#e1f4df] p-7 space-y-4">
              <div className="w-12 h-12 rounded-[10px] bg-[#fffefc] text-[#0f3e17] flex items-center justify-center font-serif text-xl font-light">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-light text-[#0f3e17]">
                  {lang === 'bn' ? '১. স্মার্ট চেম্বার কিউ' : '1. Smart Chamber Queue'}
                </h3>
                <p className="text-sm text-[#222222] leading-relaxed">
                  {lang === 'bn'
                    ? 'Socket.io চালিত রিয়েল-টাইম সিরিয়াল বোর্ডে চেম্বারের চলমান টোকেন লাইভ দেখুন। বাড়ি থেকে সরাসরি ট্র্যাকিং।'
                    : 'Real-time WebSocket token counter streams live chamber updates directly to your smartphone.'}
                </p>
              </div>
            </div>

            {/* Pillar 2: BMDC Doctors */}
            <div className="rounded-[14px] bg-[#e1f4df] p-7 space-y-4">
              <div className="w-12 h-12 rounded-[10px] bg-[#fffefc] text-[#0f3e17] flex items-center justify-center font-serif text-xl font-light">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-light text-[#0f3e17]">
                  {lang === 'bn' ? '২. যাচাইকৃত বিশেষজ্ঞ ডাক্তার' : '2. BMDC-Verified Specialists'}
                </h3>
                <p className="text-sm text-[#222222] leading-relaxed">
                  {lang === 'bn'
                    ? 'সরকারি মেডিকেল ও শীর্ষ হাসপাতালের নির্ভরযোগ্য চিকিৎসকদের সাথে ফিজিক্যাল বা টেলিমেডিসিন অ্যাপয়েন্টমেন্ট।'
                    : 'Direct physical chamber visits and WebRTC telemedicine consultations with authenticated doctors.'}
                </p>
              </div>
            </div>

            {/* Pillar 3: Hospital ICU & Beds */}
            <div className="rounded-[14px] bg-[#e1f4df] p-7 space-y-4">
              <div className="w-12 h-12 rounded-[10px] bg-[#fffefc] text-[#0f3e17] flex items-center justify-center font-serif text-xl font-light">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-light text-[#0f3e17]">
                  {lang === 'bn' ? '৩. হাসপাতাল বেড ও আইসিইউ' : '3. Hospital Bed & ICU Matrix'}
                </h3>
                <p className="text-sm text-[#222222] leading-relaxed">
                  {lang === 'bn'
                    ? 'জরুরি পরিস্থিতিতে বিভিন্ন হাসপাতালের আইসিইউ, সিসিইউ, কেবিন ও ওয়ার্ডের খালি বেড সংখ্যা সরাসরি যাচাই করুন।'
                    : 'Transparent, real-time vacancy tracker for ICU, CCU, and general hospital beds across the city.'}
                </p>
              </div>
            </div>

            {/* Pillar 4: Digital Health Vault */}
            <div className="rounded-[14px] bg-[#e1f4df] p-7 space-y-4">
              <div className="w-12 h-12 rounded-[10px] bg-[#fffefc] text-[#0f3e17] flex items-center justify-center font-serif text-xl font-light">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-light text-[#0f3e17]">
                  {lang === 'bn' ? '৪. সুরক্ষিত প্রেসক্রিপশন ভল্ট' : '4. Confidential Health Vault'}
                </h3>
                <p className="text-sm text-[#222222] leading-relaxed">
                  {lang === 'bn'
                    ? 'প্রেসক্রিপশন, ল্যাব রিপোর্ট ও চিকিৎসার ইতিহাস সুরক্ষিত ক্লাউডে আজীবন সংরক্ষিত। গোপনীয়তা শতভাগ আপনার নিয়ন্ত্রণে।'
                    : 'Encrypted lifetime storage for prescriptions and lab scans with patient-controlled doctor access.'}
                </p>
              </div>
            </div>

            {/* Pillar 5: Emergency 999 Ambulance */}
            <div className="rounded-[14px] bg-[#e1f4df] p-7 space-y-4">
              <div className="w-12 h-12 rounded-[10px] bg-[#fffefc] text-[#0f3e17] flex items-center justify-center font-serif text-xl font-light">
                <Truck className="w-6 h-6 text-[#b42318]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-light text-[#0f3e17]">
                  {lang === 'bn' ? '৫. জরুরি অ্যাম্বুলেন্স ৯৯৯' : '5. Emergency 999 Dispatch'}
                </h3>
                <p className="text-sm text-[#222222] leading-relaxed">
                  {lang === 'bn'
                    ? 'কোনো অ্যাকাউন্ট বা লগইন ছাড়াই জিপিএস লোকেশন শনাক্ত করে নিকটস্থ আইসিইউ বা এসি অ্যাম্বুলেন্স কল করার সুবিধা।'
                    : 'Zero-login public dispatch connecting patients to nearby ICU ambulances and the national 999 hotline.'}
                </p>
              </div>
            </div>

            {/* Pillar 6: AI Clinical Triage */}
            <div className="rounded-[14px] bg-[#cfe7d3] p-7 space-y-4">
              <div className="w-12 h-12 rounded-[10px] bg-[#fffefc] text-[#0f3e17] flex items-center justify-center font-serif text-xl font-light">
                <Sparkles className="w-6 h-6 text-[#0f3e17]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-light text-[#0f3e17]">
                  {lang === 'bn' ? '৬. এআই স্বাস্থ্য সহকারী' : '6. AI Clinical Assistant'}
                </h3>
                <p className="text-sm text-[#222222] leading-relaxed">
                  {lang === 'bn'
                    ? 'বাংলা ও ইংরেজিতে লক্ষণ যাচাই, প্রাথমিক সতর্কতা এবং সঠিক বিশেষজ্ঞ ডাক্তারের তাৎক্ষণিক দিকনির্দেশনা।'
                    : 'Bilingual AI triage powered by Llama 3.3 to guide you to the right medical specialist before your visit.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: INTERACTIVE AI HEALTH ASSISTANT SHOWCASE ─── */}
      <section id="ai-assistant" className="py-12 sm:py-20 px-4 sm:px-8 border-t border-[#efeeeb] bg-[#f9fbf8]">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="eyebrow flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'মেডিসেবা এআই প্রযুক্তি' : 'AI-POWERED CLINICAL TRIAGE'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17] tracking-tight">
              {lang === 'bn' 
                ? 'ডাক্তার দেখানোর আগেই এআই লক্ষণ পরামর্শ' 
                : 'Instant Clinical Guidance Before Your Visit'}
            </h2>
            <p className="text-base text-[#222222]/70 leading-relaxed">
              {lang === 'bn'
                ? 'আপনার কী ধরনের শারীরিক অস্বস্তি হচ্ছে লিখুন। আমাদের এআই সহকারী আপনাকে প্রাথমিক সতর্কতা ও সংশ্লিষ্ট বিশেষজ্ঞ ডাক্তারের কাছে যাওয়ার সুনির্দিষ্ট পথ দেখাবে।'
                : 'Experience MediSheba BD’s clinical intelligence. Enter your symptoms below for immediate empathetic triage and physician routing.'}
            </p>
          </div>

          <AiHealthAssistantView />
        </div>
      </section>

      {/* ─── SECTION 6: VERIFIED SPECIALISTS DIRECTORY ─── */}
      <section id="doctors" className="py-12 sm:py-20 px-4 sm:px-8 border-t border-[#efeeeb] bg-[#fffefc]">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
                {lang === 'bn' ? 'বিশেষজ্ঞ চিকিৎসক নেটওয়ার্ক' : 'VERIFIED SPECIALISTS'}
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

          {/* Department Chips */}
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
                    <p className="text-xs text-[#222222]/60 mt-0.5">{doc.hospital}</p>
                    <div className="text-[11px] text-[#0f3e17]/80 font-mono mt-1">{doc.bmdc}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#efeeeb] space-y-3">
                  <div className="text-xs text-[#222222]/70">
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

      {/* ─── SECTION 7: EMERGENCY SAFETY HOTLINE (999) ─── */}
      <section className="py-10 px-4 sm:px-8 border-t border-[#efeeeb] bg-[#f9fbf8]">
        <div className="max-w-[1200px] mx-auto">
          <div className="rounded-[14px] bg-[#fef3f2] border border-[#fecdca] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#b42318] text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="font-serif text-xl font-light text-[#b42318]">
                  {lang === 'bn' ? 'জাতীয় জরুরি হটলাইন — ৯৯৯' : 'National Emergency Support — 999'}
                </div>
                <div className="text-xs sm:text-sm text-[#b42318]/90 max-w-xl">
                  {lang === 'bn'
                    ? 'যেকোনো আকস্মিক হৃদরোগ, দুর্ঘটনা বা জীবনঘাতী জরুরি পরিস্থিতিতে তাৎক্ষণিক ৯৯৯ নম্বরে ফোন করুন অথবা আমাদের পাবলিক অ্যাম্বুলেন্স পোর্টালে যান।'
                    : 'For life-threatening emergencies, cardiac arrest, or severe accidents, dial 999 immediately or access our public ambulance dispatch.'}
                </div>
              </div>
            </div>
            <Link to="/emergency" className="shrink-0 w-full sm:w-auto">
              <Button variant="danger" size="lg" fullWidth className="sm:w-auto">
                {lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স প্রেরণ' : 'Dispatch Nearest Ambulance'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: FAQ & TRUST ─── */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 border-t border-[#efeeeb] bg-[#fffefc]">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <div className="max-w-2xl space-y-2">
            <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
              {lang === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'FREQUENTLY ASKED QUESTIONS'}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#0f3e17] tracking-tight">
              {lang === 'bn' ? 'মেডিসেবা বিডি সম্পর্কে আপনার প্রশ্নসমূহ' : 'Understanding the Platform'}
            </h2>
          </div>

          <div className="divide-y divide-[#efeeeb]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5">
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#0f3e17]">
                    {faq.q}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-sm text-[#222222]/80 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: FOOTER (Clean Botanical Cream) ─── */}
      <footer className="border-t border-[#efeeeb] bg-[#f9fbf8] py-12 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#efeeeb]">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[6px] bg-[#0f3e17] text-[#fffefc] grid place-items-center text-xs font-semibold">
                  M
                </div>
                <span className="font-serif text-xl font-normal text-[#0f3e17]">
                  {t('app_name')}
                </span>
              </div>
              <p className="text-xs text-[#222222]/60">
                {lang === 'bn' 
                  ? 'বাংলাদেশের সকল নাগরিকের জন্য সহজ, আধুনিক ও সম্মানজনক স্বাস্থ্যসেবা।' 
                  : 'Empowering healthcare across 64 districts in Bangladesh.'}
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-[#222222]/70 font-medium">
              <Link to="/help" className="hover:text-[#0f3e17] transition-colors">
                {t('footer.help')}
              </Link>
              <Link to="/help" className="hover:text-[#0f3e17] transition-colors">
                {t('footer.privacy')}
              </Link>
              <a href="tel:01700000000" className="hover:text-[#0f3e17] transition-colors">
                01700-000000
              </a>
              <LanguageToggle />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#222222]/50">
            <div>
              © {new Date().getFullYear()} MediSheba BD. All rights reserved. BMDC verified partner network.
            </div>
            <div className="text-center sm:text-right">
              {lang === 'bn' ? 'জরুরি চিকিৎসা সেবার জন্য ৯৯৯ নম্বরে ফোন দিন।' : 'For medical emergencies, dial 999.'}
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Mobile Sticky Bottom Bar ─── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fffefc] border-t border-[#efeeeb] p-3 flex items-center gap-3">
        <Link to="/patient/doctors" className="flex-1">
          <Button variant="primary" size="comfort" fullWidth>
            {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিন' : 'Book Appointment'}
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
