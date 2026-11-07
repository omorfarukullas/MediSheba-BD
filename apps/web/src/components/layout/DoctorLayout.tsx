import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { LanguageToggle } from '../shared/LanguageToggle';
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  FolderHeart,
  Clock,
  DollarSign,
  Menu,
  X,
  LogOut,
  Plus,
  ChevronRight,
  HelpCircle,
  Settings
} from 'lucide-react';

export function DoctorLayout() {
  const { t } = useLanguageStore();
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
    currentPath.includes('/queue')
      ? 'Chamber Queue'
      : currentPath.includes('/appointments')
      ? t('nav.appointments')
      : currentPath.includes('/slots')
      ? 'Visiting Hours'
      : currentPath.includes('/prescriptions')
      ? t('nav.prescriptions')
      : currentPath.includes('/earnings')
      ? 'Billing & Fees'
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

          {/* Quick Action Button (Doctor: + New prescription) */}
          <Link to="/doctor/prescriptions" className="block">
            <button
              type="button"
              className="w-full h-10 rounded-lg bg-[#2f4bc0] hover:bg-[#233a9e] active:bg-[#1c2f80] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('action.newRx')}</span>
            </button>
          </Link>

          {/* Group: Workspace */}
          <div>
            <div className="px-3 pt-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#78716c]">
              {t('groups.workspace')}
            </div>
            <nav className="space-y-0.5">
              <NavLink
                to="/doctor/dashboard"
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
                to="/doctor/queue"
                className={({ isActive }) =>
                  `flex items-center justify-between h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Users className="w-[18px] h-[18px] shrink-0" />
                  <span>Chamber Queue</span>
                </div>
                <span className="bg-[#f4f4f2] text-[#78716c] text-[12px] px-2 py-0.5 rounded-full font-medium">
                  Active
                </span>
              </NavLink>

              <NavLink
                to="/doctor/appointments"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <Calendar className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.appointments')}</span>
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
                to="/doctor/prescriptions"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <FileText className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.prescriptions')}</span>
              </NavLink>

              <NavLink
                to="/doctor/slots"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <Clock className="w-[18px] h-[18px] shrink-0" />
                <span>Visiting Hours</span>
              </NavLink>

              <NavLink
                to="/doctor/earnings"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#2f4bc0] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <DollarSign className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.billing')}</span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Bottom Zone: Help, Settings, User Profile Footer */}
        <div className="space-y-1 pt-4 border-t border-[#e7e5e4]">
          <NavLink
            to="/doctor/help"
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
            to="/doctor/settings"
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
                {(profile?.fullName || user?.displayName || 'Dr').slice(0, 2).toUpperCase()}
              </div>
              <div className="leading-tight overflow-hidden">
                <div className="text-[13px] font-medium text-[#111111] truncate">
                  {profile?.fullName || user?.displayName || 'Physician'}
                </div>
                <div className="text-[11px] text-[#78716c] truncate">BMDC Verified</div>
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
        {/* Top Bar (56px) */}
        <header className="h-14 border-b border-[#e7e5e4] px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-[#ffffff] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="flex items-center gap-1.5 text-[14px] text-[#78716c]">
              <span>{t('app_name')}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#d6d3d1]" />
              <span className="text-[#111111] font-medium">{pageTitle}</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />

            <div className="w-8 h-8 rounded-full bg-[#f4f4f2] border border-[#e7e5e4] grid place-items-center text-xs font-semibold text-[#111111]">
              {(profile?.fullName || user?.displayName || 'Dr').slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content Well */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-[1120px] w-full mx-auto space-y-6 flex-1">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#000000]/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-[280px] bg-[#f7f7f5] border-r border-[#e7e5e4] p-4 flex flex-col justify-between z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#e7e5e4]">
                <span className="text-[16px] font-semibold text-[#111111]">
                  {t('app_name')}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#78716c] hover:text-[#111111]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                <NavLink
                  to="/doctor/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] text-[#57534e]"
                >
                  <LayoutDashboard className="w-[18px] h-[18px]" />
                  <span>{t('nav.dashboard')}</span>
                </NavLink>
                <NavLink
                  to="/doctor/queue"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] text-[#57534e]"
                >
                  <Users className="w-[18px] h-[18px]" />
                  <span>Chamber Queue</span>
                </NavLink>
                <NavLink
                  to="/doctor/appointments"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] text-[#57534e]"
                >
                  <Calendar className="w-[18px] h-[18px]" />
                  <span>{t('nav.appointments')}</span>
                </NavLink>
                <NavLink
                  to="/doctor/prescriptions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] text-[#57534e]"
                >
                  <FileText className="w-[18px] h-[18px]" />
                  <span>{t('nav.prescriptions')}</span>
                </NavLink>
              </nav>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full h-10 rounded-lg border border-[#e7e5e4] bg-white text-[14px] font-medium text-[#111111]"
            >
              {t('action.signOut')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
