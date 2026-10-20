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
      </div>
    </div>
  );
}
