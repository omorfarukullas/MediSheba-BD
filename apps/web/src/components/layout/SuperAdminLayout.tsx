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
  X
} from 'lucide-react';

export function SuperAdminLayout() {
  const { lang } = useLanguageStore();
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
    <div className="min-h-screen bg-canvas text-ink flex antialiased">
      {/* ─── Desktop Sidebar (240px, surface #f7f7f5, border 1px solid #e7e5e4) ─── */}
      <aside className="hidden md:flex w-[240px] bg-sidebar border-r border-border flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-30">
        <div className="p-4 space-y-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-ink text-white flex items-center justify-center font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-semibold text-sm text-ink block leading-none">
                MediSheba BD
              </span>
              <span className="text-[11px] text-text-3 font-medium">
                {lang === 'bn' ? 'সুপার অ্যাডমিন' : 'Super Admin'}
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          <div className="space-y-1">
            <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-3">
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
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent-tint text-accent font-semibold'
                        : 'text-text-2 hover:bg-subtle hover:text-ink'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-accent' : 'text-text-3'}`} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Row with Sign Out */}
        <div className="p-3 border-t border-border bg-sidebar">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-subtle">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-subtle border border-border flex items-center justify-center text-xs font-semibold text-text-2">
                SA
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-ink truncate">
                  {profile?.fullName || user?.displayName || 'Root Admin'}
                </div>
                <div className="text-[10px] text-text-3 font-mono">Platform Admin</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-text-3 hover:text-danger-text rounded-md hover:bg-canvas transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main Content Canvas ─── */}
      <div className="flex-1 md:pl-[240px] flex flex-col min-h-screen">
        {/* Top Bar (56px high, hairline bottom border) */}
        <header className="h-14 border-b border-border bg-canvas sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-text-2 hover:bg-subtle"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-sm font-medium text-text-3">
              {lang === 'bn' ? 'সিস্টেম' : 'System'} / <span className="text-ink font-semibold">{getPageTitle()}</span>
            </div>
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-[280px] bg-sidebar border-r border-border p-4 flex flex-col justify-between z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="font-semibold text-sm text-ink">MediSheba BD</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-md text-text-3 hover:text-ink"
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
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-2 hover:bg-subtle"
                  >
                    <item.icon className="w-4 h-4 text-text-3" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-danger-text hover:bg-danger-bg"
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
