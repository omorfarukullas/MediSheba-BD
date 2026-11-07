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
  ChevronRight
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
    <div className="flex min-h-screen bg-[#ffffff] font-sans text-[#111111]">
      {/* ─── NavSidebar (240px, #f7f7f5, 1px right border) ─── */}
      <aside className="hidden lg:flex w-[240px] shrink-0 bg-[#f7f7f5] border-r border-[#e7e5e4] p-4 flex-col justify-between select-none">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3 px-1 h-10">
            <div className="w-7 h-7 rounded-lg bg-[#111111] text-white grid place-items-center text-xs font-semibold">
              H
            </div>
            <span className="text-[16px] font-semibold text-[#111111]">
              Hospital Admin
            </span>
          </Link>

          <div>
            <div className="px-3 pt-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#78716c]">
              {t('groups.admin')}
            </div>
            <nav className="space-y-0.5">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#3b5bdb] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <LayoutDashboard className="w-[18px] h-[18px] shrink-0" />
                <span>{t('nav.dashboard')}</span>
              </NavLink>

              <NavLink
                to="/admin/resources"
                className={({ isActive }) =>
                  `flex items-center justify-between h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#3b5bdb] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Bed className="w-[18px] h-[18px] shrink-0" />
                  <span>Bed & ICU</span>
                </div>
                <span className="bg-[#f4f4f2] text-[#78716c] text-[12px] px-2 py-0.5 rounded-full font-medium">
                  Live
                </span>
              </NavLink>

              <NavLink
                to="/admin/ambulances"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#3b5bdb] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <Truck className="w-[18px] h-[18px] shrink-0" />
                <span>Fleet 999</span>
              </NavLink>

              <NavLink
                to="/admin/doctors"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#3b5bdb] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <Users className="w-[18px] h-[18px] shrink-0" />
                <span>Physicians</span>
              </NavLink>

              <NavLink
                to="/admin/tests"
                className={({ isActive }) =>
                  `flex items-center gap-3 h-10 px-3 rounded-lg text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#3b5bdb] font-medium'
                      : 'text-[#57534e] hover:bg-[#f4f4f2] hover:text-[#111111]'
                  }`
                }
              >
                <FlaskConical className="w-[18px] h-[18px] shrink-0" />
                <span>Diagnostic Tests</span>
              </NavLink>
            </nav>
          </div>
        </div>

        <div className="space-y-1 pt-4 border-t border-[#e7e5e4]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#f4f4f2] border border-[#e7e5e4] grid place-items-center text-xs font-semibold text-[#111111]">
                {(profile?.fullName || user?.displayName || 'Ad').slice(0, 2).toUpperCase()}
              </div>
              <div className="leading-tight overflow-hidden">
                <div className="text-[13px] font-medium text-[#111111] truncate">
                  {profile?.fullName || user?.displayName || 'Hospital Staff'}
                </div>
                <div className="text-[11px] text-[#78716c] truncate">Reception / Admin</div>
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
              {(profile?.fullName || user?.displayName || 'Ad').slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1120px] w-full mx-auto space-y-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
