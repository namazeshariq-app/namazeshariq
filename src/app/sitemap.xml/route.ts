import { getPosts } from '@/lib/db';
import { CITIES } from '@/lib/prayer-calc';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = 3600;

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '\'':
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return isNaN(d.getTime()) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0];
}

export async function GET() {
  const posts = await getPosts({ status: 'published' });
  const cityKeys = Object.keys(CITIES);
  const today = formatDate(new Date());

  const coreRoutes = [
    { path: '', changefreq: 'daily', priority: '1.0' },
    { path: '/quran', changefreq: 'daily', priority: '0.95' },
    { path: '/prayer-times', changefreq: 'daily', priority: '0.9' },
    { path: '/rakats', changefreq: 'weekly', priority: '0.9' },
    { path: '/blog', changefreq: 'daily', priority: '0.8' },
    { path: '/about', changefreq: 'monthly', priority: '0.6' },
    { path: '/contact', changefreq: 'monthly', priority: '0.6' },
    { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    { path: '/terms', changefreq: 'yearly', priority: '0.3' },
    { path: '/disclaimer', changefreq: 'yearly', priority: '0.3' },
  ];

  const cityRoutes = cityKeys.map((key) => ({
    path: `/prayer-times/${key}`,
    changefreq: 'daily',
    priority: '0.85',
  }));

  const postRoutes = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastmod: formatDate(post.updated_at || post.published_at),
    changefreq: 'weekly',
    priority: '0.8',
  }));

  const allItems = [
    ...coreRoutes.map((r) => ({ ...r, lastmod: today })),
    ...cityRoutes.map((r) => ({ ...r, lastmod: today })),
    ...postRoutes,
  ];

  const languages = ['en', 'ur', 'ar', 'hi', 'bn', 'x-default'];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const item of allItems) {
    const fullUrl = `${SITE_URL}${item.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(fullUrl)}</loc>\n`;

    // Localized Hreflang Alternates
    for (const lang of languages) {
      const altUrl = lang === 'en' || lang === 'x-default' ? fullUrl : `${fullUrl}?lang=${lang}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(altUrl)}" />\n`;
    }

    xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
