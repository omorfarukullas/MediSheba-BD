import { create } from 'zustand';
import enTranslations from '../locales/en/translation.json';
import bnTranslations from '../locales/bn/translation.json';

export type SupportedLanguage = 'en' | 'bn';

interface LanguageState {
  lang: SupportedLanguage;
  t: (key: string) => string;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
}

const dictionaries = {
  en: enTranslations,
  bn: bnTranslations
};

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // Fallback to raw key if missing
    }
  }

  return typeof current === 'string' ? current : path;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  lang: (localStorage.getItem('medisheba_lang') as SupportedLanguage) || 'bn', // Default to Bengali for BD users
  
  t: (key: string) => {
    const currentLang = get().lang;
    const dictionary = dictionaries[currentLang] as Record<string, unknown>;
    return getNestedValue(dictionary, key);
  },

  setLanguage: (lang: SupportedLanguage) => {
    localStorage.setItem('medisheba_lang', lang);
    set({ lang });
  },

  toggleLanguage: () => {
    const nextLang = get().lang === 'en' ? 'bn' : 'en';
    localStorage.setItem('medisheba_lang', nextLang);
    set({ lang: nextLang });
  }
}));

export function useTranslation() {
  const { t, lang } = useLanguageStore();
  return {
    t: (key: string, fallback?: string) => {
      const val = t(key);
      return val === key && fallback ? fallback : val;
    },
    lang
  };
}

