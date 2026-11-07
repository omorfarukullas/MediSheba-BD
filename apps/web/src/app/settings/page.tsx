import React, { useState } from 'react';
import { useLanguageStore, useTranslation } from '../../stores/language.store';
import { useAuthStore } from '../../stores/auth.store';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
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
  const { lang } = useLanguageStore();
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
    <div className="max-w-[1120px] mx-auto space-y-7">
      {/* ─── Page Header ─── */}
      <div className="space-y-1">
        <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]/80">
          {lang === 'bn' ? 'ব্যবহারকারী পছন্দসমূহ' : 'Preferences & Setup'}
        </div>
        <h1 className="font-serif text-[32px] sm:text-[38px] font-light text-[#0f3e17] tracking-tight leading-tight">
          {t('settings.title', 'Settings')}
        </h1>
        <p className="text-[14px] text-[#222222]/70">
          {t('settings.desc', 'Manage language, display density, and account preferences.')}
        </p>
      </div>

      {/* Floating Save Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-[#0f3e17] text-[#fffefc] text-xs font-medium rounded-full flex items-center gap-2 border border-[#0c2f10] shadow-none">
          <CheckCircle2 className="w-4 h-4 text-[#b1dbb8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* 1. Language Row */}
        <Card variant="default" padding="lg" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[15px] font-medium text-[#0f3e17] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#0f3e17]" />
                <span>{t('settings.language', 'Language')}</span>
              </div>
              <p className="text-xs text-[#222222]/60">
                {lang === 'bn' ? 'বাংলা এবং ইংরেজির মধ্যে তাৎক্ষণিক পরিবর্তন করুন' : 'Instant toggle between English and Bengali'}
              </p>
            </div>
            <LanguageToggle />
          </div>
        </Card>

        {/* 2. Bangla Digits Row */}
        <Card variant="default" padding="lg" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[15px] font-medium text-[#0f3e17]">
                {t('settings.banglaDigits', 'Use Bangla digits (০–৯)')}
              </div>
              <p className="text-xs text-[#222222]/60">
                {t('settings.banglaDigitsDesc', 'Display numbers in Bangla script where applicable')}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={banglaDigits}
              onClick={() => handleBanglaDigitsToggle(!banglaDigits)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                banglaDigits ? 'bg-[#0f3e17]' : 'bg-[#efeeeb]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#fffefc] transition duration-200 ease-in-out ${
                  banglaDigits ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </Card>

        {/* 3. Text Size Row */}
        <Card variant="default" padding="lg" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[15px] font-medium text-[#0f3e17] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#0f3e17]" />
                <span>{t('settings.textSize', 'Text size')}</span>
              </div>
              <p className="text-xs text-[#222222]/60">
                {t('settings.textSizeDesc', 'Increase font size for improved reading comfort (+2px)')}
              </p>
            </div>
            <div className="inline-flex rounded-full bg-[#e1f4df] p-1">
              <button
                type="button"
                onClick={() => handleTextSizeChange('normal')}
                className={`h-8 px-4 rounded-full text-xs font-medium transition-colors ${
                  textSize === 'normal'
                    ? 'bg-[#fffefc] text-[#0f3e17] border border-[#efeeeb]'
                    : 'text-[#222222]/70 hover:text-[#0f3e17]'
                }`}
              >
                {t('settings.normal', 'Normal')}
              </button>
              <button
                type="button"
                onClick={() => handleTextSizeChange('large')}
                className={`h-8 px-4 rounded-full text-xs font-medium transition-colors ${
                  textSize === 'large'
                    ? 'bg-[#fffefc] text-[#0f3e17] border border-[#efeeeb]'
                    : 'text-[#222222]/70 hover:text-[#0f3e17]'
                }`}
              >
                {t('settings.large', 'Large')}
              </button>
            </div>
          </div>
        </Card>

        {/* 4. Week Starts On */}
        <Card variant="default" padding="lg" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[15px] font-medium text-[#0f3e17] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0f3e17]" />
                <span>{t('settings.weekStartsOn', 'Week starts on')}</span>
              </div>
              <p className="text-xs text-[#222222]/60">
                {t('settings.weekStartsOnDesc', 'First day of the week in appointment calendars')}
              </p>
            </div>
            <div className="inline-flex rounded-full bg-[#e1f4df] p-1">
              <button
                type="button"
                onClick={() => handleWeekStartChange('saturday')}
                className={`h-8 px-4 rounded-full text-xs font-medium transition-colors ${
                  weekStartsOn === 'saturday'
                    ? 'bg-[#fffefc] text-[#0f3e17] border border-[#efeeeb]'
                    : 'text-[#222222]/70 hover:text-[#0f3e17]'
                }`}
              >
                {t('settings.saturday', 'Saturday')}
              </button>
              <button
                type="button"
                onClick={() => handleWeekStartChange('sunday')}
                className={`h-8 px-4 rounded-full text-xs font-medium transition-colors ${
                  weekStartsOn === 'sunday'
                    ? 'bg-[#fffefc] text-[#0f3e17] border border-[#efeeeb]'
                    : 'text-[#222222]/70 hover:text-[#0f3e17]'
                }`}
              >
                {t('settings.sunday', 'Sunday')}
              </button>
            </div>
          </div>
        </Card>

        {/* 5. SMS & Notification Preferences */}
        <Card variant="default" padding="lg" className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#efeeeb]">
            <Bell className="w-4 h-4 text-[#0f3e17]" />
            <h3 className="font-serif text-lg font-light text-[#0f3e17]">
              {lang === 'bn' ? 'বিজ্ঞপ্তি ও নোটিফিকেশন' : 'Notifications & Alerts'}
            </h3>
          </div>

          <div className="divide-y divide-[#efeeeb]">
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-[#0f3e17]">SMS Reminders</div>
                <div className="text-xs text-[#222222]/60">Receive SMS for upcoming chamber queue numbers</div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={smsReminders}
                onClick={() => handleSmsToggle(!smsReminders)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  smsReminders ? 'bg-[#0f3e17]' : 'bg-[#efeeeb]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#fffefc] transition duration-200 ease-in-out ${
                    smsReminders ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-[#0f3e17]">Email Updates</div>
                <div className="text-xs text-[#222222]/60">Receive clinical summary and prescription copies via email</div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={emailReminders}
                onClick={() => handleEmailToggle(!emailReminders)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  emailReminders ? 'bg-[#0f3e17]' : 'bg-[#efeeeb]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#fffefc] transition duration-200 ease-in-out ${
                    emailReminders ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* 6. Account & Security */}
        <Card variant="default" padding="lg" className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#efeeeb]">
            <Shield className="w-4 h-4 text-[#0f3e17]" />
            <h3 className="font-serif text-lg font-light text-[#0f3e17]">
              {lang === 'bn' ? 'নিরাপত্তা ও সেশন' : 'Security & Session'}
            </h3>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium text-[#0f3e17]">Auto Sign-Out Idle Timer</div>
              <div className="text-xs text-[#222222]/60">Automatically locks patient portal when inactive</div>
            </div>
            <select
              value={autoSignOutMinutes}
              onChange={(e) => handleAutoSignOutChange(Number(e.target.value))}
              className="h-10 px-3 text-xs border border-[#efeeeb] rounded-[10px] bg-[#fffefc] text-[#0f3e17] focus:outline-none focus:ring-1 focus:ring-[#0f3e17]"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
        </Card>
      </div>
    </div>
  );
}
