'use client';

import React from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  // Extract h2 and h3 markdown headings
  const headings: TOCItem[] = [];
  const lines = content.split('\n');

  lines.forEach((line) => {
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match) {
      const text = h2Match[1].replace(/[*_#`]/g, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      headings.push({ id, text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].replace(/[*_#`]/g, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      headings.push({ id, text, level: 3 });
    }
  });

  if (headings.length < 2) return null;

  return (
    <nav className="my-8 p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60" aria-label="Table of contents">
      <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-slate-100 font-bold text-sm tracking-tight">
        <List className="w-4 h-4 text-brand-700 dark:text-emerald-400" />
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-1.5 text-sm">
        {headings.map((item, idx) => (
          <li
            key={idx}
            className={`${item.level === 3 ? 'ml-4 text-xs' : 'font-medium'}`}
          >
            <a
              href={`#${item.id}`}
              className="text-slate-600 dark:text-slate-300 hover:text-brand-800 dark:hover:text-emerald-300 hover:underline transition block py-0.5"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
