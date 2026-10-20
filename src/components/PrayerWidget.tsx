'use client';

import React, { useState, useEffect, useId } from 'react';
import Link from 'next/link';
import { Clock, MapPin, Moon, Sun, Sunrise, Sunset, Copy, Check, ChevronRight, Sparkles, Locate, CheckCircle2 } from 'lucide-react';
import { CITIES, calculatePrayerTimes, PrayerTimesResult, getTimezoneOffsetHours } from '@/lib/prayer-calc';
import { useLanguage } from '@/context/LanguageContext';

interface PrayerWidgetProps {
  initialCity?: string;
  showCitySelector?: boolean;
  compact?: boolean;
}

// Haversine formula to find closest city from user coordinates
function findClosestCity(lat: number, lon: number): string {
  let closestKey = 'bangalore';
  let minDistance = Infinity;

  for (const [key, city] of Object.entries(CITIES)) {
    const dLat = ((city.latitude - lat) * Math.PI) / 180;
    const dLon = ((city.longitude - lon) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((city.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = 6371 * c; // Earth radius in km

    if (d < minDistance) {
      minDistance = d;
      closestKey = key;
    }
  }

  return closestKey;
}

function computeResults(cityKey: string, schoolType: 'hanafi' | 'shafii', date: Date = new Date()): PrayerTimesResult {
  const city = CITIES[cityKey] || CITIES.bangalore;
  const offset = getTimezoneOffsetHours(city.timezone, date);
  return calculatePrayerTimes(city.latitude, city.longitude, date, offset, schoolType, city.method);
}

export default function PrayerWidget({
  initialCity = 'bangalore',
  showCitySelector = true,
  compact = false,
}: PrayerWidgetProps) {
  const [selectedCityKey, setSelectedCityKey] = useState<string>(initialCity);
  const [school, setSchool] = useState<'hanafi' | 'shafii'>('hanafi');
  const [copied, setCopied] = useState<boolean>(false);
  const [results, setResults] = useState<PrayerTimesResult>(() => computeResults(initialCity, 'hanafi'));
  const [locationDetecting, setLocationDetecting] = useState<boolean>(false);
  const [autoDetectedCity, setAutoDetectedCity] = useState<string | null>(null);

  const selectId = useId();
  const { t } = useLanguage();

  // Automatic location detection on initial mount
  useEffect(() => {
    try {
      // 1. Check local storage preference
      const savedCity = localStorage.getItem('namaz_preferred_city');
      if (savedCity && CITIES[savedCity]) {
        setSelectedCityKey(savedCity);
        return;
      }

      // 2. Check browser timezone
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTz) {
        if (userTz.includes('Karachi') || userTz.includes('Islamabad')) {
          setSelectedCityKey('karachi');
          setAutoDetectedCity('Karachi, Pakistan');
          return;
        }
        if (userTz.includes('Dhaka') || userTz.includes('Chittagong')) {
          setSelectedCityKey('dhaka');
          setAutoDetectedCity('Dhaka, Bangladesh');
          return;
        }
        if (userTz.includes('Dubai') || userTz.includes('Muscat') || userTz.includes('Abu_Dhabi')) {
          setSelectedCityKey('dubai');
          setAutoDetectedCity('Dubai, UAE');
          return;
        }
        if (userTz.includes('London')) {
          setSelectedCityKey('london');
          setAutoDetectedCity('London, United Kingdom');
          return;
        }
        if (userTz.includes('New_York')) {
          setSelectedCityKey('new-york');
          setAutoDetectedCity('New York, USA');
          return;
        }
      }

      // 3. If GPS permission was already granted, pick closest city seamlessly
      if (typeof window !== 'undefined' && 'permissions' in navigator && navigator.permissions?.query) {
        navigator.permissions.query({ name: 'geolocation' as PermissionName }).then((permissionStatus) => {
          if (permissionStatus.state === 'granted') {
            navigator.geolocation.getCurrentPosition((pos) => {
              const closest = findClosestCity(pos.coords.latitude, pos.coords.longitude);
              setSelectedCityKey(closest);
              setAutoDetectedCity(CITIES[closest].name);
            });
          }
        }).catch(() => {});
      }
    } catch {
      // Silently fall back to initialCity
    }
  }, [initialCity]);

  const city = CITIES[selectedCityKey] || CITIES.bangalore;

  // Sync juristic default school if city defines one
  useEffect(() => {
    if (city.defaultSchool) {
      setSchool(city.defaultSchool);
    }
  }, [selectedCityKey, city.defaultSchool]);

  // Recalculate prayer times whenever city, school, or time changes
  useEffect(() => {
    const updated = computeResults(selectedCityKey, school, new Date());
    setResults(updated);

    const interval = setInterval(() => {
      setResults(computeResults(selectedCityKey, school, new Date()));
    }, 60000);

    return () => clearInterval(interval);
  }, [selectedCityKey, school]);

  // Explicit user GPS trigger
  const handleDetectLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLocationDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const closestKey = findClosestCity(latitude, longitude);
        setSelectedCityKey(closestKey);
        setAutoDetectedCity(CITIES[closestKey].name);
        try {
          localStorage.setItem('namaz_preferred_city', closestKey);
        } catch {}
        setLocationDetecting(false);
      },
      (err) => {
        console.warn('Geolocation notice:', err.message);
        setLocationDetecting(false);
      },
      { timeout: 8000 }
    );
  };

  const handleCityChange = (newKey: string) => {
    setSelectedCityKey(newKey);
    setAutoDetectedCity(null);
    try {
      localStorage.setItem('namaz_preferred_city', newKey);
    } catch {}
  };

  const handleCopy = () => {
    const text = `🕌 Prayer Times for ${city.name} (${results.dateStr})
${t('fajr')}: ${results.fajr} (Ends at ${results.sunrise})
${t('sunrise')}: ${results.sunrise}
${t('dhuhr')}: ${results.dhuhr}
${t('asr')} (${school.toUpperCase()}): ${results.asr}
${t('maghrib')}: ${results.maghrib}
${t('isha')}: ${results.isha}
${t('tahajjud')}: ${results.tahajjud}
Calculated via Namaz-e-Shariq (https://namazeshariq.com/prayer-times/${city.slug})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prayerCards = [
    { name: t('fajr'), time: results.fajr, icon: Moon, subtitle: 'Dawn twilight', current: results.currentPrayer.includes('Fajr') },
    { name: t('sunrise'), time: results.sunrise, icon: Sunrise, subtitle: 'Shurooq', current: results.currentPrayer.includes('Sunrise') },
    { name: t('dhuhr'), time: results.dhuhr, icon: Sun, subtitle: 'Post-Zawal', current: results.currentPrayer.includes('Dhuhr') },
    { name: t('asr'), time: results.asr, icon: Sun, subtitle: `${school === 'hanafi' ? 'Hanafi (2x)' : 'Shafi’i (1x)'}`, current: results.currentPrayer.includes('Asr') },
    { name: t('maghrib'), time: results.maghrib, icon: Sunset, subtitle: 'Sunset / Iftar', current: results.currentPrayer.includes('Maghrib') },
    { name: t('isha'), time: results.isha, icon: Moon, subtitle: 'Nightfall', current: results.currentPrayer.includes('Isha') },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-200">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-teal-950 dark:from-slate-950 dark:via-brand-950 dark:to-slate-950 text-white p-5 sm:p-7 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/25 text-emerald-300 border border-emerald-400/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                {t('verifiedCalculation')}
              </span>
              <span suppressHydrationWarning className="text-xs text-emerald-100 hidden sm:inline">
                {results.dateStr}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-2 flex items-center gap-2">
              <Clock className="w-6 h-6 text-emerald-400 shrink-0" />
              {t('todayTimetable')} - {city.name}
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1">
              Astronomical waqt timetable for {city.country} • Lat {city.latitude.toFixed(2)}°, Lon {city.longitude.toFixed(2)}°
            </p>
          </div>

          {/* Next Prayer Countdown Callout */}
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 block font-semibold">
                {t('nextPrayer')}: <strong className="text-white font-black">{results.nextPrayer}</strong>
              </span>
              <span suppressHydrationWarning className="text-xl font-black text-white block leading-tight">
                in {results.timeRemainingToNext}
              </span>
              <span suppressHydrationWarning className="text-[11px] text-slate-200">
                at {results.nextPrayerTimeStr}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
          </div>
        </div>

        {/* Auto-detected notification badge if active */}
        {autoDetectedCity && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{t('locationDetected')}: <strong>{autoDetectedCity}</strong>.</span>
          </div>
        )}

        {/* Controls row */}
        {showCitySelector && (
          <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2.5">
              <label htmlFor={selectId} className="text-emerald-100 font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" /> {t('selectCity')}:
              </label>
              <select
                id={selectId}
                value={selectedCityKey}
                onChange={(e) => handleCityChange(e.target.value)}
                className="bg-brand-950 text-white font-medium border border-brand-700 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-hidden cursor-pointer"
                aria-label="Select target prayer times city"
              >
                {Object.keys(CITIES).map((key) => (
                  <option key={key} value={key} className="bg-slate-900 text-white">
                    {CITIES[key].name} ({CITIES[key].country})
                  </option>
                ))}
              </select>

              {/* Automatic Geolocation Detection Button */}
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={locationDetecting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition border border-emerald-400/40 cursor-pointer disabled:opacity-60 shadow-xs"
                aria-label="Auto-detect my current city via GPS or network"
                title="Automatically detect closest city via GPS/Network"
              >
                <Locate className={`w-3.5 h-3.5 ${locationDetecting ? 'animate-spin' : ''}`} />
                <span>{locationDetecting ? t('detecting') : t('autoDetect')}</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-emerald-100 font-semibold">{t('juristicSchool')}:</span>
              <div className="inline-flex rounded-xl bg-brand-950 p-0.5 border border-brand-700">
                <button
                  type="button"
                  onClick={() => setSchool('hanafi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    school === 'hanafi'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                  aria-label="Set Asr calculation method to Hanafi (2x shadow)"
                >
                  Hanafi
                </button>
                <button
                  type="button"
                  onClick={() => setSchool('shafii')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    school === 'shafii'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                  aria-label="Set Asr calculation method to Shafi’i (1x shadow)"
                >
                  Shafi’i / Maliki
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 ml-2 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold transition border border-white/20 cursor-pointer"
                title="Copy prayer timetable to clipboard"
                aria-label="Share prayer times timetable"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            {/* Quick City Selector Pills */}
            <div className="w-full mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto text-[11px] pb-0.5 scrollbar-none">
              <span className="text-emerald-300 font-semibold shrink-0">Quick Switch:</span>
              {['bangalore', 'karachi', 'delhi', 'mumbai', 'dhaka', 'dubai', 'lahore', 'sharjah', 'calicut', 'london', 'new-york'].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleCityChange(k)}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                    selectedCityKey === k
                      ? 'bg-emerald-500 text-brand-950 font-bold shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-emerald-100'
                  }`}
                  aria-label={`Switch prayer times to ${CITIES[k].name}`}
                >
                  {CITIES[k].name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Prayer Grid */}
      <div className="p-5 sm:p-7 bg-slate-50/70 dark:bg-slate-900/60">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {prayerCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.name}
                className={`relative rounded-2xl p-4 transition-all border ${
                  card.current
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-600 dark:border-emerald-400 ring-2 ring-emerald-500/30 shadow-md'
                    : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/80 hover:border-brand-400 dark:hover:border-emerald-500 hover:shadow-xs'
                }`}
              >
                {card.current && (
                  <span className="absolute -top-2.5 right-3 bg-emerald-800 dark:bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    Current Waqt
                  </span>
                )}
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                    {card.name}
                  </span>
                  <Icon className={`w-4 h-4 ${card.current ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                  {card.time}
                </div>
                <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium mt-1 block">
                  {card.subtitle}
                </span>
              </div>
            );
          })}
        </div>

        {/* Extra Timings Sub-Bar (Tahajjud & Sehri end) */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-800 dark:text-slate-200 font-semibold gap-3">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>
              🌙 <strong>Qiyam / {t('tahajjud')}:</strong> {results.tahajjud}
            </span>
            <span>
              🥣 <strong>Sehri Cutoff:</strong> {results.fajr}
            </span>
            <span>
              🌅 <strong>{t('sunrise')} ({t('fajr')} End):</strong> {results.sunrise}
            </span>
          </div>

          <Link
            href={`/prayer-times/${city.slug}`}
            className="font-bold text-brand-800 dark:text-emerald-300 hover:text-brand-950 dark:hover:text-emerald-200 flex items-center gap-1.5 hover:underline self-start sm:self-auto bg-brand-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-brand-200 dark:border-slate-700 transition"
          >
            <span>Full {city.name} Guide & Monthly Timetable</span>
            <ChevronRight className="w-3.5 h-3.5 text-brand-700 dark:text-emerald-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
