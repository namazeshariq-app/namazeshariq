import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Compass,
  BookOpen,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  HeartHandshake,
} from 'lucide-react';
import PrayerWidget from '@/components/PrayerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import HeroTypewriter from '@/components/HeroTypewriter';
import CrescentMoonBackground from '@/components/CrescentMoonBackground';
import { getPosts } from '@/lib/db';
import { generateFAQSchema, getAlternateLanguages, SITE_URL } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Namaz-e-Shariq | Accurate Prayer Times & Rakats',
  description:
    'Verified today namaz timings, accurate daily prayer schedules, and authentic namaz rakats guides for Bangalore, Delhi, Karachi, and global cities.',
  alternates: getAlternateLanguages('/'),
};

export default async function HomePage() {
  const posts = await getPosts({ status: 'published', limit: 5 });

  const homeFaqs = [
    {
      question: 'How are today namaz timings calculated on this website?',
      answer:
        'Our calculation engine utilizes astronomical solar coordinates algorithms (tracking Julian day, solar declination, and equation of time) combined with established juristic twilight depression angles (such as the 18°/18° standard mandated by the University of Islamic Sciences Karachi and Muslim World League). All times run directly on edge servers with verified astronomical standards.',
    },
    {
      question: 'How do I know how many rakats to pray for each daily namaz?',
      answer:
        'Daily prayers total 17 obligatory (Fard) rakats plus 12 Sunnah Mu’akkadah and the 3 Witr prayer: Fajr (2 Sunnah, 2 Fard = 4), Dhuhr (4 Sunnah, 4 Fard, 2 Sunnah, 2 Nafl = 12), Asr (4 Sunnah, 4 Fard = 8), Maghrib (3 Fard, 2 Sunnah, 2 Nafl = 7), and Isha (4 Sunnah, 4 Fard, 2 Sunnah, 2 Nafl, 3 Witr, 2 Nafl = 17).',
    },
    {
      question: 'What is the difference between Hanafi and Shafi’i Asr prayer time?',
      answer:
        'The difference lies in the shadow length factor used to define the entry of Asr. The Shafi’i, Maliki, and Hanbali schools state Asr begins when an object’s shadow equals its length plus midday shadow (Factor 1). The Hanafi school states Asr begins when the shadow reaches twice the object’s length plus midday shadow (Factor 2), approximately 45 to 60 minutes later.',
    },
    {
      question: 'What is "Fajr last time" and can I pray during sunrise?',
      answer:
        'Fajr waqt expires the exact moment the edge of the sun crosses above the horizon (Shurooq / Sunrise). Offering prayer during sunrise is strictly prohibited (Makruh Tahrimi). Once the sun has fully risen about a spear’s length (15 to 20 minutes after sunrise), one may offer Ishraq or make up missed Fajr.',
    },
  ];

  const faqSchema = generateFAQSchema(homeFaqs);

  return (
    <div className="space-y-16 pb-20">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Section with Islamic Copyright-Free Banner & Crescent Moon / Stars in Night Mode */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-16 md:pt-14 md:pb-18 lg:pt-16 lg:pb-20 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        {/* Authentic Copyright-Free Islamic Banner: Worshippers Offering Namaz in Congregation (Jamat) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/namaz-banner.jpg"
            alt="Muslim Worshippers Performing Congregational Namaz (Prayer in Jamat) in Mosque"
            className="w-full h-full object-cover object-[center_28%] sm:object-[center_35%] opacity-85 dark:opacity-65 transition-opacity duration-300 scale-100 sm:scale-105 filter brightness-95 contrast-105"
          />
          {/* Transparent atmospheric overlay that preserves full photo visibility while maintaining readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/15 to-slate-50/90 dark:from-slate-950/50 dark:via-slate-950/30 dark:to-slate-950/90" />
        </div>

        {/* Night Mode Crescent Moon & Stars Animation Layer */}
        <CrescentMoonBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Glass Text Container for High Contrast Readability over the Visible Namaz Banner */}
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl border border-white/60 dark:border-white/10 shadow-lg shadow-black/5">
            {/* Respectful Islamic Bismillah Callout */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100/95 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/60 mb-4 sm:mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • Authentic Sunnah & Waqt Resource</span>
            </div>

            {/* Typewriter Animated Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-tight min-h-[85px] sm:min-h-[110px] md:min-h-[120px] lg:min-h-[135px] flex flex-col items-center justify-center">
              <span className="block text-slate-900 dark:text-slate-100 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-1">
                Explore Verified
              </span>
              <HeroTypewriter />
            </h1>

            <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-slate-800 dark:text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
              Astronomical solar calculations across Bangalore, Karachi, Delhi, Mumbai, Dhaka, Dubai, and 20+ major global hubs. Grounded in pious classical jurisprudence with reverent care for the Ummah.
            </p>
          </div>

          {/* Interactive Live Prayer Widget Container with built-in location detection */}
          <div className="max-w-5xl mx-auto">
            <PrayerWidget initialCity="bangalore" showCitySelector={true} />
          </div>
        </div>
      </section>

      {/* Separate Dedicated Legal & Theological Governance Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-slate-900/80 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 transition-colors duration-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Theological Integrity & Legal Section</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Dedicated Legal Section: Governance, Methodology & Compliance
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Formal legal notices, theological boundaries, and algorithmic calculation disclosures established to protect the sacred integrity of your worship.
              </p>
            </div>
            <Link
              href="/disclaimer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-xs shrink-0 self-start md:self-auto cursor-pointer"
            >
              <span>Full Legal & Theological Disclaimer</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Primacy of Local Mosque Adhan & Jamat
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                All algorithmic prayer timetables provided on Namaz-e-Shariq are calculated for informational guidance. In any locality or neighborhood, the physically audible Adhan proclaimed by your local Sunni mosque and the established congregational prayer (*Salat al-Jama’ah*) carry absolute spiritual precedence over any device or software calculation.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Scientific Precaution (*Ihtiyat*) Standard
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Astronomical solar coordinates are subject to atmospheric temperature gradients, elevation differences, and horizon obstructions. In accordance with established classical Fiqh principles of religious precaution (*Ihtiyat*), worshippers are strongly advised to apply a 2 to 3 minute safety buffer before fast-breaking (*Iftar*) and prayer commencement.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-teal-100/80 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Data Privacy & Ethical Non-Commercial Charter
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Namaz-e-Shariq operates under a solemn ethical trust: we never record your individual identity, monetize prayer timings, or transmit your device location to commercial tracking brokers. Browser location detection runs strictly on your client device in memory, preserving the personal sanctity of your spiritual routine.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              Juristically vetted under classical Hanafi and Shafi’i observational solar criteria.
            </span>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-2">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-2">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-2 font-semibold text-emerald-700 dark:text-emerald-400">
                Theological Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rakat Quick Visual Table Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-900 via-brand-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl relative overflow-hidden border border-brand-800/40">
          {/* Subtle Islamic geometric star watermark in background */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-5 pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full text-emerald-400">
              <polygon points="100,10 120,70 185,70 135,110 155,175 100,135 45,175 65,110 15,70 80,70" />
            </svg>
          </div>

          <div className="relative z-10 w-full">
            {/* Header and CTA row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-3xl">
                <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest block mb-2">
                  Essential Fiqh Knowledge
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">
                  Daily Namaz Rakat Structure at a Glance
                </h2>
                <p className="text-brand-100 text-sm sm:text-base leading-relaxed">
                  Every Muslim performs 17 obligatory (Fard) rakats daily. Adding the emphasized Sunnah Mu’akkadah and Witr brings spiritual completion to your routine with humility (*Khushu*).
                </p>
              </div>

              <Link
                href="/rakats"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-brand-950 font-bold text-sm transition shadow-lg shadow-emerald-500/20 shrink-0 self-start lg:self-auto"
              >
                <BookOpen className="w-4 h-4" />
                <span>Complete Rakat Master Guide</span>
              </Link>
            </div>

            {/* 5 Rakat Cards Stretched Proportionally Across Full Card Width */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
              <div className="bg-white/10 dark:bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 transition flex flex-col items-center justify-center text-center">
                <span className="text-xs sm:text-sm text-emerald-300 block font-bold mb-1">Fajr</span>
                <span className="text-3xl sm:text-4xl font-black text-white my-1">4</span>
                <span className="text-xs font-semibold text-emerald-200/90 mb-1">Total Rakats</span>
                <span className="text-[11px] text-slate-300 block mt-1 pt-1.5 border-t border-white/10 w-full">2 Sunnah + 2 Fard</span>
              </div>

              <div className="bg-white/10 dark:bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 transition flex flex-col items-center justify-center text-center">
                <span className="text-xs sm:text-sm text-emerald-300 block font-bold mb-1">Dhuhr</span>
                <span className="text-3xl sm:text-4xl font-black text-white my-1">12</span>
                <span className="text-xs font-semibold text-emerald-200/90 mb-1">Total Rakats</span>
                <span className="text-[11px] text-slate-300 block mt-1 pt-1.5 border-t border-white/10 w-full">4S + 4F + 2S + 2N</span>
              </div>

              <div className="bg-white/10 dark:bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 transition flex flex-col items-center justify-center text-center">
                <span className="text-xs sm:text-sm text-emerald-300 block font-bold mb-1">Asr</span>
                <span className="text-3xl sm:text-4xl font-black text-white my-1">8</span>
                <span className="text-xs font-semibold text-emerald-200/90 mb-1">Total Rakats</span>
                <span className="text-[11px] text-slate-300 block mt-1 pt-1.5 border-t border-white/10 w-full">4 Sunnah + 4 Fard</span>
              </div>

              <div className="bg-white/10 dark:bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 transition flex flex-col items-center justify-center text-center">
                <span className="text-xs sm:text-sm text-emerald-300 block font-bold mb-1">Maghrib</span>
                <span className="text-3xl sm:text-4xl font-black text-white my-1">7</span>
                <span className="text-xs font-semibold text-emerald-200/90 mb-1">Total Rakats</span>
                <span className="text-[11px] text-slate-300 block mt-1 pt-1.5 border-t border-white/10 w-full">3 Fard + 2S + 2N</span>
              </div>

              <div className="bg-white/10 dark:bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 transition flex flex-col items-center justify-center text-center col-span-2 sm:col-span-1">
                <span className="text-xs sm:text-sm text-emerald-300 block font-bold mb-1">Isha</span>
                <span className="text-3xl sm:text-4xl font-black text-white my-1">17</span>
                <span className="text-xs font-semibold text-emerald-200/90 mb-1">Total Rakats</span>
                <span className="text-[11px] text-slate-300 block mt-1 pt-1.5 border-t border-white/10 w-full">4S + 4F + 2S + 2N + 3W + 2N</span>
              </div>
            </div>

            {/* Bottom Full-Width Stats & Highlights Bar */}
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-brand-100">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span><strong>17</strong> Obligatory (Fard) Rakats</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                  <span><strong>12</strong> Sunnah Mu’akkadah</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span><strong>3</strong> Witr Wajib</span>
                </span>
              </div>
              <Link
                href="/rakats"
                className="text-emerald-300 hover:text-white underline underline-offset-2 flex items-center gap-1 font-semibold"
              >
                <span>Step-by-step prayer tutorial</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Major Cities Today Namaz Timings Directory Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 transition-colors duration-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Verified Regional Waqt Timetables</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Today Namaz Times &amp; Prayer Timetables by City
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Direct access to high-accuracy astronomical waqt boundaries, local mosque Azan schedules, and Hanafi &amp; Shafi’i Asr options.
              </p>
            </div>
            <Link
              href="/prayer-times"
              className="text-xs font-bold text-brand-700 dark:text-emerald-400 hover:text-brand-900 dark:hover:text-emerald-300 flex items-center gap-1 shrink-0 group"
            >
              <span>View All 20+ Global Cities</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Calicut Card */}
            <Link
              href="/prayer-times/calicut"
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-slate-800/40 transition group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-0.5">
                    Kerala • Malabar Coast
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Namaz Time Calicut (Kozhikode)
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Daily prayer schedule for <strong>namaz time calicut</strong> following Samastha Kerala Jam’iyyathul Ulama guidelines with Shafi’i and Hanafi Asr options.
              </p>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group-hover:underline pt-1">
                Check Calicut Timetable &rarr;
              </span>
            </Link>

            {/* Delhi Card */}
            <Link
              href="/prayer-times/delhi"
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-slate-800/40 transition group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-brand-600 dark:text-emerald-400 uppercase tracking-wider block mb-0.5">
                    India NCR • Jama Masjid
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-brand-600 dark:group-hover:text-emerald-400 transition-colors">
                    Namaz Time in Delhi Hanafi
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Verified <strong>namaz time in delhi hanafi</strong> based on 18° twilight and 2x shadow Asr, covering Old Delhi, New Delhi, and Jamia Nagar masajid.
              </p>
              <span className="text-xs font-bold text-brand-700 dark:text-emerald-400 flex items-center gap-1 group-hover:underline pt-1">
                Check Delhi Timetable &rarr;
              </span>
            </Link>

            {/* Karachi Card */}
            <Link
              href="/prayer-times/karachi"
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-slate-800/40 transition group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-teal-600 dark:text-emerald-400 uppercase tracking-wider block mb-0.5">
                    Pakistan • Banuri Town &amp; Shia
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-teal-600 dark:group-hover:text-emerald-400 transition-colors">
                    Shia Namaz Timing Karachi &amp; Sunni
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Official Karachi prayer times and <strong>shia namaz timing karachi</strong> with sunset buffers for Maghrib observed at prominent imambargahs.
              </p>
              <span className="text-xs font-bold text-teal-700 dark:text-emerald-400 flex items-center gap-1 group-hover:underline pt-1">
                Check Karachi Timetable &rarr;
              </span>
            </Link>

            {/* Bangalore Card */}
            <Link
              href="/prayer-times/bangalore"
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-slate-800/40 transition group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-0.5">
                    Karnataka • South India
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Bangalore Prayer Times
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Accurate daily waqt for Bangalore (Bengaluru) with Sehri cutoff, Fajr, Dhuhr, Asr, Maghrib, and Isha for local masajid.
              </p>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group-hover:underline pt-1">
                Check Bangalore Timetable &rarr;
              </span>
            </Link>

            {/* Mumbai Card */}
            <Link
              href="/prayer-times/mumbai"
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-slate-800/40 transition group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-emerald-400 uppercase tracking-wider block mb-0.5">
                    Maharashtra • Coastal Precision
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-amber-600 dark:group-hover:text-emerald-400 transition-colors">
                    Mumbai Prayer Times
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Daily prayer timetable in Mumbai with precise coastal twilight, Minara Masjid schedules, and monthly prayer charts.
              </p>
              <span className="text-xs font-bold text-amber-700 dark:text-emerald-400 flex items-center gap-1 group-hover:underline pt-1">
                Check Mumbai Timetable &rarr;
              </span>
            </Link>

            {/* Dubai Card */}
            <Link
              href="/prayer-times/dubai"
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-slate-800/40 transition group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-sky-600 dark:text-emerald-400 uppercase tracking-wider block mb-0.5">
                    United Arab Emirates • IACAD
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-sky-600 dark:group-hover:text-emerald-400 transition-colors">
                    Dubai Prayer Times
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Official Dubai daily prayer schedules authorized by IACAD with Fajr dawn, Dhuhr, Asr, Maghrib sunset, and Isha timings.
              </p>
              <span className="text-xs font-bold text-sky-700 dark:text-emerald-400 flex items-center gap-1 group-hover:underline pt-1">
                Check Dubai Timetable &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Educational Section: The Pillars of Daily Prayer & The Holy Quran */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 md:p-12 shadow-xs space-y-8 transition-colors duration-200">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Spiritual Foundation &amp; Daily Practice</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              The Sacred Rhythm of Daily Salah &amp; The Holy Quran
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              In Islam, worship is not an isolated event; it is the heartbeat that regulates the believer&rsquo;s entire day. From the first stirrings of astronomical dawn at Fajr to the quiet stillness of night at Isha, the five daily prayers anchor the human spirit in divine gratitude and purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-sm font-bold">1</span>
                The Divine Purpose of Timed Worship (Salah)
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The Holy Quran proclaims: <em>&ldquo;Indeed, prayer has been decreed upon the believers a decree of specified times&rdquo;</em> (Surah An-Nisa, 4:103). Each prayer is appointed to a natural solar transition, reminding us that time is a sacred trust. When a Muslim pauses work, studies, and worldly concerns to wash in ritual purity (Wudu) and stand humbly before the Creator, worldly stress dissolves into peace (*Sakinah*).
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Salah serves as a spiritual mirror. It cleanses minor missteps between prayers, nurtures mindfulness (*Taqwa*), and instills moral discipline. By bowing in Ruku and prostrating in Sujood, the servant acknowledges humility before the Lord of all creation, cultivating a compassionate character that extends outward to family, neighbors, and society.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-950/70 text-brand-800 dark:text-emerald-300 flex items-center justify-center text-sm font-bold">2</span>
                The Living Companionship of the Holy Quran
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The core of every rakat is the recitation of the Holy Quran. Beginning with the opening chapter, Surah Al-Fatihah—the seven oft-repeated verses of prayer and praise—the worshipper engages in direct conversation with Allah. Reciting additional surahs or verses from across the 30 Paras of the Quran enriches this daily bond, inviting deeper contemplation (*Tadabbur*) into divine wisdom.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Throughout the Quran, 14 special verses call upon the reader to perform Sajdah Tilawat—an immediate prostration of reverence and devotion. Pairing regular daily prayer with consistent Quran reading, whether in the morning after Fajr or during quiet evening hours, forms the spiritual backbone of Islamic living.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-emerald-300 flex items-center justify-center text-sm font-bold">3</span>
                Observing the Natural Sunnah: Solar Geometry &amp; Modern Tools
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Classical Islamic scholars were pioneers of observational astronomy because determining accurate prayer times and Qibla direction required precise celestial measurements. The Prophet Muhammad (peace be upon him) defined prayer windows through natural physical markers: true astronomical dawn (*Subh Sadiq*), the sun passing its zenith (*Zawal*), the shadow of an object lengthening, sunset (*Ghurub*), and the disappearance of twilight (*Shafaq*).
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Namaz-e-Shariq bridges these timeless observational principles with high-precision solar calculations. By calculating local solar elevation angles, coordinates, and juristic shadow ratios for your specific city, our tools help you align your daily routine with the natural signs established by Allah in the heavens.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 flex items-center justify-center text-sm font-bold">4</span>
                The Blessing of Congregational Prayer (Salat al-Jama&rsquo;ah)
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The Prophet Muhammad (peace be upon him) taught that prayer offered in congregation (*Jamat*) is twenty-seven times more rewarding than prayer offered alone. In neighborhood masajid across the globe, believers stand shoulder to shoulder, regardless of ethnicity, social status, or age, exemplifying universal equality and unity under God.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We encourage all worshippers to join their local mosque congregation whenever possible. Our timetables provide waqt start times so you can arrive at the masjid with ample time for Wudu, Sunnah prayers, and peaceful anticipation of the Iqamah call.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                Looking to deepen your daily Islamic learning?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Download the complete Quran Sharif Para 1 to 30 PDF, learn step-by-step namaz rakats, or explore regional mosque timetables.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/quran"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-xs"
              >
                Quran Downloads
              </Link>
              <Link
                href="/rakats"
                className="px-4 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold text-xs transition shadow-xs"
              >
                Rakat Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured In-Depth Educational Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-emerald-400 block mb-1">
              Scholarly Articles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Featured Guides & Pillar Content
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-brand-700 dark:text-emerald-400 hover:text-brand-900 dark:hover:text-emerald-300 flex items-center gap-1 group"
          >
            All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.image_alt || post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-brand-800 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
                  {post.categoryName}
                </span>
              </div>

              <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span>{post.reading_time} min read</span>
                  <span>•</span>
                  <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-emerald-400 transition line-clamp-2 leading-snug mb-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4 grow">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    By {post.author_name.split('&')[0]}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-brand-700 dark:text-emerald-400 group-hover:text-brand-900 dark:group-hover:text-emerald-300 flex items-center gap-1"
                  >
                    Read Guide
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion items={homeFaqs} title="Frequently Asked Questions About Namaz Timings & Rakats" />
      </section>

      {/* Trust & Reverent Methodology Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-800 dark:bg-emerald-950 text-emerald-300 flex items-center justify-center shrink-0 border border-brand-700 dark:border-emerald-800">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Scholarly Editorial Standards & Reverent Service
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                All guides on Namaz-e-Shariq are drafted following the primary classical sources of Hanafi and Shafi’i jurisprudence and verified against mathematical solar coordinates. Engineered with respectful reverent fidelity, ensuring zero offensive content and verified solar waqt boundaries.
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition shrink-0"
          >
            Our Methodology
          </Link>
        </div>
      </section>
    </div>
  );
}
