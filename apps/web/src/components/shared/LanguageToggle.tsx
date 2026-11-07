import React, { useEffect } from 'react';
import { useLanguageStore, SupportedLanguage } from '../../stores/language.store';

const OPTIONS: { id: SupportedLanguage; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'bn', label: 'বাংলা' },
];

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLanguage, toggleLanguage, t } = useLanguageStore();

  // Keyboard shortcut: Alt + L to toggle language
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        toggleLanguage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleLanguage]);

  // Synchronize <html lang="...">
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className={`inline-flex rounded-full bg-[#e1f4df] p-0.5 select-none ${className}`}
    >
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          lang={o.id}
          type="button"
          aria-pressed={lang === o.id}
          onClick={() => setLanguage(o.id)}
          className={`h-7 sm:h-8 min-w-[52px] sm:min-w-[56px] px-3 rounded-full border text-[13px] font-medium transition-colors cursor-pointer ${
            lang === o.id
              ? 'bg-[#fffefc] text-[#0f3e17] border-[#b1dbb8]'
              : 'border-transparent text-[#222222] hover:text-[#0f3e17]'
          }`}
        >
          {o.label}
        </button>
      ))}
      <span className="sr-only" aria-live="polite">
        {lang === 'bn' ? 'ভাষা বাংলায় পরিবর্তিত হয়েছে' : 'Language changed to English'}
      </span>
    </div>
  );
}

