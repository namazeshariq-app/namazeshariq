import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle,
  Info,
  Sparkles,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  ShieldCheck,
  Heart,
  Bookmark,
  Clock,
  Layers,
} from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import { generateBreadcrumbSchema, generateFAQSchema, getAlternateLanguages, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Namaz Rakat Table: 5 Daily Prayers & Namaz Ke Faraiz',
  description:
    'Complete namaz rakat table for all 5 daily prayers (Zuhar namaz rakat, Asr, Maghrib, Isha, Fajr), namaz ke faraiz, namaz janaza, and Shabe Baraat namaz guide.',
  alternates: getAlternateLanguages('/rakats'),
  keywords: [
    'namaz rakat table',
    'rakat namaz',
    'zuhar namaz rakat',
    'namaz ke faraiz',
    'namaz janaza',
    'shabe baraat namaz',
    'namaz chadar',
    'namaz rakat',
    'namaz ki rakat',
    'rakat in namaz',
    'asr namaz rakat',
    'janaza namaz dua',
    'shab e barat ki namaz ki niyat',
    'namaz with urdu translation',
    'tarabi namaz',
    'tasbeeh namaz',
    'beter namaz porar niyom',
    'namaz e ghufayla',
  ],
};

export default function RakatsPage() {
  const rakatFaqs = [
    {
      question: 'How many total rakats are in the complete namaz rakat table for daily prayers?',
      answer:
        'In the standard daily namaz rakat table, counting all Fard, Sunnah, and Witr prayers, the full routine consists of 48 total rakats (17 Fard, 12 Sunnah Mu’akkadah, 8 Sunnah Ghayr Mu’akkadah, 6 Nafl, 3 Witr, and 2 Nafl). The core obligatory requirement for every Muslim is 17 Fard rakats plus 3 Witr.',
    },
    {
      question: 'What is the exact breakdown for Zuhar namaz rakat and Asr namaz rakat?',
      answer:
        'Zuhar namaz rakat consists of 12 rakats in total: 4 Sunnah Mu’akkadah before Fard, 4 Fard, 2 Sunnah Mu’akkadah after Fard, and 2 optional Nafl. Asr namaz rakat consists of 8 rakats in total: 4 Sunnah Ghayr Mu’akkadah followed by 4 Fard.',
    },
    {
      question: 'What are Namaz Ke Faraiz (the essential obligations of prayer)?',
      answer:
        'In classical Islamic Fiqh, Namaz Ke Faraiz comprise 13 mandatory elements: 6 pre-conditions before prayer (Taharah, Satr-e-Awrah, Istiqbal-e-Qibla, Waqt, Niyyah, Takbeer-e-Tahrimah) and 7 internal pillars (Qiyam, Qira’at, Ruku, Sujood, Qa’dah Akhirah, Khurooj bi-San’ihi, and Tuma’ninah). Omitting any single Fard renders the Salah invalid.',
    },
    {
      question: 'What is the procedure for Namaz Janaza and the Janaza Namaz Dua?',
      answer:
        'Namaz Janaza is performed entirely standing with 4 Takbeers (without Ruku or Sujood): 1st Takbeer followed by Sana; 2nd Takbeer followed by Durood Ibrahim; 3rd Takbeer followed by the authentic Janaza Namaz Dua ("Allahumma ighfir li hayyina wa mayyitina..."); and 4th Takbeer followed by Salam to the right and left.',
    },
    {
      question: 'How is Shabe Baraat Namaz performed and what is the niyat?',
      answer:
        'Shabe Baraat Namaz is offered on the 15th night of Sha’ban as voluntary (Nafl) prayers in sets of 2 rakats. Believers make Shab e Barat ki namaz ki niyat for forgiveness, reciting Surah Al-Fatiha followed by Surah Al-Ikhlas, followed by extensive Istighfar, Salawat, and Dua for health, sustenance, and pardon.',
    },
    {
      question: 'What are the rules regarding Namaz Chadar for women in prayer?',
      answer:
        'Namaz Chadar is the traditional full-body prayer cloak worn by Muslim women during Salah to fulfill the condition of Satr-e-Awrah. It must be completely opaque (non-see-through) and loose enough that the contours of the body are not revealed, covering the entire hair, neck, arms to wrists, and feet.',
    },
    {
      question: 'How is Tasbeeh Namaz (Salat al-Tasbeeh) performed?',
      answer:
        'Tasbeeh Namaz consists of 4 rakats with 300 repetitions of the third Kalimah ("Subhanallahi wal-hamdulillahi wa la ilaha illallahu wallahu akbar"): 15 times after Sana, 10 after Surah, 10 in Ruku, 10 in Qawmah, 10 in first Sajdah, 10 in Jalsah, and 10 in second Sajdah (75 per rakat x 4 = 300).',
    },
    {
      question: 'What is Beter namaz porar niyom (rules for Witr prayer)?',
      answer:
        'In Bengali tradition according to the Hanafi school (Beter namaz porar niyom), Witr consists of 3 continuous rakats. In the 3rd rakat, after reciting Surah Al-Fatiha and a surah, raise hands saying Allahu Akbar, fold hands again, and recite Dua-e-Qunoot before bowing into Ruku.',
    },
  ];

  const faqSchema = generateFAQSchema(rakatFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Namaz Rakats Guide', url: `${SITE_URL}/rakats` },
  ]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 transition-colors duration-200">
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
          <span className="text-slate-800 dark:text-slate-200 font-medium">Namaz Rakat Table &amp; Faraiz Guide</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Comprehensive Fiqh Manual &amp; Rakat Master Reference
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            Namaz Rakat Table: <span className="text-brand-700 dark:text-emerald-400">All 5 Daily Prayers</span> &amp; Namaz Ke Faraiz
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Explore our complete <strong>namaz rakat table</strong> covering every <strong>rakat namaz</strong> across Fajr, <strong>Zuhar namaz rakat</strong>, Asr, Maghrib, and Isha. Master the 13 essential <strong>namaz ke faraiz</strong>, step-by-step procedures for <strong>namaz janaza</strong>, <strong>shabe baraat namaz</strong>, and modesty guidelines for <strong>namaz chadar</strong>.
          </p>

          {/* Quick Jump Buttons */}
          <div className="pt-4 flex flex-wrap justify-center gap-2.5 text-xs font-semibold">
            <a href="#rakat-table" className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-xs">
              Namaz Rakat Table
            </a>
            <a href="#zuhar-rakat-guide" className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition">
              Zuhar Namaz Rakat
            </a>
            <a href="#namaz-ke-faraiz" className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition">
              Namaz Ke Faraiz
            </a>
            <a href="#namaz-janaza-guide" className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition">
              Namaz Janaza
            </a>
            <a href="#shabe-baraat-guide" className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition">
              Shabe Baraat Namaz
            </a>
            <a href="#namaz-chadar-guide" className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition">
              Namaz Chadar
            </a>
          </div>
        </div>

        {/* Master Comparison Table Card (namaz rakat table) */}
        <div id="rakat-table" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 sm:p-8 transition-colors duration-200">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 dark:bg-brand-950/60 text-brand-800 dark:text-emerald-300 mb-2">
                <Layers className="w-3.5 h-3.5" />
                Complete 5 Daily Prayers Matrix
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                Official Namaz Rakat Table for Daily Prayers
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Standard classification of every <strong>rakat namaz</strong> according to the Sunnah and classical Hanafi/Shafi’i fiqh manuals.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold self-start sm:self-auto">
              17 Fard • 12 Sunnah • 3 Witr
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-brand-800 dark:bg-brand-900 text-white text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 rounded-tl-xl font-bold">Prayer Name</th>
                  <th className="py-3 px-4 font-bold text-center">Sunnah Before</th>
                  <th className="py-3 px-4 font-bold text-center bg-brand-900 dark:bg-brand-950">Fard (Obligatory)</th>
                  <th className="py-3 px-4 font-bold text-center">Sunnah After</th>
                  <th className="py-3 px-4 font-bold text-center">Nafl / Witr</th>
                  <th className="py-3 px-4 font-bold text-center rounded-tr-xl bg-brand-950 dark:bg-black/60">Total Rakats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {/* Fajr */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">
                    Fajr (Dawn)
                    <span className="block text-[11px] text-slate-500 font-normal">Fajr rakat namaz: 4 total</span>
                  </td>
                  <td className="py-4 px-4 text-center text-emerald-700 dark:text-emerald-400 font-semibold">2 (Mu’akkadah)</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-900 dark:text-emerald-300 bg-brand-50/50 dark:bg-emerald-950/20">2</td>
                  <td className="py-4 px-4 text-center text-slate-400">—</td>
                  <td className="py-4 px-4 text-center text-slate-400">—</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-950 dark:text-emerald-200 bg-slate-50 dark:bg-slate-800/60">4</td>
                </tr>

                {/* Dhuhr (zuhar namaz rakat) */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">
                    Dhuhr / Zuhar (Noon)
                    <span className="block text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">Zuhar namaz rakat: 12 total</span>
                  </td>
                  <td className="py-4 px-4 text-center text-emerald-700 dark:text-emerald-400 font-semibold">4 (Mu’akkadah)</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-900 dark:text-emerald-300 bg-brand-50/50 dark:bg-emerald-950/20">4</td>
                  <td className="py-4 px-4 text-center text-emerald-700 dark:text-emerald-400 font-semibold">2 (Mu’akkadah)</td>
                  <td className="py-4 px-4 text-center">2 Nafl</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-950 dark:text-emerald-200 bg-slate-50 dark:bg-slate-800/60">12</td>
                </tr>

                {/* Asr (asr namaz rakat) */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">
                    Asr (Afternoon)
                    <span className="block text-[11px] text-slate-500 font-normal">Asr rakat namaz: 8 total</span>
                  </td>
                  <td className="py-4 px-4 text-center text-slate-600 dark:text-slate-400">4 (Ghayr Mu’akkadah)</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-900 dark:text-emerald-300 bg-brand-50/50 dark:bg-emerald-950/20">4</td>
                  <td className="py-4 px-4 text-center text-slate-400">—</td>
                  <td className="py-4 px-4 text-center text-slate-400">—</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-950 dark:text-emerald-200 bg-slate-50 dark:bg-slate-800/60">8</td>
                </tr>

                {/* Maghrib */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">
                    Maghrib (Sunset)
                    <span className="block text-[11px] text-slate-500 font-normal">Maghrib rakat namaz: 7 total</span>
                  </td>
                  <td className="py-4 px-4 text-center text-slate-400">—</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-900 dark:text-emerald-300 bg-brand-50/50 dark:bg-emerald-950/20">3</td>
                  <td className="py-4 px-4 text-center text-emerald-700 dark:text-emerald-400 font-semibold">2 (Mu’akkadah)</td>
                  <td className="py-4 px-4 text-center">2 Nafl</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-950 dark:text-emerald-200 bg-slate-50 dark:bg-slate-800/60">7</td>
                </tr>

                {/* Isha */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">
                    Isha (Night)
                    <span className="block text-[11px] text-slate-500 font-normal">Isha rakat namaz: 17 total</span>
                  </td>
                  <td className="py-4 px-4 text-center text-slate-600 dark:text-slate-400">4 (Ghayr Mu’akkadah)</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-900 dark:text-emerald-300 bg-brand-50/50 dark:bg-emerald-950/20">4</td>
                  <td className="py-4 px-4 text-center text-emerald-700 dark:text-emerald-400 font-semibold">2 (Mu’akkadah)</td>
                  <td className="py-4 px-4 text-center font-bold text-emerald-800 dark:text-emerald-300">2 Nafl + 3 Witr + 2 Nafl</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-950 dark:text-emerald-200 bg-slate-50 dark:bg-slate-800/60">17</td>
                </tr>

                {/* Daily Totals */}
                <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100">
                  <td className="py-4 px-4 rounded-bl-xl">Daily Routine Total (rakat namaz)</td>
                  <td className="py-4 px-4 text-center">10 Sunnah</td>
                  <td className="py-4 px-4 text-center text-brand-900 dark:text-emerald-300 bg-brand-100/60 dark:bg-brand-950/40 font-extrabold">17 Fard</td>
                  <td className="py-4 px-4 text-center">6 Sunnah</td>
                  <td className="py-4 px-4 text-center">15 Nafl / Witr</td>
                  <td className="py-4 px-4 text-center rounded-br-xl bg-slate-200 dark:bg-slate-700 text-brand-950 dark:text-white font-extrabold">48 Complete Routine</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Dedicated Section: Zuhar Namaz Rakat Guide */}
        <section id="zuhar-rakat-guide" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Clock className="w-3.5 h-3.5" />
              Midday Prayer Breakdown
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Zuhar Namaz Rakat: Complete 12 Rakats Step-by-Step Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              When offering midday prayer, knowing the exact order of <strong>zuhar namaz rakat</strong> ensures your Salah aligns with the authentic Prophetic Sunnah. In the complete <strong>namaz rakat table</strong>, Zuhar consists of <strong>12 rakats</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 text-xs uppercase tracking-wider block">Stage 1</span>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">4 Sunnah Mu’akkadah</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                Offered before the Fard prayer. The Prophet Muhammad ﷺ emphasized: <em>&ldquo;Whoever prays four rakats before Dhuhr and two after, Allah forbids the Fire from touching him.&rdquo;</em> (Sunan at-Tirmidhi).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1.5">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 text-xs uppercase tracking-wider block">Stage 2</span>
              <h3 className="font-bold text-brand-900 dark:text-emerald-200 text-base">4 Fard (Obligatory)</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                The core obligatory part of <strong>zuhar namaz rakat</strong>. Performed in congregation (Jamat) in the mosque, or individually, with silent recitation (Sirri) of Surah Al-Fatiha and additional surahs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 text-xs uppercase tracking-wider block">Stage 3</span>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">2 Sunnah Mu’akkadah</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                Offered immediately following the 4 Fard of <strong>zuhar namaz rakat</strong>. Strongly emphasized Sunnah that was never neglected by the Prophet ﷺ.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 text-xs uppercase tracking-wider block">Stage 4</span>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">2 Nafl (Voluntary)</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                Concludes the full 12 <strong>zuhar namaz rakat</strong> routine. Brings immense additional spiritual rewards and compensates for minor deficiencies in voluntary attention.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Namaz Ke Faraiz (13 Essential Obligations) */}
        <section id="namaz-ke-faraiz" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              Foundations of Salah Validity
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Namaz Ke Faraiz: The 13 Obligatory Pillars of Prayer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              In classical Fiqh (Hanafi, Shafi’i, Maliki, Hanbali), learning <strong>namaz ke faraiz</strong> is Fard al-Ayn (an individual religious obligation). <strong>Namaz ke faraiz</strong> are divided into 6 pre-conditions that must be met before prayer (<em>Shuroot-e-Salah</em>) and 7 internal pillars (<em>Arkan-e-Salah</em>). Omitting any single Fard invalidates the <strong>rakat namaz</strong>, requiring the prayer to be repeated completely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 6 Shuroot (Pre-conditions) */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <h3 className="font-bold text-brand-900 dark:text-emerald-300 text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                6 Shuroot (Conditions Before Namaz)
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li><strong>Taharah (Purification):</strong> Cleanliness of body, clothes, and place of prayer from minor impurity (*Hadath Asghar*) through Wudu and major impurity (*Hadath Akbar*) through Ghusl.</li>
                <li><strong>Satr-e-Awrah (Covering the Body):</strong> Men must cover from navel to below knees; women must cover the entire body except face, hands to wrists, and feet (see Namaz Chadar guidelines below).</li>
                <li><strong>Istiqbal-e-Qibla:</strong> Facing the direction of the Holy Ka’bah in Makkah Mukarramah.</li>
                <li><strong>Waqt (Prescribed Time):</strong> Verifying that the designated prayer waqt has entered and not expired.</li>
                <li><strong>Niyyah (Intention):</strong> Sincere intention in the heart specifying the prayer and rakat namaz being performed.</li>
                <li><strong>Takbeer-e-Tahrimah:</strong> Uttering <em>&ldquo;Allahu Akbar&rdquo;</em> while standing to enter the sacred state of prayer.</li>
              </ol>
            </div>

            {/* 7 Arkan (Internal Pillars) */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <h3 className="font-bold text-brand-900 dark:text-emerald-300 text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                7 Arkan (Pillars Inside Namaz)
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li><strong>Qiyam (Standing):</strong> Standing upright if physically capable during all Fard and Wajib prayers.</li>
                <li><strong>Qira&rsquo;at (Quran Recitation):</strong> Reciting at least one verse (Hanafi) or Surah Al-Fatiha in every rakat (Shafi’i/Jamhur).</li>
                <li><strong>Ruku (Bowing):</strong> Bowing forward with hands resting on knees and spine horizontal.</li>
                <li><strong>Sujood (Two Prostrations):</strong> Prostrating on seven bones (forehead/nose, two palms, two knees, and toes of both feet).</li>
                <li><strong>Qa&rsquo;dah Akhirah (Final Sitting):</strong> Sitting at the conclusion of prayer for the duration of reciting the Tashahhud.</li>
                <li><strong>Khurooj bi-San&rsquo;ihi:</strong> Terminating the prayer deliberately through Salam or intentional exit.</li>
                <li><strong>Tuma&rsquo;ninah (Stillness):</strong> Maintaining physical stillness and tranquility in every posture for at least the length of one Tasbeeh.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section: Namaz with Urdu Translation */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 dark:bg-brand-950/60 text-brand-800 dark:text-emerald-300">
              <Heart className="w-3.5 h-3.5" />
              Mindful Prayer &amp; Spiritual Comprehension
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Namaz with Urdu Translation: Key Recitations Word by Word
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Reciting <strong>namaz with urdu translation</strong> elevates Khushu (inner devotion) by helping believers understand every sacred phrase uttered before Allah throughout each <strong>rakat namaz</strong>:
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Sana */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                1. Sana (سُبْحَانَكَ اللَّهُمَّ) — The Opening Glorification
              </h4>
              <p className="font-arabic text-base text-emerald-900 dark:text-emerald-300">
                سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Urdu:</strong> اے اللہ! تو پاک ہے اور تیری ہی تعریف ہے، تیرا نام بابرکت ہے، تیری شان بلند ہے اور تیرے سوا کوئی عبادت کے لائق نہیں۔
              </p>
              <p className="text-slate-500 dark:text-slate-400 italic">
                <strong>English:</strong> Glory be to You, O Allah, and all praise. Blessed is Your name, exalted is Your majesty, and there is no deity worthy of worship besides You.
              </p>
            </div>

            {/* Tashahhud */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                2. Tashahhud (At-Tahiyyat / التَّحِيَّاتُ) — Sitting Testimony
              </h4>
              <p className="font-arabic text-base text-emerald-900 dark:text-emerald-300">
                التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Urdu:</strong> تمام زبانی، بدنی اور مالی عبادتیں اللہ ہی کے لیے ہیں۔ اے نبی! آپ پر سلامتی، اللہ کی رحمت اور اس کی برکتیں ہوں۔ ہم پر اور اللہ کے نیک بندوں پر سلام ہو۔ میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور محمد (ﷺ) اس کے بندے اور رسول ہیں۔
              </p>
              <p className="text-slate-500 dark:text-slate-400 italic">
                <strong>English:</strong> All compliments, prayers, and pure phrases belong to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity but Allah, and I bear witness that Muhammad is His servant and messenger.
              </p>
            </div>

            {/* Durood Ibrahim */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                3. Durood Ibrahim (درودِ ابراہیم) — Blessings upon the Prophet
              </h4>
              <p className="font-arabic text-base text-emerald-900 dark:text-emerald-300">
                اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ...
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Urdu:</strong> اے اللہ! رحمت نازل فرما محمد (ﷺ) پر اور ان کی آل پر، جیسا کہ تو نے رحمت نازل فرمائی ابراہیم (علیہ السلام) پر اور ان کی آل پر، بے شک تو تعریف کیا گیا بڑی شان والا ہے۔
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive Special Prayers Encyclopedia */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Special Islamic Prayers, Supplications &amp; Attire Procedures
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Namaz Janaza & Janaza Namaz Dua */}
            <div id="namaz-janaza-guide" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                Salat al-Janazah (Funeral Prayer)
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Namaz Janaza &amp; Authentic Janaza Namaz Dua
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                <strong>Namaz janaza</strong> is a communal obligation (Fard Kifayah) offered for deceased Muslims. Unlike normal daily prayers, <strong>namaz janaza</strong> is performed entirely standing upright with four Takbeers, without any bowing (Ruku) or prostration (Sujood):
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <li><strong>1st Takbeer:</strong> Recite Sana (with <em>&ldquo;wa jalla thana&rsquo;uka&rdquo;</em>) or Surah Al-Fatiha.</li>
                <li><strong>2nd Takbeer:</strong> Recite Durood Ibrahim upon the Prophet ﷺ.</li>
                <li><strong>3rd Takbeer:</strong> Recite the authentic Janaza Namaz Dua for the deceased.</li>
                <li><strong>4th Takbeer:</strong> Conclude <strong>namaz janaza</strong> by turning the head for Salam to right and left.</li>
              </ul>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Authentic Janaza Namaz Dua (for adult deceased):</span>
                <p className="font-arabic text-emerald-900 dark:text-emerald-300">
                  اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا وَشَاهِدِنَا وَغَائِبِنَا وَصَغِيرِنَا وَكَبِيرِنَا وَذَكَرِنَا وَأُنْثَانَا
                </p>
                <p className="italic text-slate-500">
                  &ldquo;Allahumma ighfir li hayyina wa mayyitina wa shahidina wa gha&rsquo;ibina wa saghirina wa kabirina wa dhakarina wa unthana...&rdquo;
                </p>
              </div>
            </div>

            {/* Shabe Baraat Namaz & Niyat */}
            <div id="shabe-baraat-guide" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300">
                15th Sha&rsquo;ban Night of Forgiveness
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Shabe Baraat Namaz &amp; Shab e Barat Ki Namaz Ki Niyat
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                On the blessed 15th night of Sha’ban (Laylat al-Bara’ah), millions of Muslims engage in voluntary devotions through <strong>shabe baraat namaz</strong>. These are offered in sets of two <strong>rakat namaz</strong>, making sincere <strong>shab e barat ki namaz ki niyat</strong>:
              </p>
              <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <span className="font-bold text-indigo-950 dark:text-indigo-200 block">Shab e Barat Ki Namaz Ki Niyat in Urdu / English:</span>
                <p className="italic text-slate-600 dark:text-slate-300">
                  &ldquo;Niyat karta hoon main 2 rakat nafl namaz shab-e-barat, wasta Allah ta&rsquo;ala ke, rukh mera Ka&rsquo;ba shareef ki taraf, Allahu Akbar.&rdquo;
                </p>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                During <strong>shabe baraat namaz</strong>, it is recommended to recite Surah Al-Ikhlas (3, 7, or 10 times in each rakat), recite Surah Ya-Sin for forgiveness, and follow the night with voluntary fasting on the 15th of Sha’ban.
              </p>
            </div>

            {/* Namaz Chadar & Awrah Rules */}
            <div id="namaz-chadar-guide" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
                Modesty Attire &amp; Satr-e-Awrah
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Namaz Chadar: Proper Prayer Attire &amp; Covering Rules
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Wearing a proper <strong>namaz chadar</strong> is vital for female worshippers to fulfill the condition of Satr-e-Awrah (one of the 6 pre-conditions in <strong>namaz ke faraiz</strong>):
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li><strong>Opacity:</strong> The <strong>namaz chadar</strong> must be made of thick, non-translucent fabric so that skin tone and hair are not visible underneath.</li>
                <li><strong>Coverage:</strong> The <strong>namaz chadar</strong> must completely drape over the head, neck, shoulders, and chest, reaching down to cover the entire body down to ankles and wrists. Only the oval of the face, hands to wrists, and feet remain uncovered.</li>
                <li><strong>Looseness:</strong> A valid <strong>namaz chadar</strong> should be loose enough that bodily contours are concealed during Ruku and Sujood postures in each <strong>rakat namaz</strong>.</li>
              </ul>
            </div>

            {/* Tasbeeh Namaz */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
                Salat al-Tasbeeh Manual
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Tasbeeh Namaz (Salat al-Tasbeeh): 300 Glorifications
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                <strong>Tasbeeh namaz</strong> is a blessed 4-rakat voluntary prayer taught by the Prophet Muhammad ﷺ to his uncle Abbas (may Allah be pleased with him). In each rakat, recite the third Kalimah 75 times (total 300):
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <li>15 times after Sana (before Surah Al-Fatiha).</li>
                <li>10 times after reciting Surah Al-Fatiha and additional Surah.</li>
                <li>10 times in Ruku (after Subhana Rabbiyal Azeem).</li>
                <li>10 times in Qawmah (standing after Ruku).</li>
                <li>10 times in first Sajdah.</li>
                <li>10 times in Jalsah (sitting between Sujood).</li>
                <li>10 times in second Sajdah (75 x 4 = 300).</li>
              </ul>
            </div>

            {/* Tarabi Namaz */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                Ramadan Taraweeh (20 Rakats)
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Tarabi Namaz (Salat al-Tarawih)
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                <strong>Tarabi namaz</strong> is an emphasized Sunnah (Sunnah Mu’akkadah) offered every night during Ramadan after the 4 Fard and 2 Sunnah of Isha. As instituted by Sayyiduna Umar ibn al-Khattab and agreed upon by the four Sunni schools, it consists of <strong>20 rakats</strong> performed in sets of two. A brief pause (<em>Tarwiha</em>) is observed after every 4 rakats with the recitation of the beloved Taraweeh Tasbeeh (<em>Subhana Dhil Mulki wal Malakoot...</em>).
              </p>
            </div>

            {/* Beter Namaz Porar Niyom */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                Bengali Witr Tutorial (বিতর নামাজ)
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Beter Namaz Porar Niyom (বিতর নামাজ পড়ার নিয়ম)
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                <strong>Beter namaz porar niyom</strong>: In the Hanafi school followed widely across Bangladesh and West Bengal, Witr consists of 3 Wajib rakats:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <li>Offer the first 2 rakats like normal Salah, sitting for Tashahhud (*Qa’dah Ula*) after the 2nd rakat.</li>
                <li>Stand up for the 3rd rakat, recite Surah Al-Fatiha and an additional Surah.</li>
                <li>Before Ruku, raise hands to earlobes saying <em>&ldquo;Allahu Akbar&rdquo;</em>, fold hands below navel again, and recite <strong>Dua-e-Qunoot</strong> (*Allahumma inna nasta’eenuka...*).</li>
                <li>Perform Ruku, Sujood, and complete the final sitting with Tashahhud and Salam.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Master Guide Link Banner */}
        <div className="p-8 bg-brand-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-xl font-bold">
              Looking for our Quran 30 Para Guide and Free Book Download?
            </h3>
            <p className="text-brand-100 text-sm mt-1 max-w-xl">
              Explore the complete 1 to 30 Para master index, 14 Sajdah Tilawat verses, Dua Khatam Quran, and download digital Mushaf editions.
            </p>
          </div>
          <Link
            href="/quran"
            className="px-6 py-3 rounded-xl bg-white text-brand-900 font-bold text-sm hover:bg-brand-50 transition shrink-0 flex items-center gap-2"
          >
            <span>Visit Quran Hub</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* FAQ Section */}
        <FAQAccordion items={rakatFaqs} title="Frequently Asked Questions on Namaz Rakat Table &amp; Faraiz" />
      </div>
    </div>
  );
}