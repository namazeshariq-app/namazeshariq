import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Download,
  FileText,
  Sparkles,
  ChevronRight,
  Bookmark,
  CheckCircle,
  BookMarked,
  Info,
  CheckCircle2,
  ArrowRight,
  Heart,
  Eye,
} from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import QuranDownloadHub from '@/components/QuranDownloadHub';
import { generateBreadcrumbSchema, generateFAQSchema, getAlternateLanguages, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Quran Sharif PDF: Para 1 to 30 & 15 Line Quran PDF Download',
  description:
    'Download free Quran Sharif PDF (Para 1 to 30 PDF, 15 line Quran PDF, Bangla Quran PDF, Quran Para 30 PDF) & authentic Dua after Namaz PDF with live preview.',
  alternates: getAlternateLanguages('/quran'),
  keywords: [
    'quran sharif pdf',
    'quran sharif para 1 to 30 pdf',
    '15 line quran pdf',
    'dua after namaz pdf',
    'bangla quran pdf',
    'quran para 30 pdf',
    'quran para 1 to 30',
    'quran para 2',
    '3rd para of quran',
    'quran para 8',
    'quran para 29',
    'first sajdah in quran',
    'how many sajdah in quran',
    'how many pages in quran',
    'shortest surah in quran',
    'dua khatam quran',
    'english quran download',
    'urdu quran pdf download',
    'telugu quran pdf',
  ],
};

// All 30 Paras (Juz) with detailed metadata
const QURAN_PARAS = [
  { num: 1, name: 'Alif-Lam-Meem', arabic: 'الم', surahs: "Al-Fatiha 1:1 – Al-Baqarah 2:141", highlight: "Creation of Adam, Bani Israel covenants, building of the Ka'bah" },
  { num: 2, name: 'Sayaqool', arabic: 'سَيَقُولُ', surahs: 'Al-Baqarah 2:142 – 2:252', highlight: "Change of Qibla to Makkah, fasting in Ramadan, Safa & Marwa, battle of Badr, Talut & Jalut" },
  { num: 3, name: 'Tilkal Rusul', arabic: 'تِلْكَ الرُّسُلُ', surahs: "Al-Baqarah 2:253 – Ali 'Imran 3:92", highlight: "Ayat al-Kursi (2:255), prohibition of Riba (usury), spending in Allah's cause, birth of Maryam" },
  { num: 4, name: 'Lan Tanaaloo', arabic: 'لَنْ تَنَالُوا', surahs: "Ali 'Imran 3:93 – An-Nisa 4:23", highlight: "Battle of Uhud lessons, martyrdom, laws of inheritance and family rights" },
  { num: 5, name: 'Wal Mohsanat', arabic: 'وَالْمُحْصَنَاتُ', surahs: 'An-Nisa 4:24 – 4:147', highlight: 'Protection of women, marital dispute reconciliation, Tayammum, justice and trust' },
  { num: 6, name: 'La Yuhibbullah', arabic: 'لَا يُحِبُّ اللَّهُ', surahs: "An-Nisa 4:148 – Al-Ma'idah 5:81", highlight: 'Law of retaliation, contracts, dietary laws, purification for prayer (Wudu), Christian beliefs' },
  { num: 7, name: 'Wa Iza Sami’oo', arabic: 'وَإِذَا سَمِعُوا', surahs: "Al-Ma'idah 5:82 – Al-An'am 6:110", highlight: 'Expiation of oaths, prohibition of intoxicants and gambling, proofs of Divine unity in nature' },
  { num: 8, name: 'Wa Lau Annana', arabic: 'وَلَوْ أَنَّنَا', surahs: "Al-An'am 6:111 – Al-A'raf 7:87", highlight: 'Dietary rulings, 10 commandments, creation of Adam & Iblis, stories of Prophets Hud, Salih, Lut, Shu’ayb' },
  { num: 9, name: 'Qalal Mala’o', arabic: 'قَالَ الْمَلَأُ', surahs: "Al-A'raf 7:88 – Al-Anfal 8:40", highlight: 'Prophet Musa and Pharaoh, covenant at Mount Sinai, First Sajdah (7:206), spoils of Badr' },
  { num: 10, name: 'Wa A’lamoo', arabic: 'وَاعْلَمُوا', surahs: 'Al-Anfal 8:41 – At-Tawbah 9:92', highlight: 'Distribution of spoils, qualities of true believers, battle of Hunayn, categories of Zakat' },
  { num: 11, name: 'Ya’taziroona', arabic: 'يَعْتَذِرُونَ', surahs: 'At-Tawbah 9:93 – Hud 11:5', highlight: 'Repentance of the three companions, Prophet Yunus, history of Prophet Nuh and the Ark' },
  { num: 12, name: 'Wa Mamin Da’abbatin', arabic: 'وَمَا مِنْ دَابَّةٍ', surahs: 'Hud 11:6 – Yusuf 12:52', highlight: 'Prophets Hud and Salih, full early life of Prophet Yusuf, dreams, patience and prison trials' },
  { num: 13, name: 'Wa Ma Ubri’oo', arabic: 'وَمَا أُبَرِّئُ', surahs: 'Yusuf 12:53 – Ibrahim 14:52', highlight: 'Prophet Yusuf made governor, family reunion, Sajdah in Ar-Ra’d (13:15), prayer of Ibrahim' },
  { num: 14, name: 'Rubama', arabic: 'رُبَمَا', surahs: 'Al-Hijr 15:1 – An-Nahl 16:128', highlight: 'Preservation of the Quran, honeybee reflections, Sajdah in An-Nahl (16:50), justice and benevolence' },
  { num: 15, name: 'Subhanallazi', arabic: 'سُبْحَانَ الَّذِي', surahs: 'Al-Isra 17:1 – Al-Kahf 18:74', highlight: 'Night Journey (Isra and Mi’raj), parental honor, Sajdah (17:109), People of the Cave, Musa & Khidr' },
  { num: 16, name: 'Qala Alam', arabic: 'قَالَ أَلَمْ', surahs: 'Al-Kahf 18:75 – Ta-Ha 20:135', highlight: 'Dhul-Qarnayn, birth of Prophet Isa and Maryam, Sajdah (19:58), calling of Prophet Musa at Mount Tuwa' },
  { num: 17, name: 'Iqtaraba Lin-Nasi', arabic: 'اقْتَرَبَ لِلنَّاسِ', surahs: 'Al-Anbiya 21:1 – Al-Hajj 22:78', highlight: '21 Prophets mentioned, Day of Judgment approach, Sajdah in Al-Hajj (22:18), philosophy of sacrifice' },
  { num: 18, name: 'Qad Aflaha', arabic: 'قَدْ أَفْلَحَ', surahs: 'Al-Mu’minun 23:1 – Al-Furqan 25:20', highlight: 'Qualities of successful believers (Khushu in prayer), verse of Light (Ayat an-Nur), modesty rules' },
  { num: 19, name: 'Wa Qalallazina', arabic: 'وَقَالَ الَّذِينَ', surahs: 'Al-Furqan 25:21 – An-Naml 27:55', highlight: 'Attributes of ‘Ibadur-Rahman, Sajdah (25:60), Prophet Sulaiman, the ants and Queen of Sheba, Sajdah (27:26)' },
  { num: 20, name: 'Aman Khalaqa', arabic: 'أَمَّنْ خَلَقَ', surahs: 'An-Naml 27:56 – Al-Ankabut 29:45', highlight: 'Prophet Musa in Madyan, story of Qarun and arrogance of wealth, spider web metaphor for false gods' },
  { num: 21, name: 'Utlu Ma Oohiya', arabic: 'اتْلُ مَا أُوحِيَ', surahs: 'Al-Ankabut 29:46 – Al-Ahzab 33:30', highlight: 'Cosmic signs in Surah Ar-Rum, Luqman’s advice to his son, Sajdah (32:15), Battle of the Trench (Khandaq)' },
  { num: 22, name: 'Wa Man Yaqnut', arabic: 'وَمَنْ يَقْنُتْ', surahs: 'Al-Ahzab 33:31 – Ya-Sin 36:27', highlight: 'Mothers of the Believers, finality of Prophethood (Khatam an-Nabiyyin), Saba dam, Surah Ya-Sin heart of Quran' },
  { num: 23, name: 'Wa Mali', arabic: 'وَمَا لِيَ', surahs: 'Ya-Sin 36:28 – Az-Zumar 39:31', highlight: 'Resurrection proofs, angels ranking in rows, Prophet Yunus in the whale, Sajdah in Sad (38:24)' },
  { num: 24, name: 'Faman Azlamu', arabic: 'فَمَنْ أَظْلَمُ', surahs: 'Az-Zumar 39:32 – Fussilat 41:46', highlight: 'Never despair of Allah’s mercy (39:53), believer in Pharaoh’s court, Sajdah in Fussilat (41:38)' },
  { num: 25, name: 'Ilayhi Yuraddu', arabic: 'إِلَيْهِ يُرَدُّ', surahs: 'Fussilat 41:47 – Al-Jathiyah 45:37', highlight: 'Consultation (Shura), revelation of divine decree on Laylat al-Qadr, honoring parents at age 40' },
  { num: 26, name: 'Ha-Meem', arabic: 'حم', surahs: 'Al-Ahqaf 46:1 – Az-Zariyat 51:30', highlight: 'People of ‘Ad and Sand Dunes, Treaty of Hudaybiyyah, brotherhood of believers, Sajdah in An-Najm (53:62)' },
  { num: 27, name: 'Qala Fama Khatbukum', arabic: 'قَالَ فَمَا خَطْبُكُمْ', surahs: 'Az-Zariyat 51:31 – Al-Hadid 57:29', highlight: 'Splitting of the Moon, Surah Ar-Rahman (Which favors of your Lord will you deny?), Surah Al-Waqi’ah' },
  { num: 28, name: 'Qad Sami’ Allah', arabic: 'قَدْ سَمِعَ اللَّهُ', surahs: 'Al-Mujadila 58:1 – At-Tahrim 66:12', highlight: 'Family law, expulsion of Banu Nadir, Friday prayer call (Jumu’ah), hypocrites exposed, divorce procedures' },
  { num: 29, name: 'Tabarakallazi', arabic: 'تَبَارَكَ الَّذِي', surahs: 'Al-Mulk 67:1 – Al-Mursalat 77:50', highlight: 'Protection from grave punishment (Surah Al-Mulk), the pen, Day of Truth (Al-Haqqah), Prophet Nuh, Jinn, Qiyamah' },
  { num: 30, name: 'Amma Yatasa’aloon', arabic: 'عَمَّ يَتَسَاءَلُونَ', surahs: 'An-Naba 78:1 – An-Nas 114:6', highlight: 'Juz Amma: 37 short surahs recited frequently in daily Salah, Sajdah in Al-Inshiqaq (84:21) and Al-Alaq (96:19)' },
];

// The 14 Sajdah Tilawat verses
const SAJDAH_VERSES = [
  { no: 1, surah: "Al-A'raf", verse: '7:206', para: 9, description: 'First Sajdah in Quran. Humility before the Creator alongside heavenly angels.' },
  { no: 2, surah: "Ar-Ra'd", verse: '13:15', para: 13, description: 'All creation prostrates willingly or unwillingly, as do their shadows.' },
  { no: 3, surah: 'An-Nahl', verse: '16:50', para: 14, description: 'Angels fear their Lord above them and carry out everything commanded.' },
  { no: 4, surah: 'Al-Isra', verse: '17:109', para: 15, description: 'The righteous fall down weeping upon hearing revelation, increasing in reverence.' },
  { no: 5, surah: 'Maryam', verse: '19:58', para: 16, description: 'When the verses of the Most Merciful were recited, prophets fell in prostration.' },
  { no: 6, surah: 'Al-Hajj', verse: '22:18', para: 17, description: 'The sun, moon, stars, mountains, trees, and living creatures all bow to Allah.' },
  { no: 7, surah: 'Al-Furqan', verse: '25:60', para: 19, description: 'Refusal of the disbelievers to prostrate to Ar-Rahman contrasted with the faithful.' },
  { no: 8, surah: 'An-Naml', verse: '27:26', para: 19, description: 'Allah: none has the right to be worshipped but He, Lord of the Supreme Throne.' },
  { no: 9, surah: 'As-Sajdah', verse: '32:15', para: 21, description: 'Only those believe who, when reminded, fall in prostration free from arrogance.' },
  { no: 10, surah: 'Sad', verse: '38:24', para: 23, description: 'Prophet Dawud fell down bowing and turning to Allah in repentance.' },
  { no: 11, surah: 'Fussilat', verse: '41:38', para: 24, description: 'Those in presence of your Lord glorify Him night and day and never tire.' },
  { no: 12, surah: 'An-Najm', verse: '53:62', para: 27, description: 'So prostrate to Allah and worship Him alone.' },
  { no: 13, surah: 'Al-Inshiqaq', verse: '84:21', para: 30, description: 'Rebuking those who do not prostrate when the Holy Quran is recited to them.' },
  { no: 14, surah: 'Al-Alaq', verse: '96:19', para: 30, description: 'Nay! Do not obey him, but prostrate yourself and draw near to Allah.' },
];

export default function QuranHubPage() {
  const quranFaqs = [
    {
      question: 'Where can I download the complete Quran Sharif Para 1 to 30 PDF for free?',
      answer:
        'You can download the full Quran Sharif Para 1 to 30 PDF directly on Namaz-e-Shariq without registration. Our verified digital Mushaf includes all 30 Paras (Juz) with clear Arabic calligraphy, Ruku demarcations, the 14 Sajdah Tilawat verses, and the authentic Dua Khatam Quran supplication.',
    },
    {
      question: 'What is the 15 line Quran PDF and why is it preferred for Hifz?',
      answer:
        'The 15 line Quran PDF follows the standard Saudi King Fahd Complex (Madani script) Mushaf layout spanning exactly 604 pages. It is universally preferred for Quran memorization (Hifz) because every single page starts with the beginning of an ayah and concludes with an ayah ending (Ayat-e-Khatam), creating an unambiguous visual memory anchor for students.',
    },
    {
      question: 'What authentic supplications are included in the Dua After Namaz PDF?',
      answer:
        'Our free Dua after Namaz PDF contains authentic post-prayer supplications from Sahih al-Bukhari and Sahih Muslim. It includes the 3-fold Istighfar, "Allahumma Antas-Salam", Ayat al-Kursi (which Prophet Muhammad ﷺ stated secures Paradise), Tasbeeh Fatimi (33x SubhanAllah, 33x Alhamdulillah, 34x Allahu Akbar), and comprehensive forgiveness prayers in Arabic with English translation.',
    },
    {
      question: 'What is Quran Para 30 PDF (Juz Amma) and why is it recited daily in prayer?',
      answer:
        'Quran Para 30 PDF (known as Juz Amma) contains the final 37 short Makki surahs of the Holy Quran, starting from Surah An-Naba (78) through Surah An-Nas (114). Due to their rhythmic eloquence, spiritual depth, and brevity, these surahs are recited regularly in the daily Fard and Sunnah rakats of Salah by Muslims around the globe.',
    },
    {
      question: 'Can I download the Bangla Quran PDF with Tafhimul Quran commentary?',
      answer:
        'Yes. We provide direct access to download the Bangla Quran PDF featuring complete Bengali translation (বাংলা অনুবাদ) and insightful Tafhimul Quran commentary. It allows Bengali-speaking believers across Bangladesh, West Bengal, and worldwide communities to study the divine meanings in clear, modern Bengali.',
    },
    {
      question: 'How many total Paras (Juz) and pages are in the Holy Quran Sharif PDF?',
      answer:
        'The Holy Quran Sharif contains 30 Paras (Juz) and 114 Surahs. In the globally recognized 15 line Quran PDF (Saudi Madani Mushaf), there are exactly 604 pages, structured systematically so that each Para spans 20 pages (with Para 30 spanning 23 pages). Indo-Pak 16-line editions generally span 548 pages, and 13-line prints span 848 pages.',
    },
    {
      question: 'How many Sajdah Tilawat are in the Quran and which is the first Sajdah?',
      answer:
        'There are 14 agreed-upon Sajdah Tilawat (prostrations of recitation) in the Holy Quran according to the major Islamic jurisprudence schools. The first sajdah in Quran occurs in Surah Al-A’raf (Chapter 7, Verse 206) in Para 9.',
    },
    {
      question: 'What is Dua Khatam Quran and when should it be recited?',
      answer:
        'Dua Khatam Quran is the traditional supplication recited upon concluding the recitation of the entire Quran (from Surah Al-Fatiha to Surah An-Nas). According to Hadith traditions, prayers offered at the completion of a Quran recitation are granted special divine mercy and acceptance.',
    },
  ];

  const faqSchema = generateFAQSchema(quranFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Holy Quran Hub', url: `${SITE_URL}/quran` },
  ]);

  // DigitalDocument Schemas for Rich Snippet Download indexing
  const digitalDocumentsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DigitalDocument',
        '@id': `${SITE_URL}/quran#quran-sharif-para-1-30-pdf`,
        name: 'Quran Sharif Para 1 to 30 PDF (Full Mushaf)',
        description:
          'Download complete Quran Sharif Para 1 to 30 PDF featuring authentic Uthmani script, 14 Sajdah Tilawat verses, and Dua Khatam Quran.',
        encodingFormat: 'application/pdf',
        url: `${SITE_URL}/downloads/holy-quran-guide-and-index.pdf`,
        inLanguage: ['ar', 'en', 'ur'],
        isAccessibleForFree: true,
        publisher: {
          '@type': 'Organization',
          name: 'Namaz-e-Shariq',
          url: SITE_URL,
        },
      },
      {
        '@type': 'DigitalDocument',
        '@id': `${SITE_URL}/quran#15-line-quran-pdf`,
        name: '15 Line Quran PDF (Saudi Madani Script)',
        description:
          'Download authentic 15 line Quran PDF in standard King Fahd Saudi Madani script, optimized for Hifz memorization with 604 pages.',
        encodingFormat: 'application/pdf',
        url: 'https://www.pdfquran.com/download/big/big-quran.pdf',
        inLanguage: 'ar',
        isAccessibleForFree: true,
        publisher: {
          '@type': 'Organization',
          name: 'Namaz-e-Shariq',
          url: SITE_URL,
        },
      },
      {
        '@type': 'DigitalDocument',
        '@id': `${SITE_URL}/quran#dua-after-namaz-pdf`,
        name: 'Dua After Namaz PDF & Masnoon Adhkar',
        description:
          'Download authentic Dua after Namaz PDF featuring Prophetic post-prayer supplications, Ayat al-Kursi, and Tasbeeh Fatimi in Arabic and English.',
        encodingFormat: 'application/pdf',
        url: `${SITE_URL}/downloads/dua-after-namaz-and-masnoon-adhkar.pdf`,
        inLanguage: ['ar', 'en'],
        isAccessibleForFree: true,
        publisher: {
          '@type': 'Organization',
          name: 'Namaz-e-Shariq',
          url: SITE_URL,
        },
      },
      {
        '@type': 'DigitalDocument',
        '@id': `${SITE_URL}/quran#quran-para-30-pdf`,
        name: 'Quran Para 30 PDF (Juz Amma)',
        description:
          'Download verified Quran Para 30 PDF containing all 37 short Makki surahs from Surah An-Naba to Surah An-Nas for daily Salah recitation.',
        encodingFormat: 'application/pdf',
        url: `${SITE_URL}/downloads/quran-para-30-juz-amma.pdf`,
        inLanguage: 'ar',
        isAccessibleForFree: true,
        publisher: {
          '@type': 'Organization',
          name: 'Namaz-e-Shariq',
          url: SITE_URL,
        },
      },
      {
        '@type': 'DigitalDocument',
        '@id': `${SITE_URL}/quran#bangla-quran-pdf`,
        name: 'Bangla Quran PDF (পবিত্র কুরআন শরীফ বাংলা)',
        description:
          'Download full Bangla Quran PDF with authentic Bengali translation and Tafhimul Quran commentary for study in Bangladesh and India.',
        encodingFormat: 'application/pdf',
        url: 'https://www.pdfquran.com/download/bengali/bengali-quran.pdf',
        inLanguage: ['bn', 'ar'],
        isAccessibleForFree: true,
        publisher: {
          '@type': 'Organization',
          name: 'Namaz-e-Shariq',
          url: SITE_URL,
        },
      },
    ],
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(digitalDocumentsSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 dark:text-slate-200 font-medium">Holy Quran Sharif PDF &amp; Study Hub</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Complete Quran Sharif PDF &amp; Islamic Resource Portal
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Holy Quran Sharif PDF: <span className="text-emerald-400">Para 1 to 30</span>, 15 Line &amp; Dua Guide
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Download authentic editions of the Holy <strong>Quran Sharif PDF</strong> in crystal-clear digital prints. Access the complete <strong>Quran Sharif Para 1 to 30 PDF</strong> with surah indices, the standard Saudi <strong>15 line Quran PDF</strong> for effortless Hifz memorization, regional translations including the <strong>Bangla Quran PDF</strong>, and the dedicated <strong>Quran Para 30 PDF</strong> (Juz Amma) for daily prayers. You can also download our verified <strong>Dua after Namaz PDF</strong> with authentic post-Salah masnoon adhkar.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#download-quran"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Quran Sharif PDF (All Formats)</span>
              </a>
              <a
                href="#15-line-guide"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition flex items-center gap-2 border border-white/15"
              >
                <BookOpen className="w-4 h-4" />
                <span>15 Line Quran PDF Guide</span>
              </a>
              <a
                href="#dua-after-namaz-guide"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition flex items-center gap-2 border border-white/15"
              >
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Dua After Namaz PDF</span>
              </a>
              <a
                href="#juz-index"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition flex items-center gap-2 border border-white/15"
              >
                <Bookmark className="w-4 h-4" />
                <span>Browse Quran Para 1 to 30</span>
              </a>
            </div>
          </div>
        </div>

        {/* Free Quran Book Download Hub & Live Preview in Multi-Languages */}
        <div id="download-quran">
          <QuranDownloadHub />
        </div>

        {/* Essential Quran Statistics Bar */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Core Quranic Structure &amp; Statistical Overview
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">30</span>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">Paras (Juz)</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-700 dark:text-emerald-400">114</span>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">Total Surahs</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 dark:text-emerald-400">6,236</span>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">Verses (Ayat)</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 dark:text-emerald-400">604</span>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">Pages in Quran</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-700 dark:text-emerald-400">14</span>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">Sajdah Tilawat</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-base sm:text-lg font-extrabold text-rose-700 dark:text-emerald-400 truncate">Al-Kawthar</span>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">Shortest Surah</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            * <strong>How many pages in Quran:</strong> The standard King Fahd Complex Madani Mushaf in the <strong>15 line Quran PDF</strong> format consists of exactly 604 pages. <strong>Shortest surah in Quran:</strong> Surah Al-Kawthar (Chapter 108) consists of 3 verses, 10 words, and 42 letters, making it the most concise surah in the Divine text.
          </p>
        </section>

        {/* Feature Deep Dive 1: 15 Line Quran PDF (Saudi Madani Script) */}
        <section id="15-line-guide" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <BookOpen className="w-3.5 h-3.5" />
                Hifz Memorization Standard
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                Why the 15 Line Quran PDF is the Global Choice for Memorization
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The standard <strong>15 line Quran PDF</strong> based on the Saudi King Fahd Madani Mushaf is recognized by Huffaz and Islamic institutions worldwide as the most effective format for Quran memorization.
              </p>
            </div>
            <a
              href="https://www.pdfquran.com/download/big/big-quran.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download 15 Line Quran PDF</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">1</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Ayah-Ending Consistency (Ayat-e-Khatam)
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                In the <strong>15 line Quran PDF</strong>, every single page begins with the start of an ayah and concludes with the finish of an ayah. There are no mid-verse page splits, making mental visualization and photographic recall effortless during Hifz revision.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">2</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Systematic 20-Page Juz Boundaries
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The 604 pages of the <strong>15 line Quran PDF</strong> are organized so that each of the first 29 Paras spans exactly 20 pages (10 physical leaves). Believers can systematically read one Para each day by reciting 4 pages after each of the 5 daily prayers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">3</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                High-Contrast Uthmani Typography
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Written in the pristine calligraphy of Master Calligrapher Uthman Taha, our <strong>15 line Quran PDF</strong> features generous line spacing, distinct stop-signs (Waqf notations), and crisp diacritical markings suitable for phone, tablet, and e-reader screens.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Deep Dive 2: Dua After Namaz PDF & Daily Masnoon Adhkar */}
        <section id="dua-after-namaz-guide" className="bg-gradient-to-br from-rose-950 via-slate-900 to-brand-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-6 border border-rose-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                Authentic Post-Salah Adhkar Manual
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Authentic Dua After Namaz PDF: Prophetic Adhkar &amp; Supplications
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect your daily Quran recitation directly with your obligatory prayers. Our verified <strong>Dua after Namaz PDF</strong> compiles the authentic supplications recited by Prophet Muhammad ﷺ immediately following the Fard prayers.
              </p>
            </div>
            <a
              href="/downloads/dua-after-namaz-and-masnoon-adhkar.pdf"
              download="dua-after-namaz-and-masnoon-adhkar.pdf"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-md transition shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Dua After Namaz PDF</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            {/* Adhkar 1: Istighfar and Salam */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 backdrop-blur-xs">
              <span className="font-bold text-rose-300 block text-sm">
                1. Post-Fard Istighfar &amp; Supplication of Peace (Sahih Muslim 591)
              </span>
              <p className="text-lg font-arabic text-emerald-300 text-right leading-relaxed">
                أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا)، اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالإِكْرَامِ
              </p>
              <p className="text-slate-300 italic text-xs">
                &ldquo;Astaghfirullah (3 times). Allahumma Antas-Salam wa minkas-salam, tabarakta ya Dhal-Jalali wal-Ikram.&rdquo;
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                <em>Translation:</em> &ldquo;I seek forgiveness of Allah (three times). O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honor.&rdquo;
              </p>
            </div>

            {/* Adhkar 2: Ayat al-Kursi & Tasbeeh Fatimi */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 backdrop-blur-xs">
              <span className="font-bold text-rose-300 block text-sm">
                2. Ayat al-Kursi &amp; Tasbeeh Fatimi (Sunan An-Nasa&rsquo;i)
              </span>
              <p className="text-slate-200 text-xs leading-relaxed">
                The Prophet ﷺ said: <em>&ldquo;Whoever recites Ayat al-Kursi immediately after every prescribed prayer, nothing stands between him and entering Paradise except death.&rdquo;</em>
              </p>
              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <p className="text-xs font-semibold text-rose-200">Tasbeeh Fatimi sequence after every Fard prayer:</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-300 text-xs">
                  <li><strong>SubhanAllah</strong> (Glory be to Allah) — 33 times</li>
                  <li><strong>Alhamdulillah</strong> (All praise is due to Allah) — 33 times</li>
                  <li><strong>Allahu Akbar</strong> (Allah is the Greatest) — 34 times (or 33 times followed by Kalima Tawheed)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-300">
              📌 The complete <strong>Dua after Namaz PDF</strong> also includes prayers for protection from debt, laziness, grave punishment, and anxiety.
            </span>
            <a
              href="/downloads/dua-after-namaz-and-masnoon-adhkar.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-300 hover:text-white font-bold underline shrink-0"
            >
              View Dua After Namaz PDF Online &rarr;
            </a>
          </div>
        </section>

        {/* Master 30 Para Index Table */}
        <section id="juz-index" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
                <BookMarked className="w-3.5 h-3.5" />
                Complete Sacred Division
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                Quran Sharif Para 1 to 30 Master Index
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
                The complete <strong>Quran Sharif Para 1 to 30 PDF</strong> is structured into 30 equal divisions (<span className="font-semibold text-slate-800 dark:text-slate-200">quran para 1 to 30</span>), enabling believers to complete the entire revelation systematically within a single month.
              </p>
            </div>
            <a
              href="/downloads/holy-quran-guide-and-index.pdf"
              download="quran-sharif-para-1-to-30.pdf"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Quran Sharif Para 1 to 30 PDF</span>
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-brand-900 text-white uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-3 rounded-tl-xl font-bold w-16 text-center">Para</th>
                  <th className="py-3 px-3 font-bold">Arabic Opening</th>
                  <th className="py-3 px-3 font-bold">Transliteration</th>
                  <th className="py-3 px-3 font-bold">Surah &amp; Verse Span</th>
                  <th className="py-3 px-4 font-bold rounded-tr-xl">Central Themes &amp; Highlights</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {QURAN_PARAS.map((p) => {
                  const isSpecial = [2, 3, 8, 29, 30].includes(p.num);
                  return (
                    <tr
                      key={p.num}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                        isSpecial ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3 text-center font-bold text-slate-900 dark:text-slate-100">
                        {p.num}
                      </td>
                      <td className="py-3.5 px-3 text-base font-arabic font-bold text-emerald-800 dark:text-emerald-300">
                        {p.arabic}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                        {p.name}
                        {isSpecial && (
                          <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                            Focus
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap text-slate-600 dark:text-slate-400">
                        {p.surahs}
                      </td>
                      <td className="py-3.5 px-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {p.highlight}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Dive Callouts for Requested Focus Paras */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Thematic Breakdown of Key Quran Paras
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Para 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-100 dark:bg-brand-950/60 text-brand-800 dark:text-emerald-300">
                Juz 2: Sayaqool (سَيَقُولُ)
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Quran Para 2 (2nd Para of Quran / Second Para of Quran)
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Opening with the momentous decree changing the Qibla (prayer orientation) from Jerusalem to the Holy Ka&rsquo;bah in Makkah, <strong>quran para 2</strong> lays the legislative foundations of the Muslim Ummah. It institutes the obligatory fasting of Ramadan (Al-Baqarah 2:183-187), rulings of marital relations, Hajj rites between Safa and Marwa, spending in charity, and concludes with the historic victory of Talut over Jalut (Goliath).
              </p>
            </div>

            {/* Para 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
                Juz 3: Tilkal Rusul (تِلْكَ الرُّسُلُ)
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                3rd Para of Quran (Third Para of Quran)
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                The <strong>3rd para of quran</strong> features the greatest verse in the entire revelation: <em>Ayat al-Kursi</em> (The Throne Verse, Al-Baqarah 2:255), declaring Allah&rsquo;s absolute sovereignty and eternal life. It strictly forbids Riba (usury/interest), records the longest verse regarding debt contracts (Ayat ad-Dayn, 2:282), and transitions into Surah Ali &lsquo;Imran with the miraculous birth of Maryam (Mary).
              </p>
            </div>

            {/* Para 8 */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                Juz 8: Wa Lau Annana (وَلَوْ أَنَّنَا)
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Quran Para 8: Creation, Prophetic Missions &amp; Dietary Laws
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                In <strong>quran para 8</strong>, the Quran presents extensive rational proofs of Divine unity in cosmic creation. It details lawful (Halal) and unlawful meat, delineates the ten moral commandments of Islam, and recounts the primordial dialogue between Allah and Iblis (Satan) at the creation of Adam. It proceeds into the harrowing histories of the peoples of Prophet Hud, Salih, Lut, and Shu&rsquo;ayb.
              </p>
            </div>

            {/* Para 29 & 30 */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300">
                Juz 29 &amp; 30: Tabarakallazi &amp; Amma
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Quran Para 29 &amp; Quran Para 30 PDF (Juz Amma)
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                <strong>Quran para 29</strong> opens with Surah Al-Mulk, protecting reciters from the torment of the grave. The <strong>Quran Para 30 PDF</strong> (Juz Amma) contains 37 short, rhythmically powerful Makki surahs memorized by Muslims worldwide and recited in the daily Fard and Sunnah rakats of Salah, ending with the twin protective surahs Al-Falaq and An-Nas.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Deep Dive 3: Quran Para 30 PDF (Juz Amma) Dedicated Hub */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <BookOpen className="w-3.5 h-3.5" />
                Juz Amma • 37 Short Surahs
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                Quran Para 30 PDF (Juz Amma): Short Surahs for Daily Namaz
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The <strong>Quran Para 30 PDF</strong> covers the 37 short Makki surahs from Surah An-Naba to Surah An-Nas. It is the primary portion of the Quran recited by millions of believers during their 5 daily obligatory prayers and Taraweeh prayers in Ramadan.
              </p>
            </div>
            <a
              href="/downloads/quran-para-30-juz-amma.pdf"
              download="quran-para-30-juz-amma.pdf"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-sm transition shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Quran Para 30 PDF</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Core Prayer Recitations
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Surahs such as <em>Surah Al-Ikhlas, Surah Al-Falaq, Surah An-Nas, Surah Al-Kawthar, and Surah Al-Asr</em> from the <strong>Quran Para 30 PDF</strong> form the cornerstone of daily prayer recitation after Surah Al-Fatiha in every rakat of Salah.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Two Sajdah Tilawat Verses
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Quran Para 30 PDF</strong> contains two profound Sajdah Tilawat verses: in Surah Al-Inshiqaq (84:21) rebuking refusal of prostration, and in Surah Al-Alaq (96:19) commanding believers to prostrate and draw near to Allah.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Ideal for Children &amp; Beginners
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                With concise ayat and powerful poetic rhythm, downloading the <strong>Quran Para 30 PDF</strong> is the recommended first step for children and new Muslims transitioning from basic Noorani Qaida into fluent Quran recitation.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Deep Dive 4: Bangla Quran PDF & Regional Translations */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                <BookOpen className="w-3.5 h-3.5" />
                বাংলা অনুবাদ ও তাফহীম
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                Bangla Quran PDF: Tafhimul Quran &amp; Bengali Translations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Understanding the divine message in your mother tongue is vital for spiritual reflection. Our verified <strong>Bangla Quran PDF</strong> offers authentic Bengali translation alongside lucid Arabic typography for readers across Bangladesh, West Bengal, and the global Bengali diaspora.
              </p>
            </div>
            <a
              href="https://www.pdfquran.com/download/bengali/bengali-quran.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-sm transition shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Bangla Quran PDF</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Tafhimul Quran Bangla
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The <strong>Bangla Quran PDF</strong> features scholarly commentary derived from classical works and Tafhimul Quran, explaining the historical context (Shaan-e-Nuzool) and practical lessons of each surah in lucid Bengali prose.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Quran Shikkha Integration
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Complementing structured Quran Shikkha (কুরআন শিক্ষা) classes, this digital edition allows Bengali students to cross-examine Bengali phonetics with authentic Arabic Tajweed rules.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Clean Digital Bengali Typography
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our high-definition <strong>Bangla Quran PDF</strong> is optimized with clean Unicode Bengali rendering and parallel Arabic text, making mobile reading comfortable without eye strain.
              </p>
            </div>
          </div>
        </section>

        {/* 14 Sajdah Tilawat Section */}
        <section id="sajdah-guide" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
              <Bookmark className="w-3.5 h-3.5" />
              Sajdah at-Tilawah Manual
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              The 14 Sajdah Tilawat in the Holy Quran Sharif PDF
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
              According to the consensus of scholars across the Hanafi, Shafi’i, and Hanbali schools, there are exactly <span className="font-semibold text-slate-900 dark:text-slate-100">14 agreed-upon Sajdah Tilawat</span> (<span className="font-semibold">how many sajdah in quran</span>). The <span className="font-semibold text-emerald-700 dark:text-emerald-400">first sajdah in quran</span> occurs in Surah Al-A&rsquo;raf (7:206) in Para 9.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-800 text-white uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-3 rounded-tl-xl font-bold w-12 text-center">#</th>
                  <th className="py-3 px-3 font-bold">Surah Name</th>
                  <th className="py-3 px-3 font-bold">Verse (Ayah)</th>
                  <th className="py-3 px-3 font-bold">Para (Juz)</th>
                  <th className="py-3 px-4 font-bold rounded-tr-xl">Spiritual Context &amp; Sign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {SAJDAH_VERSES.map((s) => (
                  <tr key={s.no} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 text-center font-bold text-slate-900 dark:text-slate-100">{s.no}</td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100">{s.surah}</td>
                    <td className="py-3 px-3 text-emerald-700 dark:text-emerald-400 font-semibold">{s.verse}</td>
                    <td className="py-3 px-3">Para {s.para}</td>
                    <td className="py-3 px-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{s.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Procedure Box */}
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <h4 className="font-bold text-emerald-950 dark:text-emerald-200 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Method for Performing Sajdah Tilawat:
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              When reciting or listening to any of the 14 verses above in your <strong>Quran Sharif PDF</strong> or during Salah, it is Wajib (in Hanafi jurisprudence) or Sunnah Mu’akkadah to perform prostration. While in a state of Wudu facing the Qibla, stand up and say <em>&ldquo;Allahu Akbar&rdquo;</em> (without raising hands to the ears), prostrate directly onto the ground, recite <em>&ldquo;Subhana Rabbiyal A’la&rdquo;</em> three times, and then say <em>&ldquo;Allahu Akbar&rdquo;</em> to rise back up. No Tashahhud or Salam is required.
            </p>
          </div>
        </section>

        {/* Dua Khatam Quran Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 dark:bg-brand-950/60 text-brand-800 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              Completion Supplication
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Dua Khatam Quran: Sacred Prayer upon Completing Recitation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Upon finishing the recitation of the 30th Para of the <strong>Quran Sharif Para 1 to 30 PDF</strong>, the believer offers <span className="font-semibold text-slate-900 dark:text-slate-100">dua khatam quran</span>. Anas ibn Malik (may Allah be pleased with him) used to gather his family upon completing the Quran to make heartfelt supplications together.
            </p>
          </div>

          {/* Arabic Text Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center space-y-4">
            <p className="text-xl sm:text-2xl lg:text-3xl font-arabic text-emerald-950 dark:text-emerald-300 leading-loose">
              اللَّهُمَّ ارْحَمْنِي بِالْقُرْآنِ، وَاجْعَلْهُ لِي إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً، اللَّهُمَّ ذَكِّرْنِي مِنْهُ مَا نَسِيتُ، وَعَلِّمْنِي مِنْهُ مَا جَهِلْتُ، وَارْزُقْنِي تِلَاوَتَهُ آنَاءَ اللَّيْلِ وَأَطْرَافَ النَّهَارِ، وَاجْعَلْهُ لِي حُجَّةً يَا رَبَّ الْعَالَمِينَ
            </p>
          </div>

          {/* Transliteration and Translation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">English Transliteration</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                &ldquo;Allahumma irhamni bil-Qur&rsquo;an, waj&rsquo;alhu li imaman wa nuran wa hudan wa rahmah. Allahumma dhakkirni minhu ma nassitu, wa &lsquo;allimni minhu ma jahiltu, warzuqni tilawatahu ana&rsquo;a al-layli wa atraf an-nahar, waj&rsquo;alhu li hujjatan ya Rabbal &lsquo;Alameen.&rdquo;
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">English Translation</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                &ldquo;O Allah, have mercy upon me by the Quran, and make it for me a guide, a light, guidance, and mercy. O Allah, remind me of what I have forgotten from it, teach me what I am ignorant of from it, grant me its recitation during the hours of the night and at the ends of the day, and make it an argument in my favor, O Lord of the worlds.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Modern Study Frameworks: Tagging, Bengali Tafheem, Shikkha & eLearning */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Modern Quranic Learning, Tadabbur &amp; Global Education
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
              Connecting traditional scholarship with innovative study methods, digital academies, and regional translations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
            {/* Tagging Al Quran */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Tagging Al Quran
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Tagging al quran</strong> is a structured method of color-coded indexing and thematic sticky-note journaling. Verses in your <strong>quran sharif pdf</strong> are classified under themes like <em>Du’a, Sabr, Tawakkul, Gratitude, and Akhirah</em>, fostering personal Tadabbur.
              </p>
            </div>

            {/* Tafhimul Quran Bangla */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Tafhimul Quran Bangla
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Tafhimul quran bangla</strong> provides Bengali-speaking readers with Sayyid Abul A’la Maududi’s landmark commentary, explaining historical contexts, linguistic nuances, and real-world socioeconomic applications in clear Bengali prose.
              </p>
            </div>

            {/* Quran Shikkha */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Quran Shikkha Programs
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Quran shikkha</strong> represents systematic foundational learning starting with Noorani Qaida, articulation points (Makharij), short vowels, and essential Tajweed rules tailored for young children and adult beginners.
              </p>
            </div>

            {/* eLearning Quran */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                eLearning Quran Platforms
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>eLearning quran</strong> connects students globally with certified Al-Azhar and Madinah graduates via video classrooms, enabling flexible Hifz tracking, interactive Tajweed feedback, and accessible Quran education worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <FAQAccordion items={quranFaqs} title="Frequently Asked Questions on Holy Quran Sharif PDF" />
      </div>
    </div>
  );
}