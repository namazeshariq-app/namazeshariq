'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Clock,
  BookOpen,
  BookMarked,
  Menu,
  X,
  Search,
  Mail,
  Info,
  Sun,
  Moon,
  Globe,
  Check,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { CITIES } from '@/lib/prayer-calc';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { LANGUAGES, LanguageCode } from '@/lib/translations';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, meta, t } = useLanguage();

  // Close language dropdown when clicking or touching outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Handle Search Submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    setSearchOpen(false);
    setMobileMenuOpen(false);

    // Check for city match and route to dedicated location page
    for (const [key, city] of Object.entries(CITIES)) {
      const cityName = city.name.toLowerCase();
      if (query.includes(key) || query.includes(cityName) || cityName.includes(query)) {
        router.push(`/prayer-times/${city.slug}`);
        return;
      }
    }

    const synonyms: Record<string, string> = {
      bengaluru: 'bangalore',
      calcutta: 'kolkata',
      chattogram: 'chittagong',
      nyc: 'new-york',
      uae: 'dubai',
    };
    for (const [syn, slug] of Object.entries(synonyms)) {
      if (query.includes(syn)) {
        router.push(`/prayer-times/${slug}`);
        return;
      }
    }

    router.push(`/blog?q=${encodeURIComponent(query)}`);
  };

  const selectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Liquid glass transparent-as-water container with bottom radius only & single thin border on bottom side */}
      <div className="w-full bg-white/30 dark:bg-slate-950/30 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.25)] rounded-b-2xl sm:rounded-b-3xl transition-all duration-200 relative overflow-visible">
        {/* Top micro banner for tablet and desktop */}
        <div className="bg-brand-950/20 dark:bg-black/30 text-slate-800 dark:text-slate-200 text-xs py-1 px-4 hidden sm:block border-b border-slate-200/40 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="truncate">{t('bannerText')}</span>
            </span>
            <div className="flex items-center gap-3 sm:gap-4 text-slate-700 dark:text-slate-300 text-[11px] font-medium shrink-0 ml-2">
              <Link href="/prayer-times/bangalore" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                Bangalore
              </Link>
              <Link href="/prayer-times/karachi" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                Karachi
              </Link>
              <Link href="/prayer-times/delhi" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                Delhi
              </Link>
              <Link href="/prayer-times/dhaka" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                Dhaka
              </Link>
              <Link href="/prayer-times/dubai" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                Dubai
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo: User Provided Crescent Moon & Star */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group shrink-0"
              aria-label="Namaz-e-Shariq Homepage"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src="/logo.png"
                  alt="Namaz-e-Shariq Logo"
                  className="w-full h-full object-contain filter drop-shadow-xs"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                  Namaz<span className="text-brand-700 dark:text-emerald-400">-e-</span>Shariq
                </span>
                <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest hidden md:block">
                  Prayer Times & Sunnah
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Shown on Laptops & Desktops: lg+) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                href="/"
                className="px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/60 transition"
              >
                {t('home')}
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/60 transition"
              >
                <Info className="w-3.5 h-3.5 text-brand-600 dark:text-emerald-400" />
                {t('about')}
              </Link>
              <Link
                href="/rakats"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/60 transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-brand-600 dark:text-emerald-400" />
                {t('rakats')}
              </Link>
              <Link
                href="/quran"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/60 transition"
              >
                <BookMarked className="w-3.5 h-3.5 text-brand-600 dark:text-emerald-400" />
                {t('quran', 'Quran')}
              </Link>
              <Link
                href="/prayer-times"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/60 transition"
              >
                <Clock className="w-3.5 h-3.5 text-brand-600 dark:text-emerald-400" />
                {t('prayerTimes')}
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/60 transition"
              >
                <FileText className="w-3.5 h-3.5 text-brand-600 dark:text-emerald-400" />
                {t('blogs', 'Blogs')}
              </Link>
              <Link
                href="/faqs"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/60 transition"
              >
                <HelpCircle className="w-3.5 h-3.5 text-brand-600 dark:text-emerald-400" />
                <span>FAQs</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/60 transition"
              >
                <Mail className="w-3.5 h-3.5 text-brand-600 dark:text-emerald-400" />
                {t('contact')}
              </Link>
            </nav>

            {/* Right Side Action Controls: Responsive across Mobile, Tablet, and Desktop */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Desktop Search Button / Input */}
              <div className="hidden lg:block relative">
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="relative flex items-center">
                    <input
                      type="text"
                      placeholder={t('searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-48 xl:w-56 pl-3 pr-8 py-1.5 text-xs bg-white/80 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                      aria-label="Search prayer times or blogs"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      aria-label="Close search input"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-slate-700 dark:text-slate-200 hover:text-brand-700 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/60 rounded-lg transition cursor-pointer"
                    title={t('search')}
                    aria-label="Open search input"
                  >
                    <Search className="w-4 h-4 xl:w-5 xl:h-5" />
                  </button>
                )}
              </div>

              {/* Light / Dark Mode Toggle Button (Visible on ALL devices) */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 text-slate-700 dark:text-amber-300 hover:text-brand-700 dark:hover:text-amber-200 hover:bg-white/40 dark:hover:bg-slate-800/60 rounded-lg transition cursor-pointer"
                title={theme === 'dark' ? t('lightMode') : t('darkMode')}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-spin-once" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                )}
              </button>

              {/* Language Switcher Dropdown (Universal: Mobile, Tablet & Desktop) */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 bg-white/50 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/80 rounded-lg border border-slate-300/80 dark:border-slate-700/80 transition cursor-pointer shadow-xs"
                  aria-label={`Select language (current: ${meta.label})`}
                  aria-expanded={langDropdownOpen}
                >
                  <Globe className="w-3.5 h-3.5 text-brand-600 dark:text-emerald-400" />
                  <span>{meta.label}</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400">▼</span>
                </button>

                {langDropdownOpen && (
                  <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 text-xs">
                    <div className="px-3 py-1.5 font-semibold text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                      {t('language')}
                    </div>
                    {(Object.keys(LANGUAGES) as LanguageCode[]).map((code) => {
                      const item = LANGUAGES[code];
                      const isSelected = language === code;
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => selectLanguage(code)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-left rtl:text-right hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer ${
                            isSelected
                              ? 'text-brand-700 dark:text-emerald-400 font-bold bg-brand-50/50 dark:bg-emerald-950/30'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{item.flag}</span>
                            <span className="font-semibold">{item.label}</span>
                            <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                              ({item.nativeName})
                            </span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 dark:text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Hamburger Menu Toggle Button (Visible on Mobile & Tablet: lg:hidden) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-white/40 dark:hover:bg-slate-800 cursor-pointer ml-0.5"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer (lg:hidden) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/50 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 transition-colors duration-200 rounded-b-2xl shadow-xl">
            {/* Quick Search inside Drawer */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500"
                  aria-label="Search mobile"
                />
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              </div>
            </form>

            {/* Navigation links */}
            <div className="space-y-1 pt-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-700 dark:hover:text-emerald-400 transition"
              >
                {t('home')}
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-700 dark:hover:text-emerald-400 transition"
              >
                <Info className="w-4 h-4 text-brand-600 dark:text-emerald-400" />
                {t('about')}
              </Link>
              <Link
                href="/rakats"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-700 dark:hover:text-emerald-400 transition"
              >
                <BookOpen className="w-4 h-4 text-brand-600 dark:text-emerald-400" />
                {t('rakats')}
              </Link>
              <Link
                href="/quran"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-700 dark:hover:text-emerald-400 transition"
              >
                <BookMarked className="w-4 h-4 text-brand-600 dark:text-emerald-400" />
                {t('quran', 'Quran')}
              </Link>
              <Link
                href="/prayer-times"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-700 dark:hover:text-emerald-400 transition"
              >
                <Clock className="w-4 h-4 text-brand-600 dark:text-emerald-400" />
                {t('prayerTimes')}
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-700 dark:hover:text-emerald-400 transition"
              >
                <FileText className="w-4 h-4 text-brand-600 dark:text-emerald-400" />
                {t('blogs', 'Blogs')}
              </Link>
              <Link
                href="/faqs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-700 dark:hover:text-emerald-400 transition"
              >
                <HelpCircle className="w-4 h-4 text-brand-600 dark:text-emerald-400" />
                <span>FAQs Hub</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-700 dark:hover:text-emerald-400 transition"
              >
                <Mail className="w-4 h-4 text-brand-600 dark:text-emerald-400" />
                {t('contact')}
              </Link>
            </div>

            {/* Language Selector Pills inside Drawer */}
            <div className="bg-slate-100 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-200 dark:border-slate-700/60 mt-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-1 pb-1.5">
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-brand-600 dark:text-emerald-400" />
                  {t('language')}:
                </span>
                <span className="text-brand-700 dark:text-emerald-400 font-bold uppercase">
                  {meta.label} ({meta.nativeName})
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1" dir="ltr">
                {(Object.keys(LANGUAGES) as LanguageCode[]).map((code) => {
                  const item = LANGUAGES[code];
                  const active = language === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLanguage(code)}
                      className={`py-1.5 px-1 rounded-lg text-xs font-bold text-center transition cursor-pointer flex flex-col items-center justify-center ${
                        active
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600'
                      }`}
                      aria-label={`Switch to ${item.nativeName} (${item.label})`}
                    >
                      <span className="text-sm">{item.flag}</span>
                      <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
