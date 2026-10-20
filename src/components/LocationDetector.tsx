'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Locate, CheckCircle2, Navigation, Compass, Search, ChevronRight } from 'lucide-react';
import { CITIES } from '@/lib/prayer-calc';
import { useLanguage } from '@/context/LanguageContext';

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

export default function LocationDetector({
  onSelectCity,
  currentCityKey = 'bangalore',
}: {
  onSelectCity?: (cityKey: string) => void;
  currentCityKey?: string;
}) {
  const [detectedCity, setDetectedCity] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('Auto-detect your location for exact prayer times');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { t } = useLanguage();

  // Auto detect via timezone on initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('namaz_preferred_city');
      if (saved && CITIES[saved]) {
        setDetectedCity(CITIES[saved].name);
        setStatusMessage(`Active location: ${CITIES[saved].name} (${CITIES[saved].country})`);
        return;
      }

      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTz) {
        if (userTz.includes('Karachi') || userTz.includes('Islamabad')) {
          setDetectedCity('Karachi');
          setStatusMessage('Location identified via Timezone: Karachi, Pakistan');
        } else if (userTz.includes('Dhaka') || userTz.includes('Chittagong')) {
          setDetectedCity('Dhaka');
          setStatusMessage('Location identified via Timezone: Dhaka, Bangladesh');
        } else if (userTz.includes('Dubai') || userTz.includes('Abu_Dhabi') || userTz.includes('Muscat')) {
          setDetectedCity('Dubai');
          setStatusMessage('Location identified via Timezone: Dubai, UAE');
        } else if (userTz.includes('London')) {
          setDetectedCity('London');
          setStatusMessage('Location identified via Timezone: London, UK');
        } else if (userTz.includes('New_York')) {
          setDetectedCity('New York');
          setStatusMessage('Location identified via Timezone: New York, USA');
        } else if (userTz.includes('Calcutta') || userTz.includes('Kolkata')) {
          setDetectedCity('Kolkata');
          setStatusMessage('Location identified via Timezone: Eastern India (Kolkata)');
        }
      }
    } catch {
      // Graceful fallback
    }
  }, []);

  const handleDetectGPS = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert('Geolocation is not supported by your current browser.');
      return;
    }

    setIsDetecting(true);
    setStatusMessage('Contacting GPS satellites & determining solar coordinates...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const closestKey = findClosestCity(latitude, longitude);
        const matched = CITIES[closestKey];

        setDetectedCity(matched.name);
        setStatusMessage(`GPS Location Verified: ${matched.name}, ${matched.country} (Coordinates: ${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E)`);
        setIsDetecting(false);

        try {
          localStorage.setItem('namaz_preferred_city', closestKey);
        } catch {}

        if (onSelectCity) {
          onSelectCity(closestKey);
        }
      },
      (err) => {
        setIsDetecting(false);
        setStatusMessage('GPS access unavailable. Please select your city from the list below.');
      },
      { timeout: 8000 }
    );
  };

  const filteredCities = Object.entries(CITIES).filter(([key, city]) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-md shadow-brand-950/5 mb-6 transition-colors duration-200">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Location detection action */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-emerald-950/60 text-brand-800 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-brand-200 dark:border-emerald-800/60">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-emerald-400">
                Automatic City Detection
              </span>
              {detectedCity && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  {detectedCity}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
              {statusMessage}
            </p>
          </div>
        </div>

        {/* Right: GPS detect button & City quick-selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleDetectGPS}
            disabled={isDetecting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-700 hover:bg-brand-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-sm cursor-pointer disabled:opacity-60"
            aria-label="Detect my exact city location using GPS"
          >
            <Locate className={`w-3.5 h-3.5 ${isDetecting ? 'animate-spin' : ''}`} />
            <span>{isDetecting ? 'Finding Closest City...' : 'Detect My City (GPS)'}</span>
          </button>

          {/* Quick city filter */}
          <div className="relative">
            <input
              type="text"
              placeholder="Filter city (e.g. Delhi, Karachi)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-48 sm:w-56 pl-3 pr-8 py-2 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500"
              aria-label="Filter city for prayer times"
            />
            <Search className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-slate-400" />

            {showDropdown && searchTerm.trim() && (
              <div className="absolute right-0 mt-1.5 w-60 max-h-56 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 py-1 text-xs">
                {filteredCities.length > 0 ? (
                  filteredCities.map(([key, city]) => (
                    <Link
                      key={key}
                      href={`/prayer-times/${city.slug}`}
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center justify-between px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-700 dark:hover:text-emerald-400"
                    >
                      <span className="font-semibold">{city.name}</span>
                      <span className="text-[10px] text-slate-400">{city.country}</span>
                    </Link>
                  ))
                ) : (
                  <div className="px-3 py-2 text-slate-400 text-center">No city found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popular City Quick-Select Pills */}
      <div className="mt-3.5 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] pb-1 scrollbar-none">
        <span className="text-slate-500 dark:text-slate-400 shrink-0 font-medium">Quick Select:</span>
        {['bangalore', 'karachi', 'delhi', 'mumbai', 'dhaka', 'dubai', 'lahore', 'sharjah', 'hyderabad', 'kolkata', 'london', 'new-york'].map((key) => {
          const city = CITIES[key];
          if (!city) return null;
          return (
            <Link
              key={key}
              href={`/prayer-times/${city.slug}`}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-800 dark:hover:bg-slate-700 dark:hover:text-emerald-300 border border-slate-200 dark:border-slate-700 font-medium transition"
            >
              {city.name.split(' ')[0]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
