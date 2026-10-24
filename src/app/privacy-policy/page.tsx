import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, Globe, FileText, CheckCircle2, Mail, Compass } from 'lucide-react';
import { getAlternateLanguages, SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Security | Namaz-e-Shariq',
  description:
    'Privacy Policy for Namaz-e-Shariq. Learn how our edge-native, zero-tracking platform protects your sacred privacy, location data, and digital security.',
  alternates: getAlternateLanguages('/privacy-policy'),
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Ethical Islamic Data Stewardship
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Privacy Policy & Data Security Charter
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Transparent, zero-tracking privacy architecture designed to protect the religious trust (*Amanah*) of every worshiper and visitor across the globe.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Effective Date: October 2026</span>
            <span>•</span>
            <span>Version: 2.4.0 (Edge Architecture)</span>
          </div>
        </div>

        {/* Content Box (>1,000 words comprehensive charter) */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              1. The Sacred Concept of Amanah in Digital Governance
            </h2>
            <p>
              In Islamic moral theology, every form of responsibility entrusted by human beings to another constitutes an <em>Amanah</em> (a sacred divine trust). In Surah Al-Anfal (8:27), Allah Almighty instructs: <em>&ldquo;O you who have believed, do not betray Allah and the Messenger or betray your trusts while you know [the consequence].&rdquo;</em> At Namaz-e-Shariq, we treat personal privacy not as a commercial afterthought or mere regulatory burden, but as a binding spiritual obligation.
            </p>
            <p>
              Unlike conventional online portals that monetize religious devotion by harvesting user identities, selling telemetry to advertising brokers, or deploying cross-site tracking beacons, Namaz-e-Shariq was engineered from the ground up on principles of data minimization. We hold that a believer seeking the sacred times of prayer, researching daily namaz rakats, or purifying their heart through Islamic educational guides should do so in an environment of total confidentiality, dignity, and digital sanctuary.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <Server className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              2. Edge Architecture & Zero-Knowledge Computational Model
            </h2>
            <p>
              Our website is hosted on Cloudflare Pages and executes logic across Cloudflare&rsquo;s globally distributed Edge network. This architectural paradigm allows mathematical solar coordinate formulas (including Julian day tracking, solar declination, and equation of time) to be computed in serverless micro-environments nearest to the user without writing personal access histories to centralized server disks.
            </p>
            <p>
              When you load prayer times for Bangalore, Delhi, Karachi, Dhaka, Dubai, London, or New York, the calculation is evaluated in memory or pre-rendered as immutable Static Site Generated (SSG) HTML. Our Cloudflare D1 distributed database stores only verified article content, category taxonomies, administrative authentication hashes, and site configuration settings. It maintains zero tables for visitor profiles, tracking pixels, or cross-session user behavior profiling.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <EyeOff className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              3. Categories of Information Processed
            </h2>
            <p>
              To provide complete clarity on our processing practices, we categorize all information interactions below:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Ephemeral Geolocation Data (Client-Side Only):</strong> When you click the <em>&ldquo;Auto-Detect Location&rdquo;</em> button in our prayer widget, your browser uses the W3C Geolocation API (via GPS, Wi-Fi tri-angulation, or IP routing) to determine your latitude and longitude coordinates. This calculation occurs entirely within your browser&rsquo;s local client-side memory using our lightweight Haversine mathematical algorithm to match your coordinates to the closest regional hub. Your raw GPS coordinates are never transmitted, stored, logged, or recorded on our servers.
              </li>
              <li>
                <strong>Browser Timezone Descriptors:</strong> On initial widget mount, your browser&rsquo;s standard IANA timezone string (e.g., <code>Asia/Kolkata</code>, <code>Asia/Karachi</code>, <code>Asia/Dhaka</code>, or <code>Asia/Dubai</code>) is read client-side to automatically display relevant regional prayer schedules. This prevents unnecessary manual city switching while keeping identity completely anonymous.
              </li>
              <li>
                <strong>Direct Correspondence Data:</strong> When you voluntarily submit feedback, submit mosque timetables, or report astronomical calculation discrepancies through our <Link href="/contact" className="text-brand-700 dark:text-emerald-400 font-semibold underline">Contact Portal</Link>, we collect your provided full name, email address, optional city, inquiry classification, and message text. This data is utilized strictly by our editorial and verification scholars to investigate and reply to your inquiry.
              </li>
              <li>
                <strong>Administrative Credentials:</strong> For authorized editorial personnel accessing <code>/admin</code>, we store the username, administrative display name, cryptographic salt, and PBKDF2/SHA-256 password hash in Cloudflare D1. Plaintext passwords are never recorded or recoverable.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              4. Cookie Usage & LocalStorage Policy
            </h2>
            <p>
              Namaz-e-Shariq adheres to a strict cookie-less architecture for public visitors. We do not set third-party marketing cookies, profiling cookies, retargeting pixels, or invasive session recorders.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Summary of Client Storage Elements:</h3>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>localStorage (<code>namaz_preferred_city</code>):</strong> Stores your chosen city key (e.g., <code>bangalore</code> or <code>karachi</code>) locally in your own browser so the widget remembers your preferred schedule on repeat visits. You can clear this at any time in your browser settings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>HTTP Cookie (<code>admin_session</code>):</strong> Only issued upon successful administrative login at <code>/admin/login</code>. This cookie is marked <code>HttpOnly</code>, <code>Secure</code>, <code>SameSite=Strict</code>, and is protected with a 24-hour expiration window signed using Jose JSON Web Tokens (JWT). Regular readers receive zero cookies.</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <Globe className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              5. Global Regulatory Compliance & Religious Rights
            </h2>
            <p>
              Although Namaz-e-Shariq does not harvest personal profiles, our technical protocols conform rigorously with leading global data protection standards:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>General Data Protection Regulation (GDPR - Regulation EU 2016/679):</strong> We respect the lawful basis of consent and legitimate interest. Readers in the European Union have the right to request confirmation of any correspondence records, rectify erroneous submissions, or request permanent erasure without unreasonable delay.
              </li>
              <li>
                <strong>California Consumer Privacy Act (CCPA / CPRA):</strong> We affirm that Namaz-e-Shariq has never sold, rented, leased, or shared personal information of any user with third-party data brokers, ad networks, or commercial syndicates, and will never do so in the future.
              </li>
              <li>
                <strong>Digital Personal Data Protection Act (DPDP Act - India):</strong> Because our platform serves hundreds of thousands of worshipers across Indian metropolises (Bangalore, Delhi, Mumbai, Chennai, Calicut, Kochi, Hyderabad, and Kolkata), we observe the fiduciary principles outlined in the DPDP Act, ensuring that communication records are retained solely for legitimate editorial resolution.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              6. Cryptographic Security Standards & Edge Defense
            </h2>
            <p>
              Security is not an optional feature; it is fundamental to preserving the authenticity of prayer schedules and religious scholarship. We enforce an extensive multi-layer defense posture:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Strict Transport Security (HSTS):</strong> All network connections are enforced over HTTPS utilizing TLS 1.3 encryption with a <code>max-age=63072000; includeSubDomains; preload</code> header to prevent man-in-the-middle tampering.</li>
              <li><strong>Content Security Policy (CSP):</strong> Prevents unauthorized script injection, malicious frame hijacking, and Cross-Site Scripting (XSS) vectors.</li>
              <li><strong>PBKDF2 / SHA-256 Password Cryptography:</strong> Editorial credentials undergo 100,000 iterations of Password-Based Key Derivation Function 2 with unique cryptographic salts generated via Web Crypto API.</li>
              <li><strong>Cloudflare DDoS & Bot Shielding:</strong> Continuous edge inspection mitigates distributed denial of service attempts, scrapers, and brute-force authentication attacks.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              7. Children&rsquo;s Privacy Protection (Hifz al-Qasir)
            </h2>
            <p>
              Islamic jurisprudence places utmost priority on protecting minors (*al-Qasir*). Our educational prayer guides, rakat breakdowns, and astronomical timetables are intentionally structured to be family-safe, moral, and accessible to students of all ages. We do not knowingly collect or solicit personal data from children under the age of 16. If a parent or guardian discovers that a child has submitted personal correspondence through our contact form, they may contact our editorial desk for immediate and complete deletion.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
              8. Privacy Inquiries & Data Protection Contact
            </h2>
            <p>
              If you have any questions, wish to exercise your statutory privacy rights, or desire clarification regarding our edge data practices, please communicate directly with our compliance officer:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
              <p><strong>Compliance & Privacy Desk:</strong> Namaz-e-Shariq Editorial Board</p>
              <p><strong>Direct Electronic Inquiries:</strong> <a href="mailto:namazeshariq@gmail.com" className="text-brand-700 dark:text-emerald-400 font-semibold hover:underline">namazeshariq@gmail.com</a></p>
              <p><strong>Response Time Commitment:</strong> Within 24 to 48 business hours.</p>
              <p><strong>Platform Canonical URL:</strong> <a href={SITE_URL} className="text-brand-700 dark:text-emerald-400 font-semibold hover:underline">{SITE_URL}</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
