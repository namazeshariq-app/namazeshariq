'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function CrescentMoonBackground() {
  const { theme } = useTheme();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const targetOffset = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number | null>(null);

  // Smooth movable parallax effect tracking mouse/pointer movements
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Normalized coordinates (-1 to +1) scaled to a subtle, graceful range (-25px to +25px)
      const nx = (clientX - centerX) / centerX;
      const ny = (clientY - centerY) / centerY;
      targetOffset.current = {
        x: Math.max(-1, Math.min(1, nx)) * 25,
        y: Math.max(-1, Math.min(1, ny)) * 18,
      };
    };

    // Smooth lerp (linear interpolation) animation loop
    let isRunning = true;
    const updateLerp = () => {
      if (!isRunning) return;
      setOffset((prev) => {
        const dx = targetOffset.current.x - prev.x;
        const dy = targetOffset.current.y - prev.y;
        if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
          return prev;
        }
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      animFrame.current = requestAnimationFrame(updateLerp);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    animFrame.current = requestAnimationFrame(updateLerp);

    return () => {
      isRunning = false;
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden transition-opacity duration-700"
    >
      {/* Light Mode Ambient Islamic Arabesque Pattern */}
      <div className="absolute inset-0 opacity-15 dark:opacity-0 transition-opacity duration-700">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="islamic-geom-light" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M40 0 L80 40 L40 80 L0 40 Z"
                fill="none"
                stroke="#059669"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />
              <circle cx="40" cy="40" r="18" fill="none" stroke="#047857" strokeWidth="0.8" strokeOpacity="0.25" />
              <path
                d="M40 10 L48 28 L68 28 L52 40 L58 58 L40 46 L22 58 L28 40 L12 28 L32 28 Z"
                fill="none"
                stroke="#d97706"
                strokeWidth="0.6"
                strokeOpacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-geom-light)" />
        </svg>
      </div>

      {/* Night Mode: Movable & Animated Islamic Crescent Moon (Hilal) with Twinkling Constellation Stars */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-700 flex items-center justify-center">
        {/* Deep celestial radial nebula glow - animated pulse */}
        <div
          className="absolute w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-emerald-600/20 via-teal-500/15 to-amber-400/20 blur-3xl -top-16 left-1/2 transition-transform duration-300 ease-out animate-pulse"
          style={{
            transform: `translate3d(calc(-50% + ${offset.x * 0.5}px), ${offset.y * 0.5}px, 0)`,
            animationDuration: '6s',
          }}
        />

        {/* Shooting Star Meteor Streak Animation */}
        <div className="absolute top-10 left-[20%] w-48 h-0.5 bg-gradient-to-r from-transparent via-amber-200/80 to-transparent rotate-[-25deg] animate-[shootingStar_9s_ease-in-out_infinite]" />

        {/* The Movable, Animated Crescent Moon (Hilal) with Central 8-Pointed Star */}
        <div
          className="absolute top-3 sm:top-6 left-1/2 transition-transform duration-150 ease-out will-change-transform filter drop-shadow-[0_0_35px_rgba(52,211,153,0.4)]"
          style={{
            transform: `translate3d(calc(-50% + ${offset.x}px), ${offset.y}px, 0)`,
          }}
        >
          {/* Inner floating animation wrapper */}
          <div className="animate-[celestialFloat_7s_ease-in-out_infinite]">
            <svg
              width="290"
              height="290"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform -rotate-12"
            >
              <defs>
                <linearGradient id="crescentGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0.6" />
                </linearGradient>
                <filter id="moonSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Reverent Crescent Moon (Hilal) */}
              <path
                d="M100 15 
                   C145 15 180 50 180 100 
                   C180 150 145 185 100 185 
                   C75 185 52 173 38 155 
                   C68 165 110 155 130 120 
                   C145 92 135 50 95 30 
                   C97 25 98 20 100 15 Z"
                fill="url(#crescentGlow)"
                filter="url(#moonSoftGlow)"
              />

              {/* Islamic 8-Pointed Star (Rub el Hizb) orbiting beside the Crescent */}
              <g
                transform="translate(68, 88) scale(0.68)"
                className="animate-[spin_24s_linear_infinite]"
                style={{ transformOrigin: '25px 27px' }}
              >
                <polygon
                  points="25,0 32,15 47,8 39,23 50,35 35,39 38,55 25,44 12,55 15,39 0,35 11,23 3,8 18,15"
                  fill="#fef08a"
                  className="animate-pulse"
                  style={{ animationDuration: '2.5s' }}
                />
                <circle cx="25" cy="27" r="4.5" fill="#ffffff" />
              </g>
            </svg>
          </div>
        </div>

        {/* Movable Constellation Stars with Parallax Depth Layers */}
        {/* Layer 1: Foreground Stars (Faster shift) */}
        <div
          className="absolute inset-0 transition-transform duration-100 ease-out will-change-transform"
          style={{
            transform: `translate3d(${offset.x * 1.5}px, ${offset.y * 1.5}px, 0)`,
          }}
        >
          {/* Star 1 - Golden Star */}
          <span
            className="absolute top-12 left-[14%] w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_12px_#fde68a] animate-pulse"
            style={{ animationDuration: '2.2s' }}
          />
          {/* Star 2 - Bright Emerald Star */}
          <span
            className="absolute top-20 right-[16%] w-2 h-2 rounded-full bg-emerald-200 shadow-[0_0_12px_#a7f3d0] animate-pulse"
            style={{ animationDuration: '2.8s' }}
          />
          {/* Star 3 - Diamond Star */}
          <span
            className="absolute top-36 right-[24%] w-1.5 h-1.5 rounded-full bg-amber-100 shadow-[0_0_9px_#fef08a] animate-ping"
            style={{ animationDuration: '3.8s' }}
          />
        </div>

        {/* Layer 2: Background Stars (Slower shift) */}
        <div
          className="absolute inset-0 transition-transform duration-100 ease-out will-change-transform"
          style={{
            transform: `translate3d(${offset.x * 0.7}px, ${offset.y * 0.7}px, 0)`,
          }}
        >
          {/* Star 4 */}
          <span
            className="absolute top-28 left-[26%] w-1.5 h-1.5 rounded-full bg-teal-200 shadow-[0_0_8px_#99f6e4] animate-pulse"
            style={{ animationDuration: '3.4s' }}
          />
          {/* Star 5 */}
          <span
            className="absolute top-44 left-[19%] w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_6px_#fcd34d] animate-pulse"
            style={{ animationDuration: '4.1s' }}
          />
          {/* Star 6 */}
          <span
            className="absolute top-32 right-[10%] w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7] animate-pulse"
            style={{ animationDuration: '3.1s' }}
          />
          {/* Star 7 */}
          <span
            className="absolute top-10 left-[44%] w-1 h-1 rounded-full bg-teal-100 shadow-[0_0_6px_#ccfbf1] animate-pulse"
            style={{ animationDuration: '2.6s' }}
          />
          {/* Star 8 */}
          <span
            className="absolute top-52 right-[32%] w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_#fef08a] animate-pulse"
            style={{ animationDuration: '3.9s' }}
          />
        </div>

        {/* Ambient Dark Sacred Night Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="islamic-geom-dark" width="90" height="90" patternUnits="userSpaceOnUse">
                <circle cx="45" cy="45" r="22" fill="none" stroke="#10b981" strokeWidth="0.7" strokeOpacity="0.4" />
                <circle cx="45" cy="45" r="38" fill="none" stroke="#059669" strokeWidth="0.5" strokeOpacity="0.25" />
                <path
                  d="M45 0 L90 45 L45 90 L0 45 Z"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="0.6"
                  strokeOpacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-geom-dark)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
