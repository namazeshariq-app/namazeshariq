import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPosts, getCategories } from '@/lib/db';
import { Clock, Calendar, Search, ChevronRight, BookOpen, Filter, MapPin } from 'lucide-react';
import { getAlternateLanguages, SITE_NAME, SITE_URL } from '@/lib/seo';
import { CITIES } from '@/lib/prayer-calc';

export const metadata: Metadata = {
  title: 'Islamic Guides & Prayer Timetables | Namaz-e-Shariq',
  description:
    'Browse in-depth guides on namaz rakats, astronomical prayer time calculations, city schedules, and authentic Sunnah rulings.',
  alternates: getAlternateLanguages('/blog'),
};

interface BlogIndexProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function BlogIndexPage({ searchParams }: BlogIndexProps) {
  const { q, category } = await searchParams;
  const categories = await getCategories();
  const posts = await getPosts({
    status: 'published',
    search: q,
    categorySlug: category,
  });

  // Check if search query matches any known city
  let matchedCity = null;
  if (q) {
    const lq = q.toLowerCase();
    for (const [key, city] of Object.entries(CITIES)) {
      if (lq.includes(key) || lq.includes(city.name.toLowerCase())) {
        matchedCity = city;
        break;
      }
    }
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700 dark:text-emerald-400 block mb-2">
            Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Educational Articles & Prayer Guides
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            In-depth scholarly analysis of daily namaz rakats, astronomical waqt calculations, and localized city schedules.
          </p>

          {/* Search bar */}
          <form method="GET" action="/blog" className="mt-6 max-w-md mx-auto relative">
            <input
              type="text"
              name="q"
              defaultValue={q || ''}
              placeholder="Search topics, e.g. 'rakat', 'asr', 'bangalore'..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
              aria-label="Search articles and topics"
            />
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          </form>

          {/* Location Match Callout */}
          {matchedCity && (
            <div className="mt-6 max-w-2xl mx-auto p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    Looking for {matchedCity.name} Daily Namaz Timetable?
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    View today&apos;s live astronomical waqt boundaries, monthly printable timetable, and masajid rules.
                  </p>
                </div>
              </div>
              <Link
                href={`/prayer-times/${matchedCity.slug}`}
                className="px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-xs transition"
              >
                <span>Open {matchedCity.name}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              !category
                ? 'bg-brand-800 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Topics ({posts.length})
          </Link>
          {categories.map((cat) => {
            const active = category === cat.slug;
            return (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}`}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  active
                    ? 'bg-brand-800 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No articles found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Try searching with different keywords or clear your filters.
            </p>
            <Link
              href="/blog"
              className="inline-block mt-4 text-xs font-semibold text-brand-700 dark:text-emerald-400 hover:underline"
            >
              Reset All Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg dark:hover:border-slate-700 transition flex flex-col group"
              >
                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.image_alt || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-brand-900/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
                    {post.categoryName}
                  </span>
                </div>

                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.reading_time} min read
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-emerald-400 transition line-clamp-2 leading-snug mb-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 grow leading-relaxed">
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
        )}

        {/* Comprehensive Educational Guide to Islamic Prayer Scholarship & Articles */}
        <div className="mt-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 transition-colors duration-200">
          <section className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Islamic Educational Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              A Living Tradition of Islamic Prayer Scholarship &amp; Astronomical Research
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Islamic knowledge is a living chain of transmission (*Isnad*) that links our modern daily practice directly to the noble teachings of the Prophet Muhammad (peace be upon him). For over fourteen centuries, Muslim theologians, jurists, and astronomers have worked hand in hand to ensure that the sacred rites of prayer (*Salah*), fasting (*Sawm*), and Quranic recitation are observed with pristine authenticity and mathematical precision.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Our educational library is designed to serve as a reliable reference for everyday Muslims, students of sacred knowledge (*Tullab al-&lsquo;Ilm*), and families seeking to enrich their home practice. Below, we outline the foundational principles that guide our research articles, how astronomical science intersects with Islamic jurisprudence, and how you can utilize these guides for personal and community enrichment.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">1</span>
                The Classical Foundation of Prayer Timings
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Before the advent of modern clocks, the early Muslim community calibrated daily worship through careful observational astronomy (*&lsquo;Ilm al-Mawaqit*). Great scholars such as Al-Battani, Al-Biruni, and Ibn al-Haytham developed pioneering mathematical models to calculate solar elevation angles, twilight depression thresholds, and exact Qibla bearings from anywhere in the world.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Our in-depth guides explore how classical Fiqh definitions—such as the appearance of true astronomical dawn (*Subh Sadiq*), the decline of the sun from its zenith (*Zawal*), and the disappearance of evening twilight (*Shafaq*)—are translated into modern computational formulas used by Islamic academies worldwide.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-950/70 text-brand-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">2</span>
                Understanding Juristic Differences (Ikhtilaf)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                One of the hallmarks of Islamic jurisprudence is its rich diversity of thought (*Ikhtilaf*). Between the Hanafi, Shafi&rsquo;i, Maliki, and Hanbali schools of thought, subtle variances exist regarding the exact start of Asr prayer (Factor 1 versus Factor 2 shadow length) and the calculation of twilight depression angles (18° versus 15° or 19.5°).
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Rather than treating these differences as contradictions, our articles explain their scriptural origins and classical rationales. By understanding why a neighboring mosque might announce Asr forty minutes after another, worshippers cultivate respect, unity, and theological maturity.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">3</span>
                The Spiritual Architecture of the Rakat
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Salah is far more than a physical sequence of standing (*Qiyam*), bowing (*Ruku*), and prostrating (*Sujood*); it is a complete spiritual ascension (*Mi&lsquo;raj al-Mu&rsquo;min*). Each movement has an inner reality, and each vocalization connects the worshipper directly to the divine presence.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Our guides break down the specific components of every prayer: the obligatory (*Fard*) rakats, the emphasized Sunnah prayers (*Sunnah Mu&rsquo;akkadah*) that the Prophet rarely abandoned, the recommended voluntary prayers (*Nafl*), and the essential Witr prayer. Mastering these structures allows believers to worship with focus, reverence (*Khushu*), and tranquility.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 flex items-center justify-center text-xs font-bold">4</span>
                How to Use These Guides for Study Circles &amp; Families
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We encourage parents, youth mentors, and community teachers to utilize these articles for weekly family halaqahs or weekend Islamic school discussions. Key topics such as the conditions of ritual purity (*Wudu*), the rules of praying as a traveler (*Musafir*), and the spiritual etiquette of the Friday Jumu&rsquo;ah prayer make wonderful discussion starters.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                All articles are cross-referenced with primary classical texts, including Sahih al-Bukhari, Sahih Muslim, Al-Hidayah, Al-Majmu&lsquo;, and contemporary fatawa collections, ensuring that the knowledge you share is authentic, sound, and spiritually grounding.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">5</span>
                The Ethics of Islamic Fact-Checking &amp; Authentic Narration
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                In an era where religious quotes and spiritual claims circulate freely across social messaging platforms, verifying information before sharing is a religious duty. The Holy Quran commands: <em>&ldquo;O you who have believed, if there comes to you a disobedient one with information, investigate...&rdquo;</em> (Surah Al-Hujurat, 49:6).
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Our editorial team subjects every article to rigorous biographical analysis (*Asma&rsquo; al-Rijal*) and Hadith authentication (*Takhrij*). We avoid unverified folkloric claims, ensuring that our readers receive reliable Sunnah practices established by reputable scholars of the Ummah.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">6</span>
                Cultivating Spiritual Excellence (Ihsan) in Daily Worship
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                In the renowned Hadith Jibril, the Prophet Muhammad (peace be upon him) defined Ihsan as: <em>&ldquo;To worship Allah as though you see Him, and if you do not see Him, then truly He sees you.&rdquo;</em> This profound spiritual consciousness transforms routine prayer into an intimate communion.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We encourage all readers to nurture consistency (*Istiqamah*) in small, steady daily actions: reciting Ayat al-Kursi after each obligatory prayer, seeking early sleep to awaken revitalized for Fajr, and setting aside five minutes during the final third of the night for sincere personal supplication (*Dua*).
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">7</span>
                The Etiquette &amp; Blessings of Friday Jumu&lsquo;ah Prayer
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Friday is honored in Islam as the master of days (*Sayyid al-Ayyam*). The Prophet Muhammad (peace be upon him) instructed believers to honor Jumu&lsquo;ah by taking a ritual bath (*Ghusl*), applying non-alcoholic fragrance, clipping nails, and arriving early at the mosque before the Imam ascends the pulpit (*Minbar*).
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                During the Friday sermon (*Khutbah*), complete silence is obligatory; speaking, or even gesturing to quiet another person, deprives one of the full Friday reward. Scholars also highlight the blessed final hour before Maghrib on Friday (*Sa&lsquo;at al-Ijabah*), during which supplications are granted divine acceptance.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-950/70 text-brand-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">8</span>
                Daily Quranic Companionship &amp; Contemplation (Tadabbur)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Reading the Holy Quran is a daily conversation with Allah that illuminates the believer&rsquo;s heart. The Prophet (peace be upon him) encouraged reciting Surah Al-Kahf on Fridays for illumination between two Fridays, and reciting Surah Al-Mulk each night as a spiritual shield.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Pairing daily recitation with an authentic translation allows Muslims of all linguistic backgrounds to understand the divine message and embody prophetic moral excellence in their family and professional lives. Whether reading from a printed mushaf or following a verified digital edition, approaching the Quran with humility and ritual purity (*Taharah*) brings countless blessings (*Barakah*) into the home.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Have a topic or question you would like our research team to explore?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Submit an inquiry or propose a scholarly study guide by reaching out to our editorial board.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-4 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs shrink-0 transition shadow-xs"
            >
              Contact Editorial Board
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
