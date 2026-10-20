'use client';

import React, { useState, useEffect } from 'react';

const PHRASES = [
  'Daily Namaz Timings',
  'Authentic Rakat Guides',
  'Accurate Prayer Schedules',
  'Sunnah & Fiqh Guidelines',
  'Tahajjud & Sehri Timetables',
];

export default function HeroTypewriter() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (text.length < currentPhrase.length) {
        // Typing each letter smoothly
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, 75);
      } else {
        // Full phrase displayed, linger smoothly for 2.2 seconds
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (text.length > 0) {
        // Deleting smoothly
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length - 1));
        }, 35);
      } else {
        // Finished deleting, transition to next phrase smoothly
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <span className="inline-flex items-center justify-center relative min-h-[1.3em]">
      <span className="text-brand-700 dark:text-emerald-400 font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="inline-block w-0.5 sm:w-1 h-6 sm:h-9 md:h-11 bg-emerald-600 dark:bg-emerald-400 ml-1.5 align-middle animate-pulse"
      />
    </span>
  );
}
