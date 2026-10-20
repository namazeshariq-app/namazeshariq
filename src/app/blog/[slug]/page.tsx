import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { marked } from 'marked';
import { Clock, Calendar, User, Tag, ChevronRight, Share2, ArrowLeft, Bookmark } from 'lucide-react';
import { getPostBySlug, getPosts, incrementPostViews, Post } from '@/lib/db';
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, getAlternateLanguages, SITE_URL } from '@/lib/seo';
import TableOfContents from '@/components/TableOfContents';
import FAQAccordion from '@/components/FAQAccordion';
import { FAQItem } from '@/lib/articles-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const url = post.canonical_url || `${SITE_URL}/blog/${post.slug}`;
  let title = post.meta_title || post.title;
  if (title.length > 60) {
    title = title.slice(0, 57).trim() + '...';
  }
  let description = post.meta_description || post.excerpt;
  if (description.length > 160) {
    description = description.slice(0, 157).trim() + '...';
  }

  return {
    title,
    description,
    alternates: getAlternateLanguages(`/blog/${post.slug}`),
    keywords: post.keywords ? post.keywords.split(',').map((k) => k.trim()) : undefined,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at || post.published_at,
      authors: [post.author_name],
      images: [
        {
          url: post.featured_image,
          alt: post.image_alt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.featured_image],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts({ status: 'published' });
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  // Increment views
  await incrementPostViews(slug);

  // Fetch related posts from same category
  const allPosts = await getPosts({ status: 'published' });
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  // Parse FAQs
  let parsedFaqs: FAQItem[] = [];
  try {
    parsedFaqs = typeof post.faqs === 'string' ? JSON.parse(post.faqs) : post.faqs || [];
  } catch {
    parsedFaqs = [];
  }

  // Schemas
  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Articles', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ]);
  const faqSchema = generateFAQSchema(parsedFaqs);

  // Convert markdown to HTML safely
  const htmlContent = marked.parse(post.content);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 transition-colors duration-200">
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-6 flex-wrap gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-700 dark:hover:text-emerald-400 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <Link href="/blog" className="hover:text-brand-700 dark:hover:text-emerald-400 transition">Articles</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Main Article Container */}
        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          {/* Header */}
          <header className="p-6 sm:p-10 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-emerald-950/60 text-brand-800 dark:text-emerald-300 border border-brand-200 dark:border-emerald-800">
                {post.categoryName || 'Prayer Guide'}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-600">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.reading_time} min read
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author and Date Meta */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {post.author_name.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">
                    {post.author_name}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Scholarly Review & Verification Team
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span>{post.views} views</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="relative w-full h-72 sm:h-96 bg-slate-100 dark:bg-slate-800">
              <img
                src={post.featured_image}
                alt={post.image_alt || post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-10">
            {/* Table of Contents */}
            <TableOfContents content={post.content} />

            {/* Post Content Body */}
            <div
              className="prose-custom max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* FAQ Accordion Section */}
            {parsedFaqs.length > 0 && (
              <FAQAccordion items={parsedFaqs} title="Key Questions & Rulings Answered" />
            )}

            {/* Author Bio Box */}
            <div className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-800 text-emerald-300 font-bold text-xl flex items-center justify-center shrink-0">
                {post.author_name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                  Written by {post.author_name}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                  Dedicated Islamic researchers and astronomers committed to providing authentic, well-referenced educational content for the global Muslim community. All rulings conform to classical Fiqh manuals and verified solar tables.
                </p>
              </div>
            </div>

            {/* Keywords / Tags */}
            {post.keywords && (
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Tags:
                </span>
                {post.keywords.split(',').map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md transition"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-14">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Recommended Prayer Guides & Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-600/50 overflow-hidden hover:shadow-md transition group p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-brand-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                      {rel.categoryName}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-emerald-400 transition text-sm leading-snug line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="mt-4 text-xs font-semibold text-brand-700 dark:text-emerald-400 flex items-center gap-1">
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
