import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getCategories } from '@/lib/db';
import AdminLayout from '@/components/AdminLayout';
import { FolderTree, Tag, Hash, FileText } from 'lucide-react';

export default async function AdminCategoriesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const categories = await getCategories();

  return (
    <AdminLayout user={user}>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Categories & Content Taxonomies
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Topic clusters organizing namaz timings, fiqh guides, and city timetables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center font-bold">
                    <FolderTree className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    /blog?category={cat.slug}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-700">
                  Cluster ID: {cat.id}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px]">
                  {cat.slug}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
