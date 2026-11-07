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
  ChevronDown,
  PhoneCall,
  CalendarPlus
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
      label: lang === 'bn' ? 'ড্যাশবোর্ড' : 'Overview',
      icon: LayoutDashboard,
    },
    {
      to: '/patient/doctors',
      label: lang === 'bn' ? 'ডাক্তার খুঁজুন' : 'Find Specialists',
      icon: Stethoscope,
      badge: { text: 'New', variant: 'orange' as const },
    },
    {
      to: '/patient/appointments',
      label: lang === 'bn' ? 'সিরিয়াল ও লাইভ কিউ' : 'Chamber Live Queue',
      icon: Clock,
      badge: { text: 'Live', variant: 'indigo' as const },
    },
    {
      to: '/patient/documents',
      label: lang === 'bn' ? 'প্রেসক্রিপশন ভল্ট' : 'Medical Records',
      icon: FolderLock,
    },
    {
      to: '/patient/telemedicine',
      label: lang === 'bn' ? 'টেলিমেডিসিন ভিডিও' : 'Telemedicine Room',
      icon: Video,
    },
    {
      to: '/patient/vitals',
      label: lang === 'bn' ? 'স্বাস্থ্য ভাইটালস' : 'Health Vitals Log',
      icon: Activity,
    },
    {
      to: '/patient/resources',
      label: lang === 'bn' ? 'বেড ও টেস্ট ফি' : 'Hospital Resources',
      icon: Hospital,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#ffffff] font-sans text-[#000000]">
      {/* ─── NavSidebar (Warm Diner Counter: #f1f0ec with hairline border, zero shadow) ─── */}
      <aside className="hidden md:flex w-[260px] shrink-0 bg-[#f1f0ec] border-r border-[#e5e7eb] p-4 flex-col justify-between select-none">
        <div className="space-y-4">
          {/* Brand & Location / Workspace Pill Selector */}
          <Link
            to="/"
            className="w-full flex items-center justify-between bg-[#ffffff] border border-[#e5e7eb] rounded-[12px] p-2.5 text-left transition-colors hover:border-[#4570ff]/40"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#193f78] text-white flex items-center justify-center font-bold text-xs shrink-0">
                <HeartPulse className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[14px] font-medium leading-tight text-[#000000] truncate">
                  MediSheba BD
                </div>
                <div className="text-[11px] text-[#6e6d6c] truncate">
                  Patient Health Network
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-[#6e6d6c] shrink-0" />
          </Link>

          {/* Primary Sidebar Quick-Action Button */}
          <Link to="/patient/doctors" className="block">
            <button className="w-full bg-[#4570ff] hover:bg-[#345ee6] text-white font-medium text-[14px] py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer">
              <CalendarPlus className="w-4 h-4" />
              <span>{lang === 'bn' ? '+ নতুন সিরিয়াল বুক' : '+ Book Serial'}</span>
            </button>
          </Link>

          {/* Navigation Section Group */}
          <div>
            <div className="px-3 pt-2 pb-1.5 text-[11px] font-bold uppercase tracking-[0.025em] text-[#6e6d6c]">
              {lang === 'bn' ? 'রোগী সেবা ও পোর্টাল' : 'Patient Navigation'}
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-[12px] text-[14px] transition-colors duration-150 ${
                      isActive
                        ? 'bg-[#4570ff] text-white font-medium'
                        : 'text-[#555555] hover:bg-[#ffffff] hover:text-[#000000] hover:font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badge.variant === 'orange'
                            ? 'bg-[#ff6808] text-white'
                            : 'bg-[#d6e0ff] text-[#000000]'
                        }`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Sidebar Zone */}
        <div className="space-y-3 pt-4">
          {/* Dark Contrast Promo / Emergency Callout Box */}
          <div className="bg-[#000000] text-white rounded-[16px] p-4 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#c6ff94] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#c6ff94] animate-ping" />
              Emergency 999 Hotline
            </div>
            <div className="text-[16px] font-medium leading-tight">
              Instant Ambulance
            </div>
            <p className="text-[12px] text-[#d1d5db] leading-snug">
              Direct dispatch across all hospital networks in BD.
            </p>
            <Link to="/emergency" className="inline-block pt-1">
              <span className="text-[12px] text-[#c6ff94] hover:underline font-medium">
                Request Now →
              </span>
            </Link>
          </div>

          {/* User Profile Footer */}
          <div className="pt-3 border-t border-[#e5e7eb] flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Avatar
                name={profile?.fullName || user?.displayName || 'Patient'}
                src={profile?.avatarUrl || user?.photoURL}
                size="sm"
              />
              <div className="overflow-hidden leading-tight">
                <div className="text-[14px] font-medium text-[#000000] truncate">
                  {profile?.fullName || user?.displayName || 'Patient User'}
                </div>
                <div className="text-[12px] text-[#6e6d6c] truncate">Verified Patient</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-[#6e6d6c] hover:text-[#000000] hover:bg-[#ffffff] rounded-[8px] transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main Workspace & Top Navigation ─── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#ffffff]">
        {/* Top Header */}
        <header className="h-16 border-b border-[#e5e7eb] px-4 sm:px-8 flex items-center justify-between bg-[#ffffff] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-[12px] text-[#555555] hover:bg-[#f1f0ec] hover:text-[#000000] transition"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold uppercase tracking-[0.025em] text-[#6e6d6c]">
                MediSheba BD
              </span>
              <span className="text-[#e5e7eb]">/</span>
              <span className="text-[14px] font-medium text-[#000000]">
                {lang === 'bn' ? 'রোগী পোর্টাল' : 'Patient Workspace'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/emergency">
              <Button
                variant="orange"
                size="sm"
                leftIcon={<AlertCircle className="w-4 h-4" />}
              >
                <span>{lang === 'bn' ? 'জরুরি ৯৯৯' : 'Emergency 999'}</span>
              </Button>
            </Link>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1f0ec] hover:bg-[#e5e7eb] text-[13px] font-medium text-[#000000] transition"
            >
              <Globe className="w-3.5 h-3.5 text-[#4570ff]" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </header>

        {/* Workspace Content Well (1200px max-width) */}
        <main className="flex-1 p-4 sm:p-8 max-w-[1200px] w-full mx-auto pb-24 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* ─── Mobile Slide-out Drawer Menu ─── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-[#000000]/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-[280px] bg-[#f1f0ec] border-r border-[#e5e7eb] p-4 flex flex-col justify-between z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#e5e7eb]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[8px] bg-[#193f78] text-white flex items-center justify-center font-bold text-xs">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-[15px] text-[#000000]">
                    MediSheba BD
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#6e6d6c] hover:text-[#000000]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-3 text-[11px] font-bold uppercase tracking-[0.025em] text-[#6e6d6c]">
                Menu
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.to;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-[12px] text-[14px] ${
                        isActive
                          ? 'bg-[#4570ff] text-white font-medium'
                          : 'text-[#555555] hover:bg-[#ffffff]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <Button
              variant="bone"
              size="sm"
              fullWidth
              leftIcon={<LogOut className="w-4 h-4" />}
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}

      {/* ─── Mobile Bottom Navigation (Zero Shadow, Clean Hairline) ─── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#ffffff] border-t border-[#e5e7eb] z-40 px-2 py-1.5 flex items-center justify-around">
        <NavLink
          to="/patient/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-3 rounded-[12px] text-[11px] font-medium transition ${
              isActive ? 'text-[#4570ff]' : 'text-[#6e6d6c]'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/patient/doctors"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-3 rounded-[12px] text-[11px] font-medium transition ${
              isActive ? 'text-[#4570ff]' : 'text-[#6e6d6c]'
            }`
          }
        >
          <Stethoscope className="w-5 h-5" />
          <span>Doctors</span>
        </NavLink>

        <NavLink
          to="/patient/appointments"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-3 rounded-[12px] text-[11px] font-medium transition ${
              isActive ? 'text-[#4570ff]' : 'text-[#6e6d6c]'
            }`
          }
        >
          <Clock className="w-5 h-5" />
          <span>Queue</span>
        </NavLink>

        <NavLink
          to="/patient/documents"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-3 rounded-[12px] text-[11px] font-medium transition ${
              isActive ? 'text-[#4570ff]' : 'text-[#6e6d6c]'
            }`
          }
        >
          <FolderLock className="w-5 h-5" />
          <span>Vault</span>
        </NavLink>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-[12px] text-[11px] font-medium text-[#6e6d6c]"
        >
          <Menu className="w-5 h-5" />
          <span>More</span>
        </button>
      </nav>
    </div>
  );
}
