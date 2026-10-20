import React from 'react';
import Link from 'next/link';
import { ShieldAlert, BookOpen, Clock, HeartHandshake, Compass, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import { getAlternateLanguages, SITE_NAME, SITE_URL } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Theological & Legal Disclaimer | Namaz-e-Shariq',
  description:
    'Theological advisory and legal disclaimer for Namaz-e-Shariq. Information on prayer calculation methods, local mosque primacy, and Sunnah precautions.',
  alternates: getAlternateLanguages('/disclaimer'),
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-700 dark:hover:text-emerald-400 transition">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-medium">Theological Disclaimer</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 mb-4">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          Religious Transparency & Theological Advisory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
          Theological Advisory, Astronomical Precision & Legal Disclaimer
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          *Bismillahir Rahmanir Raheem* — In the name of Allah, the Most Gracious, the Most Merciful. This document sets forth the theological parameters, scientific methodologies, precautions (*Ihtiyat*), and terms governing the use of Namaz-e-Shariq.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-500 dark:text-slate-400">
          <span>Effective Date: October 2026</span>
          <span>•</span>
          <span>Reviewed by Scholarly Advisory Board</span>
          <span>•</span>
          <span>Juristic Standard: Universal Islamic Consensus</span>
        </div>
      </div>

      {/* Content body */}
      <div className="prose-custom space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800/60">
          <div className="flex items-start gap-3">
            <HeartHandshake className="w-6 h-6 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-emerald-950 dark:text-emerald-200 m-0 pb-2 border-none">
                1. Fundamental Principle: Primacy of the Local Mosque Congregation (Adhan & Jamat)
              </h2>
              <p className="text-slate-700 dark:text-slate-300 m-0">
                The primary purpose of Namaz-e-Shariq is to serve as an educational, observational, and scheduling companion for Muslims worldwide. However, it is an established tenet of Islamic jurisprudence (*Fiqh*) that the call to prayer (*Adhan*) of your local neighborhood mosque (*Masjid*) and the established congregational prayer times (*Jamat*) take precedence over any individual mathematical calculation, mobile application, or software website.
              </p>
              <p className="text-slate-700 dark:text-slate-300 mt-3 mb-0">
                The Prophet Muhammad (peace and blessings be upon him) emphasized unity within the community, stating: <em>&ldquo;The hand of Allah is with the congregation (*al-Jama&rsquo;ah*)&rdquo;</em> (Sunan al-Tirmidhi). Therefore, if the timetable announced by your local mosque differs by a few minutes from our computed solar schedules, believers are earnestly encouraged to pray with their local congregation rather than creating discord or confusion.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2>2. The Science of Prayer Time Calculations & Margin of Precaution (Ihtiyat)</h2>
          <p>
            The five daily prayers (*Fajr*, *Dhuhr*, *Asr*, *Maghrib*, and *Isha*) are tied by divine command to the celestial movements of the sun across the terrestrial sky, as established in the Holy Quran:
          </p>
          <blockquote>
            &ldquo;Indeed, prayer has been decreed upon the believers a decree of specified times.&rdquo;<br />
            — Surah An-Nisa (4:103)
          </blockquote>
          <p>
            Our calculation engine implements high-accuracy astronomical algorithms based on Julian ephemeris, solar declination, and equation of time coordinates. While mathematical formulas calculate the exact theoretical instant the solar disc reaches specific depression angles or horizon tangents, classical Islamic scholars have always mandated a margin of caution (*Ihtiyat*):
          </p>
          <ul>
            <li>
              <strong>Fajr Precaution:</strong> True dawn (*Subh Sadiq*) occurs when the first horizontal thread of white light appears along the eastern horizon. Our algorithms utilize established depression angles (18° for Karachi, MWL, and Bangladesh; 18.5° for Umm Al-Qura; 15° for ISNA). Fasting individuals are recommended to cease food and drink 3 to 5 minutes prior to the theoretical Fajr start time as a safeguard for their fast.
            </li>
            <li>
              <strong>Dhuhr Precaution:</strong> Dhuhr begins only after the sun has unequivocally crossed the local meridian (past *Zawal*). Our engine incorporates a 2 to 3 minute buffer following true astronomical noon to guarantee the sun is descending westward before Dhuhr prayer commences.
            </li>
            <li>
              <strong>Maghrib / Iftar Precaution:</strong> Maghrib arrives when the complete solar disk dips fully beneath the true western horizon. Fasting worshipers are advised to allow 1 to 2 minutes after mathematical sunset before breaking the fast or calling the Adhan to ensure optical certainty (*Yaqeen*).
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2>3. Reverence for Juristic Divergence (Ikhtilaf as Mercy)</h2>
          <p>
            Islamic history is enriched by the rigorous, pious scholarship of the four renowned Sunni schools of jurisprudence: <strong>Hanafi, Shafi&rsquo;i, Maliki, and Hanbali</strong>. Differences of juristic interpretation (*Ikhtilaf*) regarding specific prayer boundaries are recognized by consensus as a divine mercy (*Rahmah*) for the Ummah:
          </p>
          <ul>
            <li>
              <strong>Asr Prayer Timing:</strong> The Shafi&rsquo;i, Maliki, and Hanbali schools determine the entry of Asr when the shadow of an upright object equals its length plus midday shadow (Factor 1). The Hanafi school determines Asr when the shadow reaches twice the object&rsquo;s length plus midday shadow (Factor 2). Both opinions are thoroughly substantiated by authentic Hadiths narrated in Sahih al-Bukhari and Sahih Muslim regarding the leadership of Angel Jibreel (peace be upon him). Namaz-e-Shariq provides seamless toggling between both methods so every worshiper can adhere faithfully to their chosen tradition.
            </li>
            <li>
              <strong>Isha Twilight Definition:</strong> Jurists have debated whether evening twilight (*Shafaq*) refers to the disappearance of the reddish glow (*Shafaq Ahmar*, the majority view) or the white glow (*Shafaq Abyad*, the classical Hanafi view). Our platform defaults to the accepted astronomical standard of the respective geographic region.
            </li>
          </ul>
          <p>
            Under no circumstances should these technical juristic nuances be treated as grounds for sectarian friction, dispute, or disrespect. We honor and revere all righteous classical imams and their rigorous methodologies.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2>4. High-Latitude Anomalies & Polar Regions</h2>
          <p>
            In geographic regions located above 48° to 66° North or South (such as parts of the United Kingdom, Scandinavia, Canada, and Northern Europe during summer months), astronomical twilight persists throughout the night, meaning the sun never dips 18° or even 15° below the horizon.
          </p>
          <p>
            In such circumstances, mathematical formulas encounter astronomical singularities. Scholars of international Fiqh academies have formulated three recognized alternative calculation methods:
          </p>
          <ol>
            <li>
              <strong>Aqrab al-Balad (Nearest Moderate City):</strong> Adopting the timetable of the nearest city where normal night and day alternations occur without persistent twilight.
            </li>
            <li>
              <strong>Nisf al-Layl (Middle of the Night Rule):</strong> Dividing the duration between sunset and sunrise into halves; the first half concludes Maghrib, and the second half commences Fajr.
            </li>
            <li>
              <strong>Sub&rsquo; al-Layl (One-Seventh of the Night):</strong> Dividing the night into seven portions and allocating specific intervals to dawn and dusk.
            </li>
          </ol>
          <p>
            Residents of extreme high latitudes must consult their local Islamic council (such as the European Council for Fatwa and Research or local unified mosque boards) for the binding local ruling.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2>5. Technical & Algorithmic Limitations</h2>
          <p>
            While every effort has been made to calibrate our astronomical models with utmost mathematical fidelity, users must acknowledge the following technical realities:
          </p>
          <ul>
            <li>
              <strong>Device Clock Synchronization:</strong> All countdowns, current prayer indicators, and timetable notifications depend upon the system clock of the user&rsquo;s smartphone, tablet, or computer. If your device clock is inaccurate or desynchronized from Network Time Protocol (NTP), the countdown and waqt status may display inaccurate readings.
            </li>
            <li>
              <strong>Atmospheric & Elevation Factors:</strong> Severe weather conditions, dense atmospheric fog, temperature inversions, and local elevation above sea level (mountains, tall skyscrapers) cause minute variations in optical sunrise and sunset observations. Observers on the 80th floor of a high-rise building experience sunset 2 to 3 minutes later than pedestrians on the ground level.
            </li>
            <li>
              <strong>Geolocation Accuracy:</strong> When utilizing our automatic location detection or GPS features, coordinates are estimated based on your browser&rsquo;s Geolocation API or network IP address. Users in border areas or traveling between states should verify that their selected city matches their true physical location.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section>
          <h2>6. Non-Commercial Religious Dedication & Copyright-Free Assets</h2>
          <p>
            Namaz-e-Shariq is published as a dedicated public community service (*Sadaqah Jariyah*). We are committed to ethical data stewardship, complete transparency, and non-copyrighted media usage:
          </p>
          <ul>
            <li>
              All background imagery, mosque photography, and visual graphics featured on this platform are sourced from copyright-free, commercially licensed creative commons repositories (including Unsplash License and Open Source Creative Commons) or created natively.
            </li>
            <li>
              Our textual articles, prayer rakat tables, and astronomical guides are published under open educational principles to foster religious literacy, Khushu in worship, and spiritual harmony.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2>7. Commitment to Religious Sensitivity & Error Reporting</h2>
          <p>
            We uphold the highest standard of reverence and dignity for Islamic sacred law, the Holy Quran, and the noble Sunnah of the Prophet Muhammad (peace be upon him). We take the utmost precaution to ensure that no content published on this platform causes offense, religious distress, or jurisprudential distortion.
          </p>
          <p>
            If any scholar, imam, astronomer, or worshiper detects an inadvertent clerical inaccuracy, typographical error, or prayer timing discrepancy for their district, we humbly request you notify our editorial board through our official contact portal:
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 not-prose flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Editorial & Theological Advisory Board
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Submit corrections, verified local mosque schedules, or Fiqh inquiries.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-4 py-2 bg-brand-700 hover:bg-brand-600 text-white rounded-lg text-xs font-semibold transition shrink-0"
            >
              Contact Board
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 italic text-center">
            &ldquo;Our Lord, do not impose blame upon us if we have forgotten or erred.&rdquo; — Surah Al-Baqarah (2:286)
          </p>
        </section>
      </div>
    </div>
  );
}
