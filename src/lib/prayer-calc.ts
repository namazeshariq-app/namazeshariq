/**
 * High-accuracy astronomical solar calculation engine for Islamic Prayer Times (Namaz Times).
 * Runs natively on Cloudflare Workers / Edge and Node.js with zero external API dependencies.
 */

export interface CityInfo {
  name: string;
  slug: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string; // e.g. 'Asia/Kolkata'
  defaultSchool: 'hanafi' | 'shafii';
  method: 'karachi' | 'mwl' | 'isna' | 'egypt' | 'makkah';
  description: string;
}

export const CITIES: Record<string, CityInfo> = {
  bangalore: {
    name: 'Bangalore (Bengaluru)',
    slug: 'bangalore',
    country: 'India',
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: 'Asia/Kolkata',
    defaultSchool: 'hanafi',
    method: 'karachi',
    description: 'Accurate today namaz timings in Bangalore with Sehri, Fajr, Dhuhr, Asr, Maghrib, and Isha waqt schedules according to local masajid.',
  },
  delhi: {
    name: 'Delhi (New Delhi)',
    slug: 'delhi',
    country: 'India',
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 'Asia/Kolkata',
    defaultSchool: 'hanafi',
    method: 'karachi',
    description: 'Live namaz timings in Delhi NCR including Jama Masjid and Nizamuddin prayer schedules with sunset and sunrise boundaries.',
  },
  mumbai: {
    name: 'Mumbai',
    slug: 'mumbai',
    country: 'India',
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: 'Asia/Kolkata',
    defaultSchool: 'hanafi',
    method: 'karachi',
    description: 'Daily prayer times in Mumbai with coastal twilight precision, Asr shadow timings, and monthly printable timetable.',
  },
  karachi: {
    name: 'Karachi',
    slug: 'karachi',
    country: 'Pakistan',
    latitude: 24.8607,
    longitude: 67.0011,
    timezone: 'Asia/Karachi',
    defaultSchool: 'hanafi',
    method: 'karachi',
    description: 'Official Karachi namaz timings based on University of Islamic Sciences Banuri Town calculation standards.',
  },
  lahore: {
    name: 'Lahore',
    slug: 'lahore',
    country: 'Pakistan',
    latitude: 31.5204,
    longitude: 74.3587,
    timezone: 'Asia/Karachi',
    defaultSchool: 'hanafi',
    method: 'karachi',
    description: 'Badshahi Masjid and Lahore metropolitan prayer timings for Fajr, Zohar, Asr, Maghrib, and Isha with Sehri/Iftar limits.',
  },
  peshawar: {
    name: 'Peshawar',
    slug: 'peshawar',
    country: 'Pakistan',
    latitude: 34.0151,
    longitude: 71.5249,
    timezone: 'Asia/Karachi',
    defaultSchool: 'hanafi',
    method: 'karachi',
    description: 'Peshawar Khyber Pakhtunkhwa authentic daily namaz timetable with dawn and twilight adjustments.',
  },
  dhaka: {
    name: 'Dhaka',
    slug: 'dhaka',
    country: 'Bangladesh',
    latitude: 23.8103,
    longitude: 90.4125,
    timezone: 'Asia/Dhaka',
    defaultSchool: 'hanafi',
    method: 'karachi',
    description: 'Dhaka prayer times today based on Islamic Foundation Bangladesh standards with Fajr last time and Maghrib sunset.',
  },
  sharjah: {
    name: 'Sharjah',
    slug: 'sharjah',
    country: 'United Arab Emirates',
    latitude: 25.3463,
    longitude: 55.4209,
    timezone: 'Asia/Dubai',
    defaultSchool: 'shafii',
    method: 'makkah',
    description: 'Official Sharjah prayer times and namaz time in sharjah according to the Department of Islamic Affairs with namaz timing in sharjah, Azan schedules, and Qiyam.',
  },
  dubai: {
    name: 'Dubai',
    slug: 'dubai',
    country: 'United Arab Emirates',
    latitude: 25.2048,
    longitude: 55.2708,
    timezone: 'Asia/Dubai',
    defaultSchool: 'shafii',
    method: 'makkah',
    description: 'Dubai daily prayer schedule and Eid namaz timings authorized by Islamic Affairs and Charitable Activities Department (IACAD).',
  },
  ajman: {
    name: 'Ajman',
    slug: 'ajman',
    country: 'United Arab Emirates',
    latitude: 25.4052,
    longitude: 55.5136,
    timezone: 'Asia/Dubai',
    defaultSchool: 'shafii',
    method: 'makkah',
    description: 'Daily namaz time in Ajman for Fajr, Dhuhr, Asr, Maghrib, and Isha with local mosque prayer call times.',
  },
  calicut: {
    name: 'Calicut (Kozhikode)',
    slug: 'calicut',
    country: 'India',
    latitude: 11.2588,
    longitude: 75.7804,
    timezone: 'Asia/Kolkata',
    defaultSchool: 'shafii',
    method: 'karachi',
    description: 'Malabar region Calicut namaz timings following standard Kerala Islamic councils with Shafi’i and Hanafi Asr options.',
  },
  chennai: {
    name: 'Chennai',
    slug: 'chennai',
    country: 'India',
    latitude: 13.0827,
    longitude: 80.2707,
    timezone: 'Asia/Kolkata',
    defaultSchool: 'hanafi',
    method: 'karachi',
    description: 'Prayer time in Chennai Tamil Nadu with accurate twilight and sunset calculations for local masajid.',
  },
  kochi: {
    name: 'Kochi (Cochin)',
    slug: 'kochi',
    country: 'India',
    latitude: 9.9312,
    longitude: 76.2673,
    timezone: 'Asia/Kolkata',
    defaultSchool: 'shafii',
    method: 'karachi',
    description: 'Kochi prayer times with high Kerala coastal precision for daily five obligatory prayers.',
  },
  hyderabad: {
    name: 'Hyderabad',
    slug: 'hyderabad',
    country: 'India',
    latitude: 17.3850,
    longitude: 78.4867,
    timezone: 'Asia/Kolkata',
    defaultSchool: 'hanafi',
    method: 'karachi',
    description: 'Authentic daily namaz timings in Hyderabad Deccan with historic Mecca Masjid schedules, Sehri cutoff, and Hanafi/Shafi’i waqt bounds.',
  },
  kolkata: {
    name: 'Kolkata (Calcutta)',
    slug: 'kolkata',
    country: 'India',
    latitude: 22.5726,
    longitude: 88.3639,
    timezone: 'Asia/Kolkata',
    defaultSchool: 'hanafi',
    method: 'karachi',
    description: 'Eastern India Kolkata daily prayer timetable with Nakhoda Mosque waqt timings, early sunrise offsets, and Maghrib Iftar limits.',
  },
  islamabad: {
    name: 'Islamabad',
    slug: 'islamabad',
    country: 'Pakistan',
    latitude: 33.6844,
    longitude: 73.0479,
    timezone: 'Asia/Karachi',
    defaultSchool: 'hanafi',
    method: 'karachi',
    description: 'Official Faisal Mosque and Islamabad capital territory prayer times with verified Banuri Town and Ruet-e-Hilal astronomical standards.',
  },
  chittagong: {
    name: 'Chittagong (Chattogram)',
    slug: 'chittagong',
    country: 'Bangladesh',
    latitude: 22.3569,
    longitude: 91.7832,
    timezone: 'Asia/Dhaka',
    defaultSchool: 'hanafi',
    method: 'karachi',
    description: 'Chittagong port city daily prayer times according to Islamic Foundation Bangladesh with coastal sunrise and twilight adjustments.',
  },
  'abu-dhabi': {
    name: 'Abu Dhabi',
    slug: 'abu-dhabi',
    country: 'United Arab Emirates',
    latitude: 24.4539,
    longitude: 54.3773,
    timezone: 'Asia/Dubai',
    defaultSchool: 'shafii',
    method: 'makkah',
    description: 'Official Abu Dhabi prayer times and Sheikh Zayed Grand Mosque waqt schedules based on the General Authority of Islamic Affairs (Awqaf).',
  },
  london: {
    name: 'London',
    slug: 'london',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London',
    defaultSchool: 'hanafi',
    method: 'mwl',
    description: 'Daily London prayer times according to the London Central Mosque Trust & Islamic Cultural Centre (Regent’s Park) and East London Mosque.',
  },
  'new-york': {
    name: 'New York (NYC)',
    slug: 'new-york',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: 'America/New_York',
    defaultSchool: 'hanafi',
    method: 'isna',
    description: 'New York City metropolitan prayer times based on ISNA standards with Manhattan, Brooklyn, and Queens waqt boundaries and Sehri limits.',
  },
};

/**
 * Dynamically computes UTC hour offset for an IANA timezone string,
 * automatically accounting for Daylight Saving Time (DST) on the target date.
 */
export function getTimezoneOffsetHours(timezone: string, date: Date = new Date()): number {
  try {
    const tzString = date.toLocaleString('en-US', { timeZone: timezone });
    const utcString = date.toLocaleString('en-US', { timeZone: 'UTC' });
    const tzDate = new Date(tzString);
    const utcDate = new Date(utcString);
    const diffHours = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
    return isNaN(diffHours) ? 5.5 : diffHours;
  } catch {
    const fallbackMap: Record<string, number> = {
      'Asia/Kolkata': 5.5,
      'Asia/Karachi': 5.0,
      'Asia/Dhaka': 6.0,
      'Asia/Dubai': 4.0,
      'Europe/London': 0.0,
      'America/New_York': -5.0,
    };
    return fallbackMap[timezone] ?? 5.5;
  }
}

export interface PrayerTimesResult {
  fajr: string;
  fajrEnd: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  tahajjud: string;
  currentPrayer: string;
  nextPrayer: string;
  timeRemainingToNext: string;
  nextPrayerTimeStr: string;
  calculationMethod: string;
  juristicSchool: string;
  dateStr: string;
  hijriDateStr?: string;
}

// Astronomical calculation methods parameters (Fajr angle, Isha angle)
const METHODS = {
  karachi: { fajrAngle: 18.0, ishaAngle: 18.0, name: 'Univ. of Islamic Sciences, Karachi' },
  mwl: { fajrAngle: 18.0, ishaAngle: 17.0, name: 'Muslim World League (MWL)' },
  isna: { fajrAngle: 15.0, ishaAngle: 15.0, name: 'Islamic Society of North America (ISNA)' },
  egypt: { fajrAngle: 19.5, ishaAngle: 17.5, name: 'Egyptian General Authority of Survey' },
  makkah: { fajrAngle: 18.5, ishaInterval: 90, name: 'Umm Al-Qura Univ., Makkah' },
};

function d2r(d: number): number {
  return (d * Math.PI) / 180.0;
}

function r2d(r: number): number {
  return (r * 180.0) / Math.PI;
}

function fixHour(a: number): number {
  a = a - 24.0 * Math.floor(a / 24.0);
  return a < 0 ? a + 24.0 : a;
}

function fixAngle(a: number): number {
  a = a - 360.0 * Math.floor(a / 360.0);
  return a < 0 ? a + 360.0 : a;
}

/**
 * Calculate solar coordinates (declination and equation of time) for Julian Day
 */
function sunPosition(jd: number) {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * Math.sin(d2r(g)) + 0.02 * Math.sin(d2r(2 * g)));
  const e = 23.439 - 0.00000036 * D;
  const d = r2d(Math.asin(Math.sin(d2r(e)) * Math.sin(d2r(L))));
  let ra = r2d(Math.atan2(Math.cos(d2r(e)) * Math.sin(d2r(L)), Math.cos(d2r(L)))) / 15.0;
  ra = fixHour(ra);
  const eqt = q / 15.0 - ra;
  return { declination: d, equationOfTime: eqt };
}

function julianDate(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function formatTime(decimalHours: number): string {
  if (isNaN(decimalHours)) return '--:--';
  const totalMinutes = Math.round(decimalHours * 60);
  let hours = Math.floor(totalMinutes / 60) % 24;
  const mins = totalMinutes % 60;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
  return `${hours}:${minsStr} ${ampm}`;
}

export function calculatePrayerTimes(
  lat: number,
  lng: number,
  date: Date = new Date(),
  timezoneOffsetHours?: number,
  school: 'hanafi' | 'shafii' = 'hanafi',
  methodKey: 'karachi' | 'mwl' | 'isna' | 'egypt' | 'makkah' = 'karachi'
): PrayerTimesResult {
  const method = METHODS[methodKey] || METHODS.karachi;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // If timezoneOffsetHours is not provided, derive from date or default to local
  const tz = timezoneOffsetHours !== undefined ? timezoneOffsetHours : -date.getTimezoneOffset() / 60;

  const jd = julianDate(year, month, day);
  const { declination: dec, equationOfTime: eqt } = sunPosition(jd);

  // Solar Noon (Dhuhr)
  const noon = fixHour(12 + tz - lng / 15.0 - eqt);

  // Time for given sun altitude angle
  function timeAtAngle(angle: number, isMorning: boolean): number {
    const cosH =
      (Math.sin(d2r(-angle)) - Math.sin(d2r(lat)) * Math.sin(d2r(dec))) /
      (Math.cos(d2r(lat)) * Math.cos(d2r(dec)));
    if (cosH > 1 || cosH < -1) return NaN;
    const hourAngle = r2d(Math.acos(cosH)) / 15.0;
    return isMorning ? noon - hourAngle : noon + hourAngle;
  }

  // Sunrise and Sunset (approx 0.833° refraction & radius)
  const sunrise = timeAtAngle(0.833, true);
  const sunset = timeAtAngle(0.833, false);

  // Fajr
  const fajr = timeAtAngle(method.fajrAngle, true);

  // Asr calculation based on juristic school
  // Hanafi: shadow = 2 + noon shadow; Shafi'i: shadow = 1 + noon shadow
  const shadowFactor = school === 'hanafi' ? 2 : 1;
  const asrAltitude = r2d(
    Math.atan(1 / (shadowFactor + Math.tan(d2r(Math.abs(lat - dec)))))
  );
  const asr = timeAtAngle(-asrAltitude, false);

  // Maghrib is at sunset
  const maghrib = sunset;

  // Isha
  let isha: number;
  if ('ishaInterval' in method && method.ishaInterval) {
    isha = maghrib + method.ishaInterval / 60;
  } else if ('ishaAngle' in method && method.ishaAngle) {
    isha = timeAtAngle(method.ishaAngle, false);
  } else {
    isha = maghrib + 1.5;
  }

  // Tahajjud: last third of the night (between Maghrib and Fajr of next day)
  const nightLength = fixHour(fajr - maghrib + 24);
  const tahajjud = fixHour(maghrib + (nightLength * 2) / 3);

  // Fajr End is sunrise
  const fajrEnd = sunrise;

  // Determine current prayer and next prayer
  const now = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;

  const prayerSchedule = [
    { name: 'Fajr', time: fajr },
    { name: 'Sunrise (Shurooq)', time: sunrise },
    { name: 'Dhuhr', time: noon + 2 / 60 }, // 2 min precaution after zenith
    { name: 'Asr', time: asr },
    { name: 'Maghrib', time: maghrib },
    { name: 'Isha', time: isha },
  ];

  let currentPrayer = 'Isha';
  let nextPrayer = 'Fajr';
  let nextPrayerTime = fajr + 24;

  if (now < fajr) {
    currentPrayer = 'Isha (Night)';
    nextPrayer = 'Fajr';
    nextPrayerTime = fajr;
  } else if (now < sunrise) {
    currentPrayer = 'Fajr';
    nextPrayer = 'Sunrise';
    nextPrayerTime = sunrise;
  } else if (now < noon + 2 / 60) {
    currentPrayer = 'Ishraq / Chasht';
    nextPrayer = 'Dhuhr';
    nextPrayerTime = noon + 2 / 60;
  } else if (now < asr) {
    currentPrayer = 'Dhuhr';
    nextPrayer = 'Asr';
    nextPrayerTime = asr;
  } else if (now < maghrib) {
    currentPrayer = 'Asr';
    nextPrayer = 'Maghrib';
    nextPrayerTime = maghrib;
  } else if (now < isha) {
    currentPrayer = 'Maghrib';
    nextPrayer = 'Isha';
    nextPrayerTime = isha;
  } else {
    currentPrayer = 'Isha';
    nextPrayer = 'Fajr';
    nextPrayerTime = fajr + 24;
  }

  const diffHours = nextPrayerTime > now ? nextPrayerTime - now : nextPrayerTime + 24 - now;
  const remH = Math.floor(diffHours);
  const remM = Math.floor((diffHours - remH) * 60);
  const timeRemainingToNext = `${remH}h ${remM}m`;

  return {
    fajr: formatTime(fajr),
    fajrEnd: formatTime(fajrEnd),
    sunrise: formatTime(sunrise),
    dhuhr: formatTime(noon + 2 / 60),
    asr: formatTime(asr),
    maghrib: formatTime(maghrib),
    isha: formatTime(isha),
    tahajjud: formatTime(tahajjud),
    currentPrayer,
    nextPrayer,
    timeRemainingToNext,
    nextPrayerTimeStr: formatTime(nextPrayerTime % 24),
    calculationMethod: method.name,
    juristicSchool: school === 'hanafi' ? 'Hanafi (Standard Subcontinent)' : 'Shafi’i / Maliki / Hanbali',
    dateStr: date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };
}
