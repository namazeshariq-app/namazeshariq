import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, ShieldCheck, Globe, BookOpen, Clock, Heart, Award, CheckCircle2, Sparkles, UserCheck } from 'lucide-react';
import { getAlternateLanguages, SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About Us & Editorial Standards | Namaz-e-Shariq',
  description:
    'Learn about Namaz-e-Shariq, our commitment to authentic Islamic scholarship, edge-calculated solar prayer times, and rigorous Fiqh verification.',
  alternates: getAlternateLanguages('/about'),
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Namaz-e-Shariq',
    description:
      'Learn about Namaz-e-Shariq, our commitment to authentic Islamic scholarship, edge-calculated solar prayer times, and rigorous Fiqh verification.',
    url: `${SITE_URL}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      knowsAbout: [
        'Islamic Prayer Times',
        'Daily Namaz Rakats',
        'Salah Rulings',
        'Spherical Solar Astronomy',
        'Hanafi Jurisprudence',
        'Shafi’i Jurisprudence',
        'Qiblah Coordinates',
      ],
    },
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-brand-800 text-emerald-300 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-900/10">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            About Namaz-e-Shariq
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Uniting classical Islamic jurisprudence with modern celestial coordinate science to serve the global Ummah with verified, authentic prayer resources.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Our Sacred Mission and Founding Vision</h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Salah (Namaz) stands as the second pillar of Islam and the spiritual axis around which every believer&rsquo;s daily life revolves. From the peaceful serenity of the pre-dawn hours to the tranquil stillness of the night, prayer creates a structured rhythm that anchors the human soul to its Creator. In our increasingly interconnected modern era, where Muslims travel across continents, work flexible corporate schedules, and live in diverse global diaspora hubs, access to verified, scientifically precise, and jurisprudentially sound prayer timetables is an indispensable necessity.
          </p>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <strong>Namaz-e-Shariq</strong> was established with a singular objective: to eradicate ambiguity in prayer times, eliminate reliance on third-party APIs that suffer from downtime or rate limitations, and provide humanized, deeply researched educational literature that bridges classical Fiqh manuals with modern solar mechanics. Every calculation rendered on our portal is computed directly on Cloudflare Edge using pure spherical astronomy algorithms, ensuring sub-second response times worldwide without selling user data or relying on invasive tracking cookies.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
              <Award className="w-6 h-6 text-emerald-700 dark:text-emerald-400 mb-2" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Authentic Fiqh Rulings</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Adhering to classical Hanafi, Shafi’i, Maliki, and Hanbali primary legal texts with precise juristic distinctions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60">
              <Globe className="w-6 h-6 text-teal-700 dark:text-teal-400 mb-2" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Edge Solar Computing</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Direct spherical trigonometry running on Cloudflare Workers/Pages with zero third-party latency.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
              <ShieldCheck className="w-6 h-6 text-amber-700 dark:text-amber-400 mb-2" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Scholarly Verification</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Reviewed by graduates of classical Islamic seminaries and verified against authoritative observatory sightings.
              </p>
            </div>
          </div>
        </div>

        {/* Historical Evolution of Islamic Astronomy */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Heritage of Islamic Astronomy and Mawaqit Science
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            The determination of prayer times is historically known in Islamic civilization as <em>Ilm al-Mawaqit</em> (the science of sacred timekeeping). While ancient civilizations tracked seasons for agriculture and governance, the advent of Islam elevated celestial observation to a sacred duty. The Quran repeatedly directs humanity to contemplate the cosmic order:
          </p>
          <blockquote className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-600 dark:border-emerald-500 text-emerald-950 dark:text-emerald-200 text-sm italic">
            &ldquo;Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.&rdquo; — Surah Ali &lsquo;Imran (3:190)
          </blockquote>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            During the golden age of Islamic scholarship, legendary polymaths such as Al-Battani (Albatenius), Ibn al-Haytham (Alhazen), Al-Biruni, and the 14th-century timekeeper of the Umayyad Mosque in Damascus, Shams al-Din Ibn al-Shatir, revolutionized the science of the astrolabe (*al-Asturlab*) and the celestial quadrant. These scholars derived exact mathematical models to determine the solar zenith, the entry of afternoon twilight, and the shadow lengths corresponding to Asr prayer across diverse geographic latitudes.
          </p>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            At Namaz-e-Shariq, we honor this noble tradition by implementing modern, high-precision astronomical algorithms that honor the observations of our intellectual ancestors while adapting to the needs of modern metropolitan life.
          </p>
        </div>

        {/* Detailed Calculation Principles */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Mathematical Solar Coordinate Methodology
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Our proprietary calculation engine tracks real-time solar declination and the Equation of Time (EoT) based on the continuous Julian Day count. The specific parameters governing our five daily waqt intervals are outlined below:
          </p>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-1">
                1. Subh Sadiq (Fajr Dawn Twilight)
              </h3>
              <p className="leading-relaxed">
                Fajr begins when the upper edge of the sun reaches a specified depression angle below the true eastern horizon. In accordance with the extensive optical field expeditions conducted by the University of Islamic Sciences Banuri Town, Karachi, and the Muslim World League, we adopt the 18.0° depression angle for South Asia and continental regions. For the Arabian Peninsula, our system dynamically switches to the 18.5° Umm Al-Qura standard.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-1">
                2. Shurooq (Sunrise) and Expiration of Fajr
              </h3>
              <p className="leading-relaxed">
                Sunrise is defined as the precise moment the upper limb of the solar disk breaches the geometric horizon, factoring in standard atmospheric refraction (34 arcminutes) and the solar semidiameter (16 arcminutes), yielding an effective zenith angle of 90° 50&rsquo; (0.833°). Once sunrise begins, all prayer is strictly prohibited (*Makruh Tahrimi*) until the sun ascends the height of a spear.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-1">
                3. Zawal and Dhuhr (Midday Prayer)
              </h3>
              <p className="leading-relaxed">
                Solar noon (*Nisf al-Nahar*) occurs when the sun crosses the local celestial meridian. To avoid the forbidden instant of exact solar zenith, our engine adds a mandatory safety precaution margin (*Ihtiyat*) of 2 to 3 minutes, ensuring that Dhuhr begins only after the sun has indisputably commenced its descent westward.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-1">
                4. Asr: The Dual Juristic Shadow Standard
              </h3>
              <p className="leading-relaxed">
                Our platform provides full support for both classical interpretations of Asr time:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                <li><strong>Shafi’i, Maliki, Hanbali (Factor 1):</strong> Shadow of an object equals its own length plus the baseline shadow cast at solar noon.</li>
                <li><strong>Hanafi (Factor 2):</strong> Shadow of an object equals twice its length plus the baseline midday shadow, occurring approximately 45 to 60 minutes later.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-1">
                5. Maghrib and Isha (Evening Twilight)
              </h3>
              <p className="leading-relaxed">
                Maghrib commences instantaneously when the solar disk disappears completely below the western horizon. Fasting believers break their fast at this moment. Isha commences when the remaining evening twilight (*al-Shafaq*) has vanished from the western horizon, calculated using an 18.0° depression angle (*Shafaq Abyad*) or a 90-minute interval according to regional conventions.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Standards and Peer Review Charter */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Editorial Integrity, Scholarly Review & Independence
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            The content published across Namaz-e-Shariq adheres to strict scholarly standards:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <li>
              <strong>Primary Source Verification:</strong> All fiqh guides, rakat breakdowns, and rulings on prayer invalidation cite classical recognized manuals, including *Al-Hidayah*, *Radd al-Muhtar (Fatawa Shami)*, *Al-Majmu&rsquo; Sharh al-Muhadhdhab*, and *Al-Mughni*.
            </li>
            <li>
              <strong>Multi-Madhab Inclusivity:</strong> Rather than imposing a single regional custom, we transparently delineate differences between Sunni schools of jurisprudence with academic fairness and deep respect for legitimate scholarly differences (*Ikhtilaf*).
            </li>
            <li>
              <strong>Non-Commercial Religious Service:</strong> Our core prayer calculation tools and educational articles are completely free from obstructive paywalls, pop-up advertisements, and commercial data harvesting.
            </li>
            <li>
              <strong>Continuous Auditing:</strong> Local masajid and verified users can communicate discrepancies through our dedicated <Link href="/contact" className="text-brand-700 dark:text-emerald-400 font-bold hover:underline">Contact Desk</Link>, where reports are reviewed by our celestial astronomy researchers and certified scholars.
            </li>
          </ul>
        </div>

        {/* Spiritual Psychology and Circadian Rhythm in Islam */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Spiritual Psychology and Circadian Harmony of Salah
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Beyond mathematical formulas and legal categorizations, Salah serves as an essential spiritual therapy for the human psyche. Modern chronobiology demonstrates that the human body operates on circadian cycles tightly synchronized with solar illumination. By pausing five times a day at major solar transitions, the Muslim worshiper achieves regular intervals of mindfulness, neurological relaxation, and spiritual realignment:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Morning Renewal (Fajr)</span>
              <p className="leading-relaxed">
                Awakening before sunrise activates morning cortisol and endorphin release in a state of quiet meditation, providing mental focus and spiritual fortification before worldly engagements commence.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Midday Decompression (Dhuhr)</span>
              <p className="leading-relaxed">
                At the peak of workplace activity, Dhuhr interrupts cognitive fatigue, encouraging physical ablution (Wudu) which cools the nervous system and restores emotional calm.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Afternoon Perspective (Asr)</span>
              <p className="leading-relaxed">
                As the shadows lengthen and physical energy wanes, Asr redirects the heart toward gratitude, reminding the soul of the fleeting nature of time and worldly enterprise.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Evening Peace (Maghrib & Isha)</span>
              <p className="leading-relaxed">
                Marking the boundary between labor and familial rest, evening prayers facilitate transition into restful nocturnal contemplation, preparing the body for wholesome sleep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
