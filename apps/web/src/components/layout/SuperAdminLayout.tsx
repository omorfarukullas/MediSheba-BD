import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { LanguageToggle } from '../shared/LanguageToggle';
import {
  ShieldAlert,
  LayoutDashboard,
  Building2,
  FileCheck2,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

export function SuperAdminLayout() {
  const { lang, t } = useLanguageStore();
  const { user, profile, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      to: '/super-admin/dashboard',
      label: lang === 'bn' ? 'কন্ট্রোল সেন্টার' : 'Control Center',
      icon: LayoutDashboard,
    },
    {
      to: '/super-admin/hospitals',
      label: lang === 'bn' ? 'হাসপাতাল অনুমোদন' : 'Hospital Verifications',
      icon: Building2,
    },
    {
      to: '/super-admin/audit',
      label: lang === 'bn' ? 'অডিট ও কমপ্লায়েন্স' : 'Audit Logs',
      icon: FileCheck2,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    const item = navItems.find((n) => location.pathname === n.to);
    return item ? item.label : lang === 'bn' ? 'সুপার অ্যাডমিন' : 'Super Admin';
  };

  return (
    <div className="flex min-h-screen bg-[#fffefc] font-sans text-[#222222]">
      {/* ─── Desktop Sidebar (240px, surface #f9fbf8, border 1px solid #efeeeb) ─── */}
      <aside className="hidden md:flex w-[240px] bg-[#f9fbf8] border-r border-[#efeeeb] flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-30 select-none">
        <div className="p-4 space-y-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 px-1 h-10">
            <div className="w-8 h-8 rounded-[7px] bg-[#0f3e17] text-[#fffefc] flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-[#fffefc]" />
            </div>
            <div>
              <span className="font-serif text-[17px] font-normal text-[#0f3e17] block leading-tight">
                {t('app_name')}
              </span>
              <span className="text-[11px] text-[#222222]/60 font-medium">
                {lang === 'bn' ? 'সুপার অ্যাডমিন' : 'Platform Governance'}
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          <div className="space-y-1">
            <div className="eyebrow px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]/80">
              {lang === 'bn' ? 'সিস্টেম প্রশাসন' : 'Governance'}
            </div>
            <nav className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 h-10 px-3 rounded-[10px] text-[14px] transition-colors ${
                      isActive
                        ? 'bg-[#e1f4df] text-[#0f3e17] font-medium'
                        : 'text-[#222222] hover:bg-[#e1f4df]/40 hover:text-[#0f3e17]'
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px] shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Row with Sign Out */}
        <div className="p-3 border-t border-[#efeeeb] bg-[#f9fbf8]">
          <div className="flex items-center justify-between p-2 rounded-[10px] hover:bg-[#e1f4df]/40">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#e1f4df] border border-[#efeeeb] flex items-center justify-center text-xs font-semibold text-[#0f3e17]">
                SA
              </div>
              <div className="truncate">
                <div className="text-[13px] font-medium text-[#0f3e17] truncate">
                  {profile?.fullName || user?.displayName || 'Root Admin'}
                </div>
                <div className="text-[11px] text-[#222222]/60 font-mono">Platform Admin</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-[#222222]/60 hover:text-[#b42318] rounded-[7px] hover:bg-[#fffefc] transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main Content Canvas ─── */}
      <div className="flex-1 md:pl-[240px] flex flex-col min-h-screen bg-[#fffefc]">
        {/* Top Bar (56px high, hairline bottom border) */}
        <header className="h-14 border-b border-[#efeeeb] bg-[#fffefc] sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-1.5 rounded-[7px] text-[#222222] hover:bg-[#e1f4df]/40"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <nav className="flex items-center gap-1.5 text-[14px] text-[#222222]/70">
              <span className="font-serif text-[#0f3e17]">{lang === 'bn' ? 'সিস্টেম' : 'System'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#222222]/40" />
              <span className="text-[#0f3e17] font-medium">{getPageTitle()}</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1120px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* ─── Mobile Drawer (280px) ─── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#0f3e17]/20 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-[280px] bg-[#f9fbf8] border-r border-[#efeeeb] p-4 flex flex-col justify-between z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#efeeeb]">
                <span className="font-serif text-[17px] font-normal text-[#0f3e17]">
                  {t('app_name')}
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-[7px] text-[#222222]/70 hover:text-[#0f3e17]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm text-[#222222] hover:bg-[#e1f4df]/40"
                  >
                    <item.icon className="w-4 h-4 text-[#0f3e17]" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full h-11 rounded-[14px] border border-[#efeeeb] bg-[#fffefc] text-[14px] font-medium text-[#0f3e17] hover:bg-[#e1f4df]/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
