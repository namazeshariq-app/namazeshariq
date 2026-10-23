import { Post } from './db';
import { FAQItem } from './articles-data';

export const SITE_NAME = 'Namaz-e-Shariq';
export const SITE_URL = 'https://namaz-e-shariq.com';
export const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80';

/**
 * Generate Hreflang alternates for Next.js Metadata and SEO crawlers.
 * Informs search engines of all 5 localized language variations:
 * en (default), ur (Urdu), ar (Arabic), hi (Hindi), bn (Bengali) + x-default.
 */
export function getAlternateLanguages(path: string = '', siteUrl: string = SITE_URL) {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const baseCanonical = `${siteUrl}${cleanPath === '/' ? '' : cleanPath}`;

  return {
    canonical: baseCanonical,
    languages: {
      'en': baseCanonical,
      'ur': `${baseCanonical}?lang=ur`,
      'ar': `${baseCanonical}?lang=ar`,
      'hi': `${baseCanonical}?lang=hi`,
      'bn': `${baseCanonical}?lang=bn`,
      'x-default': baseCanonical,
    },
  };
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Generate Article / BlogPosting Schema JSON-LD
 */
export function generateArticleSchema(post: Post, siteUrl: string = SITE_URL) {
  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': post.schema_type || 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: [post.featured_image || DEFAULT_OG_IMAGE],
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      '@type': 'Person',
      name: post.author_name || 'Mufti & Editorial Board',
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/web-app-manifest-512x512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: post.keywords,
  };
}

/**
 * Generate FAQPage Schema JSON-LD
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList Schema JSON-LD
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebSite Schema JSON-LD with Searchbox
 */
export function generateWebsiteSchema(siteUrl: string = SITE_URL, siteName: string = SITE_NAME) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
