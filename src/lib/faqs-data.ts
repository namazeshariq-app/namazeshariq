export interface FAQItem {
  id: string;
  category: 'quran' | 'namaz' | 'faraiz' | 'special' | 'timings' | 'downloads';
  categoryLabel: string;
  question: string;
  answer: string;
  link?: {
    text: string;
    href: string;
  };
  keywords: string[];
}

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'quran', label: 'Holy Quran & Paras (1-30)' },
  { id: 'namaz', label: 'Daily Namaz Rakats' },
  { id: 'faraiz', label: 'Namaz Ke Faraiz & Modesty' },
  { id: 'special', label: 'Special Prayers & Nawafil' },
  { id: 'timings', label: 'City Prayer Timings' },
  { id: 'downloads', label: 'PDF Downloads & Guides' },
] as const;

export const MASTER_FAQS: FAQItem[] = [
  // --- HOLY QURAN & PARAS ---
  {
    id: 'first-sajdah',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'Where is the first sajdah in quran located and what is its ruling?',
    answer:
      'The first sajdah in quran occurs in Surah Al-A’raf (Chapter 7, Verse 206) in Para 9. When reciting or listening to this verse, performing Sajdah Tilawat is Wajib in the Hanafi school and Sunnah Mu’akkadah in the Shafi’i, Maliki, and Hanbali schools.',
    link: { text: 'View 14 Sajdah Tilawat Guide', href: '/quran#sajdah-guide' },
    keywords: ['first sajdah in quran', 'sajdah tilawat', 'para 9'],
  },
  {
    id: 'how-many-sajdah',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'How many sajdah in quran are agreed upon by Islamic scholars?',
    answer:
      'There are exactly 14 agreed-upon Sajdah Tilawat verses (how many sajdah in quran) in the Holy Quran according to the Hanafi, Shafi’i, and Hanbali schools of thought, distributed systematically across Paras 9, 13, 14, 15, 16, 17, 19, 21, 23, 24, 27, and 30.',
    link: { text: 'Browse 14 Sajdah Verses Table', href: '/quran#sajdah-guide' },
    keywords: ['how many sajdah in quran', '14 sajdah tilawat'],
  },
  {
    id: 'how-many-pages',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'How many pages in quran are there in standard prints?',
    answer:
      'In the standard King Fahd Complex 15 line Quran PDF Madani script, there are exactly 604 pages (how many pages in quran). In South Asian 16-line prints there are 548 pages, and 13-line prints span 848 pages.',
    link: { text: 'Download 15 Line Quran PDF (604 Pages)', href: '/quran#15-line-guide' },
    keywords: ['how many pages in quran', '604 pages', '15 line quran pdf'],
  },
  {
    id: 'shortest-surah',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'What is the shortest surah in quran (small surah in quran)?',
    answer:
      'The shortest surah in quran (and most concise small surah in quran) is Surah Al-Kawthar (Chapter 108). It consists of only 3 verses (ayat), 10 Arabic words, and 42 letters, revealed to comfort Prophet Muhammad ﷺ with the promise of divine abundance.',
    link: { text: 'Read Quran Structure Breakdown', href: '/quran' },
    keywords: ['shortest surah in quran', 'small surah in quran', 'surah al-kawthar'],
  },
  {
    id: 'quran-para-1-to-30',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'How is the Holy Quran structured across quran para 1 to 30?',
    answer:
      'The complete quran sharif para 1 to 30 divides the 114 Surahs into 30 equal portions (quran para 1 to 30), enabling believers to recite the entire revelation systematically within one month. Each Para consists of roughly 20 pages in standard Mushafs.',
    link: { text: 'Browse Quran Para 1 to 30 Master Index', href: '/quran#juz-index' },
    keywords: ['quran para 1 to 30', 'quran sharif para 1 to 30', '30 juz index'],
  },
  {
    id: 'quran-para-2',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'What central themes are discussed in quran para 2 (2nd para of quran / second para of quran)?',
    answer:
      'In quran para 2 (Sayaqool, also known as the 2nd para of quran or second para of quran), the Holy Quran covers the decree changing the Qibla orientation to Makkah, the obligation of fasting in Ramadan (Al-Baqarah 2:183-187), Hajj rites, and the victory of Talut over Jalut.',
    link: { text: 'Explore Para 2 Details', href: '/quran#juz-index' },
    keywords: ['quran para 2', '2nd para of quran', 'second para of quran', 'sayaqool'],
  },
  {
    id: 'quran-para-3',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'What key verses are found in the 3rd para of quran (third para of quran)?',
    answer:
      'The 3rd para of quran (Tilkal Rusul, or third para of quran) features the greatest verse of the Quran: Ayat al-Kursi (Al-Baqarah 2:255). It also details the absolute prohibition of Riba (interest), the longest verse regarding debt contracts (Ayat ad-Dayn, 2:282), and the miraculous birth of Maryam.',
    link: { text: 'Explore Para 3 Details', href: '/quran#juz-index' },
    keywords: ['3rd para of quran', 'third para of quran', 'ayat al-kursi', 'tilkal rusul'],
  },
  {
    id: 'quran-para-8',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'What prophetic narratives and dietary laws are revealed in quran para 8?',
    answer:
      'In quran para 8 (Wa Lau Annana), the Quran highlights rational proofs of divine unity, defines lawful (Halal) food vs unlawful meat, recounts the dialogue between Allah and Iblis at the creation of Adam, and covers the stories of Prophets Hud, Salih, Lut, and Shu’ayb.',
    link: { text: 'Explore Para 8 Details', href: '/quran#juz-index' },
    keywords: ['quran para 8', 'wa lau annana', 'halal diet'],
  },
  {
    id: 'quran-para-29',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'What surahs and protections are contained in quran para 29?',
    answer:
      'Quran para 29 (Tabarakallazi) opens with Surah Al-Mulk, known for protecting reciters from the torment of the grave. It contains 11 short, powerful Makki surahs including Surah Al-Qalam, Al-Haqqah, Al-Ma’arij, Nuh, Al-Jinn, Al-Muzzammil, and Al-Qiyamah.',
    link: { text: 'Explore Para 29 Details', href: '/quran#juz-index' },
    keywords: ['quran para 29', 'tabarakallazi', 'surah al-mulk'],
  },
  {
    id: 'quran-para-30',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'Why is quran para 30 (Juz Amma) recited so frequently in daily prayer?',
    answer:
      'Quran para 30 contains 37 short, rhythmically eloquent Makki surahs from Surah An-Naba to Surah An-Nas. Because of their brevity and memorability, verses from quran para 30 are recited daily in the Fard and Sunnah rakats of Salah worldwide.',
    link: { text: 'Download Quran Para 30 PDF', href: '/downloads/quran-para-30-juz-amma.pdf' },
    keywords: ['quran para 30', 'juz amma', 'short surahs'],
  },
  {
    id: 'dua-khatam-quran',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'What is dua khatam quran and when should it be recited?',
    answer:
      'Dua khatam quran is the traditional supplication offered upon completing the recitation of all 30 Paras of the Holy Quran. Classical scholars note that supplications made after Khatam al-Quran are granted special divine mercy and acceptance.',
    link: { text: 'Read Arabic Text & Translation of Dua Khatam Quran', href: '/quran' },
    keywords: ['dua khatam quran', 'khatm quran dua'],
  },
  {
    id: 'tagging-al-quran',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'What is tagging al quran and how does it assist personal reflection?',
    answer:
      'Tagging al quran is a structured study method using color-coded tabs and sticky notes to index verses under spiritual themes like Dua, Sabr, Tawakkul, Gratitude, and Family Ethics. It fosters active Tadabbur during daily Quran reading.',
    link: { text: 'Learn Quran Tadabbur Methods', href: '/quran' },
    keywords: ['tagging al quran', 'quran study', 'tadabbur'],
  },
  {
    id: 'tafheem-shikkha-elearning',
    category: 'quran',
    categoryLabel: 'Holy Quran & Paras',
    question: 'How do tafhimul quran bangla, quran shikkha, and elearning quran help students?',
    answer:
      'Tafhimul quran bangla provides Bengali speakers with Sayyid Abul A’la Maududi’s commentary; structured quran shikkha programs teach Noorani Qaida phonetics and Tajweed to beginners; and modern elearning quran academies offer 1-on-1 virtual tutoring with certified scholars worldwide.',
    link: { text: 'Download Bangla Quran PDF', href: '/quran#download-quran' },
    keywords: ['tafhimul quran bangla', 'quran shikkha', 'elearning quran'],
  },

  // --- DAILY NAMAZ RAKATS & FIQH ---
  {
    id: 'namaz-rakat-table',
    category: 'namaz',
    categoryLabel: 'Daily Namaz Rakats',
    question: 'What is the complete namaz rakat table for all 5 daily prayers?',
    answer:
      'Our official namaz rakat table outlines the full daily routine totaling 48 rakat namaz: Fajr (4), Dhuhr (12), Asr (8), Maghrib (7), and Isha (17). The core obligatory requirement for every Muslim is 17 Fard rakats plus 3 Witr.',
    link: { text: 'View Full Interactive Namaz Rakat Table', href: '/rakats#rakat-table' },
    keywords: ['namaz rakat table', 'rakat namaz', 'daily prayer rakats'],
  },
  {
    id: 'namaz-ki-rakat',
    category: 'namaz',
    categoryLabel: 'Daily Namaz Rakats',
    question: 'How many total namaz ki rakat (rakat in namaz) are obligatory (Fard) each day?',
    answer:
      'Out of all rakat in namaz, exactly 17 are Fard (obligatory): 2 in Fajr, 4 in Dhuhr, 4 in Asr, 3 in Maghrib, and 4 in Isha. Missing any obligatory namaz ki rakat without a valid Islamic excuse is a major sin.',
    link: { text: 'Check Fard vs Sunnah Breakdown', href: '/rakats' },
    keywords: ['namaz ki rakat', 'rakat in namaz', '17 fard rakats'],
  },
  {
    id: 'zuhar-namaz-rakat',
    category: 'namaz',
    categoryLabel: 'Daily Namaz Rakats',
    question: 'What is the exact breakdown for zuhar namaz rakat?',
    answer:
      'Zuhar namaz rakat consists of 12 rakats in total: 4 Sunnah Mu’akkadah before Fard, 4 Fard, 2 Sunnah Mu’akkadah after Fard, and 2 optional Nafl. Prophet Muhammad ﷺ emphasized never missing the four Sunnah before Zuhar.',
    link: { text: 'Read Zuhar Namaz Rakat Guide', href: '/rakats#zuhar-rakat-guide' },
    keywords: ['zuhar namaz rakat', '12 rakats dhuhr'],
  },
  {
    id: 'jummah-prayer-rakats',
    category: 'namaz',
    categoryLabel: 'Daily Namaz Rakats',
    question: 'How many jummah prayer rakats are performed on Friday (Friday Namaz)?',
    answer:
      'In the Hanafi school, jummah prayer rakats total 14: 4 Sunnah Mu’akkadah before the Khutbah and Fard, 2 Fard performed in congregation behind the Imam, followed by 4 Sunnah Mu’akkadah, 2 Sunnah, and 2 Nafl. In the Shafi’i and Hanbali schools, jummah prayer rakats consist of 2 Sunnah before, 2 Fard with the Imam, and 2 or 4 Sunnah after (totaling 6 or 8 rakats). The core individual obligation for every Muslim male is the 2 Fard rakats.',
    link: { text: 'Read Full Jummah Prayer Rakats Guide', href: '/rakats#jummah-prayer-rakats' },
    keywords: ['jummah prayer rakats', 'friday namaz rakats', 'jummah rakat table'],
  },
  {
    id: 'asr-namaz-rakat',
    category: 'namaz',
    categoryLabel: 'Daily Namaz Rakats',
    question: 'What is the structure of asr namaz rakat and its Sunnah status?',
    answer:
      'Asr namaz rakat consists of 8 rakats in total: 4 Sunnah Ghayr Mu’akkadah followed by 4 Fard. Offering the 4 Sunnah of Asr brings immense reward as the Prophet ﷺ prayed for Allah’s mercy upon whoever performs them.',
    link: { text: 'Explore Asr Rakat Details', href: '/rakats' },
    keywords: ['asr namaz rakat', '8 rakats asr'],
  },
  {
    id: 'namaz-with-urdu-translation',
    category: 'namaz',
    categoryLabel: 'Daily Namaz Rakats',
    question: 'Why is learning namaz with urdu translation recommended for Khushu?',
    answer:
      'Reciting namaz with urdu translation allows Urdu-speaking worshippers to comprehend word-by-word recitations like Sana, Tashahhud (At-Tahiyyat), Durood Ibrahim, and Dua Masoora, creating heartfelt mindfulness during prayer.',
    link: { text: 'Read Namaz with Urdu Translation Guide', href: '/rakats' },
    keywords: ['namaz with urdu translation', 'khushu', 'tashahhud urdu'],
  },

  // --- NAMAZ KE FARAIZ & MODESTY ---
  {
    id: 'namaz-ke-faraiz',
    category: 'faraiz',
    categoryLabel: 'Namaz Ke Faraiz & Modesty',
    question: 'What are namaz ke faraiz (the 13 essential obligatory conditions of prayer)?',
    answer:
      'In classical Fiqh, namaz ke faraiz are 13 mandatory pillars: 6 pre-conditions before prayer (Taharah, Satr-e-Awrah, Istiqbal-e-Qibla, Waqt, Niyyah, Takbeer-e-Tahrimah) and 7 internal pillars (Qiyam, Qira’at, Ruku, Sujood, Qa’dah Akhirah, Khurooj bi-San’ihi, and Tuma’ninah). Omitting any single Fard invalidates prayer.',
    link: { text: 'Read Full Namaz Ke Faraiz Guide', href: '/rakats#namaz-ke-faraiz' },
    keywords: ['namaz ke faraiz', '13 faraiz of namaz', 'shuroot wa arkan'],
  },
  {
    id: 'namaz-chadar',
    category: 'faraiz',
    categoryLabel: 'Namaz Ke Faraiz & Modesty',
    question: 'What are the rules regarding namaz chadar for women during prayer?',
    answer:
      'A namaz chadar is the full-body prayer garment worn by Muslim women to satisfy Satr-e-Awrah in namaz ke faraiz. It must be opaque (non-see-through) and loose enough to drape without outlining the body, covering hair, neck, and arms down to wrists throughout all prayer movements.',
    link: { text: 'Check Namaz Chadar Attire Guide', href: '/rakats#namaz-chadar-guide' },
    keywords: ['namaz chadar', 'women prayer dress', 'satr-e-awrah'],
  },

  // --- SPECIAL PRAYERS & NAWAFIL ---
  {
    id: 'namaz-janaza-dua',
    category: 'special',
    categoryLabel: 'Special Prayers & Nawafil',
    question: 'How is namaz janaza performed and what is the authentic janaza namaz dua?',
    answer:
      'Namaz janaza is a communal obligation (Fard Kifayah) offered entirely standing with 4 Takbeers (no Ruku or Sujood). After the 3rd Takbeer, recite the authentic janaza namaz dua ("Allahumma ighfir li hayyina wa mayyitina wa shahidina wa gha’ibina...").',
    link: { text: 'Read Full Namaz Janaza Step-by-Step Guide', href: '/rakats#namaz-janaza-guide' },
    keywords: ['namaz janaza', 'janaza namaz dua', 'funeral prayer'],
  },
  {
    id: 'shabe-baraat-namaz',
    category: 'special',
    categoryLabel: 'Special Prayers & Nawafil',
    question: 'How is shabe baraat namaz performed and what is shab e barat ki namaz ki niyat?',
    answer:
      'Shabe baraat namaz is offered on the 15th night of Sha’ban in sets of 2 Nafl rakats. The intention is made with shab e barat ki namaz ki niyat: "Niyat karta hoon main 2 rakat nafl namaz shab-e-barat, wasta Allah ta’ala ke, rukh mera Ka’ba shareef ki taraf, Allahu Akbar".',
    link: { text: 'View Shabe Baraat Namaz Guide', href: '/rakats#shabe-baraat-guide' },
    keywords: ['shabe baraat namaz', 'shab e barat ki namaz ki niyat', '15 shaban'],
  },
  {
    id: 'tasbeeh-namaz',
    category: 'special',
    categoryLabel: 'Special Prayers & Nawafil',
    question: 'How is tasbeeh namaz (Salat al-Tasbeeh) performed?',
    answer:
      'Tasbeeh namaz is a 4-rakat prayer with 300 repetitions of the 3rd Kalimah ("Subhanallahi wal-hamdulillahi wa la ilaha illallahu wallahu akbar"): 75 times in each rakat distributed across standing, bowing, standing after bowing, prostrations, and sittings.',
    link: { text: 'Read Tasbeeh Namaz Manual', href: '/rakats' },
    keywords: ['tasbeeh namaz', 'salat al-tasbeeh', '300 tasbeeh'],
  },
  {
    id: 'tarabi-namaz',
    category: 'special',
    categoryLabel: 'Special Prayers & Nawafil',
    question: 'How many rakats are in tarabi namaz and when is it offered?',
    answer:
      'Tarabi namaz (Salat al-Tarawih) consists of 20 rakats offered in pairs of two every night during Ramadan immediately following the Isha Fard and Sunnah, as established by Sayyiduna Umar (RA) and unanimous scholarly consensus.',
    link: { text: 'Read Tarabi Namaz Rules', href: '/rakats' },
    keywords: ['tarabi namaz', 'salat al-tarawih', '20 rakats ramadan'],
  },
  {
    id: 'beter-namaz',
    category: 'special',
    categoryLabel: 'Special Prayers & Nawafil',
    question: 'What is beter namaz porar niyom (rules for Witr prayer in Bengali tradition)?',
    answer:
      'According to beter namaz porar niyom in the Hanafi school, Witr consists of 3 continuous rakats. In the 3rd rakat, after Surah Al-Fatiha and a surah, raise hands saying Allahu Akbar, fold hands again, and recite Dua-e-Qunoot before bowing into Ruku.',
    link: { text: 'Read Witr Prayer Rules', href: '/rakats' },
    keywords: ['beter namaz porar niyom', 'witr prayer', 'dua qunoot'],
  },
  {
    id: 'namaz-e-ghufayla',
    category: 'special',
    categoryLabel: 'Special Prayers & Nawafil',
    question: 'What is namaz e ghufayla and when is it recited?',
    answer:
      'Namaz e ghufayla is a 2-rakat voluntary prayer recommended in Ja’fari tradition offered between Maghrib and Isha. In the 1st rakat, Surah Al-Anbiya (21:87-88) is recited; in the 2nd rakat, Surah Al-An’am (6:59) is recited, followed by Qunoot.',
    link: { text: 'Read Namaz e Ghufayla Instructions', href: '/rakats' },
    keywords: ['namaz e ghufayla', 'jafari prayers'],
  },

  // --- CITY PRAYER TIMINGS ---
  {
    id: 'prayer-time-kozhikode',
    category: 'timings',
    categoryLabel: 'City Prayer Timings',
    question: 'How is today prayer time kozhikode (namaz time calicut) calculated for Malabar masajid?',
    answer:
      'Today prayer time kozhikode (namaz time calicut, Kerala) follows coastal Malabar astronomical solar coordinates (11.25° N, 75.78° E). Masajid under Samastha Kerala Jam’iyyathul Ulama observe the Shafi’i 1x shadow factor for Asr. Both Shafi’i and Hanafi Asr options are provided on our prayer time kozhikode and namaz time calicut page.',
    link: { text: 'Check Today Prayer Time Kozhikode Timetable', href: '/prayer-times/calicut' },
    keywords: ['prayer time kozhikode', 'namaz time calicut', 'kozhikode prayer times', 'kerala namaz timing'],
  },
  {
    id: 'prayer-time-perinthalmanna',
    category: 'timings',
    categoryLabel: 'City Prayer Timings',
    question: 'What is today prayer time perinthalmanna for all 5 daily prayers in Malappuram?',
    answer:
      'Today prayer time perinthalmanna follows coordinates 10.9760° N, 76.2254° E for Malappuram district masajid. Fajr starts at Subh Sadiq dawn, Dhuhr enters after solar zenith, Asr follows the Shafi’i 1x shadow standard, Maghrib begins at sunset, and Isha follows dusk twilight disappearance. Access live prayer time perinthalmanna on our dedicated city portal.',
    link: { text: 'Check Today Prayer Time Perinthalmanna Schedule', href: '/prayer-times/perinthalmanna' },
    keywords: ['prayer time perinthalmanna', 'perinthalmanna prayer times', 'malappuram namaz timings'],
  },
  {
    id: 'prayer-time-ras-al-khaimah',
    category: 'timings',
    categoryLabel: 'City Prayer Timings',
    question: 'What is the official prayer time ras al khaimah today according to UAE AWQAF?',
    answer:
      'Official prayer time ras al khaimah (RAK, UAE) is calculated according to the General Authority of Islamic Affairs and Endowments (AWQAF UAE) standards (25.79° N, 55.94° E). Because of its north-eastern position backed by the Hajar Mountains, prayer time ras al khaimah occurs 2 to 4 minutes earlier than Dubai and Abu Dhabi for sunrise and Maghrib sunset.',
    link: { text: 'Check Official Prayer Time Ras Al Khaimah Timetable', href: '/prayer-times/ras-al-khaimah' },
    keywords: ['prayer time ras al khaimah', 'rak prayer times', 'uae awqaf prayer schedule'],
  },
  {
    id: 'namaz-time-delhi-hanafi',
    category: 'timings',
    categoryLabel: 'City Prayer Timings',
    question: 'What calculation criteria defines namaz time in delhi hanafi (namaz time delhi today)?',
    answer:
      'Official namaz time in delhi hanafi uses the 18° astronomical twilight standard and the 2x shadow factor for Asr, aligned with Jamia Masjid, Nizamuddin, and Deoband/Karachi standards. For live namaz time delhi today, consult our Delhi prayer timetable.',
    link: { text: 'Check Namaz Time in Delhi Hanafi Today', href: '/prayer-times/delhi' },
    keywords: ['namaz time in delhi hanafi', 'namaz time delhi today', 'delhi prayer times'],
  },
  {
    id: 'shia-namaz-timing-karachi',
    category: 'timings',
    categoryLabel: 'City Prayer Timings',
    question: 'How does shia namaz timing karachi differ from Sunni prayer times?',
    answer:
      'Shia namaz timing karachi (observed at Shia masajid such as Mehfil-e-Murtaza and Khoja Jama Masjid) adds a 10 to 15-minute sunset twilight buffer for Maghrib once eastern redness clears, and allows combining Dhuhr with Asr and Maghrib with Isha.',
    link: { text: 'Check Shia Namaz Timing Karachi & Sunni Timetables', href: '/prayer-times/karachi' },
    keywords: ['shia namaz timing karachi', 'karachi prayer times'],
  },
  {
    id: 'shia-namaz-time-dubai',
    category: 'timings',
    categoryLabel: 'City Prayer Timings',
    question: 'What are the rules for shia namaz time in dubai?',
    answer:
      'Shia namaz time in dubai (Ja’fari Fiqh, observed at centres like Imam Husain Mosque in Al Wasl) observes Maghrib roughly 10-15 minutes after standard sunset and recognizes joint prayer intervals.',
    link: { text: 'Check Dubai Prayer Times', href: '/prayer-times/dubai' },
    keywords: ['shia namaz time in dubai', 'dubai prayer times'],
  },
  {
    id: 'tahajjud-namaz-time-dhaka',
    category: 'timings',
    categoryLabel: 'City Prayer Timings',
    question: 'What is the best tahajjud namaz time dhaka today?',
    answer:
      'Tahajjud namaz time dhaka extends from the completion of Isha until morning twilight (Subh Sadiq Sehri cutoff). The most virtuous time is the final third of the night, typically commencing between 2:45 AM and 3:30 AM in Dhaka.',
    link: { text: 'Check Dhaka Prayer Timetable', href: '/prayer-times/dhaka' },
    keywords: ['tahajjud namaz time dhaka', 'dhaka prayer times'],
  },

  // --- PDF DOWNLOADS & STUDY GUIDES ---
  {
    id: 'quran-sharif-pdf-download',
    category: 'downloads',
    categoryLabel: 'PDF Downloads & Guides',
    question: 'Where can I download the complete quran sharif pdf (quran sharif para 1 to 30 pdf)?',
    answer:
      'You can download the full quran sharif pdf covering quran sharif para 1 to 30 pdf directly on Namaz-e-Shariq for free. It includes high-definition scans, all 30 Paras with Ruku marks, Sajdah indicators, and Dua Khatam Quran.',
    link: { text: 'Download Full Quran Sharif Para 1 to 30 PDF', href: '/quran#download-quran' },
    keywords: ['quran sharif pdf', 'quran sharif para 1 to 30 pdf', 'free quran download'],
  },
  {
    id: '15-line-quran-pdf-download',
    category: 'downloads',
    categoryLabel: 'PDF Downloads & Guides',
    question: 'What is the 15 line quran pdf and why is it preferred for Hifz?',
    answer:
      'The 15 line quran pdf follows the standard Saudi King Fahd Madani script spanning 604 pages. It is preferred for Hifz memorization because every page begins and ends on a complete verse (Ayat-e-Khatam), creating an unambiguous visual memory anchor.',
    link: { text: 'Download 15 Line Quran PDF', href: '/quran#15-line-guide' },
    keywords: ['15 line quran pdf', 'hifz quran pdf', 'madani mushaf'],
  },
  {
    id: 'dua-after-namaz-pdf-download',
    category: 'downloads',
    categoryLabel: 'PDF Downloads & Guides',
    question: 'What authentic supplications are in the dua after namaz pdf?',
    answer:
      'Our verified dua after namaz pdf features authentic post-Salah Adhkar from Sahih al-Bukhari and Muslim: 3x Istighfar, Allahumma Antas-Salam, Ayat al-Kursi, Tasbeeh Fatimi, and protection prayers in Arabic with English translation.',
    link: { text: 'Download Dua After Namaz PDF (Free)', href: '/downloads/dua-after-namaz-and-masnoon-adhkar.pdf' },
    keywords: ['dua after namaz pdf', 'masnoon adhkar pdf', 'post prayer duas'],
  },
  {
    id: 'bangla-quran-pdf-download',
    category: 'downloads',
    categoryLabel: 'PDF Downloads & Guides',
    question: 'Can I download the bangla quran pdf with Bengali translation and commentary?',
    answer:
      'Yes. Namaz-e-Shariq provides direct access to download the bangla quran pdf featuring verified Bengali translation and Tafhimul Quran commentary for study across Bangladesh, West Bengal, and global Bengali communities.',
    link: { text: 'Download Bangla Quran PDF', href: '/quran#download-quran' },
    keywords: ['bangla quran pdf', 'bangla quran download', 'tafhimul quran'],
  },
  {
    id: 'quran-para-30-pdf-download',
    category: 'downloads',
    categoryLabel: 'PDF Downloads & Guides',
    question: 'Where can I download quran para 30 pdf (Juz Amma) for daily prayer recitation?',
    answer:
      'You can download the high-resolution quran para 30 pdf on our Quran Hub, containing all 37 short Makki surahs from Surah An-Naba to Surah An-Nas, along with the two Sajdah verses.',
    link: { text: 'Download Quran Para 30 PDF (Juz Amma)', href: '/downloads/quran-para-30-juz-amma.pdf' },
    keywords: ['quran para 30 pdf', 'juz amma pdf', 'short surahs pdf'],
  },
];
