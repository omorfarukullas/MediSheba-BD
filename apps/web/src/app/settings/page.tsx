import React, { useState, useEffect } from 'react';
import { useLanguageStore, useTranslation, SupportedLanguage } from '../../stores/language.store';
import { useAuthStore } from '../../stores/auth.store';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LanguageToggle } from '../../components/shared/LanguageToggle';
import {
  Globe,
  Sliders,
  Bell,
  Shield,
  User,
  Calendar,
  LogOut,
  CheckCircle2,
  Lock
} from 'lucide-react';

export function SettingsPage() {
  const { t } = useTranslation();
  const { lang, setLanguage } = useLanguageStore();
  const { user, profile, logout } = useAuthStore();

  const [banglaDigits, setBanglaDigits] = useState<boolean>(() => {
    return localStorage.getItem('medisheba_bangla_digits') === 'true';
  });

  const [textSize, setTextSize] = useState<'normal' | 'large'>(() => {
    return (localStorage.getItem('medisheba_text_size') as 'normal' | 'large') || 'normal';
  });

  const [weekStartsOn, setWeekStartsOn] = useState<'saturday' | 'sunday'>(() => {
    return (localStorage.getItem('medisheba_week_start') as 'saturday' | 'sunday') || 'saturday';
  });

  const [smsReminders, setSmsReminders] = useState<boolean>(() => {
    return localStorage.getItem('medisheba_sms_reminders') !== 'false';
  });

  const [emailReminders, setEmailReminders] = useState<boolean>(() => {
    return localStorage.getItem('medisheba_email_reminders') !== 'false';
  });

  const [autoSignOutMinutes, setAutoSignOutMinutes] = useState<number>(() => {
    return Number(localStorage.getItem('medisheba_auto_signout')) || 15;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showSavedToast = () => {
    setToastMessage(t('settings.saved', 'Settings saved'));
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleBanglaDigitsToggle = (val: boolean) => {
    setBanglaDigits(val);
    localStorage.setItem('medisheba_bangla_digits', String(val));
    showSavedToast();
  };

  const handleTextSizeChange = (size: 'normal' | 'large') => {
    setTextSize(size);
    localStorage.setItem('medisheba_text_size', size);
    if (size === 'large') {
      document.documentElement.classList.add('text-size-large');
    } else {
      document.documentElement.classList.remove('text-size-large');
    }
    showSavedToast();
  };

  const handleWeekStartChange = (start: 'saturday' | 'sunday') => {
    setWeekStartsOn(start);
    localStorage.setItem('medisheba_week_start', start);
    showSavedToast();
  };

  const handleSmsToggle = (val: boolean) => {
    setSmsReminders(val);
    localStorage.setItem('medisheba_sms_reminders', String(val));
    showSavedToast();
  };

  const handleEmailToggle = (val: boolean) => {
    setEmailReminders(val);
    localStorage.setItem('medisheba_email_reminders', String(val));
    showSavedToast();
  };

  const handleAutoSignOutChange = (minutes: number) => {
    setAutoSignOutMinutes(minutes);
    localStorage.setItem('medisheba_auto_signout', String(minutes));
    showSavedToast();
  };

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Page Header ─── */}
      <div className="space-y-1">
        <h1 className="text-[28px] font-semibold text-ink leading-tight">
          {t('settings.title', 'Settings')}
        </h1>
        <p className="text-sm text-text-2">
          {t('settings.desc', 'Manage language, display density, and account preferences.')}
        </p>
      </div>

      {/* Floating Save Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-ink text-white text-xs font-medium rounded-lg flex items-center gap-2 border border-border-strong animate-fade-in">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* 1. Language Row */}
        <Card padding="md" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-ink flex items-center gap-2">
                <Globe className="w-4 h-4 text-text-3" />
                <span>{t('settings.language', 'Language')}</span>
              </div>
              <p className="text-xs text-text-3">
                {lang === 'bn' ? 'বাংলা এবং ইংরেজির মধ্যে তাৎক্ষণিক পরিবর্তন করুন' : 'Instant toggle between English and Bengali'}
              </p>
            </div>
            <LanguageToggle />
          </div>
        </Card>

        {/* 2. Bangla Digits Row */}
        <Card padding="md" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-ink">
                {t('settings.banglaDigits', 'Use Bangla digits (০–৯)')}
              </div>
              <p className="text-xs text-text-3">
                {t('settings.banglaDigitsDesc', 'Display numbers in Bangla script where applicable')}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={banglaDigits}
              onClick={() => handleBanglaDigitsToggle(!banglaDigits)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                banglaDigits ? 'bg-accent' : 'bg-border-strong'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-none ring-0 transition duration-200 ease-in-out ${
                  banglaDigits ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </Card>

        {/* 3. Text Size Row */}
        <Card padding="md" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-ink flex items-center gap-2">
                <Sliders className="w-4 h-4 text-text-3" />
                <span>{t('settings.textSize', 'Text size')}</span>
              </div>
              <p className="text-xs text-text-3">
                {t('settings.textSizeDesc', 'Increase font size for improved reading comfort (+2px)')}
              </p>
            </div>
            <div className="inline-flex rounded-lg bg-subtle p-0.5">
              <button
                type="button"
                onClick={() => handleTextSizeChange('normal')}
                className={`h-8 px-3 rounded-md text-xs font-medium transition-colors ${
                  textSize === 'normal'
                    ? 'bg-canvas text-ink border border-border-strong'
                    : 'text-text-2 hover:text-ink'
                }`}
              >
                {t('settings.normal', 'Normal')}
              </button>
              <button
                type="button"
                onClick={() => handleTextSizeChange('large')}
                className={`h-8 px-3 rounded-md text-xs font-medium transition-colors ${
                  textSize === 'large'
                    ? 'bg-canvas text-ink border border-border-strong'
                    : 'text-text-2 hover:text-ink'
                }`}
              >
                {t('settings.large', 'Large')}
              </button>
            </div>
          </div>
        </Card>

        {/* 4. Week Starts On */}
        <Card padding="md" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-ink flex items-center gap-2">
                <Calendar className="w-4 h-4 text-text-3" />
                <span>{t('settings.weekStartsOn', 'Week starts on')}</span>
              </div>
              <p className="text-xs text-text-3">
                {t('settings.weekStartsOnDesc', 'First day of the week in appointment calendars')}
              </p>
            </div>
            <div className="inline-flex rounded-lg bg-subtle p-0.5">
              <button
                type="button"
                onClick={() => handleWeekStartChange('saturday')}
                className={`h-8 px-3 rounded-md text-xs font-medium transition-colors ${
                  weekStartsOn === 'saturday'
                    ? 'bg-canvas text-ink border border-border-strong'
                    : 'text-text-2 hover:text-ink'
                }`}
              >
                {t('settings.saturday', 'Saturday')}
              </button>
              <button
                type="button"
                onClick={() => handleWeekStartChange('sunday')}
                className={`h-8 px-3 rounded-md text-xs font-medium transition-colors ${
                  weekStartsOn === 'sunday'
                    ? 'bg-canvas text-ink border border-border-strong'
                    : 'text-text-2 hover:text-ink'
                }`}
              >
                {t('settings.sunday', 'Sunday')}
              </button>
            </div>
          </div>
        </Card>

        {/* 5. Reminders */}
        <Card padding="md" className="space-y-4">
          <div className="space-y-0.5 pb-2 border-b border-border">
            <div className="text-sm font-semibold text-ink flex items-center gap-2">
              <Bell className="w-4 h-4 text-text-3" />
              <span>{t('settings.reminders', 'Appointment Reminders')}</span>
            </div>
            <p className="text-xs text-text-3">
              {lang === 'bn' ? 'সিরিয়াল ও অ্যাপয়েন্টমেন্ট সম্পর্কিত জরুরি বিজ্ঞপ্তি' : 'SMS and email notifications prior to consultation'}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-ink">{t('settings.smsReminders', 'SMS notification alerts')}</span>
            <button
              type="button"
              role="switch"
              aria-checked={smsReminders}
              onClick={() => handleSmsToggle(!smsReminders)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                smsReminders ? 'bg-accent' : 'bg-border-strong'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-none ring-0 transition duration-200 ease-in-out ${
                  smsReminders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-ink">{t('settings.emailReminders', 'Email reminder updates')}</span>
            <button
              type="button"
              role="switch"
              aria-checked={emailReminders}
              onClick={() => handleEmailToggle(!emailReminders)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                emailReminders ? 'bg-accent' : 'bg-border-strong'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-none ring-0 transition duration-200 ease-in-out ${
                  emailReminders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </Card>

        {/* 6. Privacy & Auto Sign-out */}
        <Card padding="md" className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-ink flex items-center gap-2">
                <Shield className="w-4 h-4 text-text-3" />
                <span>{t('settings.autoSignOut', 'Auto sign-out after inactivity')}</span>
              </div>
              <p className="text-xs text-text-3">
                {t('settings.autoSignOutDesc', 'Automatically secure your account session (minutes)')}
              </p>
            </div>
            <div className="inline-flex rounded-lg bg-subtle p-0.5">
              {[15, 30, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => handleAutoSignOutChange(mins)}
                  className={`h-8 px-3 rounded-md text-xs font-medium transition-colors ${
                    autoSignOutMinutes === mins
                      ? 'bg-canvas text-ink border border-border-strong'
                      : 'text-text-2 hover:text-ink'
                  }`}
                >
                  {mins} {lang === 'bn' ? 'মিনিট' : 'min'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* 7. Account Summary */}
        <Card padding="md" className="space-y-4">
          <div className="space-y-0.5 pb-2 border-b border-border">
            <div className="text-sm font-semibold text-ink flex items-center gap-2">
              <User className="w-4 h-4 text-text-3" />
              <span>{t('settings.account', 'Account details')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-text-3">{lang === 'bn' ? 'নাম' : 'Full Name'}</div>
              <div className="font-medium text-ink mt-0.5">
                {profile?.fullName || user?.displayName || 'MediSheba User'}
              </div>
            </div>
            <div>
              <div className="text-xs text-text-3">{lang === 'bn' ? 'ইমেইল' : 'Email Address'}</div>
              <div className="font-medium text-ink mt-0.5">
                {user?.email || 'user@medisheba.com'}
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-border">
            <span className="text-xs text-text-3">
              {lang === 'bn' ? 'নিরাপদ হেলথ সেশন' : 'Secure Healthcare Session'}
            </span>
            <Button
              variant="danger"
              size="compact"
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
              onClick={logout}
            >
              {t('action.signOut', 'Sign Out')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
