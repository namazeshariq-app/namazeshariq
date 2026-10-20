'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/lib/articles-data';

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQAccordion({ items, title = 'Frequently Asked Questions' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <section className="my-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors duration-200" aria-label={title}>
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800/60">
          <HelpCircle className="w-4 h-4" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-btn-${index}`;
          const contentId = `faq-content-${index}`;

          return (
            <div
              key={index}
              className={`border rounded-xl transition-all ${
                isOpen
                  ? 'border-brand-500/70 dark:border-emerald-500/60 bg-brand-50/40 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full py-4 px-5 text-left rtl:text-right flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-slate-100 text-base cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={contentId}
                aria-label={item.question}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-700 dark:text-emerald-400' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-4 pt-1 text-slate-700 dark:text-slate-300 text-sm leading-relaxed border-t border-brand-100/60 dark:border-slate-800/80"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
