import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  HelpCircle,
  Sparkles,
  ChevronRight,
  BookOpen,
  Clock,
  Download,
  ShieldCheck,
  Heart,
  MessageCircleQuestion,
} from 'lucide-react';
import FAQDirectory from '@/components/FAQDirectory';
import { MASTER_FAQS } from '@/lib/faqs-data';
import { generateBreadcrumbSchema, generateFAQSchema, getAlternateLanguages, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Islamic FAQs: Quran, Namaz Times, Rakats & Duas Hub',
  description:
    'Comprehensive Islamic FAQs on Quran para 1 to 30, daily namaz rakat table, namaz ke faraiz, namaz time calicut, Delhi Hanafi, Karachi Shia & free PDF downloads.',
  alternates: getAlternateLanguages('/faqs'),
  keywords: [
    'first sajdah in quran',
    'how many sajdah in quran',
    'quran para 1 to 30',
    'quran sharif para 1 to 30',
    'quran para 2',
    '2nd para of quran',
    'second para of quran',
    '3rd para of quran',
    'third para of quran',
    'quran para 8',
    'quran para 29',
    'quran para 30',
    'dua khatam quran',
    'how many pages in quran',
    'shortest surah in quran',
    'small surah in quran',
    'tagging al quran',
    'tafhimul quran bangla',
    'quran shikkha',
    'elearning quran',
    'namaz rakat table',
    'rakat namaz',
    'zuhar namaz rakat',
    'asr namaz rakat',
    'namaz ki rakat',
    'rakat in namaz',
    'namaz with urdu translation',
    'namaz ke faraiz',
    'namaz chadar',
    'namaz janaza',
    'janaza namaz dua',
    'shabe baraat namaz',
    'shab e barat ki namaz ki niyat',
    'tasbeeh namaz',
    'tarabi namaz',
    'beter namaz porar niyom',
    'namaz e ghufayla',
    'namaz time calicut',
    'namaz time in delhi hanafi',
    'namaz time delhi today',
    'shia namaz timing karachi',
    'shia namaz time in dubai',
    'tahajjud namaz time dhaka',
    'quran sharif pdf',
    'quran sharif para 1 to 30 pdf',
    '15 line quran pdf',
    'dua after namaz pdf',
    'bangla quran pdf',
    'quran para 30 pdf',
  ],
};

export default function FAQHubPage() {
  const faqSchema = generateFAQSchema(
    MASTER_FAQS.map((f) => ({
      question: f.question,
      answer: f.answer,
    }))
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Islamic FAQs Master Hub', url: `${SITE_URL}/faqs` },
  ]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 dark:text-slate-200 font-medium">Islamic FAQs Master Knowledge Hub</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Fiqh, Quran &amp; Prayer Reference Directory
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Islamic Knowledge &amp; <span className="text-emerald-400">Prayer FAQs</span> Hub
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore authentic answers to the most frequently searched Islamic questions. Master the <strong>Holy Quran para 1 to 30</strong>, the complete <strong>namaz rakat table</strong>, <strong>namaz ke faraiz</strong>, <strong>namaz janaza</strong>, <strong>shabe baraat namaz</strong>, regional prayer times including <strong>namaz time calicut</strong> and <strong>Delhi Hanafi</strong>, and direct <strong>free Quran PDF downloads</strong>.
            </p>

            {/* Quick Filter Highlights */}
            <div className="pt-2 flex flex-wrap gap-3 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>30 Paras &amp; Sajdah Guides</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>5 Daily Rakats &amp; Timings</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Namaz Ke Faraiz &amp; Modesty</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free Quran &amp; Adhkar PDFs</span>
              </span>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Search & Directory */}
        <FAQDirectory items={MASTER_FAQS} />

        {/* Cross-Resource Knowledge Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                Holy Quran Hub
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Download the complete Quran Sharif Para 1 to 30 PDF, 15 Line Quran PDF, Bangla Quran PDF, and live online previews.
              </p>
            </div>
            <Link
              href="/quran"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline pt-2"
            >
              <span>Explore Quran Hub</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                Namaz Rakat Master Table
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Step-by-step breakdown of all 48 daily rakats, Zuhar namaz rakat, Asr, Namaz ke Faraiz, and Janaza prayer rulings.
              </p>
            </div>
            <Link
              href="/rakats"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 dark:text-emerald-400 hover:underline pt-2"
            >
              <span>View Rakat Tables</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                Today Prayer Times by City
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Accurate astronomical waqt for Calicut, Delhi Hanafi, Karachi Shia, Bangalore, Mumbai, and 20+ global cities.
              </p>
            </div>
            <Link
              href="/prayer-times"
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 dark:text-emerald-400 hover:underline pt-2"
            >
              <span>Check City Directory</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
