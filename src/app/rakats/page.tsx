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
} from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import { generateBreadcrumbSchema, generateFAQSchema, getAlternateLanguages, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Daily Namaz Rakat Guide: All 5 Prayers | Namaz-e-Shariq',
  description:
    'Complete authentic guide to daily namaz rakats for Fajr, Dhuhr, Asr, Maghrib, and Isha. Step-by-step breakdown of Fard, Sunnah, Nafl, and Witr prayers.',
  alternates: getAlternateLanguages('/rakats'),
  keywords: [
    'namaz rakat',
    'namaz ki rakat',
    'namaz rakat table',
    'rakat namaz',
    'rakat in namaz',
    'zuhar namaz rakat',
    'asr namaz rakat',
    'namaz ke faraiz',
    'namaz with urdu translation',
    'tasbeeh namaz',
    'namaz janaza',
    'janaza namaz dua',
    'tarabi namaz',
    'shabe baraat namaz',
    'shab e barat ki namaz ki niyat',
    'beter namaz porar niyom',
    'namaz chadar',
    'namaz e ghufayla',
  ],
};

export default function RakatsPage() {
  const rakatFaqs = [
    {
      question: 'How many total rakats are in all 5 daily prayers combined (namaz ki rakat)?',
      answer:
        'Counting all Fard, Sunnah, Nafl, and Witr prayers, the full routine consists of 48 rakats (17 Fard, 12 Sunnah Mu’akkadah, 8 Sunnah Ghayr Mu’akkadah, 6 Nafl, 3 Witr, and 2 Nafl). The bare obligatory requirement is 17 Fard rakats plus Witr.',
    },
    {
      question: 'What is the exact breakdown for Zuhar namaz rakat and Asr namaz rakat?',
      answer:
        'Zuhar namaz rakat consists of 12 rakats in total: 4 Sunnah Mu’akkadah, 4 Fard, 2 Sunnah Mu’akkadah, and 2 Nafl. Asr namaz rakat consists of 8 rakats in total: 4 Sunnah Ghayr Mu’akkadah followed by 4 Fard.',
    },
    {
      question: 'What are Namaz Ke Faraiz (the essential obligations of prayer)?',
      answer:
        'In classical Islamic Fiqh, Namaz Ke Faraiz comprise 13 mandatory elements: 6 pre-conditions before prayer (Taharah, Satr-e-Awrah, Istiqbal-e-Qibla, Waqt, Niyyah, Takbeer-e-Tahrimah) and 7 internal pillars (Qiyam, Qira’at, Ruku, Sujood, Qa’dah Akhirah, Khurooj bi-San’ihi, and Tuma’ninah). Omitting any Fard invalidates the prayer.',
    },
    {
      question: 'How is Tasbeeh Namaz (Salat al-Tasbeeh) performed?',
      answer:
        'Tasbeeh Namaz consists of 4 rakats with 300 repetitions of the third Kalimah ("Subhanallahi wal-hamdulillahi wa la ilaha illallahu wallahu akbar"): 15 times after Sana, 10 after Surah, 10 in Ruku, 10 in Qawmah, 10 in first Sajdah, 10 in Jalsah, and 10 in second Sajdah (75 per rakat x 4 = 300).',
    },
    {
      question: 'What is the procedure for Namaz Janaza and the Janaza Namaz Dua?',
      answer:
        'Namaz Janaza is performed standing with 4 Takbeers (no Ruku or Sujood): 1st Takbeer followed by Sana; 2nd Takbeer followed by Durood Ibrahim; 3rd Takbeer followed by the authentic Janaza Namaz Dua ("Allahumma ighfir li hayyina wa mayyitina..."); and 4th Takbeer followed by Salam to right and left.',
    },
    {
      question: 'What is Beter namaz porar niyom (rules for Witr prayer)?',
      answer:
        'In Bengali tradition according to the Hanafi school (Beter namaz porar niyom), Witr consists of 3 continuous rakats. In the 3rd rakat, after reciting Surah Al-Fatiha and a surah, raise hands saying Allahu Akbar, fold hands again, and recite Dua-e-Qunoot before bowing into Ruku.',
    },
    {
      question: 'What are the rules regarding Namaz Chadar and Namaz e Ghufayla?',
      answer:
        'Namaz Chadar refers to the full-body loose covering worn by Muslim sisters ensuring that only the face, hands to wrists, and feet are visible throughout prayer. Namaz e Ghufayla is a 2-rakat voluntary prayer recommended between Maghrib and Isha in Ja’fari tradition with recitation of Surah Al-Anbiya (21:87-88) and Surah Al-An’am (6:59).',
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
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Comprehensive Fiqh Manual & Reference
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Daily <span className="text-brand-700 dark:text-emerald-400">Namaz Rakat</span> Master Guide & Table
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Detailed, step-by-step classification of Fard, Sunnah Mu’akkadah, Sunnah Ghayr Mu’akkadah, Nafl, and Witr prayers across all five daily milestones with procedural and juristic rulings (namaz ki rakat).
          </p>
        </div>

        {/* Master Comparison Table Card (namaz rakat table) */}
        <div id="rakat-table" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 sm:p-8 transition-colors duration-200">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                Complete Namaz Rakat Table for All 5 Daily Prayers
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Standard classification of every rakat in namaz according to the Sunnah and classical Hanafi/Shafi’i manuals
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
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Fajr (Dawn)</td>
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
                    <span className="block text-[11px] text-slate-500 font-normal">Zuhar namaz rakat: 12 total</span>
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
                    <span className="block text-[11px] text-slate-500 font-normal">Asr namaz rakat: 8 total</span>
                  </td>
                  <td className="py-4 px-4 text-center text-slate-600 dark:text-slate-400">4 (Ghayr Mu’akkadah)</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-900 dark:text-emerald-300 bg-brand-50/50 dark:bg-emerald-950/20">4</td>
                  <td className="py-4 px-4 text-center text-slate-400">—</td>
                  <td className="py-4 px-4 text-center text-slate-400">—</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-950 dark:text-emerald-200 bg-slate-50 dark:bg-slate-800/60">8</td>
                </tr>

                {/* Maghrib */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Maghrib (Sunset)</td>
                  <td className="py-4 px-4 text-center text-slate-400">—</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-900 dark:text-emerald-300 bg-brand-50/50 dark:bg-emerald-950/20">3</td>
                  <td className="py-4 px-4 text-center text-emerald-700 dark:text-emerald-400 font-semibold">2 (Mu’akkadah)</td>
                  <td className="py-4 px-4 text-center">2 Nafl</td>
                  <td className="py-4 px-4 text-center font-extrabold text-brand-950 dark:text-emerald-200 bg-slate-50 dark:bg-slate-800/60">7</td>
                </tr>

                {/* Isha */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Isha (Night)</td>
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

        {/* Section: Namaz Ke Faraiz (13 Essential Obligations) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              Foundations of Salah Validity
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Namaz Ke Faraiz: The 13 Obligatory Pillars of Prayer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              In classical Fiqh (Hanafi, Shafi’i, Maliki, Hanbali), <strong>namaz ke faraiz</strong> are divided into 6 pre-conditions that must be met before starting prayer (<em>Shuroot-e-Salah</em>) and 7 core internal pillars (<em>Arkan-e-Salah</em>). If any single Fard is omitted, Salah is invalid and must be repeated.
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
                <li><strong>Taharah (Purification):</strong> Cleanliness of body, clothes, and place of prayer from minor (*Hadath Asghar*) and major impurity (*Hadath Akbar*).</li>
                <li><strong>Satr-e-Awrah (Covering):</strong> Men covering from navel to below knees; women covering entire body except face, hands to wrists, and feet (see Namaz Chadar guide below).</li>
                <li><strong>Istiqbal-e-Qibla:</strong> Facing the precise direction of the Holy Ka’bah in Makkah.</li>
                <li><strong>Waqt (Correct Time):</strong> Ensuring the prescribed prayer interval has entered.</li>
                <li><strong>Niyyah (Intention):</strong> Sincere internal resolve in the heart for the specific prayer being offered.</li>
                <li><strong>Takbeer-e-Tahrimah:</strong> Saying <em>&ldquo;Allahu Akbar&rdquo;</em> to enter the sacred state of prayer.</li>
              </ol>
            </div>

            {/* 7 Arkan (Internal Pillars) */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <h3 className="font-bold text-brand-900 dark:text-emerald-300 text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                7 Arkan (Pillars Inside Namaz)
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li><strong>Qiyam (Standing):</strong> Standing upright if physically able in Fard prayers.</li>
                <li><strong>Qira&rsquo;at (Recitation):</strong> Reciting at least one verse (Hanafi) or Surah Al-Fatiha in every rakat (Shafi’i/Jamhur).</li>
                <li><strong>Ruku (Bowing):</strong> Bowing forward with hands resting on knees.</li>
                <li><strong>Sujood (Two Prostrations):</strong> Prostrating with forehead, nose, palms, knees, and toes on the floor.</li>
                <li><strong>Qa&rsquo;dah Akhirah (Final Sitting):</strong> Sitting at the conclusion of prayer for the duration of Tashahhud.</li>
                <li><strong>Khurooj bi-San&rsquo;ihi:</strong> Ending the prayer deliberately with Salam or intentional exit.</li>
                <li><strong>Tuma&rsquo;ninah (Tranquility):</strong> Remaining still and calm in each posture for at least the duration of one Tasbeeh.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Section: Namaz with Urdu Translation */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 dark:bg-brand-950/60 text-brand-800 dark:text-emerald-300">
              <Heart className="w-3.5 h-3.5" />
              Mindful Prayer & Spiritual Comprehension
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Namaz with Urdu Translation: Key Recitations Word by Word
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Reciting <strong>namaz with urdu translation</strong> elevates Khushu (inner presence) by helping believers understand every sacred phrase uttered before Allah:
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
        </div>

        {/* Comprehensive Special Prayers Encyclopedia */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Special Islamic Prayers, Supplications & Procedures
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tasbeeh Namaz */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
                Salat al-Tasbeeh Manual
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Tasbeeh Namaz (Salat al-Tasbeeh): 300 Glorifications
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                <strong>Tasbeeh namaz</strong> is a blessed 4-rakat voluntary prayer taught by the Prophet Muhammad (peace be upon him) to his uncle Abbas (may Allah be pleased with him). In each rakat, recite the third Kalimah 75 times (total 300):
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <li>15 times after Sana (before Surah Al-Fatiha).</li>
                <li>10 times after reciting Surah Al-Fatiha and additional Surah.</li>
                <li>10 times in Ruku (after Subhana Rabbiyal Azeem).</li>
                <li>10 times in Qawmah (standing after Ruku).</li>
                <li>10 times in first Sajdah.</li>
                <li>10 times in Jalsah (sitting between Sujood).</li>
                <li>10 times in second Sajdah. (75 x 4 = 300).</li>
              </ul>
            </div>

            {/* Namaz Janaza & Janaza Namaz Dua */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                Salat al-Janazah (Funeral Prayer)
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Namaz Janaza & Janaza Namaz Dua
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                <strong>Namaz janaza</strong> is a communal obligation (Fard Kifayah) consisting of 4 Takbeers offered completely standing without bowing (Ruku) or prostration (Sujood):
              </p>
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

            {/* Shabe Baraat Namaz & Niyat */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300">
                15th Sha&rsquo;ban Night of Forgiveness
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Shabe Baraat Namaz & Shab e Barat Ki Namaz Ki Niyat
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                On the 15th night of Sha’ban (Laylat al-Bara’ah), believers engage in voluntary prayers (<strong>shabe baraat namaz</strong>). The intention is made with <strong>shab e barat ki namaz ki niyat</strong>: <em>&ldquo;Niyat karta hoon main 2 rakat nafl namaz shab-e-barat, wasta Allah ta&rsquo;ala ke, rukh mera Ka&rsquo;ba shareef ki taraf.&rdquo;</em> Recommended recitations include Surah Ya-Sin, Istighfar (seeking pardon), and Salawat upon the Prophet (ﷺ), followed by fasting on the 15th day.
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

            {/* Namaz Chadar & Namaz e Ghufayla */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
                Modesty Attire & Ja&rsquo;fari Devotions
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Namaz Chadar & Namaz e Ghufayla Guidelines
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Namaz Chadar:</strong> The traditional prayer garment / chador for sisters ensures full compliance with Islamic Awrah requirements during Salah. It must be opaque (non-translucent), sufficiently loose to drape without outlining the body, and cover the entire hair, neck, chest, and arms down to wrists throughout all physical movements.
                </p>
                <p>
                  <strong>Namaz e Ghufayla:</strong> In Ja’fari tradition, this highly recommended 2-rakat voluntary prayer is offered between Maghrib and Isha. In the 1st rakat after Surah Al-Fatiha, recite the verse of Prophet Yunus (Surah Al-Anbiya 21:87-88). In the 2nd rakat, recite the keys of the unseen (Surah Al-An’am 6:59), followed by Qunoot.
                </p>
              </div>
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
        <FAQAccordion items={rakatFaqs} title="Frequently Asked Questions on Namaz Rakats & Procedures" />
      </div>
    </div>
  );
}
