'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  ChevronDown,
  BookOpen,
  Clock,
  Download,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  HelpCircle,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { FAQItem, FAQ_CATEGORIES } from '@/lib/faqs-data';

interface FAQDirectoryProps {
  items: FAQItem[];
}

export default function FAQDirectory({ items }: FAQDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    // Open the first 3 items by default
    const initial: Record<string, boolean> = {};
    items.slice(0, 3).forEach((item) => {
      initial[item.id] = true;
    });
    return initial;
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    items.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenIds(allOpen);
  };

  const collapseAll = () => {
    setOpenIds({});
  };

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!query) return true;

      const inQuestion = item.question.toLowerCase().includes(query);
      const inAnswer = item.answer.toLowerCase().includes(query);
      const inKeywords = item.keywords.some((k) => k.toLowerCase().includes(query));

      return inQuestion || inAnswer || inKeywords;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Bar & Category Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-5">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <input
            type="text"
            placeholder="Search questions (e.g. 'calicut', 'zuhar', '15 line', 'janaza', 'para 2', 'faraiz')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Counter and Expand/Collapse Controls */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>
            Showing <strong>{filteredItems.length}</strong> of <strong>{items.length}</strong> verified Islamic questions
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={expandAll}
              className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              Expand All
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={collapseAll}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-semibold cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4">
          <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            No Questions Matched &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Try searching for broader keywords like <em>&ldquo;rakat&rdquo;</em>, <em>&ldquo;quran&rdquo;</em>, <em>&ldquo;calicut&rdquo;</em>, or reset your search.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer group"
                >
                  <div className="space-y-1.5 min-w-0 pr-2">
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {item.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 animate-in fade-in duration-150">
                    <p className="pt-3">{item.answer}</p>

                    {item.link && (
                      <div className="pt-2">
                        <Link
                          href={item.link.href}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 font-bold text-xs hover:bg-emerald-100 dark:hover:bg-emerald-950 transition"
                        >
                          <span>{item.link.text}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
