'use client';

import React, { useState, useEffect } from 'react';
import {
  Download,
  Eye,
  X,
  ExternalLink,
  BookOpen,
  Sparkles,
  FileText,
  CheckCircle2,
  Maximize2,
  RefreshCw,
} from 'lucide-react';

export interface QuranEdition {
  id: string;
  language: string;
  nativeTitle: string;
  description: string;
  downloadUrl: string;
  badge: string;
  badgeColor: string;
  tag: string;
  accentBorder: string;
  format: string;
  pagesInfo: string;
}

export const QURAN_EDITIONS: QuranEdition[] = [
  {
    id: 'arabic',
    language: 'Arabic Mushaf (Big Font)',
    nativeTitle: 'القرآن الكريم (خط عثماني كبير)',
    description:
      'The original noble Arabic text rendered in large, high-clarity Uthmani calligraphy with complete vowel marks (Harakat), Waqf pause indicators, and verse symbols.',
    downloadUrl: 'https://www.pdfquran.com/download/big/big-quran.pdf',
    badge: 'AR',
    badgeColor: 'bg-emerald-600 text-white',
    tag: 'Original Arabic • Big Script',
    accentBorder: 'hover:border-emerald-500/60',
    format: 'PDF',
    pagesInfo: 'Large Clear Font • Complete Mushaf',
  },
  {
    id: 'english',
    language: 'English Translation',
    nativeTitle: 'The Holy Quran (English Translation)',
    description:
      'Lucid and authentic contemporary English translation featuring clear verse phrasing, explanatory footnotes, and contextual commentary for study and reflection.',
    downloadUrl: 'https://www.pdfquran.com/download/english/english-quran.pdf',
    badge: 'EN',
    badgeColor: 'bg-brand-600 text-white',
    tag: 'English Translation & Notes',
    accentBorder: 'hover:border-brand-500/60',
    format: 'PDF',
    pagesInfo: 'English Commentary • Full Revelation',
  },
  {
    id: 'urdu',
    language: 'Urdu Translation & Tafseer',
    nativeTitle: 'قرآن مجید اردو ترجمہ و تفسیر',
    description:
      'Faithful and revered Urdu translation in crisp Nastaliq typography with authentic scholarly commentary, word-for-word explanations, and thematic summaries.',
    downloadUrl: 'https://www.pdfquran.com/download/urdu/urdu-quran.pdf',
    badge: 'UR',
    badgeColor: 'bg-teal-600 text-white',
    tag: 'اردو ترجمہ • Nastaliq Typography',
    accentBorder: 'hover:border-teal-500/60',
    format: 'PDF',
    pagesInfo: 'Urdu Tarjuma • Scholars Commentary',
  },
  {
    id: 'telugu',
    language: 'Telugu Translation',
    nativeTitle: 'దివ్య ఖురాన్ (తెలుగు అనువాదం)',
    description:
      'Comprehensive and verified Telugu translation of the Holy Quran, rendered in fluent, accessible Telugu script for native Telugu speakers and seekers of knowledge.',
    downloadUrl: 'https://www.pdfquran.com/download/telugu/telugu-quran.pdf',
    badge: 'TE',
    badgeColor: 'bg-amber-600 text-white',
    tag: 'తెలుగు అనువాదం • Complete Edition',
    accentBorder: 'hover:border-amber-500/60',
    format: 'PDF',
    pagesInfo: 'Verified Telugu • Easy To Read',
  },
];

export default function QuranDownloadHub() {
  const [previewEdition, setPreviewEdition] = useState<QuranEdition | null>(null);
  const [viewerMode, setViewerMode] = useState<'direct' | 'google'>('direct');
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

  // Close preview modal on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setPreviewEdition(null);
      }
    }
    if (previewEdition) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [previewEdition]);

  const handleOpenPreview = (edition: QuranEdition) => {
    setPreviewEdition(edition);
    setIframeLoading(true);
    setViewerMode('direct');
  };

  const getPreviewUrl = (url: string, mode: 'direct' | 'google') => {
    if (mode === 'google') {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
    }
    // Direct browser PDF viewer stream
    return `${url}#toolbar=1&navpanes=0&scrollbar=1`;
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
            <Download className="w-3.5 h-3.5" />
            Direct Download & Live Online Reading
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Download Quran Books in Your Language & Preview Online
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Choose your preferred translation below to download the complete Holy Quran PDF for offline study or click <span className="font-semibold text-emerald-700 dark:text-emerald-400">&ldquo;Preview&rdquo;</span> to read it instantly in your browser.
          </p>
        </div>
      </div>

      {/* 4 Multi-Language Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {QURAN_EDITIONS.map((ed) => (
          <div
            key={ed.id}
            className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-5 transition-all duration-200 ${ed.accentBorder} hover:shadow-md group`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`w-10 h-10 rounded-2xl ${ed.badgeColor} flex items-center justify-center font-extrabold text-xs shadow-xs tracking-wider`}
                >
                  {ed.badge}
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {ed.format}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 block mb-0.5">
                  {ed.tag}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {ed.language}
                </h3>
                <p className="text-xs font-arabic font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  {ed.nativeTitle}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                {ed.description}
              </p>

              <div className="pt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{ed.pagesInfo}</span>
              </div>
            </div>

            {/* Action Buttons: Preview & Download */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => handleOpenPreview(ed)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                title={`Preview ${ed.language} online`}
              >
                <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Preview Online</span>
              </button>

              <a
                href={ed.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                title={`Direct download ${ed.language} PDF`}
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bonus Companion Reference Guide Card */}
      <div className="bg-gradient-to-r from-emerald-900/90 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Holy Quran Para 1 &amp; 30 Para Guide (Verified Digital Mushaf)
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Download Quran Para 1 (Alif Lam Meem) &amp; 30 Para Guide
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Access the complete 27-page high-definition digital Mushaf of Para 1 featuring Surah Al-Fatiha and Surah Al-Baqarah in classical calligraphy, complete with the 30 Para boundaries and Tajweed markers.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() =>
              handleOpenPreview({
                id: '30-para-guide',
                language: 'Holy Quran Para 1 (Alif Lam Meem) Mushaf',
                nativeTitle: 'القرآن الكريم - الجزء الأول (الم)',
                description:
                  'High-resolution 27-page digital Mushaf of Para 1 containing Surah Al-Fatiha and Surah Al-Baqarah with traditional ornamentation and Tajweed pause markers.',
                downloadUrl: '/downloads/holy-quran-guide-and-index.pdf',
                badge: 'JUZ 1',
                badgeColor: 'bg-emerald-600 text-white',
                tag: 'Para 1 Mushaf & Index',
                accentBorder: 'border-emerald-500',
                format: 'PDF',
                pagesInfo: '27 Pages • Classical Calligraphy',
              })
            }
            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/20 transition cursor-pointer"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Preview Online</span>
          </button>

          <a
            href="/downloads/holy-quran-guide-and-index.pdf"
            download="holy-quran-para-1-and-guide.pdf"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Interactive PDF Preview Modal */}
      {previewEdition && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${previewEdition.language} PDF Preview`}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewEdition(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-9 h-9 rounded-xl ${previewEdition.badgeColor} flex items-center justify-center font-extrabold text-xs shrink-0 shadow-xs`}
                >
                  {previewEdition.badge}
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base truncate">
                    {previewEdition.language} &mdash; Live Preview
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic truncate">
                    {previewEdition.nativeTitle}
                  </p>
                </div>
              </div>

              {/* Action Buttons in Modal Header */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Viewer Mode Switcher */}
                <div className="hidden sm:inline-flex items-center bg-slate-200 dark:bg-slate-800 rounded-xl p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setViewerMode('direct');
                      setIframeLoading(true);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                      viewerMode === 'direct'
                        ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    Direct View
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setViewerMode('google');
                      setIframeLoading(true);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                      viewerMode === 'google'
                        ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    Google Viewer
                  </button>
                </div>

                <a
                  href={previewEdition.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition"
                  title="Open full PDF in separate browser tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Full Screen</span>
                </a>

                <a
                  href={previewEdition.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition"
                  title="Download this PDF file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <button
                  type="button"
                  onClick={() => setPreviewEdition(null)}
                  className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Iframe Viewport */}
            <div className="flex-1 bg-slate-100 dark:bg-slate-950 relative overflow-hidden flex flex-col">
              {iframeLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 gap-3">
                  <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-semibold">Loading {previewEdition.language} Mushaf preview...</p>
                  <p className="text-[11px] text-slate-400">Rendering high-resolution pages</p>
                </div>
              )}

              <iframe
                key={`${previewEdition.id}-${viewerMode}`}
                src={getPreviewUrl(previewEdition.downloadUrl, viewerMode)}
                title={`Holy Quran Preview - ${previewEdition.language}`}
                className="w-full h-full border-0 grow"
                onLoad={() => setIframeLoading(false)}
                allow="autoplay; fullscreen"
              />

              {/* Mobile / Fallback Helper Strip */}
              <div className="p-2 sm:p-2.5 bg-slate-900 text-white text-[11px] sm:text-xs flex flex-wrap items-center justify-between gap-2 px-4 border-t border-slate-800">
                <span className="text-slate-300">
                  📱 Mobile tip: If the in-page preview is small, click <strong>&ldquo;Full Screen&rdquo;</strong> for touch-scroll reading.
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={previewEdition.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
