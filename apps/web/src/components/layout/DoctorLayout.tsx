import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Stethoscope,
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
  ChevronDown,
  ShieldCheck,
  Plus
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
      label: lang === 'bn' ? 'ড্যাশবোর্ড' : 'Chamber Overview',
      icon: LayoutDashboard,
    },
    {
      to: '/doctor/queue',
      label: lang === 'bn' ? 'লাইভ চেম্বার সিরিয়াল' : 'Live Patient Queue',
      icon: Users,
      badge: { text: 'Active', variant: 'orange' as const },
    },
    {
      to: '/doctor/appointments',
      label: lang === 'bn' ? 'আজকের রোগী তালিকা' : "Today's Appointments",
      icon: Calendar,
    },
    {
      to: '/doctor/slots',
      label: lang === 'bn' ? 'শিডিউল ও চেম্বার সময়' : 'Visiting Schedule',
      icon: Clock,
    },
    {
      to: '/doctor/prescriptions',
      label: lang === 'bn' ? 'প্রেসক্রিপশন ও হিস্ট্রি' : 'Clinical Records',
      icon: FileText,
    },
    {
      to: '/doctor/earnings',
      label: lang === 'bn' ? 'ফি ও কনসালটেশন হিসাব' : 'Earnings & Revenue',
      icon: DollarSign,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#ffffff] font-sans text-[#000000]">
      {/* ─── NavSidebar (Warm Bone #f1f0ec, Zero-Shadow) ─── */}
      <aside className="hidden md:flex w-[260px] shrink-0 bg-[#f1f0ec] border-r border-[#e5e7eb] p-4 flex-col justify-between select-none">
        <div className="space-y-4">
          {/* Header Workspace Pill */}
          <Link
            to="/"
            className="w-full flex items-center justify-between bg-[#ffffff] border border-[#e5e7eb] rounded-[12px] p-2.5 text-left transition-colors hover:border-[#4570ff]/40"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#193f78] text-white flex items-center justify-center font-bold text-xs shrink-0">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[14px] font-medium leading-tight text-[#000000] truncate">
                  Doctor Practice
                </div>
                <div className="text-[11px] text-[#6e6d6c] truncate">
                  BMDC Certified Chamber
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-[#6e6d6c] shrink-0" />
          </Link>

          {/* Quick Action Button */}
          <Link to="/doctor/queue" className="block">
            <button className="w-full bg-[#4570ff] hover:bg-[#345ee6] text-white font-medium text-[14px] py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer">
              <Users className="w-4 h-4" />
              <span>{lang === 'bn' ? 'পরবর্তী রোগী কল করুন' : 'Call Next Patient'}</span>
            </button>
          </Link>

          {/* Navigation Section */}
          <div>
            <div className="px-3 pt-2 pb-1.5 text-[11px] font-bold uppercase tracking-[0.025em] text-[#6e6d6c]">
              Physician Operations
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
                            : 'bg-[#ff6808] text-white'
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
          {/* Dark Contrast Metric Box */}
          <div className="bg-[#000000] text-white rounded-[16px] p-4 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#c6ff94]">
              Today's Patients
            </div>
            <div className="text-[24px] font-medium tracking-[-0.6px] leading-tight">
              23 <span className="text-[12px] font-normal text-[#c6ff94]">(18 Chamber)</span>
            </div>
            <div className="text-[12px] text-[#d1d5db]">5 Online Telemedicine slots left.</div>
          </div>

          {/* User Profile Footer */}
          <div className="pt-3 border-t border-[#e5e7eb] flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Avatar
                name={profile?.fullName || user?.displayName || 'Doctor'}
                src={profile?.avatarUrl || user?.photoURL}
                size="sm"
              />
              <div className="overflow-hidden leading-tight">
                <div className="text-[14px] font-medium text-[#000000] truncate">
                  {profile?.fullName || user?.displayName || 'Doctor'}
                </div>
                <div className="text-[12px] text-[#6e6d6c] truncate">Specialist Physician</div>
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

      {/* ─── Main Workspace ─── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#ffffff]">
        <header className="h-16 border-b border-[#e5e7eb] px-4 sm:px-8 flex items-center justify-between bg-[#ffffff] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-[12px] text-[#555555] hover:bg-[#f1f0ec]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold uppercase tracking-[0.025em] text-[#6e6d6c]">
                MediSheba BD
              </span>
              <span className="text-[#e5e7eb]">/</span>
              <span className="text-[14px] font-medium text-[#000000]">
                Doctor Chamber
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-[#f1f0ec] px-3 py-1 rounded-full text-[12px] font-medium text-[#000000]">
              <ShieldCheck className="w-4 h-4 text-[#4570ff]" />
              <span>BMDC Verified</span>
            </div>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1f0ec] hover:bg-[#e5e7eb] text-[13px] font-medium text-[#000000] transition"
            >
              <Globe className="w-3.5 h-3.5 text-[#4570ff]" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-[1200px] w-full mx-auto pb-24 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* ─── Mobile Bottom Navigation ─── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#ffffff] border-t border-[#e5e7eb] z-40 px-2 py-1.5 flex items-center justify-around">
        <NavLink
          to="/doctor/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-3 rounded-[12px] text-[11px] font-medium transition ${
              isActive ? 'text-[#4570ff]' : 'text-[#6e6d6c]'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/doctor/queue"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-3 rounded-[12px] text-[11px] font-medium transition ${
              isActive ? 'text-[#4570ff]' : 'text-[#6e6d6c]'
            }`
          }
        >
          <Users className="w-5 h-5" />
          <span>Queue</span>
        </NavLink>

        <NavLink
          to="/doctor/appointments"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-3 rounded-[12px] text-[11px] font-medium transition ${
              isActive ? 'text-[#4570ff]' : 'text-[#6e6d6c]'
            }`
          }
        >
          <Calendar className="w-5 h-5" />
          <span>Patients</span>
        </NavLink>

        <NavLink
          to="/doctor/slots"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-3 rounded-[12px] text-[11px] font-medium transition ${
              isActive ? 'text-[#4570ff]' : 'text-[#6e6d6c]'
            }`
          }
        >
          <Clock className="w-5 h-5" />
          <span>Schedule</span>
        </NavLink>
      </nav>
    </div>
  );
}
