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
  User,
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
    <div className="min-h-screen bg-ground text-ink flex flex-col font-sans">
      {/* Emergency Notice Strip */}
      <div className="bg-field text-on-field text-[13px] border-b border-rule py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <span className="font-semibold text-on-field">
              {lang === 'bn'
                ? 'লাইভ চেম্বার সিরিয়াল ট্র্যাকিং এখন সারাদেশে সক্রিয়'
                : 'Live Doctor Chamber Queue Tracking Active Nationwide'}
            </span>
          </span>
          <Link
            to="/emergency"
            className="flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স: ৯৯৯' : 'Emergency Hotline: 999'}</span>
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-panel border-b border-rule sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-panel bg-accent text-on-accent flex items-center justify-center font-bold shadow-sm">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-ink tracking-tight block leading-none">
                MediSheba BD
              </span>
              <span className="text-[11px] text-ink-secondary tracking-tight">
                {lang === 'bn' ? 'স্মার্ট স্বাস্থ্য সেবা নেটওয়ার্ক' : 'Smart Healthcare Network'}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1.5">
            <Link
              to="/patient/doctors"
              className="px-3 py-1.5 rounded-panel text-[13px] font-semibold text-ink-secondary hover:text-ink hover:bg-ground-muted transition"
            >
              {lang === 'bn' ? 'ডাক্তার খুঁজুন' : 'Find Doctors'}
            </Link>
            <Link
              to="/patient/appointments"
              className="px-3 py-1.5 rounded-panel text-[13px] font-semibold text-ink-secondary hover:text-ink hover:bg-ground-muted transition"
            >
              {lang === 'bn' ? 'লাইভ সিরিয়াল' : 'Live Queue'}
            </Link>
            <Link
              to="/patient/resources"
              className="px-3 py-1.5 rounded-panel text-[13px] font-semibold text-ink-secondary hover:text-ink hover:bg-ground-muted transition"
            >
              {lang === 'bn' ? 'বেড ও টেস্ট ফি' : 'Beds & Tests'}
            </Link>
            <Link
              to="/emergency"
              className="px-3 py-1.5 rounded-panel text-[13px] font-bold text-red-600 hover:bg-red-50 transition flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
              {lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স' : 'Emergency 999'}
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-panel border border-rule hover:border-accent text-[13px] font-semibold text-ink bg-panel transition"
            >
              <Globe className="w-3.5 h-3.5 text-accent" />
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
                  <Button variant="outline" size="sm">
                    {lang === 'bn' ? 'লগইন' : 'Sign In'}
                  </Button>
                </Link>
                <Link to="/patient/doctors">
                  <Button variant="primary" size="sm">
                    {lang === 'bn' ? 'সিরিয়াল বুক করুন' : 'Book Appointment'}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rule bg-emerald-500/10 text-[13px] font-semibold text-emerald-800 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {lang === 'bn'
                ? 'বিএমডিসি অনুমোদিত বিশেষজ্ঞ চিকিৎসকদের প্ল্যাটফর্ম'
                : 'BMDC Verified Specialist Physicians Across Bangladesh'}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.15]">
              {lang === 'bn'
                ? 'হাসপাতালে দীর্ঘ অপেক্ষা নয়, ঘরে বসেই চেম্বারের লাইভ সিরিয়াল দেখুন'
                : 'Zero clinic wait time. Real-time chamber serials on your phone.'}
            </h1>

            <p className="text-ink-secondary text-base md:text-lg leading-relaxed max-w-2xl">
              {lang === 'bn'
                ? 'মেডি সেবা বিডি দিয়ে দেশের শীর্ষ হাসপাতালের বিশেষজ্ঞ চিকিৎসকের সিরিয়াল নিন। চেম্বারে ডাক্তার কখন আপনাকে ডাকবেন তা সরাসরি মোবাইলে দেখুন এবং সঠিক সময়ে পৌঁছান।'
                : 'Book verified doctors in Dhaka, Chittagong and all divisions. Monitor live token queue progress and arrive exactly when your serial is called.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/patient/doctors">
                <Button size="lg" variant="primary" leftIcon={<Calendar className="w-5 h-5" />}>
                  {lang === 'bn' ? 'ডাক্তার সিরিয়াল বুক করুন' : 'Find Doctor & Book Serial'}
                </Button>
              </Link>
              <Link to="/emergency">
                <Button size="lg" variant="danger" leftIcon={<AlertCircle className="w-5 h-5" />}>
                  {lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স (লগইন ছাড়া)' : 'Emergency Ambulance'}
                </Button>
              </Link>
            </div>

            {/* Platform Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-rule/60">
              <div>
                <div className="font-display text-2xl font-bold text-accent">300+</div>
                <div className="text-[12px] text-ink-secondary">Specialist Doctors</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-ink">45+</div>
                <div className="text-[12px] text-ink-secondary">Partner Hospitals</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-emerald-600">Live</div>
                <div className="text-[12px] text-ink-secondary">Serial Queue Sync</div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Triage Assistant */}
          <div className="lg:col-span-5">
            <Card className="shadow-lg border-accent/20">
              <div className="flex items-center gap-2.5 pb-4 border-b border-rule">
                <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-ink">
                    {lang === 'bn' ? 'এআই স্বাস্থ্য সহকারী' : 'AI Health Assistant'}
                  </h3>
                  <span className="text-[11px] text-ink-secondary">
                    {lang === 'bn' ? 'বাংলায় লক্ষণ লিখুন' : 'Get instant specialty guidance'}
                  </span>
                </div>
              </div>

              <div className="h-64 overflow-y-auto space-y-3 py-3 pr-1 text-[13px]">
                {chatLog.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-panel ${
                      msg.role === 'user'
                        ? 'bg-accent text-on-accent ml-6'
                        : 'bg-ground-muted text-ink mr-6'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {aiChatMutation.isLoading && (
                  <div className="p-3 rounded-panel bg-ground-muted text-ink mr-6 animate-pulse">
                    Thinking...
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-rule">
                <input
                  type="text"
                  placeholder={
                    lang === 'bn'
                      ? 'শারীরিক লক্ষণ লিখুন (যেমন: বুকে ব্যথা)...'
                      : 'Describe symptoms (e.g. chest pain)...'
                  }
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                  className="flex-1 bg-ground border border-rule rounded-panel px-3 py-2 text-[13px] text-ink focus:outline-none focus:border-accent"
                />
                <Button size="sm" onClick={() => handleAiSend()}>
                  Send
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-field text-on-field border-t border-rule py-8 px-4 text-center text-[13px] text-on-field-secondary">
        <p>© 2026 MediSheba BD. All rights reserved. Connecting healthcare nationwide.</p>
      </footer>
    </div>
  );
}

