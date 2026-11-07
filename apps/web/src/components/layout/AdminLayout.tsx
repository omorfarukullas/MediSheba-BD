import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Building2,
  LayoutDashboard,
  Bed,
  Truck,
  Users,
  FlaskConical,
  Globe,
  LogOut,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';

export function AdminLayout() {
  const { lang, toggleLanguage } = useLanguageStore();
  const { user, profile, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      to: '/admin/dashboard',
      label: lang === 'bn' ? 'ড্যাশবোর্ড' : 'Hospital Overview',
      icon: LayoutDashboard,
    },
    {
      to: '/admin/resources',
      label: lang === 'bn' ? 'বেড ও আইসিইউ ক্যাপাসিটি' : 'Bed & ICU Capacity',
      icon: Bed,
    },
    {
      to: '/admin/ambulances',
      label: lang === 'bn' ? 'অ্যাম্বুলেন্স বহর' : 'Ambulance Fleet',
      icon: Truck,
    },
    {
      to: '/admin/doctors',
      label: lang === 'bn' ? 'ডাক্তার রোস্টার' : 'Doctor Affiliations',
      icon: Users,
    },
    {
      to: '/admin/tests',
      label: lang === 'bn' ? 'টেস্ট ও ডায়াগনস্টিক ফি' : 'Diagnostic Test Prices',
      icon: FlaskConical,
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
            <div className="w-9 h-9 rounded-panel bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-base text-ink tracking-tight block leading-none">
                MediSheba BD
              </span>
              <span className="text-[11px] text-indigo-600 font-semibold tracking-tight">
                {lang === 'bn' ? 'হাসপাতাল প্রশাসন পোর্টাল' : 'Hospital Admin Portal'}
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="accent" size="sm">
            Hospital Admin
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
              name={profile?.fullName || user?.displayName || 'Admin'}
              src={profile?.avatarUrl || user?.photoURL}
              size="sm"
            />
            <div className="hidden lg:block text-left text-[13px] leading-tight max-w-[130px] truncate">
              <div className="font-bold text-ink truncate">
                {profile?.fullName || user?.displayName || 'Admin'}
              </div>
              <div className="text-[11px] text-ink-secondary">Hospital Authority</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-rule bg-panel/70 p-4 space-y-6">
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-secondary">
              Hospital Operations
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
                        ? 'bg-indigo-600 text-white shadow-xs'
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
                  Hospital Admin Menu
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
                          ? 'bg-indigo-600 text-white'
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

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-panel border-t border-rule z-40 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold transition ${
              isActive ? 'text-indigo-600' : 'text-ink-secondary hover:text-ink'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/resources"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold transition ${
              isActive ? 'text-indigo-600' : 'text-ink-secondary hover:text-ink'
            }`
          }
        >
          <Bed className="w-5 h-5" />
          <span>Beds</span>
        </NavLink>

        <NavLink
          to="/admin/ambulances"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold transition ${
              isActive ? 'text-indigo-600' : 'text-ink-secondary hover:text-ink'
            }`
          }
        >
          <Truck className="w-5 h-5" />
          <span>Fleet</span>
        </NavLink>

        <NavLink
          to="/admin/tests"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold transition ${
              isActive ? 'text-indigo-600' : 'text-ink-secondary hover:text-ink'
            }`
          }
        >
          <FlaskConical className="w-5 h-5" />
          <span>Prices</span>
        </NavLink>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[11px] font-semibold text-ink-secondary hover:text-ink"
        >
          <Menu className="w-5 h-5" />
          <span>More</span>
        </button>
      </nav>
    </div>
  );
}
