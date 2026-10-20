'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { PlusCircle, Search, Edit2, Trash2, ExternalLink, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { Post } from '@/lib/db';

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/posts?${params.toString()}`);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error('Fetch posts error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ text: 'Article deleted successfully', type: 'success' });
        setPosts(posts.filter((p) => p.id !== id));
      } else {
        setMessage({ text: 'Failed to delete article', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Error deleting article', type: 'error' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Article & Post Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Create, edit, optimize SEO metadata, and publish high-value Islamic guides.
            </p>
          </div>

          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs shadow-md shadow-brand-900/10 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Article</span>
          </Link>
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

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by title, keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          </form>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-slate-500 font-medium">Filter Status:</span>
            <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-md transition ${
                  statusFilter === 'all' ? 'bg-white shadow-xs text-brand-900' : 'text-slate-600'
                }`}
                aria-label="Filter all articles"
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('published')}
                className={`px-3 py-1 rounded-md transition ${
                  statusFilter === 'published' ? 'bg-white shadow-xs text-emerald-700' : 'text-slate-600'
                }`}
                aria-label="Filter published articles"
              >
                Published
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('draft')}
                className={`px-3 py-1 rounded-md transition ${
                  statusFilter === 'draft' ? 'bg-white shadow-xs text-amber-700' : 'text-slate-600'
                }`}
                aria-label="Filter draft articles"
              >
                Drafts
              </button>
            </div>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              Loading articles from database...
            </div>
          ) : posts.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              No articles match the specified criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <th className="py-3.5 px-6">Title & Focus Keyword</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Word Count</th>
                    <th className="py-3.5 px-4">Views</th>
                    <th className="py-3.5 px-4">Published</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {posts.map((post) => {
                    const wordCount = post.content ? post.content.split(/\s+/).length : 0;
                    return (
                      <tr key={post.id} className="hover:bg-slate-50">
                        <td className="py-4 px-6 max-w-md">
                          <Link
                            href={`/admin/posts/${post.id}`}
                            className="font-bold text-slate-900 hover:text-brand-800 transition block truncate"
                          >
                            {post.title}
                          </Link>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Focus: <span className="font-semibold text-brand-700">{post.focus_keyword || 'N/A'}</span> • /blog/{post.slug}
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            {post.categoryName || 'General'}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              post.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`font-semibold ${
                              wordCount >= 1000 ? 'text-emerald-700' : 'text-slate-600'
                            }`}
                          >
                            {wordCount.toLocaleString()} words
                          </span>
                          {wordCount >= 1000 && (
                            <span className="ml-1 text-[10px] text-emerald-600 font-bold">✓ &gt;1k</span>
                          )}
                        </td>
                        <td className="py-4 px-4 font-semibold text-slate-900 whitespace-nowrap">
                          {post.views}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-slate-500">
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap space-x-1">
                          <Link
                            href={`/admin/posts/${post.id}`}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-800 font-bold transition inline-block text-slate-600"
                            title="Edit Post"
                            aria-label={`Edit article ${post.title}`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold transition inline-block text-slate-600"
                            title="View Live"
                            aria-label={`View live article ${post.title}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(post.id, post.title)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-700 font-bold transition inline-block text-slate-600 cursor-pointer"
                            title="Delete Post"
                            aria-label={`Delete article ${post.title}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
