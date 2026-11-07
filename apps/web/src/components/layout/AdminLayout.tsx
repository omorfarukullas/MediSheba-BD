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
  ChevronDown
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
      badge: { text: 'Realtime', variant: 'orange' as const },
    },
    {
      to: '/admin/ambulances',
      label: lang === 'bn' ? 'অ্যাম্বুলেন্স ফ্লীট' : 'Ambulance Fleet',
      icon: Truck,
    },
    {
      to: '/admin/doctors',
      label: lang === 'bn' ? 'ডাক্তার রোস্টার' : 'Physician Roster',
      icon: Users,
    },
    {
      to: '/admin/tests',
      label: lang === 'bn' ? 'ডায়াগনস্টিক টেস্ট ফি' : 'Test Pricing Catalog',
      icon: FlaskConical,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#ffffff] font-sans text-[#000000]">
      {/* ─── NavSidebar (Warm Bone #f1f0ec) ─── */}
      <aside className="hidden md:flex w-[260px] shrink-0 bg-[#f1f0ec] border-r border-[#e5e7eb] p-4 flex-col justify-between select-none">
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full flex items-center justify-between bg-[#ffffff] border border-[#e5e7eb] rounded-[12px] p-2.5 text-left transition-colors hover:border-[#4570ff]/40"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#193f78] text-white flex items-center justify-center font-bold text-xs shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[14px] font-medium leading-tight text-[#000000] truncate">
                  Hospital Admin
                </div>
                <div className="text-[11px] text-[#6e6d6c] truncate">
                  Authority Control
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-[#6e6d6c] shrink-0" />
          </Link>

          <div>
            <div className="px-3 pt-2 pb-1.5 text-[11px] font-bold uppercase tracking-[0.025em] text-[#6e6d6c]">
              Hospital Administration
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

        <div className="space-y-3 pt-4">
          <div className="bg-[#000000] text-white rounded-[16px] p-4 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#c6ff94]">
              ICU Bed Availability
            </div>
            <div className="text-[24px] font-medium tracking-[-0.6px] leading-tight">
              8 Available <span className="text-[12px] font-normal text-[#c6ff94]">(of 24)</span>
            </div>
            <div className="text-[12px] text-[#d1d5db]">Live synchronized with Central 999.</div>
          </div>

          <div className="pt-3 border-t border-[#e5e7eb] flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Avatar
                name={profile?.fullName || user?.displayName || 'Admin'}
                src={profile?.avatarUrl || user?.photoURL}
                size="sm"
              />
              <div className="overflow-hidden leading-tight">
                <div className="text-[14px] font-medium text-[#000000] truncate">
                  {profile?.fullName || user?.displayName || 'Admin'}
                </div>
                <div className="text-[12px] text-[#6e6d6c] truncate">Hospital Staff</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-[#6e6d6c] hover:text-[#000000] hover:bg-[#ffffff] rounded-[8px] transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
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
                Hospital Resource Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
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
    </div>
  );
}
