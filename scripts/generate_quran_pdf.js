// Script to generate a clean, valid PDF file for Holy Quran 30 Para Guide & Dua Khatam
const fs = require('fs');
const path = require('path');

function createSimplePDF() {
  const outputPath = path.join(__dirname, '..', 'public', 'downloads', 'holy-quran-guide-and-index.pdf');
  
  // Clean valid PDF-1.4 stream structure
  const pages = [
    {
      title: "THE HOLY QURAN (AL-QUR'AN AL-KAREEM)",
      subtitle: "Complete 30 Para (Juz) Reference, 14 Sajdah Tilawat & Dua Khatam Quran",
      lines: [
        "Published by Namaz-e-Shariq (https://namazeshariq.com)",
        "--------------------------------------------------------------------------------",
        "",
        "SECTION 1: OVERVIEW & KEY QURANIC STATISTICS",
        "Total Surahs: 114 (86 Makki, 28 Madani)",
        "Total Verses (Ayat): 6,236",
        "Total Paras (Juz): 30",
        "Total Standard Madani Mushaf Pages: 604 Pages",
        "Shortest Surah: Surah Al-Kawthar (Chapter 108) - 3 Verses, 10 Words",
        "Longest Surah: Surah Al-Baqarah (Chapter 2) - 286 Verses",
        "Total Agreed Sajdah at-Tilawah Verses: 14 Prostrations",
        "",
        "--------------------------------------------------------------------------------",
        "SECTION 2: COMPLETE 30 PARA (JUZ) MASTER INDEX",
        "Para 1:  Alif Lam Meem       - Surah Al-Fatiha 1:1 to Surah Al-Baqarah 2:141",
        "Para 2:  Sayaqool            - Surah Al-Baqarah 2:142 to 2:252 (Qibla, Fasting, Hajj)",
        "Para 3:  Tilkal Rusul        - Surah Al-Baqarah 2:253 to Ali 'Imran 3:92 (Ayat al-Kursi)",
        "Para 4:  Lan Tanaaloo        - Surah Ali 'Imran 3:93 to An-Nisa 4:23",
        "Para 5:  Wal Mohsanat        - Surah An-Nisa 4:24 to 4:147",
        "Para 6:  La Yuhibbullah      - Surah An-Nisa 4:148 to Al-Ma'idah 5:81",
        "Para 7:  Wa Iza Sami'oo      - Surah Al-Ma'idah 5:82 to Al-An'am 6:110",
        "Para 8:  Wa Lau Annana       - Surah Al-An'am 6:111 to Al-A'raf 7:87",
        "Para 9:  Qalal Mala'o        - Surah Al-A'raf 7:88 to Al-Anfal 8:40",
        "Para 10: Wa A'lamoo          - Surah Al-Anfal 8:41 to At-Tawbah 9:92",
        "Para 11: Ya'taziroona        - Surah At-Tawbah 9:93 to Hud 11:5",
        "Para 12: Wa Mamin Da'abbatin - Surah Hud 11:6 to Yusuf 12:52",
        "Para 13: Wa Ma Ubri'oo       - Surah Yusuf 12:53 to Ibrahim 14:52",
        "Para 14: Rubama              - Surah Al-Hijr 15:1 to An-Nahl 16:128",
        "Para 15: Subhanallazi        - Surah Al-Isra 17:1 to Al-Kahf 18:74",
        "Para 16: Qala Alam           - Surah Al-Kahf 18:75 to Ta-Ha 20:135",
        "Para 17: Iqtaraba Lin-Nasi   - Surah Al-Anbiya 21:1 to Al-Hajj 22:78",
        "Para 18: Qad Aflaha          - Surah Al-Mu'minun 23:1 to Al-Furqan 25:20",
        "Para 19: Wa Qalallazina      - Surah Al-Furqan 25:21 to An-Naml 27:55",
        "Para 20: Aman Khalaqa        - Surah An-Naml 27:56 to Al-Ankabut 29:45",
        "Para 21: Utlu Ma Oohiya      - Surah Al-Ankabut 29:46 to Al-Ahzab 33:30",
        "Para 22: Wa Man Yaqnut       - Surah Al-Ahzab 33:31 to Ya-Sin 36:27",
        "Para 23: Wa Mali             - Surah Ya-Sin 36:28 to Az-Zumar 39:31",
        "Para 24: Faman Azlamu        - Surah Az-Zumar 39:32 to Fussilat 41:46",
        "Para 25: Ilayhi Yuraddu      - Surah Fussilat 41:47 to Al-Jathiyah 45:37",
        "Para 26: Ha-Meem             - Surah Al-Ahqaf 46:1 to Az-Zariyat 51:30",
        "Para 27: Qala Fama Khatbukum - Surah Az-Zariyat 51:31 to Al-Hadid 57:29",
        "Para 28: Qad Sami' Allah     - Surah Al-Mujadila 58:1 to At-Tahrim 66:12",
        "Para 29: Tabarakallazi       - Surah Al-Mulk 67:1 to Al-Mursalat 77:50",
        "Para 30: Amma Yatasa'aloon   - Surah An-Naba 78:1 to An-Nas 114:6"
      ]
    },
    {
      title: "14 SAJDAH TILAWAT & DUA KHATAM QURAN",
      subtitle: "Authentic Rulings, Locations & Concluding Supplication",
      lines: [
        "--------------------------------------------------------------------------------",
        "THE 14 SAJDAH TILAWAT LOCATIONS IN THE HOLY QURAN",
        "1.  First Sajdah: Surah Al-A'raf (7:206) - Para 9",
        "2.  Surah Ar-Ra'd (13:15) - Para 13",
        "3.  Surah An-Nahl (16:50) - Para 14",
        "4.  Surah Al-Isra (17:109) - Para 15",
        "5.  Surah Maryam (19:58) - Para 16",
        "6.  Surah Al-Hajj (22:18) - Para 17",
        "7.  Surah Al-Furqan (25:60) - Para 19",
        "8.  Surah An-Naml (27:26) - Para 19",
        "9.  Surah As-Sajdah (32:15) - Para 21",
        "10. Surah Sad (38:24) - Para 23 (Hanafi Wajib / Shafi'i Sajdah Shukr)",
        "11. Surah Fussilat (41:38) - Para 24",
        "12. Surah An-Najm (53:62) - Para 27",
        "13. Surah Al-Inshiqaq (84:21) - Para 30",
        "14. Surah Al-Alaq (96:19) - Para 30",
        "",
        "Method of Sajdah Tilawat: Stand facing Qibla, recite 'Allahu Akbar' without raising hands,",
        "prostrate saying 'Subhana Rabbiyal A'la' (3 times), recite 'Allahu Akbar' to rise. No salam.",
        "",
        "--------------------------------------------------------------------------------",
        "DUA KHATAM QURAN (SUPPLICATION UPON COMPLETION)",
        "",
        "Transliteration:",
        "'Allahumma irhamna bil-Qur'an, waj'alhu lana imaman wa nuran wa hudan wa rahmah.",
        "Allahumma dhakkirna minhu ma nussina, wa 'allimna minhu ma jahilna,",
        "warzuqna tilawatahu ana'a al-layli wa atraf an-nahar,",
        "waj'alhu lana hujjatan ya Rabbal 'Alameen.'",
        "",
        "English Translation:",
        "'O Allah, have mercy upon us through the Holy Quran, and make it for us a leader,",
        "a light, a guidance, and a mercy. O Allah, remind us from it what we have forgotten,",
        "teach us from it that which we do not know, and grant us its recitation throughout",
        "the hours of the night and at the ends of the day, and make it an argument in our",
        "favor, O Lord of the Worlds.'",
        "",
        "--------------------------------------------------------------------------------",
        "DIGITAL LEARNING & STUDY RESOURCES",
        "* Tagging Al Quran: Method of reflective Quranic journaling, indexing themes & tadabbur.",
        "* Tafhimul Quran Bangla: Bengali translation & comprehensive commentary by Maududi.",
        "* Quran Shikkha: Phonics-based Noorani Qaida Tajweed for beginners & children.",
        "* eLearning Quran: Modern digital academies, one-on-one virtual Tajweed tutors.",
        "",
        "Download more resources and check real-time prayer times at https://namazeshariq.com"
      ]
    }
  ];

  // Helper to escape text for PDF literal strings
  const esc = (str) => str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

  // Build PDF objects
  const objects = [];
  let objCount = 0;
  const newObj = (content) => {
    objCount++;
    objects.push({ id: objCount, content });
    return objCount;
  };

  const fontObj = newObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`);
  const fontBoldObj = newObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`);

  const pageObjectIds = [];

  for (const page of pages) {
    let stream = "BT\n";
    // Title
    stream += `/F2 16 Tf\n40 750 Td\n(${esc(page.title)}) Tj\n`;
    // Subtitle
    stream += `/F1 10 Tf\n0 -18 Td\n(${esc(page.subtitle)}) Tj\n`;
    // Lines
    stream += `/F1 9 Tf\n0 -22 Td\n`;
    let currentY = 710;
    for (let i = 0; i < page.lines.length; i++) {
      const line = page.lines[i];
      if (line.startsWith("SECTION") || line.startsWith("THE 14") || line.startsWith("DUA KHATAM") || line.startsWith("DIGITAL LEARNING")) {
        stream += `/F2 9.5 Tf\n0 -14 Td\n(${esc(line)}) Tj\n/F1 8.5 Tf\n`;
      } else {
        stream += `0 -12 Td\n(${esc(line)}) Tj\n`;
      }
    }
    stream += "ET\n";

    const streamLength = Buffer.byteLength(stream, 'utf-8');
    const contentObj = newObj(`<< /Length ${streamLength} >>\nstream\n${stream}\nendstream`);
    
    // Page obj (placeholder, created next)
    const pageObjId = ++objCount;
    pageObjectIds.push(pageObjId);
    objects.push({
      id: pageObjId,
      content: `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents ${contentObj} 0 R /Resources << /Font << /F1 ${fontObj} 0 R /F2 ${fontBoldObj} 0 R >> >> >>`
    });
  }

  // Insert Pages Catalog at id 2
  const pagesObj = `<< /Type /Pages /Kids [${pageObjectIds.map(id => `${id} 0 R`).join(' ')}] /Count ${pageObjectIds.length} >>`;
  objects.unshift({ id: 2, content: pagesObj });
  
  // Catalog at id 1
  const catalogObj = `<< /Type /Catalog /Pages 2 0 R >>`;
  objects.unshift({ id: 1, content: catalogObj });

  // Sort objects by ID
  objects.sort((a, b) => a.id - b.id);

  // Generate binary output
  let pdf = "%PDF-1.4\n";
  const xref = [0];
  let offset = Buffer.byteLength(pdf, 'utf-8');

  for (const obj of objects) {
    xref.push(offset);
    const objStr = `${obj.id} 0 obj\n${obj.content}\nendobj\n`;
    pdf += objStr;
    offset += Buffer.byteLength(objStr, 'utf-8');
  }

  const xrefOffset = offset;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${xref[i].toString().padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  fs.writeFileSync(outputPath, pdf, 'utf-8');
  console.log(`Generated PDF at ${outputPath} (${pdf.length} bytes)`);
}

createSimplePDF();
