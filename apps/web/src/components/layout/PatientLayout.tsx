import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { LanguageToggle } from '../shared/LanguageToggle';
import { Avatar } from '../ui/Avatar';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  FileText,
  FolderHeart,
  CreditCard,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
  Plus,
  Video,
  Activity,
  Hospital,
  ChevronRight,
  Phone,
  Sparkles
} from 'lucide-react';

export function PatientLayout() {
  const { lang, t } = useLanguageStore();
  const { user, profile, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const currentPath = location.pathname;
  const pageTitle =
    currentPath.includes('/doctors')
      ? t('action.book')
      : currentPath.includes('/appointments')
      ? t('nav.appointments')
      : currentPath.includes('/documents')
      ? t('nav.records')
      : currentPath.includes('/telemedicine')
      ? t('nav.telemedicine')
      : currentPath.includes('/vitals')
      ? t('nav.vitals')
      : currentPath.includes('/resources')
      ? t('nav.resources')
      : currentPath.includes('/ai')
      ? (lang === 'bn' ? 'এআই স্বাস্থ্য সহকারী' : 'AI Health Assistant')
      : t('nav.dashboard');

  return (
    <div className="flex min-h-screen bg-[#fffefc] font-sans text-[#222222]">
      {/* ─── NavSidebar (240px, Ease Health Botanical Surface #f9fbf8) ─── */}
      <aside className="hidden lg:flex w-[240px] shrink-0 bg-[#f9fbf8] border-r border-[#efeeeb] p-4 flex-col justify-between select-none">
        <div className="space-y-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 px-1 h-10">
            <div className="w-8 h-8 rounded-[7px] bg-[#0f3e17] text-[#fffefc] grid place-items-center text-xs font-semibold">
              M
            </div>
            <span className="font-serif text-[17px] font-normal text-[#0f3e17] tracking-tight">
              {t('app_name')}
            </span>
          </Link>

          {/* Quick Action Button (Patient: + Book appointment) */}
          <Link to="/patient/doctors" className="block">
            <button
              type="button"
              className="w-full h-11 rounded-[14px] bg-[#0f3e17] hover:bg-[#0c2f10] active:bg-[#071d0b] text-[#fffefc] text-[14px] font-normal flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('action.book')}</span>
            </button>
          </Link>

          {/* Group: Workspace */}
          <div>
            <div className="eyebrow px-3 pt-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]/80">
              {t('groups.workspace')}
            </div>
            <nav className="space-y-0.5">
              <NavLink
                to="/patient/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#e1f4df] text-[#0f3e17] font-medium'
                      : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
                  }`
                }
              >
                <LayoutDashboard className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.dashboard')}</span>
              </NavLink>

              <NavLink
                to="/patient/appointments"
                className={({ isActive }) =>
                  `flex items-center justify-between h-10 px-3 rounded-[10px] text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#e1f4df] text-[#0f3e17] font-medium'
                      : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-[18px] h-[18px] shrink-0" />
                  <span>{t('nav.appointments')}</span>
                </div>
                <span className="bg-[#e1f4df] text-[#0f3e17] text-[11px] px-2 py-0.5 rounded-full font-medium">
                  Live
                </span>
              </NavLink>
            </nav>
          </div>

          {/* Group: Care */}
          <div>
            <div className="eyebrow px-3 pt-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]/80">
              {t('groups.care')}
            </div>
            <nav className="space-y-0.5">
              <NavLink
                to="/patient/documents"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#e1f4df] text-[#0f3e17] font-medium'
                      : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
                  }`
                }
              >
                <FolderHeart className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.records')}</span>
              </NavLink>

              <NavLink
                to="/patient/telemedicine"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#e1f4df] text-[#0f3e17] font-medium'
                      : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
                  }`
                }
              >
                <Video className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.telemedicine')}</span>
              </NavLink>

              <NavLink
                to="/patient/vitals"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#e1f4df] text-[#0f3e17] font-medium'
                      : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
                  }`
                }
              >
                <Activity className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.vitals')}</span>
              </NavLink>

              <NavLink
                to="/patient/resources"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#e1f4df] text-[#0f3e17] font-medium'
                      : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
                  }`
                }
              >
                <Hospital className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.resources')}</span>
              </NavLink>

              <NavLink
                to="/patient/ai"
                className={({ isActive }) =>
                  `flex items-center justify-between h-10 px-3 rounded-[10px] text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#e1f4df] text-[#0f3e17] font-medium'
                      : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-[18px] h-[18px] shrink-0 text-[#0f3e17]" />
                  <span>{lang === 'bn' ? 'এআই পরামর্শক' : 'AI Assistant'}</span>
                </div>
                <span className="bg-[#0f3e17] text-[#fffefc] text-[10px] px-2 py-0.5 rounded-full font-medium">
                  AI
                </span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Bottom Zone: Help, Settings, Emergency, User Row */}
        <div className="space-y-1 pt-4 border-t border-[#efeeeb]">
          <Link
            to="/emergency"
            className="flex items-center gap-3 h-9 px-3 rounded-[10px] text-[13px] text-[#b42318] hover:bg-[#fef3f2] font-medium transition-colors"
          >
            <span>{t('nav.emergency')}</span>
          </Link>

          <NavLink
            to="/patient/help"
            className={({ isActive }) =>
              `flex items-center gap-3 h-9 px-3 rounded-[10px] text-[13px] transition-colors ${
                isActive ? 'bg-[#e1f4df] text-[#0f3e17] font-medium' : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
              }`
            }
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>{t('nav.help', 'Help')}</span>
          </NavLink>

          <NavLink
            to="/patient/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 h-9 px-3 rounded-[10px] text-[13px] transition-colors ${
                isActive ? 'bg-[#e1f4df] text-[#0f3e17] font-medium' : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
              }`
            }
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>{t('nav.settings', 'Settings')}</span>
          </NavLink>

          <div className="pt-2 mt-2 border-t border-[#efeeeb] flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#e1f4df] border border-[#b1dbb8] grid place-items-center text-xs font-serif text-[#0f3e17]">
                {(profile?.fullName || user?.displayName || 'P').slice(0, 2).toUpperCase()}
              </div>
              <div className="leading-tight overflow-hidden">
                <div className="text-[13px] font-medium text-[#222222] truncate">
                  {profile?.fullName || user?.displayName || 'Patient'}
                </div>
                <div className="text-[11px] text-[#5a6e5e] truncate">
                  {t('patient.profile')}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-[#5a6e5e] hover:text-[#0f3e17] hover:bg-[#e1f4df] rounded-[7px] transition-colors cursor-pointer"
              title={t('action.signOut')}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main Content Container ─── */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#fffefc]">
        {/* Top Bar (56px high, cream, border-b) */}
        <header className="h-14 border-b border-[#efeeeb] px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-[#fffefc] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-[7px] text-[#222222] hover:bg-[#e1f4df] hover:text-[#0f3e17]"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[13px] text-[#5a6e5e]">
              <span>{t('app_name')}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#b1dbb8]" />
              <span className="font-serif text-[#0f3e17] text-sm">{pageTitle}</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* One-Click LanguageToggle */}
            <LanguageToggle />

            {/* Call us secondary button */}
            <a href="tel:01700000000" className="hidden sm:inline-flex">
              <button
                type="button"
                className="h-8 px-3 rounded-full border-[1.5px] border-[#0f3e17] bg-[#fffefc] hover:bg-[#e1f4df] text-[#0f3e17] text-[13px] font-normal inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#0f3e17]" />
                <span>{t('landing.callUs', 'Call us')}</span>
              </button>
            </a>

            <div className="w-8 h-8 rounded-full bg-[#e1f4df] border border-[#b1dbb8] grid place-items-center text-xs font-serif text-[#0f3e17]">
              {(profile?.fullName || user?.displayName || 'P').slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content Well */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-[1200px] w-full mx-auto space-y-6 flex-1">
          <Outlet />
        </main>
      </div>

      {/* ─── Mobile Off-Canvas Drawer (280px) ─── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#000000]/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-[280px] bg-[#f7f7f5] border-r border-[#e7e5e4] p-4 flex flex-col justify-between z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#e7e5e4]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#111111] text-white grid place-items-center text-xs font-semibold">
                    M
                  </div>
                  <span className="text-[16px] font-semibold text-[#111111]">
                    {t('app_name')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-[#78716c] hover:text-[#111111]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                <NavLink
                  to="/patient/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] text-[#57534e] hover:bg-[#f4f4f2]"
                >
                  <LayoutDashboard className="w-[18px] h-[18px]" />
                  <span>{t('nav.dashboard')}</span>
                </NavLink>
                <NavLink
                  to="/patient/appointments"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] text-[#57534e] hover:bg-[#f4f4f2]"
                >
                  <Calendar className="w-[18px] h-[18px]" />
                  <span>{t('nav.appointments')}</span>
                </NavLink>
                <NavLink
                  to="/patient/documents"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] text-[#57534e] hover:bg-[#f4f4f2]"
                >
                  <FolderHeart className="w-[18px] h-[18px]" />
                  <span>{t('nav.records')}</span>
                </NavLink>
                <NavLink
                  to="/patient/telemedicine"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] text-[#57534e] hover:bg-[#f4f4f2]"
                >
                  <Video className="w-[18px] h-[18px]" />
                  <span>{t('nav.telemedicine')}</span>
                </NavLink>
                <NavLink
                  to="/patient/resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] text-[#57534e] hover:bg-[#f4f4f2]"
                >
                  <Hospital className="w-[18px] h-[18px]" />
                  <span>{t('nav.resources')}</span>
                </NavLink>
                <NavLink
                  to="/patient/ai"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] text-[#0f3e17] hover:bg-[#e1f4df]"
                >
                  <Sparkles className="w-[18px] h-[18px]" />
                  <span>{lang === 'bn' ? 'এআই স্বাস্থ্য সহকারী' : 'AI Health Assistant'}</span>
                </NavLink>
                <NavLink
                  to="/emergency"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] text-[#b42318] hover:bg-[#fef3f2] font-medium"
                >
                  <span>{t('nav.emergency')}</span>
                </NavLink>
              </nav>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full h-10 rounded-lg border border-[#e7e5e4] bg-white text-[14px] font-medium text-[#111111] hover:bg-[#f4f4f2] transition-colors"
            >
              {t('action.signOut')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
