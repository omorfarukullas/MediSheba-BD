import React, { useState } from 'react';
import { useLanguageStore } from './stores/language.store';
import { useAuthStore } from './stores/auth.store';
import { trpc } from './lib/trpc';
import { 
  Activity, 
  ArrowRight,
  Calendar, 
  CheckCircle2,
  Clock, 
  CreditCard, 
  Globe, 
  HeartPulse, 
  Hospital, 
  MessageSquare, 
  Phone,
  Plus,
  Search, 
  ShieldCheck, 
  Sparkles,
  User,
  UserCheck 
} from 'lucide-react';

// ─── Auth Modal (Sign In / Register) ──────────────────────────────────────────
function AuthModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguageStore();
  const { loginWithGoogle, loginWithEmail, register } = useAuthStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    setLoading(true); setError('');
    try { await loginWithGoogle(); onClose(); }
    catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function handleEmailSubmit(ev: React.FormEvent) {
    ev.preventDefault(); setLoading(true); setError('');
    try {
      if (mode === 'login') await loginWithEmail(email, password);
      else await register(email, password);
      onClose();
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-field/80 backdrop-blur-sm px-4">
      <div className="bg-panel border border-rule rounded-panel p-8 w-full max-w-sm shadow-xl space-y-5">
        <div className="space-y-1">
          <h2 className="font-display text-2xl font-extrabold text-ink tracking-tight">
            {mode === 'login' ? (lang === 'bn' ? 'লগইন করুন' : 'Sign In') : (lang === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create Account')}
          </h2>
          <p className="text-[13px] text-ink-secondary">
            {lang === 'bn' ? 'মেডিসেবা বিডি অ্যাকাউন্টে প্রবেশ করুন' : 'Access your MediSheba BD account'}
          </p>
        </div>

        <button 
          onClick={handleGoogle} 
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-rule hover:border-ink/30 rounded-panel py-2.5 text-[14px] font-semibold text-ink bg-ground-muted transition duration-interaction disabled:opacity-60"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.3 9 3.4l6.7-6.7C35.8 2.4 30.3 0 24 0 14.7 0 6.8 5.4 2.9 13.3l7.8 6C12.3 13.3 17.6 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3-2.3 5.6-4.9 7.3l7.5 5.8c4.4-4.1 7.2-10.1 7.2-17.4z"/>
            <path fill="#FBBC05" d="M10.7 28.3A14.6 14.6 0 0 1 9.5 24c0-1.5.3-2.9.7-4.3l-7.8-6A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.9 10.7l7.8-6.4z"/>
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.5-4.9 2.4-8.4 2.4-6.4 0-11.7-3.8-13.3-9.5l-7.8 6.4C6.8 42.6 14.7 48 24 48z"/>
          </svg>
          {lang === 'bn' ? 'Google দিয়ে ১-ক্লিকে লগইন' : 'Continue with Google'}
        </button>

        <div className="flex items-center gap-3 text-[12px] text-ink-secondary">
          <div className="flex-1 h-px bg-rule" />
          {lang === 'bn' ? 'অথবা ইমেইল দিয়ে' : 'or with email'}
          <div className="flex-1 h-px bg-rule" />
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <input 
            type="email" 
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            placeholder={lang === 'bn' ? 'আপনার ইমেইল ঠিকানা' : 'Email address'}
            className="w-full border border-rule rounded-panel px-3.5 py-2.5 text-[14px] text-ink bg-ground focus:outline-none focus:border-accent"
          />
          <input 
            type="password" 
            required 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            placeholder={lang === 'bn' ? 'পাসওয়ার্ড দিন' : 'Password'}
            className="w-full border border-rule rounded-panel px-3.5 py-2.5 text-[14px] text-ink bg-ground focus:outline-none focus:border-accent"
          />
          {error && <p className="text-red-500 text-[12px] break-words">{error}</p>}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-accent hover:bg-accent/90 text-on-accent font-semibold py-2.5 rounded-panel text-[14px] transition duration-interaction disabled:opacity-60"
          >
            {loading ? 'অপেক্ষা করুন...' : (mode === 'login' ? (lang === 'bn' ? 'লগইন করুন' : 'Sign In') : (lang === 'bn' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Register'))}
          </button>
        </form>

        <div className="flex items-center justify-between text-[13px] pt-1">
          <button 
            onClick={() => setMode(m => m === 'login' ? 'register' : 'login')} 
            className="text-accent hover:underline font-medium"
          >
            {mode === 'login' ? (lang === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create account') : (lang === 'bn' ? 'আগের অ্যাকাউন্ট আছে? লগইন' : 'Already have account? Sign In')}
          </button>
          <button onClick={onClose} className="text-ink-secondary hover:text-ink">
            {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Application ─────────────────────────────────────────────────────────
export function App() {
  const { lang, t, toggleLanguage } = useLanguageStore();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'home' | 'doctors' | 'queue' | 'ai' | 'payment'>('home');
  const [aiMessage, setAiMessage] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [doctorSearch, setDoctorSearch] = useState<string>('');

  // Initial welcome message in AI chat
  const [chatLog, setChatLog] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: lang === 'bn' 
        ? 'আসসালামু আলাইকুম! মেডিসেবা বিডি এআই স্বাস্থ্য সহকারীতে আপনাকে স্বাগতম। আপনার যেকোনো শারীরিক সমস্যা, লক্ষণ বা কোন ডাক্তার দেখানো প্রয়োজন তা বাংলায় লিখে জানান অথবা নিচের বোতামগুলোতে চাপ দিন।'
        : 'Welcome to MediSheba BD AI Health Assistant. Describe your symptoms or tap a suggested topic below to receive preliminary guidance.'
    }
  ]);

  // Real-time AI chat mutation
  const aiChatMutation = (trpc.ai as any).chat.useMutation({
    onSuccess: (data: any) => {
      setChatLog((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.reply
        }
      ]);
    },
    onError: () => {
      setChatLog((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: lang === 'bn' 
            ? 'এআই সার্ভারে সংযোগ করতে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।' 
            : 'Failed to connect to AI server. Please try again shortly.'
        }
      ]);
    }
  });

  const handleAiSend = (customText?: string) => {
    const textToSend = customText || aiMessage;
    if (!textToSend.trim() || aiChatMutation.isLoading) return;

    setChatLog((prev) => [...prev, { role: 'user', text: textToSend }]);
    if (!customText) setAiMessage('');

    aiChatMutation.mutate({
      message: textToSend,
      lang: lang as 'bn' | 'en',
      history: chatLog.slice(-4).map((c) => ({
        role: c.role as 'user' | 'assistant',
        content: c.text
      }))
    });
  };

  const quickQuestions = lang === 'bn' ? [
    'পেটে প্রচণ্ড গ্যাস ও বুক জ্বালাপোড়া করছে',
    'বাচ্চার হঠাৎ উচ্চমাত্রায় জ্বর ও সর্দি',
    'বুকে চাপ ও শ্বাস নিতে কষ্ট হচ্ছে',
    'কোমর ও মেরুদণ্ডে তীব্র ব্যথা',
    'চোখে ঝাপসা দেখা ও মাথা ঘোরা'
  ] : [
    'Severe abdominal gas & heartburn',
    'Sudden high fever & cough in toddler',
    'Chest tightness & difficulty breathing',
    'Sharp lower back pain',
    'Blurred vision & dizziness'
  ];

  const doctorsList = [
    {
      id: '1',
      name: lang === 'bn' ? 'অধ্যাপক ডা. মোঃ রফিকুল ইসলাম' : 'Prof. Dr. Md. Rafiqul Islam',
      degrees: 'MBBS, FCPS, FRCP (Edin)',
      spec: lang === 'bn' ? 'মেডিসিন ও হৃদরোগ বিশেষজ্ঞ' : 'Medicine & Cardiology Specialist',
      specKey: 'medicine',
      hospital: lang === 'bn' ? 'ঢাকা মেডিকেল কলেজ ও হাসপাতাল' : 'Dhaka Medical College & Hospital',
      chamber: lang === 'bn' ? 'রুম ৪০২, ৪র্থ তলা' : 'Room 402, 4th Floor',
      fee: 800,
      nextSlot: lang === 'bn' ? 'আজ বিকাল ৫:০০ (সিরিয়াল উন্মুক্ত)' : 'Today 05:00 PM (Serials Open)',
      bmdc: 'A-45912',
      experience: lang === 'bn' ? '১৮ বছর অভিজ্ঞতা' : '18 Years Exp'
    },
    {
      id: '2',
      name: lang === 'bn' ? 'ডা. ফারহানা আহমেদ' : 'Dr. Farhana Ahmed',
      degrees: 'MBBS, MD (Cardiology)',
      spec: lang === 'bn' ? 'হৃদরোগ ও রক্তচাপ বিশেষজ্ঞ' : 'Cardiologist & Blood Pressure Specialist',
      specKey: 'cardiology',
      hospital: lang === 'bn' ? 'জাতীয় হৃদরোগ ইনস্টিটিউট (NICVD)' : 'National Institute of Cardiovascular Diseases',
      chamber: lang === 'bn' ? 'চেম্বার ২০৩' : 'Chamber 203',
      fee: 1000,
      nextSlot: lang === 'bn' ? 'আগামীকাল সকাল ১০:০০' : 'Tomorrow 10:00 AM',
      bmdc: 'A-67210',
      experience: lang === 'bn' ? '১২ বছর অভিজ্ঞতা' : '12 Years Exp'
    },
    {
      id: '3',
      name: lang === 'bn' ? 'ডা. তানভীর হাসান চৌধুরী' : 'Dr. Tanvir Hasan Chowdhury',
      degrees: 'MBBS, MS (Orthopedics)',
      spec: lang === 'bn' ? 'হাড়, জোড়া ও ট্রমা সার্জন' : 'Orthopedic & Trauma Surgeon',
      specKey: 'orthopedic',
      hospital: lang === 'bn' ? 'বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (BSMMU)' : 'BSMMU, Shahbag, Dhaka',
      chamber: lang === 'bn' ? 'ব্লক-সি, রুম ১০৫' : 'Block-C, Room 105',
      fee: 900,
      nextSlot: lang === 'bn' ? 'আগামীকাল সন্ধ্যা ৬:৩০' : 'Tomorrow 06:30 PM',
      bmdc: 'A-51093',
      experience: lang === 'bn' ? '১৪ বছর অভিজ্ঞতা' : '14 Years Exp'
    }
  ];

  const filteredDoctors = doctorsList.filter((doc) => {
    const matchesSpec = selectedSpecialty === 'all' || doc.specKey === selectedSpecialty;
    const matchesSearch = doctorSearch.trim() === '' || 
      doc.name.toLowerCase().includes(doctorSearch.toLowerCase()) || 
      doc.spec.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(doctorSearch.toLowerCase());
    return matchesSpec && matchesSearch;
  });

  const faqs = [
    {
      q: lang === 'bn' ? 'লাইভ চেম্বার সিরিয়াল কীভাবে দেখব?' : 'How do I track live chamber queues?',
      a: lang === 'bn' 
        ? 'সিরিয়াল বুক করার পর আপনি একটি টোকেন নম্বর পাবেন। "লাইভ সিরিয়াল" ট্যাবে ক্লিক করলেই দেখতে পাবেন ডাক্তার বর্তমানে কত নম্বর রোগী দেখছেন এবং আপনার ডাক আসতে আনুমানিক কত মিনিট বাকি।'
        : 'After booking, you receive a digital token. Visit the "Chamber Queue" tab to view real-time doctor progress and your estimated call window.'
    },
    {
      q: lang === 'bn' ? 'বিকাশ বা নগদে কীভাবে সিরিয়ালের ফি পরিশোধ করব?' : 'How do I pay via bKash or Nagad?',
      a: lang === 'bn'
        ? '"পেমেন্ট" ট্যাবে গিয়ে বিকাশ বা নগদ বেছে নিয়ে আপনার মোবাইল নম্বর দিলেই ডেমো পেমেন্ট সম্পন্ন হবে এবং সাথে সাথে ডিজিটাল টোকেন পেয়ে যাবেন।'
        : 'Under the Payment tab, choose bKash or Nagad, enter your mobile number, and confirm to receive an instant digital appointment token.'
    },
    {
      q: lang === 'bn' ? 'এআই স্বাস্থ্য সহকারী কি প্রেসক্রিপশন দিতে পারে?' : 'Can the AI assistant prescribe medications?',
      a: lang === 'bn'
        ? 'না, এআই সহকারী কোনো ওষুধ বা প্রেসক্রিপশন দেয় না। এটি আপনার শারীরিক লক্ষণের ভিত্তিতে কোন বিশেষজ্ঞ ডাক্তার দেখানো উচিত তা বুঝিয়ে দেয় এবং জরুরি অবস্থায় সঠিক হাসপাতালে যাওয়ার পরামর্শ দেয়।'
        : 'No. The AI provides preliminary triage and specialty recommendations only. For prescriptions, consult our registered doctors.'
    }
  ];

  return (
    <>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      
      <div className="min-h-screen bg-ground text-ink flex flex-col font-sans selection:bg-accent selection:text-on-accent">
        
        {/* Top Announcement Strip */}
        <div className="bg-field text-on-field text-[13px] border-b border-rule py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="font-semibold text-on-field">
                {lang === 'bn' ? 'লাইভ চেম্বার সিরিয়াল ট্র্যাকিং এখন সারাদেশে সক্রিয়' : 'Live Doctor Chamber Queue Tracking Active Nationwide'}
              </span>
            </span>
            <span className="hidden sm:flex items-center gap-2 text-on-field-secondary">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>{lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স ও সেবা: ৯৯৯' : 'Emergency Hotline: 999'}</span>
            </span>
          </div>
        </div>

        {/* Navigation Bar */}
        <header className="bg-panel border-b border-rule sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            
            {/* Brand Logo */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer group" 
              onClick={() => setActiveTab('home')}
            >
              <div className="w-9 h-9 rounded-panel bg-accent text-on-accent flex items-center justify-center font-bold shadow-sm">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-ink tracking-tight leading-none group-hover:text-accent transition-colors">
                  {t('app_name')}
                </h1>
                <span className="text-[12px] text-ink-secondary tracking-tight">
                  {lang === 'bn' ? 'স্মার্ট ডাক্তার সিরিয়াল সেবা' : 'Smart Doctor Booking & Queues'}
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1">
              <button 
                onClick={() => setActiveTab('home')} 
                className={`px-3.5 py-2 rounded-panel text-[14px] font-semibold transition duration-interaction ${
                  activeTab === 'home' 
                    ? 'bg-accent/10 text-accent font-bold' 
                    : 'text-ink-secondary hover:text-ink hover:bg-ground-muted'
                }`}
              >
                {lang === 'bn' ? 'মূল পাতা' : 'Home'}
              </button>
              <button 
                onClick={() => setActiveTab('doctors')} 
                className={`px-3.5 py-2 rounded-panel text-[14px] font-semibold transition duration-interaction ${
                  activeTab === 'doctors' 
                    ? 'bg-accent/10 text-accent font-bold' 
                    : 'text-ink-secondary hover:text-ink hover:bg-ground-muted'
                }`}
              >
                {lang === 'bn' ? 'ডাক্তার খুঁজুন' : 'Find Doctor'}
              </button>
              <button 
                onClick={() => setActiveTab('queue')} 
                className={`px-3.5 py-2 rounded-panel text-[14px] font-semibold transition duration-interaction flex items-center gap-1.5 ${
                  activeTab === 'queue' 
                    ? 'bg-accent/10 text-accent font-bold' 
                    : 'text-ink-secondary hover:text-ink hover:bg-ground-muted'
                }`}
              >
                <Clock className="w-4 h-4 text-accent" />
                {lang === 'bn' ? 'লাইভ সিরিয়াল' : 'Live Serial'}
              </button>
              <button 
                onClick={() => setActiveTab('ai')} 
                className={`px-3.5 py-2 rounded-panel text-[14px] font-semibold transition duration-interaction flex items-center gap-1.5 ${
                  activeTab === 'ai' 
                    ? 'bg-accent/10 text-accent font-bold' 
                    : 'text-ink-secondary hover:text-ink hover:bg-ground-muted'
                }`}
              >
                <Sparkles className="w-4 h-4 text-accent" />
                {lang === 'bn' ? 'এআই ডাক্তার সহকারী' : 'AI Assistant'}
              </button>
            </nav>

            {/* Right Action & Language Switcher */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-panel border border-rule hover:border-accent text-[13px] font-semibold text-ink bg-panel transition duration-interaction shadow-xs"
                title="Switch Language / ভাষা পরিবর্তন করুন"
              >
                <Globe className="w-3.5 h-3.5 text-accent" />
                <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
              </button>

              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-ink hidden sm:inline-block max-w-[120px] truncate" title={user.email ?? ''}>
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="px-3 py-1.5 rounded-panel border border-rule hover:border-red-400 hover:text-red-600 text-[13px] font-medium transition duration-interaction"
                  >
                    {lang === 'bn' ? 'লগআউট' : 'Sign Out'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="px-3.5 py-1.5 rounded-panel border border-rule hover:border-accent text-[13px] font-semibold text-ink bg-panel transition duration-interaction shadow-xs"
                >
                  {lang === 'bn' ? 'লগইন' : 'Sign In'}
                </button>
              )}

              <button 
                onClick={() => setActiveTab('doctors')}
                className="bg-accent hover:bg-accent/90 text-on-accent text-[14px] font-bold px-4 py-2 rounded-panel transition duration-interaction shadow-sm active:translate-y-0 hover:-translate-y-0.5"
              >
                {lang === 'bn' ? 'সিরিয়াল বুক করুন' : 'Book Appointment'}
              </button>
            </div>

          </div>
        </header>

        {/* Body Content */}
        <main className="flex-1 w-full">

          {/* TAB: HOME */}
          {activeTab === 'home' && (
            <div>
              
              {/* 1. Hero Section */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rule bg-emerald-50 text-[13px] font-semibold text-emerald-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {lang === 'bn' ? 'বিএমডিসি অনুমোদিত অভিজ্ঞ চিকিৎসকদের তালিকা' : 'BMDC Verified Specialist Doctors'}
                    </div>

                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.15]">
                      {lang === 'bn' 
                        ? 'হাসপাতালে দীর্ঘ অপেক্ষা নয়, ঘরে বসেই চেম্বারের লাইভ সিরিয়াল দেখুন' 
                        : 'No more waiting at clinics. Track your live chamber serial from home.'}
                    </h1>

                    <p className="text-ink-secondary text-base md:text-lg leading-relaxed max-w-2xl">
                      {lang === 'bn'
                        ? 'মেডিসেবা বিডি দিয়ে ঢাকা মেডিকেল, পিজি (BSMMU) সহ দেশের শীর্ষ হাসপাতালের বিশেষজ্ঞ চিকিৎসকের সিরিয়াল নিন বিকাশ বা নগদে। চেম্বারে ডাক্তার কখন আপনাকে ডাকবেন তা সরাসরি আপনার মোবাইলে দেখতে পাবেন।'
                        : 'Book appointments with top verified specialist physicians in Bangladesh. Monitor real-time chamber token status on your mobile screen and arrive just before your consultation.'}
                    </p>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button 
                        onClick={() => setActiveTab('doctors')}
                        className="bg-accent hover:bg-accent/90 text-on-accent px-6 py-3.5 rounded-panel font-bold text-[15px] transition duration-interaction shadow-sm flex items-center gap-2 hover:-translate-y-0.5"
                      >
                        <Search className="w-5 h-5" />
                        {lang === 'bn' ? 'ডাক্তার খুঁজুন ও সিরিয়াল নিন' : 'Find Doctor & Book Serial'}
                      </button>
                      
                      <button 
                        onClick={() => setActiveTab('queue')}
                        className="border border-rule hover:border-accent bg-panel text-ink px-6 py-3.5 rounded-panel font-bold text-[15px] transition duration-interaction flex items-center gap-2 hover:-translate-y-0.5 shadow-xs"
                      >
                        <Clock className="w-5 h-5 text-accent" />
                        {lang === 'bn' ? 'লাইভ সিরিয়াল দেখুন' : 'View Live Chamber Serial'}
                      </button>
                    </div>

                    {/* Simple Help Line for Non-Technical Users */}
                    <div className="p-3 bg-ground-muted border border-rule rounded-panel flex items-center gap-3 text-[13px] text-ink-secondary">
                      <span className="text-accent font-bold">💡 {lang === 'bn' ? 'সহজ নিয়ম:' : 'Simple 3 Steps:'}</span>
                      <span>{lang === 'bn' ? '১. ডাক্তার বেছে নিন  →  ২. ফি দিন  →  ৩. মোবাইলে সিরিয়াল দেখুন' : '1. Choose Doctor  →  2. Confirm Token  →  3. Track Serial Live'}</span>
                    </div>

                  </div>

                  {/* Right Column: Visual Chamber Token Card */}
                  <div className="lg:col-span-5">
                    <div className="bg-panel border-2 border-accent/30 rounded-panel p-6 shadow-md space-y-4">
                      
                      <div className="flex items-center justify-between border-b border-rule pb-3">
                        <span className="font-display font-bold text-[15px] text-ink flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          {lang === 'bn' ? 'চেম্বার ডিজিটাল ডিসপ্লে' : 'Live Chamber Token Display'}
                        </span>
                        <span className="text-[12px] bg-accent/10 text-accent font-bold px-2 py-0.5 rounded">
                          {lang === 'bn' ? 'রিয়েলটাইম' : 'Live Sync'}
                        </span>
                      </div>

                      {/* Doctor info */}
                      <div className="bg-ground-muted rounded-panel p-4 space-y-1">
                        <p className="font-display font-bold text-base text-ink">
                          {lang === 'bn' ? 'অধ্যাপক ডা. মোঃ রফিকুল ইসলাম' : 'Prof. Dr. Md. Rafiqul Islam'}
                        </p>
                        <p className="text-[13px] text-accent font-semibold">
                          {lang === 'bn' ? 'মেডিসিন ও হৃদরোগ বিশেষজ্ঞ' : 'Medicine & Cardiology Specialist'}
                        </p>
                        <p className="text-[12px] text-ink-secondary">
                          {lang === 'bn' ? 'ঢাকা মেডিকেল কলেজ হাসপাতাল (রুম ৪০২)' : 'Dhaka Medical College Hospital (Room 402)'}
                        </p>
                      </div>

                      {/* Big Tokens */}
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-panel">
                          <span className="text-[11px] font-bold uppercase text-emerald-800 block">
                            {lang === 'bn' ? 'বর্তমান রোগী' : 'In Chamber'}
                          </span>
                          <span className="font-display text-4xl font-extrabold text-emerald-700">14</span>
                          <span className="text-[11px] text-emerald-600 block mt-1">
                            {lang === 'bn' ? 'ডাক্তার দেখছেন' : 'In Consultation'}
                          </span>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-panel">
                          <span className="text-[11px] font-bold uppercase text-blue-800 block">
                            {lang === 'bn' ? 'আপনার সিরিয়াল' : 'Your Token'}
                          </span>
                          <span className="font-display text-4xl font-extrabold text-blue-700">18</span>
                          <span className="text-[11px] text-blue-600 block mt-1">
                            {lang === 'bn' ? 'সামনে ৪ জন বাকি' : '4 Ahead (~20m)'}
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setActiveTab('queue')}
                        className="w-full bg-ground-muted hover:bg-rule border border-rule text-ink py-2.5 rounded-panel text-[13px] font-bold transition duration-interaction flex items-center justify-center gap-1.5"
                      >
                        <span>{lang === 'bn' ? 'সম্পূর্ণ লাইভ চেম্বার দেখুন' : 'Open Full Live Queue'}</span>
                        <ArrowRight className="w-4 h-4 text-accent" />
                      </button>

                    </div>
                  </div>

                </div>
              </section>

              {/* 2. Key Facts Strip */}
              <div className="border-y border-rule bg-ground-muted py-6">
                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
                  <div>
                    <p className="font-display text-3xl font-extrabold text-accent">১,২০০+</p>
                    <p className="text-[13px] text-ink-secondary">{lang === 'bn' ? 'অভিজ্ঞ বিশেষজ্ঞ চিকিৎসক' : 'Specialist Doctors'}</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-extrabold text-emerald-600">০ মিনিট</p>
                    <p className="text-[13px] text-ink-secondary">{lang === 'bn' ? 'অপ্রয়োজনীয় লাইনে অপেক্ষা' : 'Queue Wasted Time'}</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-extrabold text-accent">৮৫,০০০+</p>
                    <p className="text-[13px] text-ink-secondary">{lang === 'bn' ? 'সফল সিরিয়াল ও পরামর্শ' : 'Patients Consulted'}</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-extrabold text-ink">৬৪ জেলা</p>
                    <p className="text-[13px] text-ink-secondary">{lang === 'bn' ? 'সারাদেশে কার্যক্রম' : 'Districts Covered'}</p>
                  </div>
                </div>
              </div>

              {/* 3. Three-Card Practical Benefits */}
              <section className="py-14 max-w-7xl mx-auto px-4 md:px-8 space-y-8">
                
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="font-display text-3xl font-extrabold text-ink tracking-tight">
                    {lang === 'bn' ? 'মেডিসেবা বিডি কেন ব্যবহার করবেন?' : 'Why Choose MediSheba BD?'}
                  </h2>
                  <p className="text-ink-secondary text-[14px]">
                    {lang === 'bn' ? 'রোগী ও স্বজনদের সুবিধার্থে সবকিছু রাখা হয়েছে অতি সহজ ও পরিচ্ছন্ন' : 'Simple, transparent healthcare tailored for patients and families'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Card 1 */}
                  <div className="bg-panel border border-rule rounded-panel p-6 shadow-sm hover:border-accent transition duration-interaction space-y-3">
                    <div className="w-11 h-11 rounded-panel bg-blue-50 text-accent flex items-center justify-center font-bold">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-ink">
                      {lang === 'bn' ? 'চেম্বারের লাইভ সিরিয়াল ট্র্যাকিং' : 'Live Chamber Tracking'}
                    </h3>
                    <p className="text-ink-secondary text-[14px] leading-relaxed">
                      {lang === 'bn'
                        ? 'চেম্বারে ঘণ্টার পর ঘণ্টা বসে থাকার দরকার নেই। মোবাইলেই দেখা যায় এখন কত নম্বর রোগী দেখা হচ্ছে। আপনার সিরিয়ালের পূর্বে চেম্বারে গেলেই চলবে।'
                        : 'Track patient numbers in real time. Avoid crowded waiting rooms and reach the doctor chamber right when your serial is due.'}
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-panel border border-rule rounded-panel p-6 shadow-sm hover:border-accent transition duration-interaction space-y-3">
                    <div className="w-11 h-11 rounded-panel bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-ink">
                      {lang === 'bn' ? 'বিএমডিসি যাচাইকৃত চিকিৎসক' : 'BMDC Verified Specialists'}
                    </h3>
                    <p className="text-ink-secondary text-[14px] leading-relaxed">
                      {lang === 'bn'
                        ? 'আমাদের তালিকায় থাকা প্রতিজন চিকিৎসকের বিএমডিসি রেজিস্ট্রেশন নম্বর, ডিগ্রি ও হাসপাতাল পরিচয় কঠোরভাবে যাচাই করা।'
                        : 'Every physician is verified against the official national medical registry. Zero risk of unqualified practitioners.'}
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-panel border border-rule rounded-panel p-6 shadow-sm hover:border-accent transition duration-interaction space-y-3">
                    <div className="w-11 h-11 rounded-panel bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-ink">
                      {lang === 'bn' ? '২৪/৭ এআই স্বাস্থ্য সহকারী' : '24/7 AI Health Guide'}
                    </h3>
                    <p className="text-ink-secondary text-[14px] leading-relaxed">
                      {lang === 'bn'
                        ? 'কোন ডাক্তার দেখানো দরকার বুঝতে পারছেন না? আপনার শারীরিক সমস্যা বাংলায় লিখুন। এআই সহকারী আপনাকে সঠিক বিশেষজ্ঞ বেছে দিতে সাহায্য করবে।'
                        : 'Unsure which doctor specialty you need? Describe your symptoms in plain Bengali or English for immediate triage.'}
                    </p>
                  </div>

                </div>

              </section>

              {/* 4. 4 Easy Steps */}
              <section className="bg-field text-on-field py-14">
                <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
                  
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <h2 className="font-display text-3xl font-extrabold text-on-field tracking-tight">
                      {lang === 'bn' ? 'সহজ ৪টি ধাপে সিরিয়াল বুক করুন' : 'Easy 4-Step Process'}
                    </h2>
                    <p className="text-on-field-secondary text-[14px]">
                      {lang === 'bn' ? 'কোনো জটিলতা ছাড়াই মাত্র ২ মিনিটে সিরিয়াল নিশ্চিত করুন' : 'Book a verified doctor consultation in under 2 minutes'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="border border-rule/20 rounded-panel p-5 bg-field/60 space-y-2">
                      <span className="font-display text-3xl font-black text-accent block">০১</span>
                      <h4 className="font-display font-bold text-lg text-on-field">
                        {lang === 'bn' ? 'ডাক্তার খুঁজুন' : '1. Choose Doctor'}
                      </h4>
                      <p className="text-[13px] text-on-field-secondary">
                        {lang === 'bn' ? 'হাসপাতাল বা স্পেশালিটি অনুযায়ী আপনার পছন্দের ডাক্তার বেছে নিন।' : 'Search by specialty, hospital, or visiting fee.'}
                      </p>
                    </div>

                    <div className="border border-rule/20 rounded-panel p-5 bg-field/60 space-y-2">
                      <span className="font-display text-3xl font-black text-accent block">০২</span>
                      <h4 className="font-display font-bold text-lg text-on-field">
                        {lang === 'bn' ? 'পেমেন্ট করুন' : '2. Demo Payment'}
                      </h4>
                      <p className="text-[13px] text-on-field-secondary">
                        {lang === 'bn' ? 'বিকাশ বা নগদে ফি পরিশোধ করে তাৎক্ষণিক ডিজিটাল সিরিয়াল টোকেন নিন।' : 'Pay via bKash/Nagad mock checkout instantly.'}
                      </p>
                    </div>

                    <div className="border border-rule/20 rounded-panel p-5 bg-field/60 space-y-2">
                      <span className="font-display text-3xl font-black text-accent block">০৩</span>
                      <h4 className="font-display font-bold text-lg text-on-field">
                        {lang === 'bn' ? 'লাইভ সিরিয়াল দেখুন' : '3. Track Live'}
                      </h4>
                      <p className="text-[13px] text-on-field-secondary">
                        {lang === 'bn' ? 'মোবাইলে দেখুন কত নম্বর চলছে। আপনার সিরিয়ালের পূর্বে চেম্বারে যান।' : 'Watch real-time token movements from home.'}
                      </p>
                    </div>

                    <div className="border border-rule/20 rounded-panel p-5 bg-field/60 space-y-2">
                      <span className="font-display text-3xl font-black text-accent block">০৪</span>
                      <h4 className="font-display font-bold text-lg text-on-field">
                        {lang === 'bn' ? 'ডাক্তার দেখান' : '4. Consultation'}
                      </h4>
                      <p className="text-[13px] text-on-field-secondary">
                        {lang === 'bn' ? 'চেম্বারে ডাক পড়ার সাথে সাথে নিরাপদে ডাক্তার দেখিয়ে প্রেসক্রিপশন নিন।' : 'Get medical consultation with zero waiting hassle.'}
                      </p>
                    </div>
                  </div>

                </div>
              </section>

              {/* 5. FAQs */}
              <section className="py-14 max-w-4xl mx-auto px-4 md:px-8 space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="font-display text-3xl font-extrabold text-ink tracking-tight">
                    {lang === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ' : 'Frequently Asked Questions'}
                  </h2>
                </div>

                <div className="divide-y divide-rule border-y border-rule">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="py-4">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between text-left group cursor-pointer"
                      >
                        <span className="font-display font-bold text-base text-ink group-hover:text-accent transition-colors">
                          {faq.q}
                        </span>
                        <div className={`w-6 h-6 rounded-full border border-rule flex items-center justify-center text-ink-secondary transition-transform duration-interaction ${openFaq === idx ? 'rotate-45 text-accent border-accent' : ''}`}>
                          <Plus className="w-4 h-4" />
                        </div>
                      </button>
                      {openFaq === idx && (
                        <p className="mt-3 text-[14px] text-ink-secondary leading-relaxed pr-6">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

            </div>
          )}

          {/* TAB: DOCTORS DIRECTORY */}
          {activeTab === 'doctors' && (
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
              
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rule pb-4">
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      {lang === 'bn' ? 'বিশেষজ্ঞ চিকিৎসক তালিকা' : 'Registered Doctor Directory'}
                    </h2>
                    <p className="text-ink-secondary text-[14px]">
                      {lang === 'bn' ? 'আপনার প্রয়োজনীয় স্পেশালিটি নির্বাচন করুন অথবা সরাসরি সার্চ করুন' : 'Search verified physicians by specialty or hospital'}
                    </p>
                  </div>

                  {/* Search box */}
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-ink-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      value={doctorSearch}
                      onChange={(e) => setDoctorSearch(e.target.value)}
                      placeholder={lang === 'bn' ? 'ডাক্তার বা হাসপাতালের নাম লিখুন...' : 'Search doctor or hospital...'} 
                      className="w-full pl-9 pr-4 py-2.5 border border-rule rounded-panel text-[14px] bg-panel focus:outline-none focus:border-accent text-ink placeholder:text-ink-secondary/60 shadow-xs"
                    />
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <button 
                    onClick={() => setSelectedSpecialty('all')}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition duration-interaction ${
                      selectedSpecialty === 'all' 
                        ? 'bg-accent text-on-accent shadow-sm' 
                        : 'bg-panel border border-rule text-ink hover:border-ink/30'
                    }`}
                  >
                    {lang === 'bn' ? 'সব ডাক্তার' : 'All Specialists'}
                  </button>

                  <button 
                    onClick={() => setSelectedSpecialty('medicine')}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition duration-interaction ${
                      selectedSpecialty === 'medicine' 
                        ? 'bg-accent text-on-accent shadow-sm' 
                        : 'bg-panel border border-rule text-ink hover:border-ink/30'
                    }`}
                  >
                    {lang === 'bn' ? 'মেডিসিন' : 'Medicine'}
                  </button>

                  <button 
                    onClick={() => setSelectedSpecialty('cardiology')}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition duration-interaction ${
                      selectedSpecialty === 'cardiology' 
                        ? 'bg-accent text-on-accent shadow-sm' 
                        : 'bg-panel border border-rule text-ink hover:border-ink/30'
                    }`}
                  >
                    {lang === 'bn' ? 'হৃদরোগ (কার্ডিওলজি)' : 'Cardiology'}
                  </button>

                  <button 
                    onClick={() => setSelectedSpecialty('orthopedic')}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition duration-interaction ${
                      selectedSpecialty === 'orthopedic' 
                        ? 'bg-accent text-on-accent shadow-sm' 
                        : 'bg-panel border border-rule text-ink hover:border-ink/30'
                    }`}
                  >
                    {lang === 'bn' ? 'অর্থোপেডিক (হাড় ও জোড়া)' : 'Orthopedics'}
                  </button>
                </div>
              </div>

              {/* Doctor Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredDoctors.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="bg-panel border border-rule rounded-panel p-6 shadow-sm hover:border-accent transition duration-interaction flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-4">
                      
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold text-accent uppercase tracking-wider block mb-1">
                            {doc.experience}
                          </span>
                          <h3 className="font-display font-bold text-lg text-ink leading-snug">
                            {doc.name}
                          </h3>
                          <p className="text-[13px] font-medium text-ink-secondary mt-0.5">{doc.degrees}</p>
                        </div>
                        <span className="bg-ground-muted border border-rule px-2 py-0.5 rounded text-[11px] font-bold text-ink shrink-0">
                          BMDC {doc.bmdc}
                        </span>
                      </div>

                      <div className="space-y-2 border-t border-rule/60 pt-3 text-[13px]">
                        <p className="text-ink font-semibold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-accent" />
                          {doc.spec}
                        </p>
                        <p className="text-ink-secondary flex items-start gap-1.5 leading-snug">
                          <Hospital className="w-4 h-4 text-ink-secondary shrink-0 mt-0.5" />
                          <span>{doc.hospital} ({doc.chamber})</span>
                        </p>
                        <p className="text-ink-secondary flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-medium text-emerald-700">{doc.nextSlot}</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-rule flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-ink-secondary block uppercase tracking-wider">
                          {lang === 'bn' ? 'পরামর্শ ফি' : 'Fee'}
                        </span>
                        <span className="font-display font-extrabold text-2xl text-ink">৳ {doc.fee}</span>
                      </div>
                      <button 
                        onClick={() => setActiveTab('payment')}
                        className="bg-accent hover:bg-accent/90 text-on-accent text-[13px] font-bold px-4 py-2.5 rounded-panel transition duration-interaction shadow-sm hover:-translate-y-0.5"
                      >
                        {lang === 'bn' ? 'সিরিয়াল নিন' : 'Book Serial'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB: LIVE QUEUE STATUS */}
          {activeTab === 'queue' && (
            <div className="max-w-2xl mx-auto px-4 md:px-8 py-10 space-y-6">
              
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-emerald-50 text-[13px] font-bold text-emerald-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  {lang === 'bn' ? 'চেম্বারের লাইভ ডিসপ্লে' : 'Live Chamber Monitor'}
                </div>
                <h2 className="font-display text-3xl font-extrabold text-ink tracking-tight">
                  {lang === 'bn' ? 'ডাক্তারের চেম্বার সিরিয়াল বোর্ড' : 'Live Chamber Queue Board'}
                </h2>
                <p className="text-ink-secondary text-[14px]">
                  {lang === 'bn' ? 'অধ্যাপক ডা. মোঃ রফিকুল ইসলাম — ঢাকা মেডিকেল কলেজ হাসপাতাল (রুম ৪০২)' : 'Prof. Dr. Md. Rafiqul Islam — Room 402, DMCH'}
                </p>
              </div>

              {/* Main Digital Token Display Card */}
              <div className="bg-panel border-2 border-accent rounded-panel p-6 shadow-md space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Current In Chamber */}
                  <div className="p-6 rounded-panel bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <span className="text-[12px] font-bold text-emerald-800 uppercase tracking-wider block">
                      {lang === 'bn' ? 'বর্তমানে ভেতরে আছেন' : 'In Doctor Room'}
                    </span>
                    <div className="font-display text-6xl font-black text-emerald-700 py-1">
                      14
                    </div>
                    <span className="inline-block bg-emerald-600 text-white text-[12px] font-semibold px-3 py-1 rounded-full">
                      {lang === 'bn' ? 'পরামর্শ চলছে' : 'In Consultation'}
                    </span>
                  </div>

                  {/* Your Serial */}
                  <div className="p-6 rounded-panel bg-blue-50 border border-blue-200 text-center space-y-2">
                    <span className="text-[12px] font-bold text-blue-800 uppercase tracking-wider block">
                      {lang === 'bn' ? 'আপনার সিরিয়াল টোকেন' : 'Your Serial Token'}
                    </span>
                    <div className="font-display text-6xl font-black text-blue-700 py-1">
                      18
                    </div>
                    <span className="inline-block bg-blue-600 text-white text-[12px] font-semibold px-3 py-1 rounded-full">
                      {lang === 'bn' ? 'সামনে ৪ জন রোগী' : '4 Patients Ahead'}
                    </span>
                  </div>

                </div>

                {/* Estimate */}
                <div className="bg-ground-muted border border-rule rounded-panel p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-[14px] font-semibold">
                      {lang === 'bn' ? 'আনুমানিক অপেক্ষার সময়:' : 'Estimated Wait Time:'}
                    </span>
                  </div>
                  <span className="font-display font-extrabold text-xl text-accent">
                    {lang === 'bn' ? '২০ - ২৫ মিনিট' : '20 - 25 Mins'}
                  </span>
                </div>

                {/* Friendly Advice for Patient */}
                <div className="space-y-2 text-[13px] text-ink-secondary bg-ground border border-rule rounded-panel p-4">
                  <p className="font-bold text-ink">
                    📌 {lang === 'bn' ? 'রোগী ও স্বজনদের জন্য জরুরি নির্দেশনা:' : 'Important Instructions:'}
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{lang === 'bn' ? 'আপনার সিরিয়াল ১৭ নম্বর থাকা অবস্থায় ৪০২ নম্বর রুমের সামনে উপস্থিত থাকুন।' : 'Be present outside Room 402 when Serial #17 is in room.'}</li>
                    <li>{lang === 'bn' ? 'পূর্বের প্রেসক্রিপশন ও সব টেস্টের রিপোর্ট সাথে রাখুন।' : 'Keep previous prescriptions and test reports ready.'}</li>
                  </ul>
                </div>

                <div className="text-center pt-2">
                  <button 
                    onClick={() => setActiveTab('doctors')}
                    className="text-accent hover:underline text-[14px] font-semibold"
                  >
                    ← {lang === 'bn' ? 'অন্য চিকিৎসকের সিরিয়াল দেখুন' : 'Check another doctor chamber'}
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB: LLAMA / QWEN AI HEALTH ASSISTANT */}
          {activeTab === 'ai' && (
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-5">
              
              <div className="flex items-center justify-between border-b border-rule pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-panel bg-accent text-on-accent flex items-center justify-center font-bold shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-ink tracking-tight">
                      {lang === 'bn' ? 'মেডিসেবা এআই স্বাস্থ্য সহকারী' : 'MediSheba AI Health Assistant'}
                    </h2>
                    <p className="text-[13px] text-ink-secondary">
                      {lang === 'bn' ? 'উপসর্গের ভিত্তিতে সঠিক ডাক্তার ও প্রাথমিক চিকিৎসা পরামর্শ (বাংলায়)' : 'Preliminary medical triage & specialist recommendations'}
                    </p>
                  </div>
                </div>

                <span className="border border-emerald-300 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-[12px] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {lang === 'bn' ? 'সরাসরি যুক্ত' : 'AI Online'}
                </span>
              </div>

              {/* Quick Tap Suggested Questions for Non-Technical Users */}
              <div className="space-y-1.5">
                <span className="text-[12px] text-ink-secondary font-semibold">
                  {lang === 'bn' ? '💡 সরাসরি এক ক্লিকে প্রশ্ন করুন:' : '💡 Quick tap symptom questions:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleAiSend(q)}
                      disabled={aiChatMutation.isLoading}
                      className="px-3 py-1.5 rounded-full border border-rule bg-panel hover:border-accent text-ink text-[12px] font-medium transition duration-interaction hover:bg-accent/5 disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversation Box */}
              <div className="bg-panel border border-rule rounded-panel flex flex-col h-[460px] shadow-sm overflow-hidden">
                
                <div className="flex-1 p-5 overflow-y-auto space-y-3">
                  {chatLog.map((chat, idx) => (
                    <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-panel p-4 text-[14px] leading-relaxed shadow-xs ${
                        chat.role === 'user'
                          ? 'bg-accent text-on-accent'
                          : 'bg-ground-muted border border-rule text-ink whitespace-pre-wrap'
                      }`}>
                        {chat.text}
                      </div>
                    </div>
                  ))}

                  {aiChatMutation.isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-ground-muted border border-rule text-ink rounded-panel p-3.5 text-[13px] flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                        <span>{lang === 'bn' ? 'এআই পরামর্শ প্রস্তুত হচ্ছে...' : 'AI is thinking...'}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input form */}
                <div className="p-4 border-t border-rule bg-ground">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                      placeholder={lang === 'bn' ? 'আপনার শারীরিক সমস্যা বা লক্ষণ এখানে লিখুন...' : 'Type your symptoms or questions here...'}
                      className="flex-1 bg-panel border border-rule rounded-panel px-4 py-2.5 text-[14px] text-ink focus:outline-none focus:border-accent shadow-xs"
                    />
                    <button 
                      onClick={() => handleAiSend()}
                      disabled={aiChatMutation.isLoading || !aiMessage.trim()}
                      className="bg-accent hover:bg-accent/90 text-on-accent px-5 py-2.5 rounded-panel text-[14px] font-bold transition duration-interaction disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                    >
                      {aiChatMutation.isLoading ? (
                        <span className="w-4 h-4 border-2 border-on-accent border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>{lang === 'bn' ? 'পাঠান' : 'Send'}</span>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-ink-secondary mt-2 text-center">
                    {lang === 'bn' 
                      ? '⚠️ এটি প্রাথমিক স্বাস্থ্য পরামর্শের জন্য। কোনো জরুরি বা তীব্র অবস্থায় অবিলম্বে নিকটস্থ হাসপাতালে যোগাযোগ করুন।'
                      : '⚠️ Preliminary advice only. Seek immediate emergency care for acute symptoms.'}
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* TAB: DEMO PAYMENT CHECKOUT */}
          {activeTab === 'payment' && (
            <div className="max-w-lg mx-auto px-4 md:px-8 py-10">
              <div className="bg-panel border border-rule rounded-panel p-6 md:p-8 shadow-md space-y-6">
                
                <div className="space-y-1 border-b border-rule pb-4 text-center">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                    {lang === 'bn' ? 'সহজ পেমেন্ট' : 'Instant Checkout'}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-ink tracking-tight pt-1">
                    {lang === 'bn' ? 'সিরিয়াল ফি পরিশোধ' : 'Appointment Payment'}
                  </h3>
                  <p className="text-ink-secondary text-[13px]">
                    {lang === 'bn' ? 'অধ্যাপক ডা. মোঃ রফিকুল ইসলাম — পরামর্শ ফি: ৮০০ টাকা' : 'Prof. Dr. Md. Rafiqul Islam — Fee: 800 BDT'}
                  </p>
                </div>

                {/* Channel Selection */}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-ink block">
                    {lang === 'bn' ? 'পেমেন্ট মাধ্যম বেছে নিন:' : 'Select Payment Method:'}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPayment('bkash')}
                      className={`py-3 px-2 rounded-panel border text-center transition duration-interaction font-bold text-[13px] ${
                        selectedPayment === 'bkash' 
                          ? 'border-[#D12053] bg-[#D12053]/10 text-[#D12053] shadow-xs' 
                          : 'border-rule text-ink bg-panel hover:border-ink/30'
                      }`}
                    >
                      বিকাশ (bKash)
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment('nagad')}
                      className={`py-3 px-2 rounded-panel border text-center transition duration-interaction font-bold text-[13px] ${
                        selectedPayment === 'nagad' 
                          ? 'border-[#F7941D] bg-[#F7941D]/10 text-[#F7941D] shadow-xs' 
                          : 'border-rule text-ink bg-panel hover:border-ink/30'
                      }`}
                    >
                      নগদ (Nagad)
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment('rocket')}
                      className={`py-3 px-2 rounded-panel border text-center transition duration-interaction font-bold text-[13px] ${
                        selectedPayment === 'rocket' 
                          ? 'border-[#8C3494] bg-[#8C3494]/10 text-[#8C3494] shadow-xs' 
                          : 'border-rule text-ink bg-panel hover:border-ink/30'
                      }`}
                    >
                      রকেট (Rocket)
                    </button>
                  </div>
                </div>

                {/* Inputs with friendly prefill */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[13px] font-semibold text-ink-secondary block mb-1">
                      {lang === 'bn' ? 'আপনার মোবাইল নম্বর (১১ সংখ্যা)' : 'Mobile Account Number'}
                    </label>
                    <input 
                      type="text" 
                      defaultValue="01712345678"
                      className="w-full bg-panel border border-rule rounded-panel px-3.5 py-2.5 text-[14px] text-ink focus:outline-none focus:border-accent font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[13px] font-semibold text-ink-secondary block mb-1">
                      {lang === 'bn' ? 'ডেমো ট্রানজেকশন কোড' : 'Transaction Identifier (TrxID)'}
                    </label>
                    <input 
                      type="text" 
                      defaultValue="9J7K2X44M"
                      className="w-full bg-panel border border-rule rounded-panel px-3.5 py-2.5 text-[14px] text-ink focus:outline-none focus:border-accent font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button 
                    onClick={() => {
                      alert(lang === 'bn' ? 'অভিনন্দন! আপনার সিরিয়াল নিশ্চিত হয়েছে। টোকেন নম্বর: ১৮' : 'Success! Your appointment is confirmed. Token #18');
                      setActiveTab('queue');
                    }}
                    className="w-full bg-accent hover:bg-accent/90 text-on-accent font-bold py-3.5 rounded-panel text-[15px] transition duration-interaction shadow-md"
                  >
                    {lang === 'bn' ? '৮০০ টাকা পরিশোধ নিশ্চিত করুন' : 'Confirm 800 BDT Payment'}
                  </button>
                  <p className="text-[11px] text-ink-secondary text-center">
                    {lang === 'bn' ? 'ডেমো মোড: কোনো আসল টাকা চার্জ হবে না' : 'Demo sandbox: No real funds are debited'}
                  </p>
                </div>

              </div>
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className="bg-field text-on-field border-t border-rule/20 mt-16 pt-12 pb-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-panel bg-accent text-on-accent flex items-center justify-center font-bold">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <span className="font-display font-bold text-lg text-on-field">
                    {t('app_name')}
                  </span>
                </div>
                <p className="text-[13px] text-on-field-secondary leading-relaxed">
                  {lang === 'bn' 
                    ? 'বাংলাদেশের রোগীদের জন্য সহজ ও নিরাপদ চেম্বার সিরিয়াল এবং ডিজিটাল স্বাস্থ্য সেবা।'
                    : 'Modern verified physician scheduling and real-time chamber queue monitoring for Bangladesh.'}
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-display font-bold text-[14px] text-on-field">
                  {lang === 'bn' ? 'জরুরি সেবা' : 'Services'}
                </h5>
                <ul className="space-y-1.5 text-[13px] text-on-field-secondary">
                  <li className="hover:text-on-field cursor-pointer" onClick={() => setActiveTab('doctors')}>{lang === 'bn' ? 'ডাক্তার খুঁজুন' : 'Find Doctors'}</li>
                  <li className="hover:text-on-field cursor-pointer" onClick={() => setActiveTab('queue')}>{lang === 'bn' ? 'লাইভ চেম্বার সিরিয়াল' : 'Live Chamber Queue'}</li>
                  <li className="hover:text-on-field cursor-pointer" onClick={() => setActiveTab('ai')}>{lang === 'bn' ? 'এআই স্বাস্থ্য সহকারী' : 'AI Health Helper'}</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="font-display font-bold text-[14px] text-on-field">
                  {lang === 'bn' ? 'চেম্বার ও চিকিৎসক' : 'Physicians'}
                </h5>
                <ul className="space-y-1.5 text-[13px] text-on-field-secondary">
                  <li>{lang === 'bn' ? 'বিএমডিসি ভেরিফিকেশন' : 'BMDC Verified'}</li>
                  <li>{lang === 'bn' ? 'ঢাকা মেডিকেল কলেজ' : 'DMCH'}</li>
                  <li>{lang === 'bn' ? 'বিএসএমএমইউ (পিজি)' : 'BSMMU'}</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="font-display font-bold text-[14px] text-on-field">
                  {lang === 'bn' ? 'যোগাযোগ ও সহায়তা' : 'Support'}
                </h5>
                <p className="text-[13px] text-on-field-secondary">
                  {lang === 'bn' ? '২৪ ঘণ্টা হেল্পলাইন: ০৯৬১২৩৪৫৬৭৮' : '24/7 Helpline: 09612345678'}
                </p>
                <p className="text-[12px] text-on-field-secondary">
                  {lang === 'bn' ? 'ইমেইল: support@medisheba.com.bd' : 'Email: support@medisheba.com.bd'}
                </p>
              </div>

            </div>

            <div className="pt-6 border-t border-rule/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-on-field-secondary">
              <p>© 2026 MediSheba BD (মেডিসেবা বিডি). Web platform only.</p>
              <div className="flex items-center gap-1.5 text-on-field">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                BMDC Verified Healthcare Network
              </div>
            </div>

          </div>
        </footer>

      </div>
    </>
  );
}

export default App;
