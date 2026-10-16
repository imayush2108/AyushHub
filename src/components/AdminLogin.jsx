import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin({ onNavigate }) {
  const { login, resetPassword, authError, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || (!resetMode && !password)) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (resetMode) {
        await resetPassword(email);
        setResetSent(true);
      } else {
        const result = await login(email, password);
        if (result && !result.isAdmin) {
          // Logged in user does not have admin rights
          setErrorMessage('Access Denied: This account is authenticated, but not authorized for Nexus SuperAdmin clearance.');
        }
      }
    } catch (err) {
      const msg = err.message || 'Authentication failed. Please verify credentials.';
      if (msg.includes('Invalid login credentials')) {
        setErrorMessage('Invalid email or password. Please verify your credentials.');
      } else if (msg.includes('Email not confirmed')) {
        setErrorMessage('Email address has not been confirmed. Please check your inbox.');
      } else {
        setErrorMessage(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-12">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Security Shield Header Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-blue-500/30 shadow-lg shadow-blue-900/20 mb-4 group">
            <span className="material-symbols-outlined text-[32px] text-blue-400 group-hover:scale-110 transition-transform">
              security
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-blue-400 px-3 py-0.5 rounded-full bg-slate-900/80 border border-slate-800">
              Nexus Terminal // Clearance Level 5
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight">
            SuperAdmin Access
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-xs mx-auto">
            Ayush Hub Console Nexus is protected. Enter authorized credentials to proceed.
          </p>
        </div>

        {/* Login Form Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/85 border border-slate-800/90 shadow-2xl backdrop-blur-xl">
          {/* Error Alert Display */}
          {(errorMessage || authError) && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in font-sans">
              <span className="material-symbols-outlined text-[20px] text-red-400 shrink-0 mt-0.5">
                error
              </span>
              <div className="flex-1">
                <span className="font-semibold block">Authentication Restricted</span>
                <span className="text-red-200/90">{errorMessage || authError}</span>
              </div>
            </div>
          )}

          {/* Reset Sent Confirmation */}
          {resetSent ? (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-[26px]">mark_email_read</span>
              </div>
              <h2 className="text-base font-semibold text-white mb-1">Recovery Link Dispatched</h2>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                If <span className="text-blue-400 font-mono font-medium">{email}</span> matches an authorized administrator, a secure password reset link has been dispatched to your inbox.
              </p>
              <button
                type="button"
                onClick={() => {
                  setResetMode(false);
                  setResetSent(false);
                  setErrorMessage('');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Back to Admin Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2">
                  Administrator Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[19px]">mail</span>
                  </div>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="admin@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-[#f8fafc] placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Password Input (Hidden during reset mode) */}
              {!resetMode && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                      Security Passcode
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setResetMode(true);
                        setErrorMessage('');
                      }}
                      className="text-[11px] font-mono text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      Forgot Passcode?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined text-[19px]">lock</span>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-[#f8fafc] placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      title={showPassword ? 'Hide passcode' : 'Show passcode'}
                    >
                      <span className="material-symbols-outlined text-[19px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Session Security Indicator */}
              <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-center gap-2.5 text-[11px] text-slate-400">
                <span className="material-symbols-outlined text-blue-400 text-[18px] shrink-0">verified_user</span>
                <span>Session uses 256-bit encrypted JWT with auto-refresh &amp; zero plaintext credential persistence.</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-900/30 hover:shadow-blue-800/50 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting || loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Verifying Security Clearance...</span>
                    </>
                  ) : resetMode ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      <span>Dispatch Password Reset Link</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">key</span>
                      <span>Authorize &amp; Enter Console</span>
                    </>
                  )}
                </button>

                {resetMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setResetMode(false);
                      setErrorMessage('');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Back to Login
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Return to Public Website */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Gateway Online
            </span>
            <button
              onClick={() => onNavigate('home')}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Return to Ayush Hub</span>
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <p className="text-[11px] text-center text-slate-400 mt-6 font-mono leading-relaxed">
          Authorized personnel only. All access attempts and telemetry are cryptographically audited.
        </p>
      </div>
    </div>
  );
}
