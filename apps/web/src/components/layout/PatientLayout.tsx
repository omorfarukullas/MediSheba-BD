import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  HeartPulse,
  LayoutDashboard,
  Stethoscope,
  Clock,
  FolderLock,
  Video,
  Activity,
  Hospital,
  AlertCircle,
  Globe,
  LogOut,
  Menu,
  X,
  PhoneCall,
  User,
  ChevronRight
} from 'lucide-react';

export function PatientLayout() {
  const { lang, toggleLanguage } = useLanguageStore();
  const { user, profile, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      to: '/patient/dashboard',
      label: lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      to: '/patient/doctors',
      label: lang === 'bn' ? 'ডাক্তার খুঁজুন' : 'Find Doctors',
      icon: Stethoscope,
    },
    {
      to: '/patient/appointments',
      label: lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট ও লাইভ কিউ' : 'Appointments & Queue',
      icon: Clock,
    },
    {
      to: '/patient/documents',
      label: lang === 'bn' ? 'প্রেসক্রিপশন ভল্ট' : 'Medical Records',
      icon: FolderLock,
    },
    {
      to: '/patient/telemedicine',
      label: lang === 'bn' ? 'টেলিমেডিসিন' : 'Telemedicine',
      icon: Video,
    },
    {
      to: '/patient/vitals',
      label: lang === 'bn' ? 'স্বাস্থ্য ভাইটালস' : 'Health Vitals',
      icon: Activity,
    },
    {
      to: '/patient/resources',
      label: lang === 'bn' ? 'বেড ও টেস্ট ফি' : 'Beds & Test Prices',
      icon: Hospital,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-ground text-ink flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-panel border-b border-rule sticky top-0 z-30 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg text-ink-secondary hover:text-ink hover:bg-ground-muted transition"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-panel bg-accent text-on-accent flex items-center justify-center font-bold shadow-sm">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-base text-ink tracking-tight block leading-none">
                MediSheba BD
              </span>
              <span className="text-[11px] text-accent font-semibold tracking-tight">
                {lang === 'bn' ? 'রোগী পোর্টাল' : 'Patient Portal'}
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link to="/emergency">
            <Button
              variant="danger"
              size="sm"
              leftIcon={<AlertCircle className="w-4 h-4 animate-pulse" />}
            >
              <span className="hidden sm:inline">
                {lang === 'bn' ? 'জরুরি ৯৯৯' : 'Emergency 999'}
              </span>
              <span className="sm:hidden">999</span>
            </Button>
          </Link>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-panel border border-rule hover:border-accent text-[13px] font-semibold text-ink bg-panel transition"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-rule">
            <Avatar
              name={profile?.fullName || user?.displayName || 'Patient'}
              src={profile?.avatarUrl || user?.photoURL}
              size="sm"
              status="online"
            />
            <div className="hidden lg:block text-left text-[13px] leading-tight max-w-[120px] truncate">
              <div className="font-bold text-ink truncate">
                {profile?.fullName || user?.displayName || 'Patient'}
              </div>
              <div className="text-[11px] text-ink-secondary">Verified Patient</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar (hidden on mobile, fixed 250px on md+) */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-rule bg-panel/70 p-4 space-y-6">
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-secondary">
              Navigation
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-panel text-[14px] font-semibold transition duration-interaction ${
                      isActive
                        ? 'bg-accent text-on-accent shadow-xs'
                        : 'text-ink-secondary hover:text-ink hover:bg-ground-muted'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto pt-4 border-t border-rule space-y-3">
            <div className="p-3 rounded-panel bg-ground-muted/70 text-[12px] space-y-1.5">
              <div className="flex items-center justify-between text-ink font-semibold">
                <span>Direct Hotline</span>
                <PhoneCall className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="text-ink-secondary text-[11px]">
                24/7 Medical Emergency Response
              </div>
              <div className="font-display font-bold text-accent text-[13px]">
                999 / +880 9612 000 999
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              leftIcon={<LogOut className="w-4 h-4 text-red-500" />}
              onClick={handleLogout}
            >
              {lang === 'bn' ? 'লগআউট' : 'Sign Out'}
            </Button>
          </div>
        </aside>

        {/* Mobile Slide-out Drawer Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-field/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 bg-panel border-r border-rule p-5 flex flex-col space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-rule">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-panel bg-accent text-on-accent flex items-center justify-center font-bold">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-base text-ink">
                    MediSheba BD
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-ink-secondary hover:text-ink hover:bg-ground-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-panel bg-ground-muted">
                <Avatar
                  name={profile?.fullName || user?.displayName || 'Patient'}
                  src={profile?.avatarUrl || user?.photoURL}
                  size="md"
                />
                <div className="leading-tight overflow-hidden">
                  <div className="font-bold text-ink truncate text-[14px]">
                    {profile?.fullName || user?.displayName || 'Patient'}
                  </div>
                  <div className="text-[12px] text-accent font-medium">Patient Account</div>
                </div>
              </div>

              <nav className="space-y-1 flex-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.to;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-panel text-[14px] font-semibold transition ${
                        isActive
                          ? 'bg-accent text-on-accent'
                          : 'text-ink-secondary hover:text-ink hover:bg-ground-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                leftIcon={<LogOut className="w-4 h-4 text-red-500" />}
                onClick={handleLogout}
              >
                {lang === 'bn' ? 'লগআউট' : 'Sign Out'}
              </Button>
            </div>
          </div>
        )}

        {/* Main Routed Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Fixed at bottom on phones, hidden on md+) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-panel border-t border-rule z-40 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <NavLink
          to="/patient/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold transition ${
              isActive ? 'text-accent' : 'text-ink-secondary hover:text-ink'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>{lang === 'bn' ? 'হোম' : 'Home'}</span>
        </NavLink>

        <NavLink
          to="/patient/doctors"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold transition ${
              isActive ? 'text-accent' : 'text-ink-secondary hover:text-ink'
            }`
          }
        >
          <Stethoscope className="w-5 h-5" />
          <span>{lang === 'bn' ? 'ডাক্তার' : 'Doctors'}</span>
        </NavLink>

        <NavLink
          to="/patient/appointments"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold transition ${
              isActive ? 'text-accent' : 'text-ink-secondary hover:text-ink'
            }`
          }
        >
          <Clock className="w-5 h-5" />
          <span>{lang === 'bn' ? 'সিরিয়াল' : 'Queue'}</span>
        </NavLink>

        <NavLink
          to="/patient/documents"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold transition ${
              isActive ? 'text-accent' : 'text-ink-secondary hover:text-ink'
            }`
          }
        >
          <FolderLock className="w-5 h-5" />
          <span>{lang === 'bn' ? 'রেকর্ডস' : 'Vault'}</span>
        </NavLink>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold text-ink-secondary hover:text-ink transition"
        >
          <Menu className="w-5 h-5" />
          <span>{lang === 'bn' ? 'মেনু' : 'More'}</span>
        </button>
      </nav>

      {/* Floating Emergency Action Button (Always available on screen) */}
      <Link
        to="/emergency"
        className="fixed bottom-20 md:bottom-8 right-5 z-40 bg-red-600 hover:bg-red-700 text-white rounded-full p-3.5 shadow-xl transition-all duration-interaction hover:scale-105 active:scale-95 flex items-center justify-center group"
        title="Immediate Emergency Ambulance (No Login)"
      >
        <AlertCircle className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap text-[13px] font-bold pl-0 group-hover:pl-2">
          Emergency 999
        </span>
      </Link>
    </div>
  );
}
