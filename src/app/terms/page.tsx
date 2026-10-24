import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Scale, AlertTriangle, ShieldCheck, CheckCircle2, Compass, Globe, Mail, Sun, Moon } from 'lucide-react';
import { getAlternateLanguages, SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Service & Usage Charter | Namaz-e-Shariq',
  description:
    'Terms of Service and religious usage charter for Namaz-e-Shariq. Guidelines on astronomical calculations, Sunnah precautions, and prayer schedules.',
  alternates: getAlternateLanguages('/terms'),
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-4">
            <Scale className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Sacred Contract & Religious Guidelines
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Terms of Service & Usage Charter
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Please read these terms carefully before utilizing our daily prayer calculation engines, rakat guides, and educational resources.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Effective Date: October 2026</span>
            <span>•</span>
            <span>Charter: Scholarly & Astronomical Agreement</span>
          </div>
        </div>

        {/* Content Box (>1,000 words comprehensive terms) */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              1. The Principle of Mutual Covenant (Al-Uqud) in Islam
            </h2>
            <p>
              In Islamic jurisprudence, every agreement between two consenting parties is governed by the divine command in Surah Al-Ma&rsquo;idah (5:1): <em>&ldquo;O you who have believed, fulfill all contractual obligations (*Awfu bil-Uqud*).&rdquo;</em> By accessing, browsing, bookmarking, or utilizing the computational tools and written articles on Namaz-e-Shariq, you signify your full acknowledgment and acceptance of the terms, conditions, and disclaimers detailed within this agreement.
            </p>
            <p>
              If you do not concur with any part of these terms or our methodological guidelines, we respectfully ask that you refrain from relying upon these digital calculations for your religious obligations and consult directly with your local mosque imams and certified Islamic authorities in your physical geographic locality.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <Sun className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              2. Astronomical Nature of Calculations & Necessary Precaution (Ihtiyat)
            </h2>
            <p>
              The daily prayer times presented across our city directories (including Bangalore, Delhi, Mumbai, Karachi, Lahore, Dhaka, Dubai, Sharjah, London, New York, and all affiliated hubs) are computed mathematically utilizing rigorous spherical solar coordinate algorithms. These algorithms evaluate the Julian date, solar declination, and equation of time relative to the observer&rsquo;s geographic latitude and longitude.
            </p>
            <p>
              While mathematical formulas provide remarkable theoretical precision, the physical observation of the sun and twilight is subject to dynamic terrestrial factors that cannot always be fully captured by digital computation alone:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Optical Atmospheric Refraction:</strong> Variations in temperature, atmospheric pressure, and coastal humidity can alter the apparent altitude of the sun near the horizon by several arcminutes.</li>
              <li><strong>Topographical Elevation:</strong> Observers located on elevated plateaus (such as Bangalore at ~920m above sea level) or upper floors of high-rise residential towers in Dubai or Karachi observe sunrise earlier and sunset later than ground-level sea horizons.</li>
              <li><strong>Horizon Obstructions & Light Pollution:</strong> Dense urban skylines, mountainous terrain, or high ambient artificial lighting can delay the unaided human eye&rsquo;s detection of true dawn (*Subh Sadiq*).</li>
            </ul>
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 rounded-2xl p-5 text-amber-950 dark:text-amber-200 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>The Golden Rule of Sunnah Precaution (Ihtiyat):</span>
              </div>
              <p>
                In accordance with classical Fiqh manuals across all four Sunni madhhabs, worshipers are strongly encouraged to observe a safety margin:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Sehri (Fasting Cutoff):</strong> Stop eating and drinking 4 to 5 minutes prior to the calculated Subh Sadiq time.</li>
                <li><strong>Maghrib (Iftar):</strong> Allow a 2 to 3 minute margin after calculated sunset before breaking fast or praying to ensure total disappearance of the solar disk.</li>
                <li><strong>Prohibited Times:</strong> Avoid all prayers during the 15-20 minutes following sunrise and the 5-7 minutes of solar zenith (*Zawal*) before Dhuhr.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              3. Primacy of the Local Mosque Congregation (Jamat)
            </h2>
            <p>
              Namaz-e-Shariq provides <em>Awwal Waqt</em> (the exact astronomical beginning and expiration boundaries of each prayer window). However, local mosques (*Masajid*) deliberately schedule their congregational assembly times (*Jamat*) roughly 15 to 45 minutes after the entry of waqt to permit the neighborhood community to perform ablution (*Wudu*) and assemble in rows.
            </p>
            <p>
              Believers must always give precedence to the congregational schedule of their local mosque when praying with the community. Offering congregational Salah in union with your local community carries twenty-seven times the reward of praying in isolation, and minor schedule variations between neighboring mosques are a natural expression of communal facilitation permitted in the Sunnah.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              4. Juristic Differences (Ikhtilaf) & Multi-School Inclusivity
            </h2>
            <p>
              Our platform explicitly facilitates calculations conforming to both the <strong>Hanafi school</strong> (Asr shadow factor 2, as widely observed across Pakistan, India, Bangladesh, Turkey, and Central Asia) and the <strong>Shafi&rsquo;i, Maliki, and Hanbali schools</strong> (Asr shadow factor 1, as observed across Kerala, coastal Karnataka, Egypt, Southeast Asia, and the Arabian Peninsula).
            </p>
            <p>
              We honor legitimate scholarly differences (*Ikhtilaf*) as an authentic mercy within Islamic legal history. Users can toggle freely between calculation methods and schools within our live widget. The editorial board does not endorse sectarian exclusivism and provides verified citations for all presented rulings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <Globe className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              5. Intellectual Property & Non-Commercial Religious Fair Use
            </h2>
            <p>
              All pillar articles, original scholarly commentary, rakat breakdown diagrams, tables, and custom computational code hosted on Namaz-e-Shariq are the intellectual property of the platform and protected under international copyright conventions.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Permitted Use:</strong> You are granted a worldwide, revocable, non-exclusive license to view, download, print, and distribute our prayer timetables and guides for personal spiritual practice, family education, local mosque notice boards, university prayer room bulletin boards, and non-commercial community newsletters, provided that attribution to <em>Namaz-e-Shariq (https://namaz-e-shariq.com)</em> is maintained.
              </li>
              <li>
                <strong>Prohibited Use:</strong> Bulk automated scraping, commercial redistribution, charging subscription fees for our data, or re-publishing full articles without explicit written permission from our editorial board is strictly prohibited.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              6. Limitation of Liability & Absence of Absolute Warranty
            </h2>
            <p>
              While every effort is made by our editorial board, certified astronomers, and seminary graduates to maintain flawless accuracy, Namaz-e-Shariq is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest extent permissible by applicable law:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We make no express or implied warranty that the platform will operate uninterrupted, error-free, or devoid of minor algorithmic variances resulting from third-party client device anomalies.</li>
              <li>In no event shall the authors, editors, developers, or affiliated Islamic scholars be liable for any direct, indirect, incidental, or consequential claims arising out of missed prayers, disrupted fasting schedules, travel delays, or misinterpretation of juristic rulings.</li>
              <li>The ultimate religious responsibility for confirming dawn, sunset, and prayer validity rests with the individual worshiper in accordance with classical Islamic legal norms (*Fiqh*).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              7. Dispute Resolution, Amendments & Editorial Contact
            </h2>
            <p>
              In the event of any disagreement or concern regarding content published on this website, both parties agree to resolve the matter through good-faith communication, scholarly mediation (*Sulh*), and mutual respect before pursuing formal legal avenues.
            </p>
            <p>
              We reserve the right to revise or update these Terms of Service periodically to reflect emerging astronomical standards or platform improvements. Continued use of the website following published updates constitutes your agreement to the modified terms.
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
              <p><strong>Editorial Legal Desk:</strong> Namaz-e-Shariq Governance Board</p>
              <p><strong>Inquiries & Notices:</strong> <a href="mailto:namazeshariq@gmail.com" className="text-brand-700 dark:text-emerald-400 font-semibold hover:underline">namazeshariq@gmail.com</a></p>
              <p><strong>Direct Inquiries Portal:</strong> <Link href="/contact" className="text-brand-700 dark:text-emerald-400 font-semibold hover:underline">Contact Editorial Team</Link></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
