import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, MapPin, Sparkles, Compass, ChevronRight, Globe, ShieldCheck, Sun, Moon, Sunrise, Sunset, BookOpen } from 'lucide-react';
import PrayerWidget from '@/components/PrayerWidget';
import { CITIES } from '@/lib/prayer-calc';
import { generateBreadcrumbSchema, getAlternateLanguages, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Today Namaz Times & Prayer Timetables | Namaz-e-Shariq',
  description:
    'Real-time astronomical prayer times for global cities. Accurate waqt for Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha with Hanafi and Shafi’i options.',
  alternates: getAlternateLanguages('/prayer-times'),
};

export default function PrayerTimesHubPage() {
  const cityKeys = Object.keys(CITIES);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Prayer Times', url: `${SITE_URL}/prayer-times` },
  ]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Edge-Computed Solar Precision
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Today <span className="text-brand-700 dark:text-emerald-400">Namaz Times</span> & Schedules
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Select your city or switch juristic calculation methods to receive accurate, instant waqt boundaries calculated through astronomical solar coordinates without third-party API lag.
          </p>
        </div>

        {/* Live Widget with Auto-Location Detection */}
        <PrayerWidget initialCity="bangalore" showCitySelector={true} />

        {/* Directory of Cities */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors duration-200">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Select City for Localized Mosque Timetable
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Click any city below for dedicated waqt analysis, monthly tables, and local calculation standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityKeys.map((key) => {
              const c = CITIES[key];
              return (
                <Link
                  key={key}
                  href={`/prayer-times/${c.slug}`}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-emerald-500 hover:bg-brand-50/20 dark:hover:bg-slate-800/40 transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-brand-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-brand-700 group-hover:text-white transition">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-800 dark:group-hover:text-emerald-400 transition text-sm">
                        {c.name}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">
                        {c.country} • {c.latitude.toFixed(2)}° N
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Comprehensive Astronomical Guide (>1,000 words total page content) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 transition-colors duration-200">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              The Science of Islamic Sacred Timekeeping (Ilm al-Mawaqit)
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              In Islamic tradition, the five daily prayers are not tied to static arbitrary clock hours; rather, they are organically anchored to the dynamic diurnal cycle of the sun. Because the Earth travels in an elliptical orbit tilted on its rotational axis by approximately 23.44 degrees, the sun&rsquo;s apparent path across the sky changes every single day of the year.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              This geometric variation causes the length of day and night, the solar altitude at noon, and the duration of morning and evening twilight to continuously fluctuate. Understanding the astronomical mechanics behind these shifts illuminates the harmony between divine revelation and cosmic creation.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              The Three Foundational Variables of Solar Calculation
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              To calculate the exact prayer times for any coordinate on Earth without consulting an external third-party service, three fundamental astronomical variables must be mathematically derived for the specific Julian Date:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">1. Solar Declination (δ)</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  The angle between the rays of the sun and the plane of the Earth&rsquo;s equator. It oscillates between approximately +23.44° at the summer solstice (June 21) and -23.44° at the winter solstice (December 21), crossing 0° at the vernal and autumnal equinoxes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">2. Equation of Time (EoT)</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  The difference between apparent solar time (sundial time) and mean solar time (clock time). Because the Earth&rsquo;s orbital velocity varies according to Kepler&rsquo;s second law, solar noon can precede or lag behind 12:00 clock time by as much as 14 to 16 minutes throughout the year.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">3. The Hour Angle (H)</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  The angular distance between the sun&rsquo;s current celestial meridian and the observer&rsquo;s meridian. By applying spherical trigonometry, the hour angle determines the exact time elapsed since or remaining until solar noon for any solar depression angle.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Global Calculation Standards & Regional Twilight Conventions
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Because atmospheric conditions, latitude, and dust refraction vary widely across continents, major Islamic scholarly bodies established standardized solar depression parameters for Subh Sadiq (Fajr) and Shafaq (Isha):
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4 rounded-l-lg">Authority / Council</th>
                    <th className="py-3 px-4">Fajr Angle</th>
                    <th className="py-3 px-4">Isha Parameter</th>
                    <th className="py-3 px-4 rounded-r-lg">Primary Geographic Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">University of Islamic Sciences, Karachi</td>
                    <td className="py-3.5 px-4 text-emerald-800 dark:text-emerald-400 font-bold">18.0°</td>
                    <td className="py-3.5 px-4 text-emerald-800 dark:text-emerald-400 font-bold">18.0°</td>
                    <td className="py-3.5 px-4">Pakistan, India, Bangladesh, Afghanistan</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">Umm Al-Qura University, Makkah</td>
                    <td className="py-3.5 px-4">18.5°</td>
                    <td className="py-3.5 px-4">+90 min after Maghrib (120 min Ramadan)</td>
                    <td className="py-3.5 px-4">Saudi Arabia, UAE, Gulf States</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">Muslim World League (MWL)</td>
                    <td className="py-3.5 px-4">18.0°</td>
                    <td className="py-3.5 px-4">17.0°</td>
                    <td className="py-3.5 px-4">Europe, Far East, parts of North America</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">Egyptian General Authority of Survey</td>
                    <td className="py-3.5 px-4">19.5°</td>
                    <td className="py-3.5 px-4">17.5°</td>
                    <td className="py-3.5 px-4">Egypt, North Africa, Levant, Malaysia</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">Islamic Society of North America (ISNA)</td>
                    <td className="py-3.5 px-4">15.0°</td>
                    <td className="py-3.5 px-4">15.0°</td>
                    <td className="py-3.5 px-4">United States, Canada</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Why Punctuality in Salah Elevates the Believer
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              The companion Abdullah ibn Mas&rsquo;ud (may Allah be pleased with him) asked the Prophet Muhammad (peace be upon him):
            </p>
            <blockquote className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-600 dark:border-emerald-500 text-emerald-950 dark:text-emerald-200 text-sm italic">
              &ldquo;Which deed is most beloved to Allah?&rdquo; The Prophet replied: &ldquo;Prayer offered at its proper time (al-Salatu &lsquo;ala waqtiha).&rdquo; — Sahih al-Bukhari (527)
            </blockquote>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              When a believer structures their professional and personal life around these divine cosmic intervals, daily stress diminishes. The pause for Dhuhr refreshes the mind during the workday; Asr provides perspective before evening commitments; Maghrib marks the gratitude of sunset; and Isha provides peaceful closure before slumber.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              The Islamic Division of the Night and Calculating Tahajjud
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              In Islamic jurisprudence, the spiritual night (*al-Layl*) begins precisely at **Maghrib (Sunset)** and concludes at **Subh Sadiq (Fajr Dawn)**. To calculate the most virtuous portion of the night for Tahajjud (the last third):
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
              <p><strong>Step 1:</strong> Calculate total night duration = (Fajr time of next morning) - (Maghrib time of current evening).</p>
              <p><strong>Step 2:</strong> Divide the total night duration by 3.</p>
              <p><strong>Step 3:</strong> Add two-thirds of the night duration to Maghrib sunset time. The resulting moment marks the start of the final third (*Thuluth al-Akhir*), extending until Fajr.</p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              The Prophet Muhammad (peace be upon him) affirmed in Sahih al-Bukhari: <em>&ldquo;Our Lord descends every night to the lowest heaven when one-third of the night remains and says: Who is calling upon Me that I may answer him? Who is asking of Me that I may give him? Who is seeking My forgiveness that I may forgive him?&rdquo;</em>
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Essential Ritual Purity: The Sunnah Method of Wudu Before Prayer
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Valid prayer requires pristine physical and spiritual cleanliness (*Taharah*). The Prophet Muhammad (peace be upon him) instructed believers to perform Wudu methodically with mindful presence:
            </p>
            <ol className="list-decimal pl-6 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <li>Form the sincere intention (*Niyyah*) in the heart and recite <em>&ldquo;Bismillah&rdquo;</em> (In the name of Allah).</li>
              <li>Wash both hands up to the wrists three times, ensuring water passes between the fingers (*Takhlil*).</li>
              <li>Rinse the mouth thoroughly with water three times (*Madmadah*).</li>
              <li>Inhale water lightly into the nostrils and blow it out three times using the left hand (*Istinshaq*).</li>
              <li>Wash the entire face three times, from the hairline to below the chin and from ear to ear.</li>
              <li>Wash both arms up to and including the elbows three times, starting with the right arm.</li>
              <li>Wipe the entire head with wet hands once (*Masah*), and wipe the inside and back of the ears with the index fingers and thumbs.</li>
              <li>Wash both feet up to and including the ankles three times, starting with the right foot and passing fingers between toes.</li>
              <li>Conclude with the authentic prophetic supplication: <em>&ldquo;Ashhadu alla ilaha illallahu wahdahu la sharika lahu, wa ashhadu anna Muhammadan &lsquo;abduhu wa rasuluh.&rdquo;</em></li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
