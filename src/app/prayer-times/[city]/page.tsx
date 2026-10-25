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
  calicat: 'calicut',
  kozhikode: 'calicut',
  rasalkhaimah: 'ras-al-khaimah',
  rak: 'ras-al-khaimah',
};

function resolveCity(rawSlug: string) {
  const norm = rawSlug.toLowerCase().trim().replace(/_/g, '-');
  const targetKey = CITY_ALIASES[norm] || norm;
  return CITIES[targetKey] || null;
}

export async function generateStaticParams() {
  const cityKeys = Object.keys(CITIES);
  const aliasKeys = Object.keys(CITY_ALIASES);
  const allSlugs = Array.from(new Set([...cityKeys, ...aliasKeys]));
  return allSlugs.map((slug) => ({
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
  let title = `Today Namaz Timings in ${shortName} | Namaz-e-Shariq`;
  let description = `Today namaz timings in ${shortName}, ${city.country}. Verified daily schedules for Fajr, Dhuhr, Asr, Maghrib, and Isha with Hanafi and Shafi'i calculation.`;
  let customKeywords: string[] = [
    `namaz timings in ${city.name.toLowerCase()}`,
    `prayer time in ${city.name.toLowerCase()}`,
    `today namaz time ${city.name.toLowerCase()}`,
    `fajr namaz time ${city.name.toLowerCase()}`,
    `maghrib time ${city.name.toLowerCase()}`,
    `asr prayer time ${city.name.toLowerCase()}`,
    `${city.name.toLowerCase()} prayer timetable`,
  ];

  if (city.slug === 'calicut') {
    title = 'Namaz Time Calicut & Prayer Time Kozhikode Today: Daily Timetable';
    description = 'Accurate today namaz time calicut & prayer time kozhikode. Daily prayer timetable for Fajr, Dhuhr, Asr (Shafi\'i & Hanafi), Maghrib, and Isha with local mosque waqt.';
    customKeywords = [
      'prayer time kozhikode',
      'namaz time calicut',
      'today namaz time calicut',
      'kozhikode prayer time',
      'calicut namaz time today',
      'prayer time calicut',
      'calicut prayer times',
      'namaz time kozhikode',
      'fajr time calicut',
      'maghrib time calicut',
      'asr time calicut shafii',
      'kerala prayer timings',
    ];
  } else if (city.slug === 'perinthalmanna') {
    title = 'Prayer Time Perinthalmanna: Today Namaz Timetable & Azan Times';
    description = 'Accurate today prayer time perinthalmanna (Malappuram, Kerala). Daily prayer timetable for Fajr, Dhuhr, Asr (Shafi\'i & Hanafi), Maghrib, and Isha with mosque waqt schedules.';
    customKeywords = [
      'prayer time perinthalmanna',
      'perinthalmanna prayer time',
      'today prayer time perinthalmanna',
      'namaz time perinthalmanna',
      'fajr time perinthalmanna',
      'maghrib time perinthalmanna',
      'malappuram prayer times',
      'kerala prayer timetable',
    ];
  } else if (city.slug === 'ras-al-khaimah') {
    title = 'Prayer Time Ras Al Khaimah Today: RAK Namaz Timetable & Azan Times';
    description = 'Accurate today prayer time ras al khaimah (RAK, UAE). Daily namaz schedule for Fajr, Dhuhr, Asr, Maghrib, and Isha authorized by AWQAF General Authority.';
    customKeywords = [
      'prayer time ras al khaimah',
      'ras al khaimah prayer time',
      'today prayer time ras al khaimah',
      'rak prayer times',
      'namaz time ras al khaimah',
      'fajr time ras al khaimah',
      'maghrib time ras al khaimah',
      'uae prayer timings',
      'awqaf prayer times rak',
    ];
  } else if (city.slug === 'delhi') {
    title = 'Namaz Time in Delhi Hanafi: Today Prayer Timings Schedule';
    description = 'Accurate namaz time in delhi hanafi today. Verified Jama Masjid and Nizamuddin prayer schedules for Fajr, Dhuhr, Asr (2x shadow), Maghrib, and Isha.';
    customKeywords = [
      'namaz time in delhi hanafi',
      'namaz time delhi today',
      'delhi namaz timings hanafi',
      'jama masjid prayer time',
      'nizamuddin namaz time',
      'today namaz time delhi',
      'hanafi prayer times delhi',
    ];
  } else if (city.slug === 'karachi') {
    title = 'Karachi Prayer Times & Shia Namaz Timing Karachi Today';
    description = 'Authentic Karachi prayer times & shia namaz timing karachi today. Banuri Town & Shia Jafari timetables for Fajr, Dhuhr, Asr, Maghrib, and Isha waqt.';
    customKeywords = [
      'shia namaz timing karachi',
      'karachi namaz timing',
      'today prayer time karachi',
      'banuri town prayer times',
      'shia prayer times karachi',
      'maghrib shia time karachi',
    ];
  }

  return {
    title,
    description,
    alternates: getAlternateLanguages(`/prayer-times/${city.slug}`),
    keywords: customKeywords,
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
            answer: `Namaz time in delhi hanafi is calibrated using the 18° astronomical twilight angle for Fajr and Isha, and the 2x shadow length rule for Asr. Masajid across the capital—including Jama Masjid Delhi, Hazrat Nizamuddin, and Fatehpuri Masjid—rely on these verified waqt bounds. For live namaz time in delhi hanafi today, refer to the interactive timetable above.`,
          },
          {
            question: 'What are the daily prayer schedules for namaz time in delhi hanafi?',
            answer: `Under the Hanafi calculation followed in Old Delhi, New Delhi, and Jamia Nagar, Fajr begins at Subh Sadiq (${times.fajr}), Dhuhr at solar zenith (${times.dhuhr}), Asr at 2x shadow length (${times.asr}), Maghrib at sunset (${times.maghrib}), and Isha at twilight disappearance (${times.isha}). Check our live timetable for current namaz time in delhi hanafi.`,
          },
        ]
      : []),
    ...(city.slug === 'calicut'
      ? [
          {
            question: 'What is today prayer time kozhikode (namaz time calicut) for all 5 prayers?',
            answer: `Today prayer time kozhikode (namaz time calicut) is: Fajr at ${times.fajr} (Sehri ends), Sunrise at ${times.sunrise}, Dhuhr at ${times.dhuhr}, Asr (Shafi'i) at ${times.asr}, Maghrib (Iftar) at ${times.maghrib}, and Isha at ${times.isha}. Use our live widget above to view both Shafi'i and Hanafi schedules for prayer time kozhikode and namaz time calicut.`,
          },
          {
            question: 'Why does prayer time kozhikode follow the Shafi’i Asr calculation?',
            answer: `In Kozhikode (Calicut) and the wider Malabar coast, traditional masajid affiliated with Samastha Kerala Jam'iyyathul Ulama follow the Shafi'i madhhab. Therefore, prayer time kozhikode masajid call the Asr Azan under the 1x shadow length factor, approximately 50 minutes earlier than the North Indian Hanafi timing. Both options are accessible on our prayer time kozhikode portal.`,
          },
          {
            question: 'Where can I find Sehri and Iftar prayer time kozhikode during fasting?',
            answer: `For fasting in Kozhikode (Calicut), Sehri cutoff concludes promptly at Fajr waqt (${times.fajr}), and Iftar is observed the exact instant the sun sinks into the Arabian Sea at Maghrib (${times.maghrib}). Our live prayer time kozhikode table provides verified daily astronomical coordinates.`,
          },
        ]
      : []),
    ...(city.slug === 'perinthalmanna'
      ? [
          {
            question: 'What is today prayer time perinthalmanna for all 5 daily prayers?',
            answer: `Today prayer time perinthalmanna (Malappuram, Kerala) is: Fajr at ${times.fajr} (Sehri ends), Sunrise at ${times.sunrise}, Dhuhr at ${times.dhuhr}, Asr (Shafi'i) at ${times.asr}, Maghrib (Iftar) at ${times.maghrib}, and Isha at ${times.isha}. Our daily prayer time perinthalmanna timetable is synchronized with local Malappuram masajid.`,
          },
          {
            question: 'How is Asr prayer time perinthalmanna calculated?',
            answer: `Masajid across Perinthalmanna and the Malabar region follow the Shafi'i school of Fiqh, calculating Asr at 1x shadow length. For Hanafi worshippers, our calculator also includes the 2x shadow Asr prayer time perinthalmanna option.`,
          },
          {
            question: 'What are the Ramadan Sehri and Iftar times for prayer time perinthalmanna?',
            answer: `During Ramadan in Perinthalmanna, fasting begins at Fajr true dawn (${times.fajr}) and ends at Maghrib sunset (${times.maghrib}). Check our daily prayer time perinthalmanna schedule for up-to-date timings.`,
          },
        ]
      : []),
    ...(city.slug === 'ras-al-khaimah'
      ? [
          {
            question: 'What is today prayer time ras al khaimah for all 5 obligatory prayers?',
            answer: `Today prayer time ras al khaimah (RAK, UAE) is: Fajr at ${times.fajr}, Sunrise at ${times.sunrise}, Dhuhr at ${times.dhuhr}, Asr at ${times.asr}, Maghrib at ${times.maghrib}, and Isha at ${times.isha}. All timings are aligned with the General Authority of Islamic Affairs and Endowments (AWQAF UAE) standard for prayer time ras al khaimah.`,
          },
          {
            question: 'How many minutes difference is there between prayer time ras al khaimah and Dubai?',
            answer: `Because Ras Al Khaimah is situated in the north-eastern UAE (25.79° N, 55.94° E), prayer time ras al khaimah occurs approximately 2 to 4 minutes earlier than Dubai and Abu Dhabi for Sunrise and sunset, and follows AWQAF official zonal coordinates.`,
          },
          {
            question: 'What is the Jumu\'ah prayer time ras al khaimah in local mosques?',
            answer: `In Ras Al Khaimah masajid, Friday Jumu'ah Khutbah commences at approximately 12:45 PM to 1:15 PM following the unified UAE AWQAF timetable. Check our live prayer time ras al khaimah widget for the exact Dhuhr entry time.`,
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
            answer: `While the predominant Sunni schedule across Karachi is calibrated by the University of Islamic Sciences Banuri Town (Hanafi 18°/18° and 2x shadow Asr), shia namaz timing karachi (practiced at prominent Shia masajid such as Mehfil-e-Murtaza and Khoja Jama Masjid) incorporates a 10 to 15-minute sunset twilight buffer for Maghrib and recognizes combined prayer periods.`,
          },
          {
            question: 'What time is Maghrib and Isha according to shia namaz timing karachi?',
            answer: `In shia namaz timing karachi (Ja'fari Fiqh), Maghrib starts after the sunset redness (*Humrah Mashriqiyyah*) disappears from the eastern sky, approximately 10 to 15 minutes after the Sunni Maghrib call. Many worshippers in Karachi also pray Maghrib and Isha successively within this period.`,
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
            {city.slug === 'calicut'
              ? 'Namaz Time Calicut & Prayer Time Kozhikode Today: Daily Timetable'
              : city.slug === 'perinthalmanna'
              ? 'Prayer Time Perinthalmanna Today: Daily Namaz Timetable & Azan Times'
              : city.slug === 'ras-al-khaimah'
              ? 'Prayer Time Ras Al Khaimah Today: RAK Namaz Timetable & Azan Schedule'
              : city.slug === 'delhi'
              ? 'Namaz Time in Delhi Hanafi Today: Prayer Timings & Schedule'
              : city.slug === 'karachi'
              ? 'Karachi Prayer Times & Shia Namaz Timing Karachi Today'
              : `Namaz Timings in ${city.name} Today`}
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            {city.description} Coordinates: {city.latitude}° N, {city.longitude}° E. Timezone: {city.timezone}. Calculated with astronomical solar precision and verified against regional Islamic authorities and local mosque waqt standards.
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
              Located at {city.latitude}° N latitude and {city.longitude}° E longitude, {city.name} experiences distinct seasonal twilight shifts throughout the year. In this localized prayer guide, we explain the daily waqt boundaries, local mosque Jamat practices, and seasonal prayer transitions to help you plan your worship with peace of mind.
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
              <div className="p-5 rounded-2xl bg-brand-50/70 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/60 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-brand-900 dark:text-emerald-300 text-sm">
                  Delhi Islamic Waqt Authority &amp; Hanafi Tradition:
                </h4>
                <p className="leading-relaxed">
                  Official <strong>namaz time in delhi hanafi</strong> adheres strictly to the Karachi / Deoband standard (18° Fajr astronomical twilight and 2x shadow length for Asr). For believers searching for accurate <strong>namaz time in delhi hanafi</strong> today, our calculations reflect verified coordinates for Old Delhi (Shahjahanabad), New Delhi, Jamia Nagar, Okhla, and NCR masajid.
                </p>
                <p className="leading-relaxed">
                  Historical centers such as Jama Masjid Delhi, Dargah Hazrat Nizamuddin Aulia, and Fatehpuri Masjid ring the Azan according to this authentic Hanafi timetable. Whether you need morning Fajr Sehri cutoff or afternoon Asr, our portal provides the most reliable <strong>namaz time in delhi hanafi</strong>.
                </p>
              </div>
            )}

            {city.slug === 'calicut' && (
              <div className="p-5 rounded-2xl bg-brand-50/70 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/60 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-brand-900 dark:text-emerald-300 text-sm">
                  Calicut &amp; Kozhikode Coastal Timetables &amp; Shafi&rsquo;i Observance:
                </h4>
                <p className="leading-relaxed">
                  Throughout Kozhikode and the Malabar coast, checking verified <strong>prayer time kozhikode</strong> and <strong>namaz time calicut</strong> ensures strict adherence to local Islamic jurisprudence. Masajid across Calicut—including the historic Mishkal Mosque, Kuttichira Juma Masjid, and Markaz—predominantly follow the Shafi&rsquo;i school (1x shadow length for Asr) as guided by the Samastha Kerala Jam&rsquo;iyyathul Ulama.
                </p>
                <p className="leading-relaxed">
                  Because Calicut is situated on the Arabian Sea coast (11.25° N, 75.78° E), sunset and dusk twilight transition rapidly. For daily fasting or Jamat attendance, worshippers rely on accurate <strong>prayer time kozhikode</strong> for precise Sehri cutoff at Fajr dawn and fast-breaking at Maghrib sunset. Both Shafi&rsquo;i and Hanafi Asr schedules are provided in our interactive <strong>prayer time kozhikode</strong> and <strong>namaz time calicut</strong> calculator above.
                </p>
                <p className="leading-relaxed">
                  Whether you are searching for today&rsquo;s <strong>prayer time kozhikode</strong> for morning Fajr or evening Isha, our timetable provides live astronomical countdowns calibrated to coastal Kerala latitude and longitude.
                </p>
              </div>
            )}

            {city.slug === 'perinthalmanna' && (
              <div className="p-5 rounded-2xl bg-brand-50/70 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/60 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-brand-900 dark:text-emerald-300 text-sm">
                  Perinthalmanna (Malappuram) Mosque Timetables &amp; Waqt Calculation:
                </h4>
                <p className="leading-relaxed">
                  Finding reliable <strong>prayer time perinthalmanna</strong> is vital for believers across this major healthcare and Islamic education center in Malappuram district. Masajid across Perinthalmanna, Angadippuram, Pattambi Road, and surrounding localities observe daily prayer times in accordance with the Shafi&rsquo;i madhhab guided by Kerala&rsquo;s scholarly leadership.
                </p>
                <p className="leading-relaxed">
                  Our dedicated <strong>prayer time perinthalmanna</strong> timetable delivers exact solar waqt boundaries based on coordinates 10.9760° N, 76.2254° E. Fajr commences at true dawn (*Subh Sadiq*), Dhuhr enters precisely after solar zenith (*Zawal*), Shafi&rsquo;i Asr starts when shadow equals object length, Maghrib begins at sunset, and Isha starts once twilight disappears.
                </p>
                <p className="leading-relaxed">
                  During Ramadan and year-round voluntary fasts, residents depend on <strong>prayer time perinthalmanna</strong> for verified Sehri end times and evening Iftar calls. Both Shafi&rsquo;i and Hanafi Asr calculations are easily accessible through our interactive <strong>prayer time perinthalmanna</strong> portal.
                </p>
              </div>
            )}

            {city.slug === 'ras-al-khaimah' && (
              <div className="p-5 rounded-2xl bg-brand-50/70 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/60 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-brand-900 dark:text-emerald-300 text-sm">
                  Ras Al Khaimah (RAK) Official UAE AWQAF Timetable &amp; Mosque Guidelines:
                </h4>
                <p className="leading-relaxed">
                  Official <strong>prayer time ras al khaimah</strong> operates under the regulatory standards set by the General Authority of Islamic Affairs and Endowments (AWQAF UAE). Masajid across Ras Al Khaimah—such as the Sheikh Zayed Mosque, Al Qasimi Grand Mosque, Al Nakheel, and Khuzam—broadcast the unified Azan synchronized to northern UAE astronomical calculations.
                </p>
                <p className="leading-relaxed">
                  Because Ras Al Khaimah sits in the northern tip of the Emirates (25.7895° N, 55.9432° E) backed by the Hajar Mountains, <strong>prayer time ras al khaimah</strong> differs slightly by 2 to 4 minutes from Dubai and Abu Dhabi. Worshippers checking <strong>prayer time ras al khaimah</strong> benefit from exact dawn boundaries for Fajr, precise midday Dhuhr intervals, and immediate sunset Iftar timing.
                </p>
                <p className="leading-relaxed">
                  For Friday congregation and daily obligatory Salah, our verified <strong>prayer time ras al khaimah</strong> portal keeps residents and travelers fully informed with live countdowns and monthly printable timetables.
                </p>
              </div>
            )}

            {city.slug === 'dhaka' && (
              <div className="p-4 rounded-xl bg-brand-50/70 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/60 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-brand-900 dark:text-emerald-300 text-sm">
                  Dhaka Tahajjud &amp; Islamic Foundation Bangladesh Guidelines:
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
              <div className="p-5 rounded-2xl bg-brand-50/70 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/60 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-brand-900 dark:text-emerald-300 text-sm">
                  Karachi Timetables &amp; Shia Prayer Schedules:
                </h4>
                <p className="leading-relaxed">
                  While Karachi&rsquo;s Sunni masajid follow the University of Islamic Sciences Banuri Town schedule, <strong>shia namaz timing karachi</strong> observed at Shia masajid and imambargahs (such as Mehfil-e-Murtaza in PECHS, Khoja Jama Masjid Kharadar, and Yasrab Imambargah Defence) incorporates a 10 to 15-minute sunset twilight buffer for Maghrib.
                </p>
                <p className="leading-relaxed">
                  Under Ja&rsquo;fari Fiqh traditions in <strong>shia namaz timing karachi</strong>, believers may also combine Dhuhr with Asr and Maghrib with Isha during shared permissible hours. Our Karachi timetable allows seamless comparison between Sunni and Shia schedules across all districts of Karachi.
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
