import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/db';
import { CITIES } from '@/lib/prayer-calc';
import { SITE_URL } from '@/lib/seo';

function getSitemapAlternates(baseUrl: string) {
  return {
    languages: {
      en: baseUrl,
      ur: `${baseUrl}?lang=ur`,
      ar: `${baseUrl}?lang=ar`,
      hi: `${baseUrl}?lang=hi`,
      bn: `${baseUrl}?lang=bn`,
      'x-default': baseUrl,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts({ status: 'published' });
  const cityKeys = Object.keys(CITIES);
  const now = new Date();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: getSitemapAlternates(SITE_URL),
    },
    {
      url: `${SITE_URL}/rakats`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: getSitemapAlternates(`${SITE_URL}/rakats`),
    },
    {
      url: `${SITE_URL}/quran`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: getSitemapAlternates(`${SITE_URL}/quran`),
    },
    {
      url: `${SITE_URL}/prayer-times`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: getSitemapAlternates(`${SITE_URL}/prayer-times`),
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: getSitemapAlternates(`${SITE_URL}/blog`),
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: getSitemapAlternates(`${SITE_URL}/about`),
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: getSitemapAlternates(`${SITE_URL}/contact`),
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: getSitemapAlternates(`${SITE_URL}/privacy-policy`),
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: getSitemapAlternates(`${SITE_URL}/terms`),
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: getSitemapAlternates(`${SITE_URL}/disclaimer`),
    },
  ];

  // Dynamic City landing pages
  const cityRoutes: MetadataRoute.Sitemap = cityKeys.map((key) => {
    const cityUrl = `${SITE_URL}/prayer-times/${key}`;
    return {
      url: cityUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
      alternates: getSitemapAlternates(cityUrl),
    };
  });

  // Dynamic Blog post routes
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    return {
      url: postUrl,
      lastModified: new Date(post.updated_at || post.published_at),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: getSitemapAlternates(postUrl),
    };
  });

  return [...staticRoutes, ...cityRoutes, ...postRoutes];
}
