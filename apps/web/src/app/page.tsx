import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../stores/language.store';
import { useAuthStore, getRoleDashboardUrl } from '../stores/auth.store';
import { LanguageToggle } from '../components/shared/LanguageToggle';
import { Button } from '../components/ui/Button';
import { Card, StatCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AlertBanner } from '../components/ui/AlertBanner';
import {
  Calendar,
  Clock,
  Search,
  Check,
  AlertCircle,
  Stethoscope,
  ChevronRight,
  Phone,
  FileText
} from 'lucide-react';

export function PublicLandingPage() {
  const { lang, t } = useLanguageStore();
  const { user, profile, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#111111] flex flex-col font-sans">
      {/* ─── Top Bar (56px, Section 5) ─── */}
      <header className="h-14 border-b border-[#e7e5e4] px-4 sm:px-8 flex items-center justify-between bg-[#ffffff] sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#111111] text-white grid place-items-center text-xs font-semibold">
            M
          </div>
          <span className="text-[16px] font-semibold text-[#111111]">
            {t('app_name')}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* One-click LanguageToggle */}
          <LanguageToggle />

          {user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate(getRoleDashboardUrl(profile?.role))}
              >
                {t('nav.dashboard')}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => logout()}>
                {t('action.signOut')}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  {t('action.signIn')}
                </Button>
              </Link>
              <Link to="/patient/doctors">
                <Button variant="primary" size="sm">
                  {t('action.book')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* ─── Main Content Well (Max 1120px, Section 8) ─── */}
      <main className="max-w-[1120px] w-full mx-auto p-4 sm:p-8 space-y-8 flex-1">
        {/* Page Title & One-line Description (Section 8) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
          <div>
            <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111] leading-tight">
              {lang === 'bn' ? 'স্মার্ট ডাক্তার সিরিয়াল ও স্বাস্থ্য সেবা' : 'Smart Doctor Booking & Live Queues'}
            </h1>
            <p className="text-[14px] text-[#57534e] mt-1">
              {lang === 'bn'
                ? 'চেম্বারের লাইভ সিরিয়াল ট্র্যাক করুন এবং হাসপাতালে অপেক্ষার সময় কমান।'
                : 'Track live chamber queues from home and arrive just before your turn.'}
            </p>
          </div>

          <div className="shrink-0">
            <Link to="/patient/doctors">
              <Button variant="primary" size="md" leftIcon={<Calendar className="w-4 h-4" />}>
                {t('action.book')}
              </Button>
            </Link>
          </div>
        </div>

        {/* ─── Section 1: Next Active Appointment or Search Strip ─── */}
        <div className="rounded-xl border border-[#e7e5e4] bg-[#ffffff] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-medium text-[#78716c] uppercase tracking-[0.04em]">
              {t('appt.todaySchedule')}
            </div>
            <Badge variant="success" size="sm" dot>
              {t('status.active')}
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-y border-[#e7e5e4]">
            <div className="space-y-1">
              <div className="text-[16px] font-semibold text-[#111111]">
                Prof. Dr. Md. Rafiqul Islam
              </div>
              <div className="text-[13px] text-[#57534e]">
                Medicine & Cardiology Specialist · Dhaka Medical College & Hospital
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <div className="text-[12px] text-[#78716c]">{t('appt.nowServing')}</div>
                <div className="text-xl font-semibold text-[#111111]">#14</div>
              </div>
              <div>
                <div className="text-[12px] text-[#78716c]">{t('appt.yourSerial')}</div>
                <div className="text-xl font-semibold text-[#3b5bdb]">#18</div>
              </div>
              <div>
                <div className="text-[12px] text-[#78716c]">{t('appt.estTime')}</div>
                <div className="text-xl font-semibold text-[#111111]">~25 min</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-[13px]">
            <span className="text-[#57534e]">
              Serial tracking updates automatically via WebSocket connection.
            </span>
            <Link to="/patient/appointments" className="text-[#3b5bdb] hover:underline font-medium">
              View live board →
            </Link>
          </div>
        </div>

        {/* ─── Section 2: 4 Identical Stat Cards (Section 7 & 9.2) ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Verified Specialists"
            value="314"
            caption="BMDC certified doctors"
          />
          <StatCard
            label="Partner Hospitals"
            value="48"
            caption="Dhaka, Chittagong & divisions"
          />
          <StatCard
            label="Today's Active Queues"
            value="128"
            caption="Synchronized chambers"
          />
          <StatCard
            label="Emergency Hotline"
            value="999"
            caption="Central ambulance response"
          />
        </div>

        {/* ─── Emergency Callout Notice (Section 10.2 #9) ─── */}
        <AlertBanner
          variant="info"
          action={{
            label: "Open 999 Ambulance Dispatch",
            onClick: () => navigate('/emergency')
          }}
        >
          {t('emergency.note')}
        </AlertBanner>
      </main>

      {/* ─── Clean Minimal Footer (Section 1) ─── */}
      <footer className="border-t border-[#e7e5e4] bg-[#f7f7f5] py-6 px-4 text-center text-[13px] text-[#78716c]">
        <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#111111]">{t('app_name')}</span>
            <span>·</span>
            <span>{t('tagline')}</span>
          </div>
          <div>© 2026 {t('app_name')}. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
