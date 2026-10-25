import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  HelpCircle,
  Sparkles,
  ChevronRight,
  BookOpen,
  Clock,
  Download,
  ShieldCheck,
  Heart,
  MessageCircleQuestion,
} from 'lucide-react';
import FAQDirectory from '@/components/FAQDirectory';
import { MASTER_FAQS } from '@/lib/faqs-data';
import { generateBreadcrumbSchema, generateFAQSchema, getAlternateLanguages, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Islamic FAQs: Quran, Namaz Times, Rakats & Duas Hub',
  description:
    'Comprehensive Islamic FAQs on Quran para 1 to 30, daily namaz rakat table, namaz ke faraiz, namaz time calicut, Delhi Hanafi, Karachi Shia & free PDF downloads.',
  alternates: getAlternateLanguages('/faqs'),
  keywords: [
    'first sajdah in quran',
    'how many sajdah in quran',
    'quran para 1 to 30',
    'quran sharif para 1 to 30',
    'quran para 2',
    '2nd para of quran',
    'second para of quran',
    '3rd para of quran',
    'third para of quran',
    'quran para 8',
    'quran para 29',
    'quran para 30',
    'dua khatam quran',
    'how many pages in quran',
    'shortest surah in quran',
    'small surah in quran',
    'tagging al quran',
    'tafhimul quran bangla',
    'quran shikkha',
    'elearning quran',
    'namaz rakat table',
    'rakat namaz',
    'zuhar namaz rakat',
    'asr namaz rakat',
    'namaz ki rakat',
    'rakat in namaz',
    'namaz with urdu translation',
    'namaz ke faraiz',
    'namaz chadar',
    'namaz janaza',
    'janaza namaz dua',
    'shabe baraat namaz',
    'shab e barat ki namaz ki niyat',
    'tasbeeh namaz',
    'tarabi namaz',
    'beter namaz porar niyom',
    'namaz e ghufayla',
    'namaz time calicut',
    'namaz time in delhi hanafi',
    'namaz time delhi today',
    'shia namaz timing karachi',
    'shia namaz time in dubai',
    'tahajjud namaz time dhaka',
    'quran sharif pdf',
    'quran sharif para 1 to 30 pdf',
    '15 line quran pdf',
    'dua after namaz pdf',
    'bangla quran pdf',
    'quran para 30 pdf',
  ],
};

export default function FAQHubPage() {
  const faqSchema = generateFAQSchema(
    MASTER_FAQS.map((f) => ({
      question: f.question,
      answer: f.answer,
    }))
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Islamic FAQs Master Hub', url: `${SITE_URL}/faqs` },
  ]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 transition-colors duration-200">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 dark:text-slate-200 font-medium">Islamic FAQs Master Knowledge Hub</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Fiqh, Quran &amp; Prayer Reference Directory
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Islamic Knowledge &amp; <span className="text-emerald-400">Prayer FAQs</span> Hub
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore authentic answers to the most frequently searched Islamic questions. Master the <strong>Holy Quran para 1 to 30</strong>, the complete <strong>namaz rakat table</strong>, <strong>namaz ke faraiz</strong>, <strong>namaz janaza</strong>, <strong>shabe baraat namaz</strong>, regional prayer times including <strong>namaz time calicut</strong> and <strong>Delhi Hanafi</strong>, and direct <strong>free Quran PDF downloads</strong>.
            </p>

            {/* Quick Filter Highlights */}
            <div className="pt-2 flex flex-wrap gap-3 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>30 Paras &amp; Sajdah Guides</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>5 Daily Rakats &amp; Timings</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Namaz Ke Faraiz &amp; Modesty</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free Quran &amp; Adhkar PDFs</span>
              </span>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Search & Directory */}
        <FAQDirectory items={MASTER_FAQS} />

        {/* In-Depth Scholarly Guide: The Ethics of Seeking Sacred Knowledge (>1,000 words total page content) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 transition-colors duration-200">
          <section className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <MessageCircleQuestion className="w-3.5 h-3.5" />
              <span>Fiqh &amp; Quran Knowledge Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              The Etiquette of Seeking Sacred Islamic Knowledge (Talab al-&lsquo;Ilm)
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Seeking clarity in matters of faith, prayer, and Quranic recitation is one of the highest forms of devotion in Islam. The Prophet Muhammad (peace be upon him) taught: <em>&ldquo;Seeking knowledge is an obligation upon every Muslim&rdquo;</em> (Sunan Ibn Majah). When approached with sincere intention, asking questions deepens our awe of Allah and removes confusion from our daily worship.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              In this reference guide, we explore the foundational pillars of Islamic jurisprudence, how to understand juristic diversity between schools of thought (*Madhahib*), and practical rules for perfecting daily Salah and Quranic recitation.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              1. The Four Recognized Sources of Islamic Jurisprudence (Usul al-Fiqh)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Every religious ruling in Islamic law—from the calculation of prayer times to the sequence of daily rakats—is derived systematically through four primary sources:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">
                  1. The Holy Quran (Al-Kitab)
                </span>
                <p className="leading-relaxed">
                  The literal word of Allah revealed to Prophet Muhammad (peace be upon him). The Quran establishes universal commandments, such as the absolute obligation of prayer, fasting, and charity, alongside moral virtues and spiritual devotion.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">
                  2. The Prophetic Sunnah (Al-Hadith)
                </span>
                <p className="leading-relaxed">
                  The recorded sayings, deeds, and tacit approvals of the Prophet Muhammad (peace be upon him). The Sunnah provides the practical demonstration of Quranic injunctions, detailing the exact timings, movements, rakats, and supplications of Salah.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">
                  3. Scholarly Consensus (Al-Ijma&lsquo;)
                </span>
                <p className="leading-relaxed">
                  The unanimous agreement of qualified Muslim jurists (*Mujtahidun*) of a given era on a specific legal matter. Ijma provides theological certainty on established practices transmitted across generations, such as the five daily prayers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">
                  4. Analogical Reasoning (Al-Qiyas)
                </span>
                <p className="leading-relaxed">
                  Applying established principles from the Quran and Sunnah to novel circumstances sharing the same underlying effective cause (*&lsquo;Illah*). Qiyas allows Islamic jurisprudence to address contemporary developments such as air travel and high-latitude twilight.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              2. Understanding Juristic Diversity: The Four Sunni Madhahib
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              When exploring Islamic FAQs, believers often encounter subtle differences between the four established schools of jurisprudence: <strong>Hanafi</strong>, <strong>Shafi&rsquo;i</strong>, <strong>Maliki</strong>, and <strong>Hanbali</strong>. Far from being contradictions, these variances represent rigorous, pious scholarly methodologies rooted in the Prophet&rsquo;s diverse companions.
            </p>
            <div className="p-5 rounded-2xl bg-brand-50/60 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/60 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <h4 className="font-bold text-brand-900 dark:text-emerald-300 text-sm">
                Why Do Prayer Times Differ Between Hanafi and Shafi&rsquo;i?
              </h4>
              <p className="leading-relaxed">
                The most notable daily difference occurs in the timing of Asr prayer. The Shafi&rsquo;i, Maliki, and Hanbali schools state that Asr begins when the shadow of an object equals its physical height (plus the midday shadow). The Hanafi school holds that Asr begins when the shadow reaches twice the object&rsquo;s height. Both interpretations trace back to authentic hadith traditions of the Prophet (peace be upon him). Both are spiritually valid, and believers may follow the standard recognized in their local community mosque.
              </p>
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              3. The Universal Golden Rules of Daily Fiqh
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Classical scholars codified fundamental legal maxims (*Al-Qawa&lsquo;id al-Fiqhiyyah*) to assist believers in navigating daily doubts and uncertainties:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">Certainty Is Not Overruled by Doubt (*Al-Yaqin la yazulu bish-shakk*):</strong>
                If you are certain you performed Wudu, a passing suspicion that you broke it does not invalidate your purity. Similarly, if you doubt whether you prayed 3 or 4 rakats, build upon the lesser number (the certainty) and perform the prostration of forgetfulness (*Sajdah Sahw*).
              </li>
              <li className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">Hardship Brings Ease (*Al-Mashaqqah tajlibut-taysir*):</strong>
                Islam provides practical dispensations for human limitation. A sick person may pray sitting or lying down; a traveler (*Musafir*) shortens four-rakat Fard prayers to two rakats; and those without access to clean water may perform dry ablution (*Tayammum*).
              </li>
              <li className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">Actions Are Judged by Intentions (*Innamal-a&lsquo;malu bin-niyyat*):</strong>
                The physical posture of bowing and prostrating becomes worship only through the sincere intention formed in the heart to please Allah alone.
              </li>
            </ul>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              4. Daily Quran Tilawat &amp; Sajdah Prostrations
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              The Holy Quran consists of 114 Surahs divided across 30 equal Paras (Juz). In 14 distinct verses, Allah mentions the prostration of the prophets and the angels. When reciting or listening to any of these verses, it is Sunnah Mu&rsquo;akkadah (and Wajib in Hanafi jurisprudence) to perform a single prostration (*Sajdah Tilawat*):
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
              <p><strong>How to perform Sajdah Tilawat:</strong> Stand facing the Qibla in ritual purity (Wudu), say <em>&ldquo;Allahu Akbar&rdquo;</em> without raising hands to ears, go directly into prostration, recite <em>&ldquo;Subhana Rabbiyal-A&lsquo;la&rdquo;</em> three times (or the dedicated dua: <em>&ldquo;Sajada wajhi lilladhi khalaqahu...&rdquo;</em>), and rise by saying <em>&ldquo;Allahu Akbar&rdquo;</em>. There is no Tashahhud or Salam required.</p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              If you have further questions or encounter unique personal circumstances, we always encourage discussing them with a qualified local scholar or mosque Imam who can provide tailored spiritual guidance.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              5. Making Up Missed Prayers (Qada) &amp; Supplications After Salah
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              If an obligatory prayer is missed due to oversleeping or genuine forgetfulness, the Prophet Muhammad (peace be upon him) instructed: <em>&ldquo;Whoever forgets a prayer or sleeps through it, its expiation is to offer it as soon as he remembers it&rdquo;</em> (Sahih Muslim). There is no other penalty required except sincere repentance and making up the missed Fard rakats (*Qada*).
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Upon concluding any obligatory prayer with the final Salam, lingering for a few minutes in prophetic supplication (*Adhkar Ba&lsquo;d al-Salah*) brings immense peace to the soul:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li>Recite <em>&ldquo;Astaghfirullah&rdquo;</em> three times seeking divine forgiveness.</li>
              <li>Recite <em>Ayat al-Kursi</em> (Surah Al-Baqarah, 2:255); the Prophet affirmed that whoever recites it after each obligatory prayer, nothing stands between him and Paradise except death.</li>
              <li>Perform <em>Tasbeeh Fatimi</em>: 33 times <em>SubhanAllah</em> (Glory be to Allah), 33 times <em>Alhamdulillah</em> (Praise be to Allah), and 34 times <em>Allahu Akbar</em> (Allah is the Greatest).</li>
            </ul>
          </section>
        </div>

        {/* Cross-Resource Knowledge Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                Holy Quran Hub
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Download the complete Quran Sharif Para 1 to 30 PDF, 15 Line Quran PDF, Bangla Quran PDF, and live online previews.
              </p>
            </div>
            <Link
              href="/quran"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline pt-2"
            >
              <span>Explore Quran Hub</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                Namaz Rakat Master Table
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Step-by-step breakdown of all 48 daily rakats, Zuhar namaz rakat, Asr, Namaz ke Faraiz, and Janaza prayer rulings.
              </p>
            </div>
            <Link
              href="/rakats"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 dark:text-emerald-400 hover:underline pt-2"
            >
              <span>View Rakat Tables</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                Today Prayer Times by City
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Accurate astronomical waqt for Calicut, Delhi Hanafi, Karachi Shia, Bangalore, Mumbai, and 20+ global cities.
              </p>
            </div>
            <Link
              href="/prayer-times"
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 dark:text-emerald-400 hover:underline pt-2"
            >
              <span>Check City Directory</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
