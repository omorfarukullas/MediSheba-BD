import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../stores/language.store';
import { useAuthStore, getRoleDashboardUrl } from '../stores/auth.store';
import { trpc } from '../lib/trpc';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import {
  HeartPulse,
  Phone,
  Calendar,
  Clock,
  Hospital,
  AlertCircle,
  Video,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Globe,
  Check,
  X,
  Stethoscope,
  Activity,
  FolderLock
} from 'lucide-react';

export function PublicLandingPage() {
  const { lang, toggleLanguage } = useLanguageStore();
  const { user, profile, logout } = useAuthStore();
  const navigate = useNavigate();

  const [aiMessage, setAiMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: lang === 'bn'
        ? 'আসসালামু আলাইকুম! মেডি সেবা বিডি এআই স্বাস্থ্য সহকারীতে আপনাকে স্বাগতম। আপনার যেকোনো শারীরিক সমস্যা বা লক্ষণ বাংলায় লিখে জানান।'
        : 'Welcome to MediSheba BD AI Assistant. Describe your symptoms to receive preliminary guidance.',
    },
  ]);

  const aiChatMutation = (trpc.ai as any).chat.useMutation({
    onSuccess: (data: any) => {
      setChatLog((prev) => [...prev, { role: 'assistant', text: data.reply }]);
    },
    onError: () => {
      setChatLog((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: lang === 'bn'
            ? 'সার্ভারে সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।'
            : 'Failed to connect to AI server. Please try again shortly.',
        },
      ]);
    },
  });

  const handleAiSend = (text?: string) => {
    const toSend = text || aiMessage;
    if (!toSend.trim() || aiChatMutation.isLoading) return;
    setChatLog((prev) => [...prev, { role: 'user', text: toSend }]);
    if (!text) setAiMessage('');
    aiChatMutation.mutate({
      message: toSend,
      lang: lang as 'bn' | 'en',
      history: chatLog.slice(-4).map((c) => ({
        role: c.role as 'user' | 'assistant',
        content: c.text,
      })),
    });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#000000] flex flex-col font-sans">
      {/* ─── Top Strip: High Contrast Jet-Black Band ─── */}
      <div className="bg-[#000000] text-white text-[13px] py-2.5 px-4 border-b border-[#000000]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c6ff94] animate-pulse inline-block" />
            <span className="font-medium text-white">
              {lang === 'bn'
                ? 'লাইভ চেম্বার সিরিয়াল ট্র্যাকিং এখন সারাদেশে সক্রিয়'
                : 'Smart Live Doctor Chamber Tracking Active Nationwide'}
            </span>
          </span>
          <Link
            to="/emergency"
            className="flex items-center gap-1.5 text-[#c6ff94] hover:underline font-medium text-[12px]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স: ৯৯৯' : 'Emergency 999 Hotline'}</span>
          </Link>
        </div>
      </div>

      {/* ─── Top Header (Warm Bone Surface / Clean Minimal) ─── */}
      <header className="border-b border-[#e5e7eb] sticky top-0 z-30 bg-[#ffffff]/95 backdrop-blur-xs">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-[#193f78] text-white flex items-center justify-center font-bold text-xs shrink-0">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div>
              <span className="font-medium text-lg text-[#000000] tracking-tight block leading-none">
                MediSheba BD
              </span>
              <span className="text-[11px] text-[#6e6d6c] tracking-tight">
                {lang === 'bn' ? 'স্মার্ট স্বাস্থ্য সেবা নেটওয়ার্ক' : 'Smart Healthcare Network'}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/patient/doctors"
              className="px-3.5 py-1.5 rounded-full text-[14px] text-[#555555] hover:text-[#000000] hover:bg-[#f1f0ec] transition-colors"
            >
              {lang === 'bn' ? 'ডাক্তার খুঁজুন' : 'Specialists'}
            </Link>
            <Link
              to="/patient/appointments"
              className="px-3.5 py-1.5 rounded-full text-[14px] text-[#555555] hover:text-[#000000] hover:bg-[#f1f0ec] transition-colors"
            >
              {lang === 'bn' ? 'লাইভ সিরিয়াল' : 'Live Queue'}
            </Link>
            <Link
              to="/patient/resources"
              className="px-3.5 py-1.5 rounded-full text-[14px] text-[#555555] hover:text-[#000000] hover:bg-[#f1f0ec] transition-colors"
            >
              {lang === 'bn' ? 'বেড ও টেস্ট ফি' : 'Hospital Resources'}
            </Link>
            <Link
              to="/emergency"
              className="px-3.5 py-1.5 rounded-full text-[14px] text-[#ff6808] hover:bg-[#ff6808]/10 font-medium transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#ff6808] animate-ping" />
              {lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স' : 'Emergency 999'}
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1f0ec] hover:bg-[#e5e7eb] text-[13px] font-medium text-[#000000] transition"
            >
              <Globe className="w-3.5 h-3.5 text-[#4570ff]" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(getRoleDashboardUrl(profile?.role))}
                >
                  {lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => logout()}>
                  {lang === 'bn' ? 'লগআউট' : 'Sign Out'}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="bone" size="sm">
                    {lang === 'bn' ? 'লগইন' : 'Sign In'}
                  </Button>
                </Link>
                <Link to="/patient/doctors">
                  <Button variant="primary" size="sm">
                    {lang === 'bn' ? 'সিরিয়াল বুক' : 'Book Serial'}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ─── Hero Section with Signature Hand-Drawn Ember Orange Flourish ─── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-12 md:pt-16 pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1f0ec] border border-[#e5e7eb] text-[12px] font-medium text-[#000000]">
              <span className="w-2 h-2 rounded-full bg-[#4570ff]" />
              {lang === 'bn'
                ? 'বিএমডিসি অনুমোদিত বিশেষজ্ঞ চিকিৎসকদের নেটওয়ার্ক'
                : 'BMDC Certified Healthcare Platform'}
            </div>

            {/* Signature Heading with Ember Orange Script Accent */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#000000] tracking-tight leading-[1.18]">
              {lang === 'bn' ? (
                <>
                  হাসপাতালে দীর্ঘ অপেক্ষা নয়, মোবাইলে দেখুন{' '}
                  <span className="relative inline-block text-[#000000]">
                    লাইভ সিরিয়াল
                    <span className="block font-script text-[32px] sm:text-[36px] text-[#ff6808] -mt-2 leading-none font-bold">
                      রিয়েলটাইম
                    </span>
                  </span>
                </>
              ) : (
                <>
                  No more clinic waiting rooms.{' '}
                  <span className="relative inline-block text-[#000000]">
                    Track live queues
                    <span className="block font-script text-[30px] sm:text-[34px] text-[#ff6808] -mt-2 leading-none font-bold">
                      right from home.
                    </span>
                  </span>
                </>
              )}
            </h1>

            <p className="text-[#6e6d6c] text-[16px] md:text-[18px] leading-relaxed max-w-xl">
              {lang === 'bn'
                ? 'ঢাকা মেডিকেল, পিজি (BSMMU) সহ সারাদেশের শীর্ষ হাসপাতালের বিশেষজ্ঞ চিকিৎসকের সিরিয়াল বুক করুন এবং চেম্বারে ডাক্তার কখন ডাকবেন তা সরাসরি দেখুন।'
                : 'Book certified doctors, track serial turn numbers in real-time, monitor hospital ICU beds, and request emergency ambulances without waiting.'}
            </p>

            {/* Action Buttons: Primary Pill (#4570ff) + Outlined Orange Button (#ff6808) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/patient/doctors">
                <Button size="lg" variant="primary" leftIcon={<Calendar className="w-5 h-5" />}>
                  {lang === 'bn' ? 'সিরিয়াল বুক করুন' : 'Book Doctor Serial'}
                </Button>
              </Link>
              <Link to="/emergency">
                <Button size="lg" variant="orange" leftIcon={<AlertCircle className="w-5 h-5" />}>
                  {lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স' : 'Emergency Ambulance'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: AI Triage Assistant in Clean Card */}
          <div className="lg:col-span-5">
            <Card variant="bone" padding="md" className="border border-[#e5e7eb]">
              <div className="flex items-center justify-between pb-3 border-b border-[#e5e7eb]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[8px] bg-[#4570ff] text-white flex items-center justify-center font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[15px] text-[#000000]">
                      {lang === 'bn' ? 'এআই স্বাস্থ্য সহকারী' : 'AI Health Assistant'}
                    </h3>
                    <span className="text-[11px] text-[#6e6d6c]">
                      {lang === 'bn' ? 'লক্ষণ লিখে তাৎক্ষণিক পরামর্শ নিন' : 'Instant symptom triage'}
                    </span>
                  </div>
                </div>
                <Badge variant="indigo" size="sm">Llama 3.3</Badge>
              </div>

              <div className="h-60 overflow-y-auto space-y-2.5 py-3 pr-1 text-[13px]">
                {chatLog.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-[16px] ${
                      msg.role === 'user'
                        ? 'bg-[#4570ff] text-white ml-8'
                        : 'bg-[#ffffff] text-[#000000] border border-[#e5e7eb] mr-8'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {aiChatMutation.isLoading && (
                  <div className="p-3 rounded-[16px] bg-[#ffffff] border border-[#e5e7eb] text-[#6e6d6c] mr-8">
                    Thinking...
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[#e5e7eb]">
                <input
                  type="text"
                  placeholder={
                    lang === 'bn'
                      ? 'শারীরিক লক্ষণ লিখুন (যেমন: বুকে ব্যথা)...'
                      : 'Describe symptoms (e.g. chest tightness)...'
                  }
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                  className="flex-1 bg-[#ffffff] border border-[#e5e7eb] rounded-[12px] px-3.5 py-2 text-[13px] text-[#000000] focus:outline-none focus:border-[#4570ff]"
                />
                <Button size="sm" onClick={() => handleAiSend()}>
                  Send
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── 4-Card Rotating Colored KPI Grid (Section 6 & 9) ─── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Lavender Mist (#ebdcff) */}
          <Card variant="lavender" padding="md" className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#6e6d6c]">
              Specialist Physicians
            </div>
            <div className="text-3xl font-medium text-[#000000] tracking-tight">
              314+
            </div>
            <p className="text-[13px] text-[#555555]">
              BMDC-registered consultants available across Dhaka & divisions.
            </p>
          </Card>

          {/* Card 2: Ice Blue (#d6e0ff) */}
          <Card variant="ice-blue" padding="md" className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#6e6d6c]">
              Partner Hospitals
            </div>
            <div className="text-3xl font-medium text-[#000000] tracking-tight">
              48
            </div>
            <p className="text-[13px] text-[#555555]">
              Including DMCH, BSMMU, NICVD, and leading private healthcare clinics.
            </p>
          </Card>

          {/* Card 3: Lilac Bloom (#c293f1) */}
          <Card variant="lilac" padding="md" className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#000000]">
              Live Token Serials
            </div>
            <div className="text-3xl font-medium text-[#000000] tracking-tight">
              100%
            </div>
            <p className="text-[13px] text-[#000000]">
              Real-time socket synchronized queue with estimated arrival timers.
            </p>
          </Card>

          {/* Card 4: Deep Navy (#193f78) with #ffffff text */}
          <Card variant="navy" padding="md" className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#c6ff94]">
              Emergency Ambulance
            </div>
            <div className="text-3xl font-medium text-white tracking-tight">
              8.4 mins
            </div>
            <p className="text-[13px] text-[#d6e0ff]">
              Average response time for no-login 999 hospital dispatch.
            </p>
          </Card>
        </div>
      </section>

      {/* ─── Before & After / Comparison Split Block (Section 9 Recipe 3) ─── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 py-12 w-full">
        <div className="text-center space-y-2 mb-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#ff6808]">
            Traditional vs MediSheba BD
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium text-[#000000] tracking-tight">
            Why patients and doctors switch to smart queues
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Card: Warm Bone (#f1f0ec) with black circle white '×' marks */}
          <Card variant="bone" padding="lg" className="space-y-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#6e6d6c]">
              Old Clinical Hassle
            </div>
            <h3 className="text-xl font-medium text-[#000000]">
              Waiting hours in crowded chamber lobbies
            </h3>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#000000] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <X className="w-3.5 h-3.5" />
                </span>
                <span className="text-[14px] text-[#555555]">
                  Arriving at 4 PM to get serial #20 and waiting until 9 PM.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#000000] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <X className="w-3.5 h-3.5" />
                </span>
                <span className="text-[14px] text-[#555555]">
                  No visibility on doctor arrival or emergency delays.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#000000] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <X className="w-3.5 h-3.5" />
                </span>
                <span className="text-[14px] text-[#555555]">
                  Losing physical paper prescriptions and test reports.
                </span>
              </div>
            </div>
          </Card>

          {/* Right Card: Dark Contrast (#000000) with #c6ff94 Lime circles and black '✓' */}
          <Card variant="dark" padding="lg" className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#c6ff94]">
                The MediSheba BD Experience
              </div>
              <Badge variant="lime" size="sm">Smart Standard</Badge>
            </div>
            <h3 className="text-xl font-medium text-white">
              Know your exact consultation window on your phone
            </h3>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#c6ff94] text-[#000000] flex items-center justify-center font-bold text-xs shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-[14px] text-white font-medium">
                  Live serial counter on phone — arrive 15 minutes before your turn.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#c6ff94] text-[#000000] flex items-center justify-center font-bold text-xs shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-[14px] text-white font-medium">
                  Digital vault with strict privacy (Only Me / Doctor Access).
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#c6ff94] text-[#000000] flex items-center justify-center font-bold text-xs shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-[14px] text-white font-medium">
                  Instant ICU bed availability and emergency ambulance dispatch.
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ─── Footer: Minimal Warm Bone Bar ─── */}
      <footer className="border-t border-[#e5e7eb] bg-[#f1f0ec] py-8 px-4 text-center text-[13px] text-[#6e6d6c]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-[6px] bg-[#193f78] text-white flex items-center justify-center font-bold text-xs">
              <HeartPulse className="w-3 h-3" />
            </div>
            <span className="font-medium text-[#000000]">MediSheba BD</span>
            <span>— Smart Healthcare for Bangladesh</span>
          </div>
          <div>© 2026 MediSheba BD. Zero clinic wait times.</div>
        </div>
      </footer>
    </div>
  );
}
