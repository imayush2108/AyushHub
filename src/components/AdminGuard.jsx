import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from './AdminLogin';
import AdminView from './AdminView';
import { supabaseConfig } from '../lib/supabase';

export default function AdminGuard({ onNavigate }) {
  const { user, isAdmin, loading, isConfigured, logout, adminCheckStatus } = useAuth();

  // 1. Loading State (Checking session and verification)
  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-blue-500/40 flex items-center justify-center shadow-lg shadow-blue-900/20">
            <span className="material-symbols-outlined text-[32px] text-blue-400 animate-pulse">
              shield
            </span>
          </div>
          <div className="absolute -inset-2 border-2 border-blue-500/20 border-t-blue-500 rounded-3xl animate-spin"></div>
        </div>
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-blue-400 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
          Nexus Clearance Verification
        </div>
        <p className="text-sm text-slate-400">Verifying cryptographic session tokens...</p>
      </div>
    );
  }

  // 2. Unconfigured State (Supabase credentials not yet supplied)
  if (!isConfigured) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <span className="material-symbols-outlined text-[28px]">lock_clock</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-semibold">
                  Setup Required
                </span>
                <span className="font-mono text-xs text-slate-400">Console Nexus Gateway</span>
              </div>
              <h1 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Admin Panel Security Initializer
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                The Admin Panel is locked. To activate secure email-and-password login, provide your Supabase project credentials.
              </p>
            </div>
          </div>

          {/* Diagnostics Check */}
          <div className="space-y-2 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">VITE_SUPABASE_URL</span>
              {supabaseConfig.url ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span> Detected
                </span>
              ) : (
                <span className="text-red-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">cancel</span> Missing
                </span>
              )}
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">VITE_SUPABASE_ANON_KEY</span>
              {supabaseConfig.hasAnonKey ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span> Detected
                </span>
              ) : (
                <span className="text-red-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">cancel</span> Missing
                </span>
              )}
            </div>
          </div>

          {/* Quick Setup Instructions */}
          <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-xs text-slate-300 space-y-2 mb-6">
            <p className="font-semibold text-blue-300 flex items-center gap-1.5 text-sm">
              <span className="material-symbols-outlined text-[18px]">terminal</span> Quick 2-Minute Activation:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
              <li>Create a free project at <span className="text-blue-400 font-mono">supabase.com</span>.</li>
              <li>Go to <strong className="text-slate-200">Project Settings &gt; API</strong> to copy your Project URL &amp; Public Anon Key.</li>
              <li>Add them to your local <code className="text-blue-300 bg-slate-900 px-1.5 py-0.5 rounded">.env.local</code> file (and to GitHub Repository Secrets for production).</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Return to Ayush Hub</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-blue-900/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span>Recheck Configuration</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Unauthenticated State (Prompt for Email & Password)
  if (!user) {
    return <AdminLogin onNavigate={onNavigate} />;
  }

  // 4. Authenticated but Unauthorized User (User exists in Supabase, but is not in admin_profiles)
  if (!isAdmin) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-red-500/30 shadow-2xl backdrop-blur-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px]">no_accounts</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 font-mono text-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            Access Denied // Unauthorized User
          </div>

          <h2 className="font-heading text-xl font-bold text-white mb-1">
            Clearance Level Insufficient
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            You are signed in as:
          </p>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-blue-400 mb-5 break-all">
            {user.email}
          </div>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            This account does not have SuperAdmin permissions for the Ayush Hub Console Nexus. Only the designated administrator account is permitted.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => logout()}
              className="w-full py-2.5 px-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Sign Out &amp; Use Admin Account</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Return to Ayush Hub</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. Authenticated & Authorized SuperAdmin
  return <AdminView onNavigate={onNavigate} currentUser={user} onLogout={logout} />;
}
