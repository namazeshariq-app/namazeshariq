import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Calendar, Compass, ShieldCheck, ChevronRight, Share2, Info, BookOpen, Sun, Moon, Sparkles } from 'lucide-react';
import PrayerWidget from '@/components/PrayerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { CITIES, calculatePrayerTimes, getTimezoneOffsetHours } from '@/lib/prayer-calc';
import { generateBreadcrumbSchema, generateFAQSchema, getAlternateLanguages, SITE_URL } from '@/lib/seo';

interface CityPageProps {
  params: Promise<{ city: string }>;
}

const CITY_ALIASES: Record<string, string> = {
  bengaluru: 'bangalore',
  calcutta: 'kolkata',
  chattogram: 'chittagong',
  nyc: 'new-york',
};

function resolveCity(rawSlug: string) {
  const norm = rawSlug.toLowerCase().trim().replace(/_/g, '-');
  const targetKey = CITY_ALIASES[norm] || norm;
  return CITIES[targetKey] || null;
}

export async function generateStaticParams() {
  return Object.keys(CITIES).map((slug) => ({
    city: slug,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = resolveCity(citySlug);

  if (!city) {
    return {
      title: 'City Not Found | Namaz-e-Shariq',
    };
  }

  const shortName = city.name.split('(')[0].trim();
  const title = `Today Namaz Timings in ${shortName} | Namaz-e-Shariq`;
  const description = `Today namaz timings in ${shortName}, ${city.country}. Verified daily schedules for Fajr, Dhuhr, Asr, Maghrib, and Isha with Hanafi and Shafi'i calculation.`;

  return {
    title,
    description,
    alternates: getAlternateLanguages(`/prayer-times/${city.slug}`),
    keywords: [
      `namaz timings in ${city.name.toLowerCase()}`,
      `prayer time in ${city.name.toLowerCase()}`,
      `today namaz time ${city.name.toLowerCase()}`,
      `fajr namaz time ${city.name.toLowerCase()}`,
      `maghrib time ${city.name.toLowerCase()}`,
      `asr prayer time ${city.name.toLowerCase()}`,
      `${city.name.toLowerCase()} prayer timetable`,
    ],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/prayer-times/${city.slug}`,
      type: 'website',
    },
  };
}

export default async function CityPrayerPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const city = resolveCity(citySlug);

  if (!city) {
    notFound();
  }

  const now = new Date();
  const offset = getTimezoneOffsetHours(city.timezone, now);
  const times = calculatePrayerTimes(city.latitude, city.longitude, now, offset, city.defaultSchool, city.method);

  const cityFaqs = [
    {
      question: `What time is today Fajr in ${city.name}?`,
      answer: `Today Fajr prayer in ${city.name} starts at ${times.fajr} (the onset of Subh Sadiq at an 18° solar depression angle) and concludes at Sunrise (${times.sunrise}). Fasting individuals must cease eating and drinking prior to ${times.fajr}.`,
    },
    {
      question: `What time is today Maghrib (Iftar) in ${city.name}?`,
      answer: `Today Maghrib prayer and Iftar time in ${city.name} is at ${times.maghrib} at the precise instant the upper limb of the solar disk sets below the western horizon.`,
    },
    {
      question: `Which calculation method is followed in ${city.name}?`,
      answer: `Prayer times in ${city.name} are calculated using the ${city.method.toUpperCase()} standard with an 18°/18° twilight angle and local latitude/longitude coordinates (${city.latitude}° N, ${city.longitude}° E).`,
    },
    {
      question: `What is the difference between Hanafi and Shafi'i Asr time in ${city.name}?`,
      answer: `In ${city.name}, Hanafi Asr time begins approximately 45 to 60 minutes after Shafi'i Asr time due to the 2x versus 1x shadow factor calculation. Use our widget toggle above to view both schedules.`,
    },
    ...(city.slug === 'delhi'
      ? [
          {
            question: 'How is namaz time in delhi hanafi determined for today?',
            answer: `Namaz time in delhi hanafi is calibrated using the 18° astronomical twilight angle for Fajr and Isha, and the 2x shadow length rule for Asr. Masajid across the capital—including Jama Masjid Delhi, Hazrat Nizamuddin, and Fatehpuri Masjid—rely on these verified waqt bounds. For live namaz time delhi today, refer to the interactive timetable above.`,
          },
        ]
      : []),
    ...(city.slug === 'calicut'
      ? [
          {
            question: 'What calculation standard is followed for namaz time calicut?',
            answer: `For namaz time calicut (Kozhikode, Kerala), coastal masajid affiliated with Samastha Kerala Jam'iyyathul Ulama commonly observe the Shafi'i juristic standard (1x shadow length for Asr) alongside the Karachi/MWL solar twilight angles. Both Shafi'i and Hanafi Asr schedules can be toggled above.`,
          },
        ]
      : []),
    ...(city.slug === 'dhaka'
      ? [
          {
            question: 'What is the tahajjud namaz time dhaka today?',
            answer: `Tahajjud namaz time dhaka begins after the completion of Isha prayer and extends until the onset of Subh Sadiq (Fajr Sehri cutoff at ${times.fajr}). The most virtuous period is the final third of the night, which in Dhaka typically commences between 2:45 AM and 3:30 AM depending on seasonal night length.`,
          },
        ]
      : []),
    ...(city.slug === 'dubai'
      ? [
          {
            question: 'How does shia namaz time in dubai differ from the general timetable?',
            answer: `Shia namaz time in dubai (Ja'fari Fiqh, observed at centres such as the Imam Husain Mosque in Al Wasl) observes Maghrib roughly 10 to 15 minutes after sunset once the eastern redness passes overhead. In Ja'fari tradition, Dhuhr and Asr, as well as Maghrib and Isha, may also be performed back-to-back within their shared periods.`,
          },
        ]
      : []),
    ...(city.slug === 'karachi'
      ? [
          {
            question: 'What are the nuances for shia namaz timing karachi compared to Hanafi timings?',
            answer: `While the predominant schedule across Karachi is calibrated by the University of Islamic Sciences Banuri Town (Hanafi 18°/18° and 2x shadow Asr), shia namaz timing karachi (practiced at prominent Shia masajid such as Mehfil-e-Murtaza and Khoja Jama Masjid) incorporates a 10 to 15-minute sunset twilight buffer for Maghrib and recognizes combined prayer periods.`,
          },
        ]
      : []),
    {
      question: `What are the prohibited prayer times in ${city.name}?`,
      answer: `Prayer (including voluntary Nafl) is strictly prohibited during three periods: 1) Sunrise until 15-20 minutes thereafter; 2) Exactly at solar zenith (Zawal) for 5 minutes prior to Dhuhr; 3) The 15 minutes before Maghrib sunset when the sun turns pale yellow.`,
    },
    {
      question: `How does daylight duration vary throughout the year in ${city.name}?`,
      answer: `Located at latitude ${city.latitude}° N, ${city.name} experiences seasonal daylight shifts between the June summer solstice and the December winter solstice. Fasting durations and waqt intervals adjust progressively through each astronomical season.`,
    },
  ];

  const faqSchema = generateFAQSchema(cityFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Prayer Times', url: `${SITE_URL}/prayer-times` },
    { name: city.name, url: `${SITE_URL}/prayer-times/${city.slug}` },
  ]);

  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'City',
    name: city.name,
    containedInPlace: {
      '@type': 'Country',
      name: city.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.latitude,
      longitude: city.longitude,
    },
    url: `${SITE_URL}/prayer-times/${city.slug}`,
  };

  // Generate a 7-day projection timetable
  const forecastDays = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() + idx);
    const dayTimes = calculatePrayerTimes(city.latitude, city.longitude, d, undefined, city.defaultSchool, city.method);
    return {
      date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      fajr: dayTimes.fajr,
      sunrise: dayTimes.sunrise,
      dhuhr: dayTimes.dhuhr,
      asr: dayTimes.asr,
      maghrib: dayTimes.maghrib,
      isha: dayTimes.isha,
      isToday: idx === 0,
    };
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 transition-colors duration-200">
      {/* Schemas */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-slate-500 dark:text-slate-400 flex-wrap gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-700 dark:hover:text-emerald-400 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/prayer-times" className="hover:text-brand-700 dark:hover:text-emerald-400 transition">Prayer Times</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 dark:text-slate-200 font-medium">{city.name}</span>
        </nav>

        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs transition-colors duration-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-emerald-950/60 text-brand-800 dark:text-emerald-300 border border-brand-200 dark:border-emerald-800 mb-3">
            <MapPin className="w-3.5 h-3.5 text-brand-600 dark:text-emerald-400" />
            {city.name}, {city.country}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            Namaz Timings in {city.name} Today
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            {city.description} Coordinates: {city.latitude}° N, {city.longitude}° E. Timezone: {city.timezone}. Calculated via native spherical solar algorithms on Cloudflare Edge.
          </p>
        </div>

        {/* Live Interactive Calculation Widget with Auto-Location */}
        <PrayerWidget initialCity={city.slug} showCitySelector={true} />

        {/* 7-Day Timetable Projection */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs overflow-hidden transition-colors duration-200">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              7-Day Projected Prayer Timetable for {city.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Daily waqt entry times including Sehri cutoff, Sunrise (Shurooq), and Maghrib Iftar.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3 rounded-l-lg">Date</th>
                  <th className="py-3 px-3">Fajr (Sehri)</th>
                  <th className="py-3 px-3">Sunrise</th>
                  <th className="py-3 px-3">Dhuhr</th>
                  <th className="py-3 px-3">Asr ({city.defaultSchool.toUpperCase()})</th>
                  <th className="py-3 px-3">Maghrib (Iftar)</th>
                  <th className="py-3 px-3 rounded-r-lg">Isha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {forecastDays.map((day, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 ${day.isToday ? 'bg-emerald-50/60 dark:bg-emerald-950/30 font-bold text-emerald-950 dark:text-emerald-200' : ''}`}
                  >
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {day.date} {day.isToday && <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold">Today</span>}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-emerald-800 dark:text-emerald-400">{day.fajr}</td>
                    <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400">{day.sunrise}</td>
                    <td className="py-3.5 px-3">{day.dhuhr}</td>
                    <td className="py-3.5 px-3">{day.asr}</td>
                    <td className="py-3.5 px-3 font-semibold text-emerald-800 dark:text-emerald-400">{day.maghrib}</td>
                    <td className="py-3.5 px-3">{day.isha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Comprehensive Local Mosque & Fiqh Guide (>1,000 words total page content) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 transition-colors duration-200">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Comprehensive Islamic Waqt & Mosque Guidelines in {city.name}
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Offering daily Salah on time is an essential religious obligation. For residents and visitors across {city.name}, understanding how the five daily prayer intervals are calibrated to local geography ensures worship is performed with peace of heart and strict adherence to the Prophetic Sunnah.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Situated at coordinates {city.latitude}° N latitude and {city.longitude}° E longitude, {city.name} experiences unique solar trajectories throughout the annual solar calendar. In this dedicated municipal briefing, we analyze the local waqt boundaries, congregational Jamat practices, and seasonal prayer transitions.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              1. Understanding the Five Daily Waqt Boundaries in {city.name}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">
                  Fajr Waqt & Sehri Cutoff ({times.fajr} to {times.sunrise})
                </span>
                <p className="leading-relaxed">
                  Fajr commences when the true astronomical dawn (*Subh Sadiq*) appears as a horizontal white band of light stretching across the eastern horizon. For fasting during Ramadan or voluntary fasts, all food, beverage, and smoking must terminate prior to the entry of Fajr. Fajr waqt expires promptly when the upper edge of the sun crosses the horizon (Sunrise at {times.sunrise}).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">
                  Dhuhr Waqt ({times.dhuhr})
                </span>
                <p className="leading-relaxed">
                  Dhuhr begins when the sun passes the meridian (*Zawal*). To avoid praying during the prohibited zenith instant, our timetable incorporates a standard 2-minute safety precaution. In local masajid across {city.name}, congregational Dhuhr is commonly held between 1:15 PM and 1:30 PM.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">
                  Asr Waqt ({times.asr})
                </span>
                <p className="leading-relaxed">
                  Asr commences according to the juristic school of choice. Under the Shafi’i, Maliki, and Hanbali standard, Asr starts when an object&rsquo;s shadow equals its length plus noon shadow. Under the Hanafi standard followed across South Asia, Asr begins when the shadow reaches twice the object&rsquo;s length plus noon shadow.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">
                  Maghrib (Sunset / Iftar at {times.maghrib})
                </span>
                <p className="leading-relaxed">
                  Maghrib begins the instant the entire solar disk vanishes beneath the western horizon. Fasting believers break their fast at this moment with dates and water. Maghrib has the shortest window of all prayers; performing it promptly is a strongly emphasized Sunnah.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">
                  Isha & Tahajjud ({times.isha} to {times.tahajjud})
                </span>
                <p className="leading-relaxed">
                  Isha begins when evening twilight has completely dissipated. The late third of the night (Qiyam al-Layl / Tahajjud starting at {times.tahajjud}) is the most spiritually elevated time for voluntary prayer and intimate supplication (*Munajat*).
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              2. Traveler (Musafir) Rulings for Visitors Arriving in {city.name}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              If you are traveling to {city.name} from another city or country and your intended stay is less than 15 consecutive days, you are classified in Islamic law as a *Musafir* (traveler):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                You shorten 4-rakat Fard prayers (Dhuhr, Asr, Isha) to 2 rakats (*Qasr*). Fajr and Maghrib are never shortened.
              </li>
              <li>
                When praying behind a resident Imam in a local mosque in {city.name}, you follow the Imam and complete the full 4 rakats without shortening.
              </li>
              <li>
                You may wipe over leather socks (*Khuffayn*) or waterproof ablution socks for up to 72 hours (3 days and nights) instead of washing your feet during Wudu.
              </li>
            </ul>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              3. Mosque Jamat Assembly Times & Etiquette
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Most neighborhood masajid across {city.name} ring the Azan at the entry of the waqt displayed above, and assemble the congregation (Iqamah) roughly 15 to 25 minutes later. When visiting local houses of worship, maintain quiet reverence, turn mobile devices to silent mode, and perform two rakats of *Tahiyyat al-Masjid* upon entering before sitting down.
            </p>

            {city.slug === 'delhi' && (
              <div className="p-4 rounded-xl bg-brand-50/70 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/60 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-brand-900 dark:text-emerald-300 text-sm">
                  Delhi Islamic Waqt Authority & Hanafi Tradition:
                </h4>
                <p>
                  Official <strong>namaz time in delhi hanafi</strong> adheres strictly to the Karachi / Deoband standard (18° Fajr twilight and 2x shadow length for Asr). For believers searching for accurate <strong>namaz time delhi today</strong>, our calculations reflect verified coordinates for Old Delhi (Shahjahanabad), New Delhi, Jamia Nagar, and NCR masajid.
                </p>
              </div>
            )}

            {city.slug === 'calicut' && (
              <div className="p-4 rounded-xl bg-brand-50/70 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/60 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-brand-900 dark:text-emerald-300 text-sm">
                  Calicut (Kozhikode) Coastal Timetables & Shafi&rsquo;i Observance:
                </h4>
                <p>
                  Throughout Kozhikode and Malabar coast, <strong>namaz time calicut</strong> masajid predominantly follow the Shafi&rsquo;i school (1x shadow length for Asr) as guided by Samastha Kerala Jam&rsquo;iyyathul Ulama. Both Shafi&rsquo;i and Hanafi Asr options are provided in the calculator above.
                </p>
              </div>
            )}

            {city.slug === 'dhaka' && (
              <div className="p-4 rounded-xl bg-brand-50/70 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/60 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-brand-900 dark:text-emerald-300 text-sm">
                  Dhaka Tahajjud & Islamic Foundation Bangladesh Guidelines:
                </h4>
                <p>
                  The optimal <strong>tahajjud namaz time dhaka</strong> occurs during the final third of the night between Isha and morning twilight. In Dhaka, Tahajjud vigil and Sehri concludes sharply at Subh Sadiq, aligned with Islamic Foundation Bangladesh criteria.
                </p>
              </div>
            )}

            {city.slug === 'dubai' && (
              <div className="p-4 rounded-xl bg-brand-50/70 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/60 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-brand-900 dark:text-emerald-300 text-sm">
                  Dubai Shia (Ja&rsquo;fari) Timing Nuances:
                </h4>
                <p>
                  For the community inquiring about <strong>shia namaz time in dubai</strong>, Maghrib waqt is observed roughly 10 to 15 minutes after standard sunset (following the clearance of eastern twilight). Ja&rsquo;fari congregations also permit joining Dhuhr with Asr and Maghrib with Isha during permissible time intervals.
                </p>
              </div>
            )}

            {city.slug === 'karachi' && (
              <div className="p-4 rounded-xl bg-brand-50/70 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/60 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-brand-900 dark:text-emerald-300 text-sm">
                  Karachi Timetables & Shia Prayer Schedules:
                </h4>
                <p>
                  While Karachi&rsquo;s Sunni masajid follow the University of Islamic Sciences Banuri Town schedule, <strong>shia namaz timing karachi</strong> observed at Shia masajid and imambargahs incorporates a 10 to 15-minute sunset twilight buffer for Maghrib and recognizes combined prayer windows.
                </p>
              </div>
            )}

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-brand-700 dark:text-emerald-400">
              <Link href="/rakats" className="hover:underline flex items-center gap-1">
                <span>View Complete Namaz Rakats Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/blog/understanding-namaz-timings-calculation-methods" className="hover:underline flex items-center gap-1">
                <span>How Solar Angles Are Calculated</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* City FAQs */}
        <FAQAccordion items={cityFaqs} title={`Frequently Asked Questions for ${city.name} Namaz Timings`} />
      </div>
    </div>
  );
}
