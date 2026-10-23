'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { marked } from 'marked';
import {
  Save,
  Eye,
  Edit3,
  Search,
  Sparkles,
  HelpCircle,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Layers,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { Category, Post } from '@/lib/db';
import { slugify } from '@/lib/seo';
import { FAQItem } from '@/lib/articles-data';

interface PostEditorProps {
  initialPost?: Partial<Post>;
  categories: Category[];
  isNew?: boolean;
}

export default function PostEditor({ initialPost, categories, isNew = false }: PostEditorProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [categoryId, setCategoryId] = useState(initialPost?.category_id || categories[0]?.id || '');
  const [status, setStatus] = useState<'published' | 'draft'>(initialPost?.status || 'published');
  const [featuredImage, setFeaturedImage] = useState(
    initialPost?.featured_image || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80'
  );
  const [imageAlt, setImageAlt] = useState(initialPost?.image_alt || '');
  const [focusKeyword, setFocusKeyword] = useState(initialPost?.focus_keyword || '');
  const [metaTitle, setMetaTitle] = useState(initialPost?.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(initialPost?.meta_description || '');
  const [canonicalUrl, setCanonicalUrl] = useState(initialPost?.canonical_url || '');
  const [keywords, setKeywords] = useState(initialPost?.keywords || '');
  const [schemaType, setSchemaType] = useState(initialPost?.schema_type || 'Article');
  const [authorName, setAuthorName] = useState(initialPost?.author_name || 'Mufti & Editorial Board');

  // FAQs
  let parsedFaqs: FAQItem[] = [];
  try {
    parsedFaqs = typeof initialPost?.faqs === 'string' ? JSON.parse(initialPost.faqs) : initialPost?.faqs || [];
  } catch {
    parsedFaqs = [];
  }
  const [faqs, setFaqs] = useState<FAQItem[]>(parsedFaqs);

  // UI state
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Live calculations
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Focus keyword density calculation
  const keywordCount =
    focusKeyword.trim() && content
      ? (content.toLowerCase().match(new RegExp(focusKeyword.trim().toLowerCase(), 'g')) || []).length
      : 0;
  const keywordDensity = wordCount > 0 ? ((keywordCount / wordCount) * 100).toFixed(2) : '0';

  const handleAutoSlug = () => {
    if (title) {
      setSlug(slugify(title));
    }
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) {
      setMessage({ text: 'Title and URL slug are required', type: 'error' });
      return;
    }

    setSaving(true);
    setMessage(null);

    const postPayload = {
      title,
      slug,
      content,
      excerpt: excerpt || content.slice(0, 160),
      category_id: categoryId,
      status,
      featured_image: featuredImage,
      image_alt: imageAlt || title,
      focus_keyword: focusKeyword,
      meta_title: metaTitle || title,
      meta_description: metaDescription || excerpt,
      canonical_url: canonicalUrl || `https://namaz-e-shariq.com/blog/${slug}`,
      keywords,
      schema_type: schemaType,
      author_name: authorName,
      reading_time: readingTime,
      faqs: JSON.stringify(faqs),
    };

    try {
      const url = isNew ? '/api/admin/posts' : `/api/admin/posts/${initialPost?.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save article');
      }

      setMessage({ text: isNew ? 'Article created successfully!' : 'Article updated successfully!', type: 'success' });

      if (isNew) {
        setTimeout(() => {
          router.push('/admin/posts');
        }, 1200);
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Error occurred while saving', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-7xl">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs sticky top-4 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">
              {isNew ? 'Create New Article' : `Edit: ${initialPost?.title?.slice(0, 40)}...`}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span
                className={`font-bold ${
                  wordCount >= 1000 ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {wordCount} words
              </span>
              <span>•</span>
              <span>{readingTime} min read</span>
              {wordCount >= 1000 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  ✓ Target &gt;1,000 words achieved
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="post-status-select" className="sr-only">Publication Status</label>
          <select
            id="post-status-select"
            aria-label="Publication Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
            className="text-xs font-bold border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-slate-800 focus:ring-2 focus:ring-brand-500"
          >
            <option value="published">Status: Published</option>
            <option value="draft">Status: Draft</option>
          </select>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs shadow-md shadow-brand-900/10 transition disabled:opacity-70 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Article'}</span>
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 border ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Content Editor (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Article Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Complete Guide to Daily Namaz Rakats"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-base font-bold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  URL Slug <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleAutoSlug}
                  className="text-[11px] font-bold text-brand-700 hover:underline"
                >
                  Generate from title
                </button>
              </div>
              <div className="flex items-center">
                <span className="px-3 py-2.5 rounded-l-xl bg-slate-100 border border-r-0 border-slate-300 text-xs text-slate-500">
                  /blog/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="complete-guide-daily-namaz-rakats"
                  className="w-full px-3 py-2.5 rounded-r-xl border border-slate-300 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Article Excerpt (Short summary for listings and search engines)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Detailed breakdown of Fard, Sunnah, Nafl, and Witr prayers across all five daily milestones..."
                className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-700 focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Main Body Markdown Editor */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'write' ? 'bg-white shadow-xs text-brand-900' : 'text-slate-600'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Write Markdown</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'preview' ? 'bg-white shadow-xs text-brand-900' : 'text-slate-600'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </button>
              </div>

              <span className="text-xs text-slate-500">
                Supports headings (##, ###), bullet points, and markdown tables
              </span>
            </div>

            {activeTab === 'write' ? (
              <textarea
                rows={22}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="## Introduction: The Architecture of Daily Islamic Prayer&#10;&#10;Salah (Namaz) stands as the second pillar of Islam..."
                className="w-full p-6 text-sm font-mono text-slate-800 leading-relaxed focus:outline-hidden resize-y"
              />
            ) : (
              <div className="p-6 sm:p-8 min-h-[400px]">
                <div
                  className="prose-custom max-w-none"
                  dangerouslySetInnerHTML={{ __html: marked.parse(content || '*No content to preview*') }}
                />
              </div>
            )}
          </div>

          {/* FAQ Builder Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-700" />
                  FAQ Schema Builder
                </h3>
                <p className="text-xs text-slate-500">
                  Adds rich snippet FAQPage JSON-LD schema to Google search results.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-800 font-bold text-xs transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            {faqs.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">
                No FAQs added yet. Click &ldquo;Add Question&rdquo; to enhance search rich snippets.
              </p>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(idx)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition"
                      title="Remove question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Question #{idx + 1}
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                        placeholder="e.g. How many total rakats in Isha namaz?"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Answer #{idx + 1}
                      </label>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                        placeholder="e.g. The full Isha prayer consists of 17 rakats: 4 Sunnah, 4 Fard..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: SEO & Metadata Controls (1 col) */}
        <div className="space-y-6">
          {/* SEO Performance Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-700" />
              On-Page SEO Scorecard
            </h3>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Length Target (&gt;1,000 words):</span>
                <span className={`font-bold ${wordCount >= 1000 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {wordCount} / 1000 words
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Keyword Density:</span>
                <span className="font-bold text-brand-800">
                  {keywordDensity}% ({keywordCount} times)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Meta Title Length:</span>
                <span className={`font-bold ${(metaTitle || title).length <= 60 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {(metaTitle || title).length} / 60 chars
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Meta Desc Length:</span>
                <span className={`font-bold ${(metaDescription || excerpt).length <= 160 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {(metaDescription || excerpt).length} / 160 chars
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Focus Keyword <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="e.g. namaz rakat"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Meta Title
                </label>
                <span className="text-[10px] text-slate-400">
                  {(metaTitle || title).length}/60
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Custom title tag for Google"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Meta Description
                </label>
                <span className="text-[10px] text-slate-400">
                  {(metaDescription || excerpt).length}/160
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="High CTR snippet for search engines..."
                className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Secondary Keywords (Comma-separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="fajr rakat, isha rakat, namaz timetable"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Canonical URL
              </label>
              <input
                type="text"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder={`https://namaz-e-shariq.com/blog/${slug || 'post-slug'}`}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 font-mono"
              />
            </div>
          </div>

          {/* Publishing & Category Meta */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-700" />
              Taxonomy & Media
            </h3>

            <div>
              <label htmlFor="post-category-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Category
              </label>
              <select
                id="post-category-select"
                aria-label="Category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="post-schema-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Schema JSON-LD Type
              </label>
              <select
                id="post-schema-select"
                aria-label="Schema JSON-LD Type"
                value={schemaType}
                onChange={(e) => setSchemaType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="Article">Article</option>
                <option value="BlogPosting">BlogPosting</option>
                <option value="NewsArticle">NewsArticle</option>
                <option value="FAQPage">FAQPage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Featured Image URL
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Image Alt Text (SEO)
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Descriptive alt text for Google Image Search"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
