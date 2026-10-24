import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Download,
  FileText,
  Search,
  Sparkles,
  ChevronRight,
  Bookmark,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  ExternalLink,
  BookMarked,
  Info,
} from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import QuranDownloadHub from '@/components/QuranDownloadHub';
import { generateBreadcrumbSchema, generateFAQSchema, getAlternateLanguages, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Holy Quran 1-30 Para Guide & Download | Namaz-e-Shariq',
  description:
    'Download the complete Quran PDF and explore the 1 to 30 Para index, 14 Sajdah Tilawat verses, Dua Khatam Quran, and comprehensive Tajweed study guides.',
  alternates: getAlternateLanguages('/quran'),
  keywords: [
    'quran para 1 to 30',
    'quran sharif para 1 to 30',
    'quran book download',
    'english quran download',
    'urdu quran pdf download',
    'telugu quran pdf',
    'arabic quran pdf big font',
    'quran para 2',
    '3rd para of quran',
    'quran para 8',
    'quran para 29',
    'quran para 30',
    'first sajdah in quran',
    'how many sajdah in quran',
    'how many pages in quran',
    'shortest surah in quran',
    'dua khatam quran',
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
      question: 'How many total Paras (Juz) and pages are in the Holy Quran?',
      answer:
        'The Holy Quran contains 30 Paras (Juz) and 114 Surahs. In the standard King Fahd Complex Madani Mushaf (15-line Uthmani script), there are exactly 604 pages, structured so that each Juz comprises 20 pages (with the 30th Juz covering 23 pages). Indo-Pak 16-line editions generally span 548 pages, and 13-line prints span 848 pages.',
    },
    {
      question: 'How many Sajdah Tilawat are in the Quran and which is the first Sajdah?',
      answer:
        'There are 14 agreed-upon Sajdah Tilawat (prostrations of recitation) in the Holy Quran according to the Hanafi, Shafi’i, and Hanbali schools. The first sajdah in Quran occurs in Surah Al-A’raf (Chapter 7, Verse 206) in Para 9.',
    },
    {
      question: 'What is the shortest surah in the Holy Quran?',
      answer:
        'The shortest surah in the Holy Quran is Surah Al-Kawthar (Chapter 108). It consists of only 3 verses (ayat), 10 Arabic words, and 42 letters. It was revealed to comfort the Prophet Muhammad (peace be upon him) with the promise of divine abundance.',
    },
    {
      question: 'What is Dua Khatam Quran and when should it be recited?',
      answer:
        'Dua Khatam Quran is the traditional supplication recited upon concluding the recitation of the entire Quran (from Surah Al-Fatiha to Surah An-Nas). Scholars note that prayers offered at the completion of a Quran recitation are answered with divine mercy and forgiveness.',
    },
    {
      question: 'What is tagging Al Quran and how does it assist in daily reflection?',
      answer:
        'Tagging Al Quran is a contemporary study method where readers use color-coded bookmarks and sticky notes to categorize verses by themes such as Dua, Sabr (patience), Tawakkul (trust), Jannah, family ethics, and rulings. It encourages active reflection (Tadabbur) alongside daily recitation.',
    },
    {
      question: 'Can I preview and download the Holy Quran in English, Urdu, Telugu, and Arabic?',
      answer:
        'Yes. Namaz-e-Shariq provides direct PDF downloads and an interactive live previewer for the Holy Quran in Arabic (big font), English translation, Urdu translation and commentary, and Telugu translation (తెలుగు అనువాదం). You can read each translation online in your browser or download the full PDF free of charge for offline recitation.',
    },
    {
      question: 'Where can I read Tafhimul Quran Bangla and access Quran Shikkha or eLearning?',
      answer:
        'Tafhimul Quran Bangla (Sayyid Abul A’la Maududi’s commentary translated into Bengali) is available across major Islamic learning portals. For beginners and children, Quran Shikkha modules provide phonetics-based Noorani Qaida training, while modern eLearning Quran academies offer one-on-one virtual Tajweed tutoring globally.',
    },
  ];

  const faqSchema = generateFAQSchema(quranFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Holy Quran Hub', url: `${SITE_URL}/quran` },
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 dark:text-slate-200 font-medium">Holy Quran 1-30 Para & Book Download</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Complete Quranic Educational & Download Hub
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Holy Quran Sharif: <span className="text-emerald-400">1 to 30 Para</span> Master Index & PDF Book Download
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore the sacred architecture of the Holy Quran. Access verified digital downloads, investigate all 30 Paras (Juz), master the 14 Sajdah Tilawat verses, recite the authentic Dua Khatam Quran, and benefit from modern Tadabbur study frameworks.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#download-quran"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Quran Books (4 Languages)</span>
              </a>
              <a
                href="#juz-index"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition flex items-center gap-2 border border-white/15"
              >
                <BookOpen className="w-4 h-4" />
                <span>Browse Quran Para 1 to 30</span>
              </a>
              <a
                href="#sajdah-guide"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition flex items-center gap-2 border border-white/15"
              >
                <Bookmark className="w-4 h-4" />
                <span>14 Sajdah Tilawat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Free Quran Book Download Hub & Live Preview in 4 Languages */}
        <div id="download-quran">
          <QuranDownloadHub />
        </div>

        {/* Essential Quran Statistics Bar */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Core Quranic Structure & Statistical Overview
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
            * <strong>How many pages in Quran:</strong> The standard King Fahd Complex Madani Mushaf consists of 604 pages. <strong>Shortest surah in Quran:</strong> Surah Al-Kawthar (Chapter 108) consists of 3 verses, 10 words, and 42 letters, making it the most concise surah in the Divine text.
          </p>
        </section>

        {/* Master 30 Para Index Table */}
        <section id="juz-index" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
              <BookMarked className="w-3.5 h-3.5" />
              Complete Sacred Division
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Quran Sharif Para 1 to 30 Master Index
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
              The 30 equal divisions of the Holy Quran (<span className="font-semibold text-slate-800 dark:text-slate-200">quran para 1 to 30</span>) allow believers to recite the entire revelation systematically within a single month.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-brand-900 text-white uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-3 rounded-tl-xl font-bold w-16 text-center">Para</th>
                  <th className="py-3 px-3 font-bold">Arabic Opening</th>
                  <th className="py-3 px-3 font-bold">Transliteration</th>
                  <th className="py-3 px-3 font-bold">Surah & Verse Span</th>
                  <th className="py-3 px-4 font-bold rounded-tr-xl">Central Themes & Highlights</th>
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
            Special Thematic Breakdown of Key Quran Paras
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
                Quran Para 8: Creation, Prophetic Missions & Dietary Laws
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                In <strong>quran para 8</strong>, the Quran presents extensive rational proofs of Divine unity in cosmic creation. It details lawful (Halal) and unlawful meat, delineates the ten moral commandments of Islam, and recounts the primordial dialogue between Allah and Iblis (Satan) at the creation of Adam. It proceeds into the harrowing histories of the peoples of Prophet Hud, Salih, Lut, and Shu&rsquo;ayb.
              </p>
            </div>

            {/* Para 29 & 30 */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300">
                Juz 29 & 30: Tabarakallazi & Amma
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Quran Para 29 & Quran Para 30 (Juz Amma)
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                <strong>Quran para 29</strong> opens with Surah Al-Mulk, protecting reciters from the torment of the grave. <strong>Quran para 30</strong> (Juz Amma) contains 37 short, rhythmically powerful Makki surahs memorized by Muslims worldwide and recited in the daily Fard and Sunnah rakats of Salah, ending with the twin protective surahs Al-Falaq and An-Nas.
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
              The 14 Sajdah Tilawat in the Holy Quran
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
                  <th className="py-3 px-4 font-bold rounded-tr-xl">Spiritual Context & Sign</th>
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
              When reciting or listening to any of the 14 verses above, it is Wajib (in the Hanafi school) or Sunnah Mu’akkadah (in the Shafi’i, Maliki, and Hanbali schools) to perform prostration. While in a state of Wudu facing the Qibla, stand up and say <em>&ldquo;Allahu Akbar&rdquo;</em> (without raising your hands to the ears), prostrate directly onto the ground, recite <em>&ldquo;Subhana Rabbiyal A’la&rdquo;</em> three times, and then say <em>&ldquo;Allahu Akbar&rdquo;</em> to rise back up. No Tashahhud or Salam is required.
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
              Upon finishing the recitation of the 30th Para of the Holy Quran, the believer offers <span className="font-semibold text-slate-900 dark:text-slate-100">dua khatam quran</span>. Anas ibn Malik (may Allah be pleased with him) used to gather his family upon completing the Quran to make heartfelt supplications together.
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
              Modern Quranic Learning, Reflection & Global Education
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
                <strong>Tagging al quran</strong> is a structured method of color-coded indexing and thematic sticky-note journaling. Verses are classified under categories like <em>Du’a, Sabr, Tawakkul, Gratitude, and Akhirah</em>, fostering personal Tadabbur.
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
        <FAQAccordion items={quranFaqs} title="Frequently Asked Questions on the Holy Quran" />
      </div>
    </div>
  );
}
