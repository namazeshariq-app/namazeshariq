import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import { generateWebsiteSchema, getAlternateLanguages, SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Namaz-e-Shariq | Accurate Prayer Times & Rakats',
    template: '%s',
  },
  description:
    'Accurate daily prayer times, namaz rakats guides, and waqt schedules for global cities. Verified astronomical calculations based on authentic Sunnah.',
  alternates: getAlternateLanguages(''),
  keywords: [
    'namaz timings in bangalore',
    'asr namaz time',
    'namaz time',
    'namaz rakat',
    'namaz time in delhi',
    'today maghrib namaz time',
    'fajr namaz time',
    'isha namaz rakat',
    'isha namaz time',
    'maghrib namaz time',
    'namaz timing karachi',
    'namaz time karachi',
    'namaz timing lahore',
    'namaz timing peshawar',
    'namaz time dhaka',
    'prayer time in bangalore',
    'prayer time in mumbai',
    'prayer time calicut',
    'prayer time in chennai',
    'prayer time kochi',
    'namaz timing sharjah',
    'namaz time in sharjah',
    'namaz timing in sharjah',
    'isha prayer time',
    'maghrib prayer time',
  ],
  authors: [{ name: 'Namaz-e-Shariq Editorial Board' }],
  creator: 'Namaz-e-Shariq',
  publisher: 'Namaz-e-Shariq',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Namaz-e-Shariq: Daily Prayer Times & Namaz Rakats',
    description:
      'Accurate daily prayer times, rakats guides, and waqt schedules for major global cities.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Namaz-e-Shariq - Islamic Prayer Times and Rakats Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Namaz-e-Shariq: Daily Prayer Times & Namaz Rakats',
    description:
      'Accurate daily prayer times, rakats guides, and waqt schedules for major global cities.',
    images: ['https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80'],
  },
  verification: {
    google: 'google-site-verification-token',
  },
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'namaz-e-shariq',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Favicon & Web App Links */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="namaz-e-shariq" />
        <link rel="manifest" href="/site.webmanifest" />

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('namaz_theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}var l=localStorage.getItem('namaz_lang');if(l){document.documentElement.lang=l;document.documentElement.dir=(l==='ur'||l==='ar')?'rtl':'ltr';}else{document.documentElement.dir='ltr';}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen font-sans selection:bg-brand-200 selection:text-brand-900 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
        <Providers>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
