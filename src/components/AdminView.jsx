import React, { useState } from 'react';

export default function AdminView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [backupStatus, setBackupStatus] = useState('');
  const [toast, setToast] = useState(null);
  const [quickAddModal, setQuickAddModal] = useState(false);
  const [quickAddForm, setQuickAddForm] = useState({ title: '', category: 'music', note: '' });
  const [trailersEnabled, setTrailersEnabled] = useState({
    kalki: true,
    avengers: true,
    rrr: true,
  });

  const showToast = (message, icon = 'check_circle') => {
    setToast({ message, icon });
    setTimeout(() => {
      setToast((curr) => (curr && curr.message === message ? null : curr));
    }, 3500);
  };

  const handleBackup = () => {
    setBackupStatus('Backing up node clusters...');
    setTimeout(() => {
      setBackupStatus('✅ Snapshot v4.2.8 backed up to Cold Storage Cloudflare R2!');
      showToast('Snapshot v4.2.8 backed up to Cold Storage Cloudflare R2!', 'cloud_done');
      setTimeout(() => setBackupStatus(''), 4000);
    }, 1200);
  };

  const handleQuickAddSubmit = (e) => {
    e.preventDefault();
    showToast(`Added "${quickAddForm.title}" to ${quickAddForm.category.toUpperCase()} pipeline!`, 'playlist_add');
    setQuickAddModal(false);
    setQuickAddForm({ title: '', category: 'music', note: '' });
  };

  return (
    <div className="w-full text-[#dfe2ee] font-sans pb-20">
      {/* Atmospheric Glow Backdrop */}
      <div className="relative w-full px-4 md:px-10 pb-12">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-32 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* 1. DASHBOARD HEADER & SYSTEM TELEMETRY */}
        <div className="pt-6 md:pt-10 mb-8 md:mb-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                  Nexus Master v4.2 // SuperAdmin
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Synchronized
                </span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#f8fafc] tracking-tight">
                Ayush Hub{' '}
                <span className="text-blue-400 font-normal text-2xl sm:text-3xl align-middle font-mono">
                  // Console Nexus
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-1">
                Centrally orchestrate hi-res streaming lounge releases, editorial film critiques, esports rig benchmarks, and inbound creator collaborations.
              </p>
            </div>

            {/* Primary Action Suite */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={handleBackup}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs sm:text-sm font-semibold shadow-sm hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-blue-400">cloud_sync</span>
                <span>Backup Node</span>
              </button>
              <button
                onClick={() => setQuickAddModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-900/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Quick Add Content</span>
              </button>
            </div>
          </div>

          {backupStatus && (
            <div className="mb-6 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs sm:text-sm flex items-center gap-2 animate-fade-in font-mono">
              <span className="material-symbols-outlined text-[18px]">info</span>
              <span>{backupStatus}</span>
            </div>
          )}

          {/* Quick Telemetry Status Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 rounded-2xl bg-slate-950/70 border border-slate-900 backdrop-blur-md">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">dns</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase truncate">Core Cluster</p>
                <p className="text-xs sm:text-sm font-semibold text-[#f8fafc] flex items-center gap-1.5 truncate">
                  Postgres + Redis
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">speed</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase truncate">Compute Load</p>
                <p className="text-xs sm:text-sm font-semibold text-[#f8fafc] truncate">18.4% Normal</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">router</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase truncate">Edge CDN</p>
                <p className="text-xs sm:text-sm font-semibold text-[#f8fafc] truncate">Cloudflare 0ms Loss</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase truncate">Heartbeat</p>
                <p className="text-xs sm:text-sm font-semibold text-[#f8fafc] truncate font-mono">Synced 2m ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. EXECUTIVE KPI STAT CARDS (4 COLUMNS) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* KPI 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Total Traffic</span>
              <span className="inline-flex items-center gap-1 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +14.8%
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-heading text-3xl font-bold text-[#f8fafc]">48.2k</span>
              <span className="font-mono text-xs text-slate-400">Views / 7d</span>
            </div>
            {/* Sparkline */}
            <div className="w-full h-8 mt-2">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 24">
                <path
                  d="M0,18 Q15,22 30,12 T60,8 T80,14 T100,2"
                  fill="none"
                  stroke="#3b82f6"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Hi-Res Audio</span>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            </div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-heading text-3xl font-bold text-[#f8fafc]">1,420</span>
              <span className="font-mono text-xs text-blue-400 font-semibold">Active Now</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 pt-1 text-slate-400 text-xs">
              <span className="material-symbols-outlined text-[16px] text-blue-400">equalizer</span>
              <p className="truncate">
                Peak: <span className="text-[#f8fafc] font-medium">Born to Shine</span> (Diljit)
              </p>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Editorial Vault</span>
              <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                Cinema Desk
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-heading text-3xl font-bold text-[#f8fafc]">28</span>
              <span className="font-mono text-xs text-slate-400">Films Reviewed</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 pt-1 text-slate-400 text-xs">
              <span className="material-symbols-outlined text-[16px] text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <p className="truncate">
                Critique Score Avg: <span className="text-[#f8fafc] font-semibold">9.1 / 10</span>
              </p>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Inquiries</span>
              <span className="font-mono text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                Action Req
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-heading text-3xl font-bold text-[#f8fafc]">12</span>
              <span className="font-mono text-xs text-slate-400">Pending Leads</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 pt-1 text-slate-400 text-xs">
              <span className="material-symbols-outlined text-[16px] text-red-400">priority_high</span>
              <p className="truncate">
                <span className="text-red-400 font-medium">3 Priority</span> Collab Proposals
              </p>
            </div>
          </div>
        </div>

        {/* 3. CONTENT MANAGEMENT MULTI-DESK */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Left Column: Audio + Cinema (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* MUSIC & AUDIO MANAGER */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/70">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-400 text-[22px]">headphones</span>
                    <h2 className="font-heading text-xl font-bold text-[#f8fafc]">Music &amp; Audio Manager</h2>
                  </div>
                  <p className="text-xs text-slate-400">34 FLAC Master tracks synced to CDN playback nodes</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast('Filter active: Displaying all 34 verified tracks.', 'filter_list')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Filter Genre
                  </button>
                  <button
                    onClick={() => setQuickAddModal(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">upload_file</span>
                    <span>Upload Stems</span>
                  </button>
                </div>
              </div>

              {/* Tracklist Rows */}
              <div className="space-y-3">
                {/* Track 1 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 transition-all gap-3 border border-slate-800/60">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 shrink-0 relative overflow-hidden flex items-center justify-center">
                      <img
                        className="w-full h-full object-cover"
                        src="/images/showcase-bollywood-music.jpg"
                        alt="Born to Shine track"
                        onError={(e) => { e.currentTarget.src = '/images/hero-ayush.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[20px]">music_note</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-[#f8fafc] truncate">Born to Shine</h3>
                        <span className="px-2 py-0.5 rounded-full font-mono text-[10px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                          Live
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">Diljit Dosanjh • 03:22 • Punjabi Hype</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right">
                      <span className="font-mono text-xs text-[#f8fafc] block">24,590 plays</span>
                      <span className="font-mono text-[11px] text-emerald-400 block">99.2% Retention</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => showToast('EQ & Sound profile: Mastered with +2dB Bass Punch & Atmos Spatial.', 'graphic_eq')}
                        className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
                        title="Audio Settings"
                      >
                        <span className="material-symbols-outlined text-[18px]">tune</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Track 2 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 transition-all gap-3 border border-slate-800/60">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 shrink-0 relative overflow-hidden flex items-center justify-center">
                      <img
                        className="w-full h-full object-cover"
                        src="/images/showcase-bollywood-music.jpg"
                        alt="Apna Bana Le track"
                        onError={(e) => { e.currentTarget.src = '/images/hero-ayush.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[20px]">music_note</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-[#f8fafc] truncate">Apna Bana Le</h3>
                        <span className="px-2 py-0.5 rounded-full font-mono text-[10px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                          Live
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">Arijit Singh • 04:18 • Bollywood Soul</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right">
                      <span className="font-mono text-xs text-[#f8fafc] block">18,340 plays</span>
                      <span className="font-mono text-[11px] text-emerald-400 block">94.8% Retention</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => showToast('EQ Profile: Warm Acoustic Vocal Centric.', 'equalizer')}
                        className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
                        title="Audio Settings"
                      >
                        <span className="material-symbols-outlined text-[18px]">tune</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Track 3 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 transition-all gap-3 border border-slate-800/60">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 shrink-0 relative overflow-hidden flex items-center justify-center">
                      <img
                        className="w-full h-full object-cover"
                        src="/images/showcase-bollywood-music.jpg"
                        alt="Softly track"
                        onError={(e) => { e.currentTarget.src = '/images/hero-ayush.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[20px]">music_note</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-[#f8fafc] truncate">Softly</h3>
                        <span className="px-2 py-0.5 rounded-full font-mono text-[10px] bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
                          Featured
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">Karan Aujla • 02:45 • Urban Punjabi</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right">
                      <span className="font-mono text-xs text-[#f8fafc] block">31,200 plays</span>
                      <span className="font-mono text-[11px] text-indigo-400 block">Trending #1</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => showToast('Audio master synced with Spotify & YouTube embed nodes.', 'cloud_done')}
                        className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
                        title="Audio Settings"
                      >
                        <span className="material-symbols-outlined text-[18px]">tune</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CINEMA & REVIEWS DESK */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/70">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-400 text-[22px]">theaters</span>
                    <h2 className="font-heading text-xl font-bold text-[#f8fafc]">
                      Cinema &amp; Film Critique Desk
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400">Editorial ratings, 4K trailer embeds, and premiere review spotlights</p>
                </div>
                <button
                  onClick={() => showToast('Draft editor ready: Kalki 2898 AD, Avengers, RRR already spotlighted.', 'edit_note')}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors inline-flex items-center gap-1 self-start sm:self-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">post_add</span>
                  <span>Draft Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Film 1 */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:bg-slate-800/70 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-full h-32 rounded-lg bg-slate-800 overflow-hidden mb-3 relative">
                      <img
                        className="w-full h-full object-cover"
                        src="/images/showcase-cinema-2026.jpg"
                        alt="Kalki 2898 AD"
                        onError={(e) => { e.currentTarget.src = '/images/hero-ayush.jpg'; }}
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 font-mono text-xs text-amber-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 9.4
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-[#f8fafc]">Kalki 2898 AD</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Sci-Fi Epic • Nag Ashwin</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">videocam</span> 4K Trailer Active
                    </span>
                    <button
                      onClick={() => setTrailersEnabled((p) => ({ ...p, kalki: !p.kalki }))}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors ${
                        trailersEnabled.kalki ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {trailersEnabled.kalki ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>

                {/* Film 2 */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:bg-slate-800/70 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-full h-32 rounded-lg bg-slate-800 overflow-hidden mb-3 relative">
                      <img
                        className="w-full h-full object-cover"
                        src="/images/showcase-cinema-2026.jpg"
                        alt="Avengers Endgame"
                        onError={(e) => { e.currentTarget.src = '/images/hero-ayush.jpg'; }}
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 font-mono text-xs text-amber-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 9.8
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-[#f8fafc]">Avengers: Endgame</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Marvel Saga • Russo Bros</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">videocam</span> 4K Trailer Active
                    </span>
                    <button
                      onClick={() => setTrailersEnabled((p) => ({ ...p, avengers: !p.avengers }))}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors ${
                        trailersEnabled.avengers ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {trailersEnabled.avengers ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>

                {/* Film 3 */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:bg-slate-800/70 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-full h-32 rounded-lg bg-slate-800 overflow-hidden mb-3 relative">
                      <img
                        className="w-full h-full object-cover"
                        src="/images/showcase-cinema-2026.jpg"
                        alt="RRR"
                        onError={(e) => { e.currentTarget.src = '/images/hero-ayush.jpg'; }}
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 font-mono text-xs text-amber-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 9.6
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-[#f8fafc]">RRR</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Action Masterpiece • SS Rajamouli</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">videocam</span> 4K Trailer Active
                    </span>
                    <button
                      onClick={() => setTrailersEnabled((p) => ({ ...p, rrr: !p.rrr }))}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors ${
                        trailersEnabled.rrr ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {trailersEnabled.rrr ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Esports & Battle Station Sync (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-400 text-[22px]">sports_esports</span>
                    <h2 className="font-heading text-lg font-bold text-[#f8fafc]">Esports Telemetry</h2>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    Riot API Linked
                  </span>
                </div>

                {/* Valorant Card */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-blue-400 uppercase font-semibold">Valorant Competitive</span>
                    <span className="font-mono text-[11px] text-slate-400">Mumbai Server</span>
                  </div>
                  <div className="flex items-center gap-3 my-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                      <span className="material-symbols-outlined text-[24px]">shield</span>
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-bold text-[#f8fafc]">Immortal 3</h4>
                      <p className="text-xs text-slate-400">Peak Radiant • 64 RR</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '64%' }}></div>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
                    <span>KD: 4.2K</span>
                    <span>Win Rate: 58.2%</span>
                  </div>
                </div>

                {/* Free Fire Card */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-emerald-400 uppercase font-semibold">Free Fire Pro Arenas</span>
                    <span className="font-mono text-[11px] text-emerald-400">Grandmaster IV</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 my-2">
                    <div className="p-2.5 rounded-lg bg-slate-800/70 border border-slate-700/60">
                      <span className="font-mono text-[10px] text-slate-400 block">Headshot %</span>
                      <span className="font-heading text-lg text-[#f8fafc] font-bold">60%</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-800/70 border border-slate-700/60">
                      <span className="font-mono text-[10px] text-slate-400 block">Squad Kills</span>
                      <span className="font-heading text-lg text-[#f8fafc] font-bold">4,120</span>
                    </div>
                  </div>
                </div>

                {/* Battle Station Hardware Specs */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800">
                  <span className="font-mono text-[11px] text-slate-400 uppercase block mb-2 font-semibold">
                    Ayush Rig Specifications
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#f8fafc]">
                    <li className="flex items-center justify-between">
                      <span className="text-slate-400">GPU</span>
                      <span className="font-mono">RTX 4080 Super OC</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-400">CPU</span>
                      <span className="font-mono">Ryzen 9 7950X3D</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-400">Display</span>
                      <span className="font-mono">240Hz Fast IPS 1ms</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-400">Mic Audio</span>
                      <span className="font-mono">Shure SM7B + GoXLR</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button
                  onClick={() => showToast('Synced latest scrim match logs from Riot & Garena!', 'sync')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">sync</span>
                  <span>Update Match History</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. LIVE INQUIRIES & COLLABORATION REQUESTS TABLE */}
        <div className="max-w-7xl mx-auto p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl font-bold text-[#f8fafc]">Inbound Collaborations</span>
                <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold flex items-center justify-center">
                  3
                </span>
              </div>
              <p className="text-xs text-slate-400">Direct sponsorship &amp; gaming squad propositions</p>
            </div>
            <button
              onClick={() => showToast('Batch process initiated for 3 priority proposals.', 'task_alt')}
              className="text-xs text-blue-400 hover:underline font-mono cursor-pointer"
            >
              Batch Process
            </button>
          </div>

          <div className="space-y-3">
            {/* Lead 1 */}
            <div className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm shrink-0">
                  VM
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#f8fafc]">Vikram Mehta</span>
                    <span className="text-xs text-slate-400 font-mono">• 14m ago</span>
                  </div>
                  <p className="font-mono text-xs text-blue-400">Brand Sponsorship • Red Bull India</p>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    "Proposing exclusive energy partner integration for Ayush Hub's upcoming tournament stream and podcast segment..."
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => showToast('Viewing proposal from Vikram Mehta (Red Bull India)', 'description')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  View
                </button>
                <button
                  onClick={() => showToast('Reply dialog dispatched for Vikram Mehta', 'send')}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reply
                </button>
              </div>
            </div>

            {/* Lead 2 */}
            <div className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-sm shrink-0">
                  RS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#f8fafc]">Rohan Sharma</span>
                    <span className="text-xs text-slate-400 font-mono">• 1h ago</span>
                  </div>
                  <p className="font-mono text-xs text-indigo-400">Gaming Squad • Tier-1 Scrims</p>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    "Inviting Ayush Hub roster to prime slot in Friday's Invitational Scrimmages against Team Soul and GodLike..."
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => showToast('Viewing scrim invite from Rohan Sharma', 'sports_esports')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  View
                </button>
                <button
                  onClick={() => showToast('Slot confirmed for Friday Scrims!', 'check_circle')}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Accept
                </button>
              </div>
            </div>

            {/* Lead 3 */}
            <div className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm shrink-0">
                  AK
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#f8fafc]">Ananya Kapoor</span>
                    <span className="text-xs text-slate-400 font-mono">• 3h ago</span>
                  </div>
                  <p className="font-mono text-xs text-emerald-400">Playlist Curation • Sony Music</p>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    "Reviewing featured placement for Born to Shine on official editorial 'Desi Heatwave' with 450k listeners..."
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => showToast('Viewing placement preview from Sony Music', 'preview')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  View
                </button>
                <button
                  onClick={() => showToast('Playlist addition synced!', 'playlist_add_check')}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add Modal */}
      {quickAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setQuickAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <h3 className="font-heading text-xl font-bold text-[#f8fafc] mb-1">Quick Add Content Item</h3>
            <p className="text-xs text-slate-400 mb-4">Inject a new media asset straight into the live Ayush Hub pipeline.</p>
            
            <form onSubmit={handleQuickAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Title / Track / Movie / Tournament</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diljit Dosanjh New Track or Kalki 2 Teaser"
                  value={quickAddForm.title}
                  onChange={(e) => setQuickAddForm({ ...quickAddForm, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-[#f8fafc] focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Target Module</label>
                <select
                  value={quickAddForm.category}
                  onChange={(e) => setQuickAddForm({ ...quickAddForm, category: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-[#f8fafc] focus:outline-none focus:border-blue-500"
                >
                  <option value="music">Music Lounge</option>
                  <option value="movies">Cinema Stills Vault</option>
                  <option value="gaming">Gaming Arena &amp; Scrims</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Notes / Spotify URI / YouTube ID</label>
                <input
                  type="text"
                  placeholder="e.g. spotify:track:xxx or YouTube video ID"
                  value={quickAddForm.note}
                  onChange={(e) => setQuickAddForm({ ...quickAddForm, note: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-[#f8fafc] focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setQuickAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-900/30"
                >
                  Publish Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 xl:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/95 border border-blue-500/40 text-white shadow-2xl backdrop-blur-xl animate-fade-in font-sans max-w-md w-[90%] sm:w-auto">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">{toast.icon || 'check_circle'}</span>
          </div>
          <span className="text-xs sm:text-sm font-medium flex-1">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
