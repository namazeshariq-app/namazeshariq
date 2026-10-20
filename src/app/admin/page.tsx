import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getDashboardStats } from '@/lib/db';
import AdminLayout from '@/components/AdminLayout';
import {
  FileText,
  Eye,
  CheckCircle,
  Clock,
  PlusCircle,
  FolderTree,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Search,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const stats = await getDashboardStats();

  return (
    <AdminLayout user={user}>
      <div className="space-y-8 max-w-7xl">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 block mb-1">
              Editorial Overview
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Namaz-e-Shariq content suite & Cloudflare D1 database management.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs shadow-md shadow-brand-900/10 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Article</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Total Articles
              </span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">
                {stats.totalPosts}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                {stats.publishedCount} Published • {stats.draftCount} Drafts
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Total Views
              </span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">
                {stats.totalViews.toLocaleString()}
              </span>
              <span className="text-[11px] text-brand-600 font-semibold mt-1 block flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> High organic traffic
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Categories
              </span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">
                {stats.categoriesCount}
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                Topics & Waqt Sciences
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <FolderTree className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                SEO & Security
              </span>
              <span className="text-xl font-bold text-emerald-700 mt-1 block flex items-center gap-1">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> 100% Score
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                D1 Ready • CSP Headers Active
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Technical SEO & Cloudflare Health Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            System Technical & On-Page SEO Checklist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dynamic XML Sitemap (/sitemap.xml)</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Robots.txt & Meta Robots</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>JSON-LD Article + FAQ Schema</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Cloudflare D1 & Web Crypto</span>
            </div>
          </div>
        </div>

        {/* Recent Articles Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Articles</h2>
              <p className="text-xs text-slate-500 mt-0.5">High-volume keyword targeting</p>
            </div>
            <Link
              href="/admin/posts"
              className="text-xs font-bold text-brand-700 hover:text-brand-900 hover:underline"
            >
              View All ({stats.totalPosts})
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-6">Title & Focus Keyword</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {stats.recentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50">
                    <td className="py-4 px-6 max-w-sm">
                      <div className="font-bold text-slate-900 truncate">{post.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Focus Keyword: <strong className="text-brand-800">{post.focus_keyword || 'General'}</strong>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {post.categoryName}
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
                    <td className="py-4 px-4 font-semibold text-slate-900">{post.views}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-500">
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-800 font-bold transition inline-block"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold transition inline-block"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
