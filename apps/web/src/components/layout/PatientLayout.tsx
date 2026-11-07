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
  Phone
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
      : t('nav.dashboard');

  return (
    <div className="flex min-h-screen bg-[#ffffff] font-sans text-[#111111]">
      {/* ─── NavSidebar (240px, #f7f7f5, 1px right border) ─── */}
      <aside className="hidden lg:flex w-[240px] shrink-0 bg-[#f7f7f5] border-r border-[#e7e5e4] p-4 flex-col justify-between select-none">
        <div className="space-y-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 px-1 h-10">
            <div className="w-7 h-7 rounded-lg bg-[#111111] text-white grid place-items-center text-xs font-semibold">
              M
            </div>
            <span className="text-[16px] font-semibold text-[#111111]">
              {t('app_name')}
            </span>
          </Link>

          {/* Quick Action Button (Patient: + Book appointment) */}
          <Link to="/patient/doctors" className="block">
            <button
              type="button"
              className="w-full h-10 rounded-lg bg-[#2f4bc0] hover:bg-[#233a9e] active:bg-[#1c2f80] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('action.book')}</span>
            </button>
          </Link>

          {/* Group: Workspace */}
          <div>
            <div className="px-3 pt-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#78716c]">
              {t('groups.workspace')}
            </div>
            <nav className="space-y-0.5">
              <NavLink
                to="/patient/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <LayoutDashboard className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.dashboard')}</span>
              </NavLink>

              <NavLink
                to="/patient/appointments"
                className={({ isActive }) =>
                  `flex items-center justify-between h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-[18px] h-[18px] shrink-0" />
                  <span>{t('nav.appointments')}</span>
                </div>
                <span className="bg-[#f4f4f2] text-[#78716c] text-[12px] px-2 py-0.5 rounded-full font-medium">
                  Live
                </span>
              </NavLink>
            </nav>
          </div>

          {/* Group: Care */}
          <div>
            <div className="px-3 pt-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#78716c]">
              {t('groups.care')}
            </div>
            <nav className="space-y-0.5">
              <NavLink
                to="/patient/documents"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <FolderHeart className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.records')}</span>
              </NavLink>

              <NavLink
                to="/patient/telemedicine"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <Video className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.telemedicine')}</span>
              </NavLink>

              <NavLink
                to="/patient/vitals"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <Activity className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.vitals')}</span>
              </NavLink>

              <NavLink
                to="/patient/resources"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <Hospital className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.resources')}</span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Bottom Zone: Help, Settings, Emergency, User Row */}
        <div className="space-y-1 pt-4 border-t border-[#e7e5e4]">
          <Link
            to="/emergency"
            className="flex items-center gap-3 h-9 px-3 rounded-lg text-[13px] text-[#b42318] hover:bg-[#fef3f2] font-medium transition-colors"
          >
            <span>{t('nav.emergency')}</span>
          </Link>

          <NavLink
            to="/patient/help"
            className={({ isActive }) =>
              `flex items-center gap-3 h-9 px-3 rounded-lg text-[13px] transition-colors ${
                isActive ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium' : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
              }`
            }
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>{t('nav.help', 'Help')}</span>
          </NavLink>

          <NavLink
            to="/patient/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 h-9 px-3 rounded-lg text-[13px] transition-colors ${
                isActive ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium' : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
              }`
            }
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>{t('nav.settings', 'Settings')}</span>
          </NavLink>

          <div className="pt-2 mt-2 border-t border-[#e7e5e4] flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#f4f4f2] border border-[#e7e5e4] grid place-items-center text-xs font-semibold text-[#111111]">
                {(profile?.fullName || user?.displayName || 'P').slice(0, 2).toUpperCase()}
              </div>
              <div className="leading-tight overflow-hidden">
                <div className="text-[13px] font-medium text-[#111111] truncate">
                  {profile?.fullName || user?.displayName || 'Patient'}
                </div>
                <div className="text-[11px] text-[#78716c] truncate">
                  {t('patient.profile')}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-[#78716c] hover:text-[#111111] hover:bg-[#f4f4f2] rounded-md transition-colors"
              title={t('action.signOut')}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main Content Container ─── */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#ffffff]">
        {/* Top Bar (56px high, white, 1px bottom border) */}
        <header className="h-14 border-b border-[#e7e5e4] px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-[#ffffff] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb (Section 5) */}
            <nav className="flex items-center gap-1.5 text-[14px] text-[#78716c]">
              <span>{t('app_name')}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#d6d3d1]" />
              <span className="text-[#111111] font-medium">{pageTitle}</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* One-Click LanguageToggle (Section 6.1) */}
            <LanguageToggle />

            {/* Call us secondary button (Section 5) */}
            <a href="tel:01700000000" className="hidden sm:inline-flex">
              <button
                type="button"
                className="h-8 px-3 rounded-lg border-[1.5px] border-[#111111] bg-white hover:bg-[#f4f4f2] active:bg-[#e7e5e4] text-[#111111] text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#111111]" />
                <span>{t('landing.callUs', 'Call us')}</span>
              </button>
            </a>

            <div className="w-8 h-8 rounded-full bg-[#f4f4f2] border border-[#e7e5e4] grid place-items-center text-xs font-semibold text-[#111111]">
              {(profile?.fullName || user?.displayName || 'P').slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content Well (Max 1120px, Section 4 & 8) */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-[1120px] w-full mx-auto space-y-6 flex-1">
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
