import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { StatusDot } from '../ui/StatusDot';
import {
  HeartPulse,
  LayoutDashboard,
  Users,
  Calendar,
  Clock,
  FileText,
  DollarSign,
  Globe,
  LogOut,
  Menu,
  X,
  Stethoscope,
  ShieldCheck
} from 'lucide-react';

export function DoctorLayout() {
  const { lang, toggleLanguage } = useLanguageStore();
  const { user, profile, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      to: '/doctor/dashboard',
      label: lang === 'bn' ? 'ড্যাশবোর্ড' : 'Overview',
      icon: LayoutDashboard,
    },
    {
      to: '/doctor/queue',
      label: lang === 'bn' ? 'লাইভ চেম্বার সিরিয়াল' : 'Live Chamber Queue',
      icon: Users,
    },
    {
      to: '/doctor/appointments',
      label: lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট তালিকা' : 'Patient List',
      icon: Calendar,
    },
    {
      to: '/doctor/slots',
      label: lang === 'bn' ? 'শিডিউল ও সময়সূচী' : 'Schedule & Visiting Hours',
      icon: Clock,
    },
    {
      to: '/doctor/prescriptions',
      label: lang === 'bn' ? 'প্রেসক্রিপশন ও হিস্ট্রি' : 'Prescriptions & History',
      icon: FileText,
    },
    {
      to: '/doctor/earnings',
      label: lang === 'bn' ? 'কনসালটেশন ও ফি' : 'Earnings & Revenue',
      icon: DollarSign,
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
            <div className="w-9 h-9 rounded-panel bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-base text-ink tracking-tight block leading-none">
                MediSheba BD
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold tracking-tight">
                {lang === 'bn' ? 'চিকিৎসক পোর্টাল' : 'Physician Portal'}
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[12px] font-semibold text-emerald-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>BMDC Certified</span>
          </div>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-panel border border-rule hover:border-accent text-[13px] font-semibold text-ink bg-panel transition"
          >
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-rule">
            <Avatar
              name={profile?.fullName || user?.displayName || 'Doctor'}
              src={profile?.avatarUrl || user?.photoURL}
              size="sm"
              status="online"
            />
            <div className="hidden lg:block text-left text-[13px] leading-tight max-w-[130px] truncate">
              <div className="font-bold text-ink truncate">
                {profile?.fullName || user?.displayName || 'Doctor'}
              </div>
              <div className="text-[11px] text-ink-secondary">Specialist Physician</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-rule bg-panel/70 p-4 space-y-6">
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-secondary">
              Doctor Management
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
                        ? 'bg-emerald-600 text-white shadow-xs'
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

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-field/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 bg-panel border-r border-rule p-5 flex flex-col space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-rule">
                <span className="font-display font-bold text-base text-ink">
                  Doctor Portal Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-ink-secondary hover:text-ink hover:bg-ground-muted"
                >
                  <X className="w-5 h-5" />
                </button>
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
                          ? 'bg-emerald-600 text-white'
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-panel border-t border-rule z-40 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <NavLink
          to="/doctor/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold transition ${
              isActive ? 'text-emerald-600' : 'text-ink-secondary hover:text-ink'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>{lang === 'bn' ? 'ওভারভিউ' : 'Overview'}</span>
        </NavLink>

        <NavLink
          to="/doctor/queue"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold transition ${
              isActive ? 'text-emerald-600' : 'text-ink-secondary hover:text-ink'
            }`
          }
        >
          <Users className="w-5 h-5" />
          <span>{lang === 'bn' ? 'সিরিয়াল' : 'Queue'}</span>
        </NavLink>

        <NavLink
          to="/doctor/appointments"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold transition ${
              isActive ? 'text-emerald-600' : 'text-ink-secondary hover:text-ink'
            }`
          }
        >
          <Calendar className="w-5 h-5" />
          <span>{lang === 'bn' ? 'রোগী' : 'Patients'}</span>
        </NavLink>

        <NavLink
          to="/doctor/slots"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold transition ${
              isActive ? 'text-emerald-600' : 'text-ink-secondary hover:text-ink'
            }`
          }
        >
          <Clock className="w-5 h-5" />
          <span>{lang === 'bn' ? 'শিডিউল' : 'Slots'}</span>
        </NavLink>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold text-ink-secondary hover:text-ink"
        >
          <Menu className="w-5 h-5" />
          <span>{lang === 'bn' ? 'মেনু' : 'More'}</span>
        </button>
      </nav>
    </div>
  );
}
