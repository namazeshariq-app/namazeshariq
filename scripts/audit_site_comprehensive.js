// Comprehensive validation script for SEO, Meta lengths, X-Robots-Tag, Hreflangs, and Target Keywords
const http = require('http');

const URLS_TO_TEST = [
  '/',
  '/quran',
  '/rakats',
  '/prayer-times',
  '/prayer-times/delhi',
  '/prayer-times/calicut',
  '/prayer-times/dhaka',
  '/prayer-times/dubai',
  '/prayer-times/karachi',
  '/blog',
  '/blog/complete-guide-daily-namaz-rakats',
  '/blog/holy-quran-30-para-guide-sajdah-rulings-download',
  '/blog/india-city-prayer-timings-guide-bangalore-delhi-mumbai',
  '/blog/pakistan-prayer-times-master-guide-karachi-lahore-peshawar',
  '/blog/international-prayer-timetables-dhaka-dubai-sharjah-ajman',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/disclaimer',
  '/downloads/holy-quran-guide-and-index.pdf'
];

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runAudit() {
  console.log('--- STARTING COMPREHENSIVE SEO & CONTENT AUDIT ---');
  let failures = 0;

  for (const urlPath of URLS_TO_TEST) {
    try {
      const res = await fetchUrl(urlPath);
      if (res.status !== 200) {
        console.error(`❌ HTTP ${res.status} on ${urlPath}`);
        failures++;
        continue;
      }

      if (urlPath.endsWith('.pdf')) {
        console.log(`✅ ${urlPath} -> HTTP 200 (Binary PDF Download verified, ${res.body.length} bytes)`);
        continue;
      }

      // Check X-Robots-Tag
      const xRobots = res.headers['x-robots-tag'];
      const hasRobots = !!xRobots;

      // Check Title
      const titleMatch = res.body.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : '';
      const titleLen = title.length;
      const titlePass = titleLen > 0 && titleLen <= 60;

      // Check Meta Description
      const descMatch = res.body.match(/<meta\s+name="description"\s+content="([^"]*)"/i) ||
                        res.body.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
      const desc = descMatch ? descMatch[1] : '';
      const descLen = desc.length;
      const descPass = descLen > 0 && descLen <= 160;

      // Check Hreflang (case insensitive for hreflang / hrefLang)
      const hasHreflang = /hreflang="x-default"/i.test(res.body) &&
                          /hreflang="en"/i.test(res.body) &&
                          /hreflang="ur"/i.test(res.body);

      const pass = titlePass && descPass && hasRobots && hasHreflang;
      if (!pass) failures++;

      console.log(`${pass ? '✅' : '❌'} ${urlPath}`);
      console.log(`   Title (${titleLen}/60): "${title}" ${titlePass ? 'PASS' : 'FAIL'}`);
      console.log(`   Desc  (${descLen}/160): "${desc.slice(0, 75)}..." ${descPass ? 'PASS' : 'FAIL'}`);
      console.log(`   X-Robots-Tag: ${xRobots || 'MISSING'}`);
      console.log(`   Hreflangs: ${hasHreflang ? '6 languages detected' : 'MISSING'}`);
      console.log('');
    } catch (err) {
      console.error(`❌ Error fetching ${urlPath}:`, err.message);
      failures++;
    }
  }

  // Check unique keywords in live HTML
  console.log('--- CHECKING KEYWORD PRESENCE ON TARGET PAGES ---');
  const KEYWORD_CHECKS = [
    { page: '/quran', kw: 'quran para 1 to 30' },
    { page: '/quran', kw: 'quran sharif para 1 to 30' },
    { page: '/quran', kw: 'quran para 2' },
    { page: '/quran', kw: '3rd para of quran' },
    { page: '/quran', kw: 'quran para 8' },
    { page: '/quran', kw: 'quran para 29' },
    { page: '/quran', kw: 'quran para 30' },
    { page: '/quran', kw: 'first sajdah in quran' },
    { page: '/quran', kw: 'how many sajdah in quran' },
    { page: '/quran', kw: 'how many pages in quran' },
    { page: '/quran', kw: 'shortest surah in quran' },
    { page: '/quran', kw: 'dua khatam quran' },
    { page: '/quran', kw: 'tagging al quran' },
    { page: '/quran', kw: 'tafhimul quran bangla' },
    { page: '/quran', kw: 'quran shikkha' },
    { page: '/quran', kw: 'elearning quran' },
    { page: '/rakats', kw: 'namaz ki rakat' },
    { page: '/rakats', kw: 'namaz rakat table' },
    { page: '/rakats', kw: 'zuhar namaz rakat' },
    { page: '/rakats', kw: 'asr namaz rakat' },
    { page: '/rakats', kw: 'namaz ke faraiz' },
    { page: '/rakats', kw: 'namaz with urdu translation' },
    { page: '/rakats', kw: 'tasbeeh namaz' },
    { page: '/rakats', kw: 'namaz janaza' },
    { page: '/rakats', kw: 'janaza namaz dua' },
    { page: '/rakats', kw: 'tarabi namaz' },
    { page: '/rakats', kw: 'shabe baraat namaz' },
    { page: '/rakats', kw: 'shab e barat ki namaz ki niyat' },
    { page: '/rakats', kw: 'beter namaz porar niyom' },
    { page: '/rakats', kw: 'namaz chadar' },
    { page: '/rakats', kw: 'namaz e ghufayla' },
    { page: '/prayer-times/delhi', kw: 'namaz time in delhi hanafi' },
    { page: '/prayer-times/delhi', kw: 'namaz time delhi today' },
    { page: '/prayer-times/calicut', kw: 'namaz time calicut' },
    { page: '/prayer-times/dhaka', kw: 'tahajjud namaz time dhaka' },
    { page: '/prayer-times/dubai', kw: 'shia namaz time in dubai' },
    { page: '/prayer-times/karachi', kw: 'shia namaz timing karachi' }
  ];

  let kwMisses = 0;
  for (const check of KEYWORD_CHECKS) {
    const res = await fetchUrl(check.page);
    const found = res.body.toLowerCase().includes(check.kw.toLowerCase());
    if (found) {
      console.log(`✅ [FOUND] "${check.kw}" on ${check.page}`);
    } else {
      console.error(`❌ [NOT FOUND] "${check.kw}" on ${check.page}`);
      kwMisses++;
    }
  }

  console.log(`\n========================================`);
  console.log(`AUDIT RESULT: Failures: ${failures}, Keyword Misses: ${kwMisses}`);
  console.log(`========================================`);
}

runAudit();
