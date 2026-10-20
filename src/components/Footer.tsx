'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Heart, ShieldCheck, Mail, MapPin, Globe } from 'lucide-react';
import { CITIES } from '@/lib/prayer-calc';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const cityKeys = Object.keys(CITIES);
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Banner */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-700/40">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Edge-Powered Solar Precision</h4>
              <p className="text-slate-400 text-xs mt-0.5">Calculated natively on Cloudflare Edge with astronomical algorithms.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-900/60 text-amber-400 flex items-center justify-center shrink-0 border border-amber-700/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Authentic Scholarly Standards</h4>
              <p className="text-slate-400 text-xs mt-0.5">Adhering to Karachi, Umm Al-Qura, MWL, and classical Fiqh guidelines.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-900/60 text-teal-400 flex items-center justify-center shrink-0 border border-teal-700/40">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Zero Third-Party Dependency</h4>
              <p className="text-slate-400 text-xs mt-0.5">High reliability, ultra-fast TTFB, and zero rate limits worldwide.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img
                  src="/logo.png"
                  alt="Namaz-e-Shariq Crescent Logo"
                  className="w-full h-full object-contain filter drop-shadow-xs"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Namaz<span className="text-emerald-400">-e-</span>Shariq
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed pr-6">
              A modern, high-speed Islamic portal dedicated to verified daily prayer times, astronomical waqt calculations, comprehensive namaz rakat tutorials, and spiritual reflections grounded in the authentic Sunnah.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>{t('disclaimer')}</p>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/rakats" className="hover:text-emerald-400 transition">
                  {t('rakats')}
                </Link>
              </li>
              <li>
                <Link href="/quran" className="hover:text-emerald-400 transition">
                  {t('quran', 'Quran (Mushaf & Index)')}
                </Link>
              </li>
              <li>
                <Link href="/prayer-times" className="hover:text-emerald-400 transition">
                  {t('prayerTimes')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition">
                  {t('blogs', 'Blogs')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Fiqh & Waqt Guides */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Fiqh & Resources
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/rakats" className="hover:text-emerald-400 transition">
                  Daily Prayer Rakats
                </Link>
              </li>
              <li>
                <Link href="/quran" className="hover:text-emerald-400 transition">
                  Holy Quran (30 Para PDF)
                </Link>
              </li>
              <li>
                <Link href="/blog/understanding-namaz-timings-calculation-methods" className="hover:text-emerald-400 transition">
                  Solar Waqt Calculation
                </Link>
              </li>
              <li>
                <Link href="/blog/complete-guide-daily-namaz-rakats" className="hover:text-emerald-400 transition">
                  Sunnah & Fard Structure
                </Link>
              </li>
              <li>
                <Link href="/prayer-times" className="hover:text-emerald-400 transition">
                  Global City Directory
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">
                  Scientific Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Separate Dedicated Legal & Compliance Section */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Legal & Policies
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/disclaimer" className="text-emerald-300 hover:text-emerald-200 transition font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {t('disclaimerTitle')}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition">
                  {t('termsOfService')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition">
                  Editorial & Legal Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">
                  Non-Commercial Charter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Theological Notice Box */}
        <div className="mt-10 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="leading-relaxed">
            <strong className="text-emerald-400 font-semibold">Theological Advisory:</strong> Algorithmic solar waqt timetables provide observational guidance. In all districts, the local Mosque Adhan and congregation (*Jamat*) take spiritual precedence.
          </p>
          <Link
            href="/disclaimer"
            className="text-emerald-400 hover:text-emerald-300 font-medium hover:underline shrink-0 text-[11px]"
          >
            Read Full Advisory →
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Namaz-e-Shariq. {t('allRightsReserved')}
          </p>
          <p className="flex items-center gap-1 text-slate-400">
            Dedicated with reverence, precision, and humility for the Ummah worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
