import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  ShieldAlert,
  LayoutDashboard,
  Building2,
  FileCheck2,
  Globe,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export function SuperAdminLayout() {
  const { lang, toggleLanguage } = useLanguageStore();
  const { user, profile, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      to: '/super-admin/dashboard',
      label: 'Control Center',
      icon: LayoutDashboard,
    },
    {
      to: '/super-admin/hospitals',
      label: 'Hospital Verifications',
      icon: Building2,
    },
    {
      to: '/super-admin/audit',
      label: 'Audit & Compliance Logs',
      icon: FileCheck2,
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
            <div className="w-9 h-9 rounded-panel bg-zinc-900 text-white flex items-center justify-center font-bold shadow-sm">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-base text-ink tracking-tight block leading-none">
                MediSheba BD
              </span>
              <span className="text-[11px] text-zinc-600 font-semibold tracking-tight">
                Super Admin Console
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="neutral" size="sm">
            Super Administrator
          </Badge>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-panel border border-rule hover:border-accent text-[13px] font-semibold text-ink bg-panel transition"
          >
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-rule">
            <Avatar
              name={profile?.fullName || user?.displayName || 'Root'}
              src={profile?.avatarUrl || user?.photoURL}
              size="sm"
            />
            <div className="hidden lg:block text-left text-[13px] leading-tight max-w-[130px] truncate">
              <div className="font-bold text-ink truncate">
                {profile?.fullName || user?.displayName || 'Root Admin'}
              </div>
              <div className="text-[11px] text-ink-secondary">Root Access</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-rule bg-panel/70 p-4 space-y-6">
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-secondary">
              Platform Administration
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
                        ? 'bg-zinc-900 text-white shadow-xs'
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
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-field/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 bg-panel border-r border-rule p-5 flex flex-col space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-rule">
                <span className="font-display font-bold text-base text-ink">
                  Admin Console Menu
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
                          ? 'bg-zinc-900 text-white'
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
                Sign Out
              </Button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-16 md:pb-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
