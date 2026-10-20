'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const autofillDemo = () => {
    setUsername('admin');
    setPassword('AdminPassword2026!');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-800 text-emerald-300 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-900/30">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Namaz-e-Shariq Admin
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Sign in to manage SEO pillar articles, waqt parameters, and categories
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-brand-900/20 disabled:opacity-70 cursor-pointer"
            aria-label="Sign In to Admin Dashboard"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo credentials hint button */}
        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500 mb-2">
            Default credentials: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">admin</code> / <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">AdminPassword2026!</code>
          </p>
          <button
            type="button"
            onClick={autofillDemo}
            className="text-xs font-bold text-brand-700 hover:text-brand-900 hover:underline"
            aria-label="Autofill default admin credentials"
          >
            Autofill Default Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
