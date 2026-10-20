import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, ShieldCheck, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import ContactForm from '@/components/ContactForm';
import { generateBreadcrumbSchema, generateFAQSchema, getAlternateLanguages, SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Editorial & Research Team | Namaz-e-Shariq',
  description:
    'Contact Namaz-e-Shariq editorial board, submit mosque Jamat timetables, report calculation discrepancies, or request authentic scholarly references.',
  alternates: getAlternateLanguages('/contact'),
};

export default function ContactPage() {
  const contactFaqs = [
    {
      question: 'How quickly does the editorial team respond to inquiries?',
      answer:
        'Our editorial and verification desk strives to respond to all scholarly questions, timetable discrepancies, and mosque submissions within 24 to 48 business hours. Urgent corrections regarding ongoing Ramadan or Eid schedules are prioritized immediately.',
    },
    {
      question: 'How can a local mosque submit their monthly Jamat timetable?',
      answer:
        'Mosque trustees and imams can submit their official monthly schedule using our submission form below or by emailing contact@namazeshariq.com with the mosque name, full address, GPS coordinates, and a high-resolution photo or PDF of the verified Jamat schedule.',
    },
    {
      question: 'What should I do if the prayer times differ slightly from my local mosque?',
      answer:
        'Our calculation engine computes the exact astronomical entry (Awwal Waqt) based on solar coordinates and classical twilight depression angles (such as 18° for Fajr and Isha). Local masajid establish congregational (Jamat) times roughly 15 to 30 minutes after Awwal Waqt to allow worshipers to perform Wudu and assemble. Always follow your local mosque’s Jamat when praying in congregation.',
    },
    {
      question: 'Is Namaz-e-Shariq affiliated with any specific sectarian organization?',
      answer:
        'No. Namaz-e-Shariq is an independent educational and research platform dedicated strictly to verified astronomical calculations and authentic classical Islamic jurisprudence (primarily Hanafi and Shafi’i schools). We serve the global Muslim community with academic impartiality and reverence for the Sunnah.',
    },
  ];

  const faqSchema = generateFAQSchema(contactFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Contact', url: `${SITE_URL}/contact` },
  ]);

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${SITE_NAME}`,
    description: 'Reach out to the editorial board of Namaz-e-Shariq for prayer times, scholarly questions, and mosque submissions.',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      email: 'contact@namazeshariq.com',
      url: SITE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'editorial support',
        email: 'contact@namazeshariq.com',
        availableLanguage: ['English', 'Urdu', 'Arabic', 'Bengali'],
      },
    },
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Editorial Inquiries & Submissions
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Connect With the <span className="text-brand-700 dark:text-emerald-400">Editorial Board</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Have a question regarding astronomical calculations, wish to submit your local mosque&rsquo;s Jamat schedule, or require classical Fiqh references? We welcome your correspondence.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Info Column */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Mail className="w-5 h-5 text-brand-700 dark:text-emerald-400" />
                Direct Communication
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                For prompt routing, choose the appropriate department when composing your message:
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">General & Editorial Desk</span>
                  <a href="mailto:contact@namazeshariq.com" className="text-brand-700 dark:text-emerald-400 hover:underline">
                    contact@namazeshariq.com
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/70">
                  <span className="font-bold text-emerald-950 dark:text-emerald-200 block text-xs">Admin & Website Manager Desk</span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">Direct confidential channel for technical, legal, and operational leadership.</p>
                  <a
                    href="mailto:admin@namazeshariq.com?subject=Direct%20Inquiry%20to%20Admin%20-%20Namaz-e-Shariq"
                    className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 underline"
                  >
                    <span>admin@namazeshariq.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">Mosque Timetable Submissions</span>
                  <span className="text-slate-500 dark:text-slate-400">masajid@namazeshariq.com</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">Astronomical & Waqt Research</span>
                  <span className="text-slate-500 dark:text-slate-400">falakiyyat@namazeshariq.com</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-900 to-brand-950 text-white p-6 rounded-3xl shadow-md space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h4 className="font-bold text-sm">Scholarly Review Standard</h4>
              <p className="text-xs text-brand-100 leading-relaxed">
                Every religious ruling and mathematical timetable calculation is verified by graduates of traditional seminaries and verified against celestial coordinates before publishing.
              </p>
            </div>
          </div>

          {/* Right: Interactive Accessible Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Send an Inquiry or Feedback</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Please provide complete details so our team can address your request accurately.
            </p>

            <ContactForm />
          </div>
        </div>

        {/* Detailed Comprehensive Editorial & Submission Policy */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Detailed Submission & Discrepancy Verification Protocols
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              At Namaz-e-Shariq, maintaining unimpeachable accuracy in prayer times and Islamic jurisprudential guides is our highest religious trust (*Amanah*). Because hundreds of thousands of worshipers structure their daily obligations, fasts, and communal congregations around these schedules, we adhere to a formal, multi-tier protocol for reviewing submissions and investigating potential discrepancies.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              1. Mosque Jamat Timetable Submission Guidelines
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We warmly invite mosque committees, imams, and trust boards across India, Pakistan, Bangladesh, the United Arab Emirates, and global diaspora hubs to submit their localized monthly congregation schedules. When submitting your mosque data, please adhere to the following standards:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li>
                <strong>Official Authorization:</strong> Submissions must be authorized by an elected committee member, trustee, or official Imam of the institution.
              </li>
              <li>
                <strong>Geographical Coordinates:</strong> Provide the exact street address, district, state/province, and GPS latitude and longitude (accurate to four decimal places) to ensure proper astronomical calculation alignment.
              </li>
              <li>
                <strong>Waqt vs. Jamat Distinction:</strong> Clearly delineate between *Awwal Waqt* (the moment the celestial prayer interval begins) and *Jamat Time* (the actual minute the congregational prayer commences).
              </li>
              <li>
                <strong>Seasonal Adjustments:</strong> If your mosque implements monthly or seasonal schedule changes (such as shifting Dhuhr or Isha Jamat by 15 minutes during winter months), notify us at least seven days prior to the beginning of the Gregorian or Hijri calendar month.
              </li>
            </ul>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              2. Mathematical Calculation Discrepancy Reporting
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              If you observe a divergence between the times displayed on our live astronomical calculator and your local printed timetable, please consider the following celestial factors before filing a discrepancy report:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">Twilight Angle Method</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  South Asian masajid follow the Karachi 18°/18° standard, whereas Arabian Peninsula masajid observe the Umm Al-Qura 18.5° standard. Ensure you have selected the appropriate calculation methodology corresponding to your region.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">Hanafi vs. Shafi&rsquo;i Asr Factor</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  In Hanafi jurisprudence, Asr starts when an object&rsquo;s shadow equals twice its length plus midday shadow (Factor 2), approximately 45 to 60 minutes after the Shafi&rsquo;i/Maliki/Hanbali earlier time (Factor 1). Use our widget toggle to verify both calculations.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">Elevation Above Sea Level</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Cities situated at high altitudes (such as Bangalore at 920 meters or Quetta at 1,680 meters) experience sunrise slightly earlier and sunset slightly later than sea-level locations on the same latitude due to the geometric dip of the horizon.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">Standard Sunnah Precaution (Ihtiyat)</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Traditional printed calendars generally add a safety buffer of 2 to 3 minutes after mathematical sunset for Maghrib, and deduct 5 minutes from Fajr start for Sehri conclusion. Our calculations explicitly document both the raw astronomical coordinates and standard precautionary windows.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              3. Scholarly Peer Review and Academic Contributions
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We welcome scholars, researchers in Islamic celestial astronomy (*Ilm al-Falak*), and certified Muftis who wish to contribute scholarly articles or peer-review existing guides on our platform. All contributors must provide their academic credentials (e.g., Alimiyyah or Takhassus degrees from recognized Darul Ulooms or universities) and cite classical Fiqh references (*Kutub al-Turath*) in any submitted manuscripts.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              4. Corporate Prayer Accommodations and Workplace Advocacy
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              A substantial portion of user correspondence involves professionals seeking guidance on negotiating clean, private prayer spaces and reasonable prayer breaks within multinational corporate environments, healthcare facilities, and academic institutions. Our team provides verified documentation, legal precedent summaries, and scheduling templates designed to assist employees and students in obtaining respectful accommodations for daily Dhuhr and Friday Jumu&rsquo;ah assemblies.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              5. Regional Inquiries & Global Coordination Desks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <strong className="text-slate-900 dark:text-slate-100 block mb-1">South Asia Desk</strong>
                <p>Coordinates schedules and masajid liaison across Bangalore, Delhi, Mumbai, Karachi, Lahore, Dhaka, and regional districts.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <strong className="text-slate-900 dark:text-slate-100 block mb-1">Middle East & Gulf Desk</strong>
                <p>Monitors UAE Awqaf, IACAD Dubai, Sharjah Islamic Affairs, and Saudi Umm Al-Qura centralized digital notifications.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <strong className="text-slate-900 dark:text-slate-100 block mb-1">Western Diaspora Desk</strong>
                <p>Provides high-latitude twilight approximations for the United Kingdom, European Union, United States, and Canada.</p>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <FAQAccordion items={contactFaqs} title="Frequently Asked Questions About Contacting Us" />
      </div>
    </div>
  );
}
