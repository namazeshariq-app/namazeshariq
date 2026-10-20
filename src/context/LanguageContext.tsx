'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { LanguageCode, LANGUAGES, LanguageMeta, TRANSLATIONS } from '@/lib/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  meta: LanguageMeta;
  dir: 'ltr' | 'rtl';
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  meta: LANGUAGES.en,
  dir: 'ltr',
  t: (key: string, fallback?: string) => fallback || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  const applyLanguage = useCallback((code: LanguageCode) => {
    if (!LANGUAGES[code]) return;
    setLanguageState(code);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = code;
      const meta = LANGUAGES[code] || LANGUAGES.en;
      document.documentElement.dir = meta.dir || 'ltr';
      try {
        localStorage.setItem('namaz_lang', code);
      } catch {
        // Safe fallback in restricted environments
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 1. Check URL query ?lang=xx
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang')?.toLowerCase() as LanguageCode | null;
        if (urlLang && LANGUAGES[urlLang]) {
          applyLanguage(urlLang);
          return;
        }
      } catch {
        // Ignore URL error
      }

      // 2. Check localStorage
      try {
        const saved = localStorage.getItem('namaz_lang') as LanguageCode | null;
        if (saved && LANGUAGES[saved]) {
          applyLanguage(saved);
          return;
        }
      } catch {
        // Ignore localStorage error
      }

      // 3. Check browser locale
      try {
        const browserLang = navigator.language.slice(0, 2).toLowerCase() as LanguageCode;
        if (LANGUAGES[browserLang]) {
          applyLanguage(browserLang);
          return;
        }
      } catch {
        // Ignore navigator error
      }
    }
  }, [applyLanguage]);

  const setLanguage = useCallback((code: LanguageCode) => {
    if (LANGUAGES[code]) {
      applyLanguage(code);
    }
  }, [applyLanguage]);

  const t = useCallback((key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return fallback || key;
  }, [language]);

  const currentMeta = LANGUAGES[language] || LANGUAGES.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        meta: currentMeta,
        dir: currentMeta.dir || 'ltr',
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
