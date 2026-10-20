'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, PlusCircle, FolderTree, Settings, LogOut, Compass, ExternalLink } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  user?: { name: string; username: string };
}

export default function AdminLayout({ children, user }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'All Posts', href: '/admin/posts', icon: FileText },
    { name: 'New Post', href: '/admin/posts/new', icon: PlusCircle },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="Namaz-e-Shariq Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-white text-sm block">Namaz-e-Shariq</span>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">Admin Suite</span>
            </div>
          </Link>
        </div>

        {/* User Mini Profile */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-white block">{user?.name || 'Administrator'}</span>
            <span className="text-[11px] text-slate-400 block">@{user?.username || 'admin'}</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  active
                    ? 'bg-brand-700 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Visit Live Website</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition text-left font-semibold cursor-pointer"
            aria-label="Log Out of Admin Panel"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="grow p-6 sm:p-8 lg:p-10 overflow-x-auto">
        {children}
      </main>
    </div>
  );
}
