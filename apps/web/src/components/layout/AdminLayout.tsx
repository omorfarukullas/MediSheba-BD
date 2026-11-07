import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { LanguageToggle } from '../shared/LanguageToggle';
import {
  Building2,
  LayoutDashboard,
  Bed,
  Truck,
  Users,
  FlaskConical,
  Menu,
  X,
  LogOut,
  ChevronRight,
  HelpCircle,
  Settings
} from 'lucide-react';

export function AdminLayout() {
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
    currentPath.includes('/resources')
      ? 'Bed & ICU Capacity'
      : currentPath.includes('/ambulances')
      ? 'Ambulance Fleet'
      : currentPath.includes('/doctors')
      ? 'Doctor Affiliations'
      : currentPath.includes('/tests')
      ? 'Test Price List'
      : t('nav.dashboard');

  return (
    <div className="flex min-h-screen bg-[#fffefc] font-sans text-[#222222]">
      {/* ─── NavSidebar (240px, Ease Health Botanical Surface #f9fbf8) ─── */}
      <aside className="hidden lg:flex w-[240px] shrink-0 bg-[#f9fbf8] border-r border-[#efeeeb] p-4 flex-col justify-between select-none">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3 px-1 h-10">
            <div className="w-8 h-8 rounded-[7px] bg-[#0f3e17] text-[#fffefc] grid place-items-center text-xs font-semibold">
              H
            </div>
            <div>
              <span className="font-serif text-[17px] font-normal text-[#0f3e17] tracking-tight block leading-tight">
                Hospital Admin
              </span>
              <span className="text-[11px] text-[#222222]/60">
                {t('app_name')}
              </span>
            </div>
          </Link>

          <div>
            <div className="eyebrow px-3 pt-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]/80">
              {t('groups.admin')}
            </div>
            <nav className="space-y-0.5">
              <NavLink
                to="/admin/dashboard"
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
                to="/admin/resources"
                className={({ isActive }) =>
                  `flex items-center justify-between h-10 px-3 rounded-[10px] text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#e1f4df] text-[#0f3e17] font-medium'
                      : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Bed className="w-[18px] h-[18px] shrink-0" />
                  <span>Bed & ICU</span>
                </div>
                <span className="bg-[#e1f4df] text-[#0f3e17] text-[11px] px-2 py-0.5 rounded-full font-medium">
                  Live
                </span>
              </NavLink>

              <NavLink
                to="/admin/ambulances"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#e1f4df] text-[#0f3e17] font-medium'
                      : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
                  }`
                }
              >
                <Truck className="w-[18px] h-[18px] shrink-0" />
                <span>Fleet 999</span>
              </NavLink>

              <NavLink
                to="/admin/doctors"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#e1f4df] text-[#0f3e17] font-medium'
                      : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
                  }`
                }
              >
                <Users className="w-[18px] h-[18px] shrink-0" />
                <span>Physicians</span>
              </NavLink>

              <NavLink
                to="/admin/tests"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#e1f4df] text-[#0f3e17] font-medium'
                      : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
                  }`
                }
              >
                <FlaskConical className="w-[18px] h-[18px] shrink-0" />
                <span>Diagnostic Tests</span>
              </NavLink>
            </nav>
          </div>
        </div>

        <div className="space-y-1 pt-4 border-t border-[#efeeeb]">
          <NavLink
            to="/admin/help"
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
            to="/admin/settings"
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
              <div className="w-8 h-8 rounded-full bg-[#e1f4df] border border-[#efeeeb] grid place-items-center text-xs font-semibold text-[#0f3e17]">
                {(profile?.fullName || user?.displayName || 'Ad').slice(0, 2).toUpperCase()}
              </div>
              <div className="leading-tight overflow-hidden">
                <div className="text-[13px] font-medium text-[#0f3e17] truncate">
                  {profile?.fullName || user?.displayName || 'Hospital Staff'}
                </div>
                <div className="text-[11px] text-[#222222]/60 truncate">Reception / Admin</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-[#222222]/60 hover:text-[#0f3e17] hover:bg-[#e1f4df]/40 rounded-[7px] transition-colors"
              title={t('action.signOut')}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main Content Container ─── */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#fffefc]">
        <header className="h-14 border-b border-[#efeeeb] px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-[#fffefc] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-[7px] text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="flex items-center gap-1.5 text-[14px] text-[#222222]/70">
              <span className="font-serif text-[#0f3e17]">{t('app_name')}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#222222]/40" />
              <span className="text-[#0f3e17] font-medium">{pageTitle}</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />

            <div className="w-8 h-8 rounded-full bg-[#e1f4df] border border-[#efeeeb] grid place-items-center text-xs font-semibold text-[#0f3e17]">
              {(profile?.fullName || user?.displayName || 'Ad').slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1120px] w-full mx-auto space-y-6 flex-1">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#0f3e17]/20 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-[280px] bg-[#f9fbf8] border-r border-[#efeeeb] p-4 flex flex-col justify-between z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#efeeeb]">
                <span className="font-serif text-[17px] font-normal text-[#0f3e17]">
                  Hospital Admin
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#222222]/70 hover:text-[#0f3e17]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                <NavLink
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] text-[#222222] hover:bg-[#e1f4df]/40"
                >
                  <LayoutDashboard className="w-[18px] h-[18px]" />
                  <span>{t('nav.dashboard')}</span>
                </NavLink>
                <NavLink
                  to="/admin/resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] text-[#222222] hover:bg-[#e1f4df]/40"
                >
                  <Bed className="w-[18px] h-[18px]" />
                  <span>Bed & ICU</span>
                </NavLink>
                <NavLink
                  to="/admin/ambulances"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] text-[#222222] hover:bg-[#e1f4df]/40"
                >
                  <Truck className="w-[18px] h-[18px]" />
                  <span>Fleet 999</span>
                </NavLink>
                <NavLink
                  to="/admin/doctors"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] text-[#222222] hover:bg-[#e1f4df]/40"
                >
                  <Users className="w-[18px] h-[18px]" />
                  <span>Physicians</span>
                </NavLink>
                <NavLink
                  to="/admin/tests"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] text-[#222222] hover:bg-[#e1f4df]/40"
                >
                  <FlaskConical className="w-[18px] h-[18px]" />
                  <span>Diagnostic Tests</span>
                </NavLink>
              </nav>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full h-11 rounded-[14px] border border-[#efeeeb] bg-[#fffefc] text-[14px] font-medium text-[#0f3e17] hover:bg-[#e1f4df]/30 transition-colors"
            >
              {t('action.signOut')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
