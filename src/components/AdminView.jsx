import React, { useState, useMemo } from 'react';
import { useContent, deepMerge } from '../context/ContentContext';
import { defaultSiteContent } from '../data/defaultSiteContent';

// Helper to extract clean YouTube ID from any format
function extractYouTubeId(urlOrId) {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('.')) {
    return trimmed;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : trimmed;
}

// Helper to extract clean Spotify Track ID
function extractSpotifyTrackId(urlOrId) {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  if (!trimmed.includes('/') && trimmed.length > 15) {
    return trimmed;
  }
  const match = trimmed.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : trimmed;
}

export default function AdminView({ onNavigate, currentUser, onLogout }) {
  const {
    songs,
    movies,
    siteContent,
    collaborations,
    stats,
    isSyncing,
    syncStatus,
    addSong,
    updateSong,
    deleteSong,
    toggleSongPublish,
    addMovie,
    updateMovie,
    deleteMovie,
    toggleMoviePublish,
    updateSiteSection,
    updateSocialLinks,
    updateCollaborationStatus,
    deleteCollaboration,
    seedToDatabase,
  } = useContent();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'songs' | 'movies' | 'content' | 'social' | 'collabs'
  const [toast, setToast] = useState(null);
  const [backupStatus, setBackupStatus] = useState('');

  // Search & Filter States
  const [songSearch, setSongSearch] = useState('');
  const [songFilterCategory, setSongFilterCategory] = useState('all');
  const [songFilterStatus, setSongFilterStatus] = useState('all'); // 'all' | 'published' | 'draft'

  const [movieSearch, setMovieSearch] = useState('');
  const [movieFilterCategory, setMovieFilterCategory] = useState('all');
  const [movieFilterStatus, setMovieFilterStatus] = useState('all');

  // Song Modal State
  const [songModalOpen, setSongModalOpen] = useState(false);
  const [editingSongId, setEditingSongId] = useState(null);
  const [songForm, setSongForm] = useState({
    title: '',
    artist: '',
    movie: '',
    category: 'bollywood',
    platform: 'both',
    youtubeId: '',
    spotifyTrackId: '',
    spotifyUrl: '',
    duration: '3:30 min',
    genre: 'Bollywood',
    mood: 'Energetic',
    rating: '9.5/10',
    coverUrl: '',
    ayushNote: '',
    lyrics: '',
    isPublished: true,
  });

  // Movie Modal State
  const [movieModalOpen, setMovieModalOpen] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [movieForm, setMovieForm] = useState({
    title: '',
    franchise: '',
    category: 'bollywood',
    releaseYear: '2024',
    releaseDate: '',
    duration: '2h 30m',
    genre: 'Action / Drama',
    director: '',
    cast: '',
    primaryLanguages: 'Hindi',
    rating: '9.0',
    verdict: "Editor's Choice ★ 9.0/10",
    youtubeId: '',
    posterUrl: '',
    backdropUrl: '',
    overview: '',
    review: '',
    status: 'published', // 'published' | 'draft' | 'featured'
    isPublished: true,
    displayOrder: 0,
  });

  // Delete Confirmation Modal
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    type: null, // 'song' | 'movie' | 'collab'
    id: null,
    title: '',
  });

  // Content Editor Local State
  const [contentForm, setContentForm] = useState(() => deepMerge(defaultSiteContent, siteContent || {}));
  const [contentSubTab, setContentSubTab] = useState('home'); // 'home' | 'services' | 'gaming' | 'about' | 'mediaHeaders' | 'footer'
  const [socialForm, setSocialForm] = useState({ ...(siteContent.socialLinks || {}) });

  // Update contentForm when siteContent changes
  React.useEffect(() => {
    setContentForm(deepMerge(defaultSiteContent, siteContent || {}));
    setSocialForm({ ...(siteContent.socialLinks || {}) });
  }, [siteContent]);

  const showToast = (message, icon = 'check_circle') => {
    setToast({ message, icon });
    setTimeout(() => {
      setToast((curr) => (curr && curr.message === message ? null : curr));
    }, 3500);
  };

  // 1-Click Database Seed / Backup
  const handleBackup = async () => {
    setBackupStatus('Syncing & seeding live node clusters to Supabase...');
    try {
      const result = await seedToDatabase();
      setBackupStatus(`✅ Snapshot v4.2 backed up! Synced ${result.countSongs} songs and ${result.countMovies} movies to Supabase.`);
      showToast('All songs, movies & settings successfully synced to Supabase!', 'cloud_done');
      setTimeout(() => setBackupStatus(''), 5000);
    } catch (err) {
      setBackupStatus(`Notice: Local cache active. (${err.message || 'Supabase unavailable'})`);
      showToast('Data preserved in high-speed local cache.', 'save');
      setTimeout(() => setBackupStatus(''), 4000);
    }
  };

  // Open Song Add/Edit Modal
  const openSongModal = (song = null) => {
    if (song) {
      setEditingSongId(song.id);
      setSongForm({
        title: song.title || '',
        artist: song.artist || '',
        movie: song.movie || '',
        category: song.category || 'bollywood',
        platform: song.youtubeId && song.spotifyTrackId ? 'both' : (song.spotifyTrackId ? 'spotify' : 'youtube'),
        youtubeId: song.youtubeId || '',
        spotifyTrackId: song.spotifyTrackId || '',
        spotifyUrl: song.spotifyUrl || '',
        duration: song.duration || '3:30 min',
        genre: song.genre || '',
        mood: song.mood || '',
        rating: song.rating || '9.5/10',
        coverUrl: song.coverUrl || '',
        ayushNote: song.ayushNote || '',
        lyrics: song.lyrics || '',
        isPublished: song.isPublished !== false,
      });
    } else {
      setEditingSongId(null);
      setSongForm({
        title: '',
        artist: '',
        movie: '',
        category: 'bollywood',
        platform: 'both',
        youtubeId: '',
        spotifyTrackId: '',
        spotifyUrl: '',
        duration: '3:30 min',
        genre: 'Bollywood / Pop',
        mood: 'High Energy',
        rating: '9.5/10',
        coverUrl: '',
        ayushNote: '',
        lyrics: '',
        isPublished: true,
      });
    }
    setSongModalOpen(true);
  };

  // Save Song
  const handleSaveSong = async (e) => {
    e.preventDefault();
    const cleanYt = extractYouTubeId(songForm.youtubeId);
    const cleanSp = extractSpotifyTrackId(songForm.spotifyTrackId);
    const cover = songForm.coverUrl.trim() || (cleanYt ? `https://img.youtube.com/vi/${cleanYt}/maxresdefault.jpg` : '/images/showcase-bollywood-music.jpg');

    const songData = {
      ...songForm,
      youtubeId: cleanYt,
      spotifyTrackId: cleanSp,
      spotifyUrl: songForm.spotifyUrl || (cleanSp ? `https://open.spotify.com/track/${cleanSp}` : ''),
      coverUrl: cover,
    };

    if (editingSongId) {
      await updateSong(editingSongId, songData);
      showToast(`Updated "${songData.title}"! Changes live across Ayush Hub.`, 'edit');
    } else {
      await addSong(songData);
      showToast(`Added "${songData.title}" to Music Lounge!`, 'playlist_add');
    }
    setSongModalOpen(false);
  };

  // Open Movie Add/Edit Modal
  const openMovieModal = (movie = null) => {
    if (movie) {
      setEditingMovieId(movie.id);
      setMovieForm({
        title: movie.title || '',
        franchise: movie.franchise || '',
        category: movie.category || 'bollywood',
        releaseYear: movie.releaseYear || '2024',
        releaseDate: movie.releaseDate || '',
        duration: movie.duration || '2h 30m',
        genre: movie.genre || '',
        director: movie.director || '',
        cast: Array.isArray(movie.cast) ? movie.cast.join(', ') : (movie.cast || ''),
        primaryLanguages: movie.primaryLanguages || 'Hindi',
        rating: movie.rating || '9.0',
        verdict: movie.verdict || `Editor's Choice ★ ${movie.rating || '9.0'}/10`,
        youtubeId: movie.youtubeId || '',
        posterUrl: movie.posterUrl || '',
        backdropUrl: movie.backdropUrl || '',
        overview: movie.overview || '',
        review: movie.review || '',
        status: movie.status || 'published',
        isPublished: movie.isPublished !== false,
        displayOrder: movie.displayOrder || 0,
      });
    } else {
      setEditingMovieId(null);
      setMovieForm({
        title: '',
        franchise: '',
        category: 'bollywood',
        releaseYear: new Date().getFullYear().toString(),
        releaseDate: '',
        duration: '2h 30m',
        genre: 'Sci-Fi / Action',
        director: '',
        cast: '',
        primaryLanguages: 'Hindi, English',
        rating: '9.0',
        verdict: "Editor's Choice ★ 9.0/10",
        youtubeId: '',
        posterUrl: '',
        backdropUrl: '',
        overview: '',
        review: '',
        status: 'published',
        isPublished: true,
        displayOrder: movies.length,
      });
    }
    setMovieModalOpen(true);
  };

  // Save Movie
  const handleSaveMovie = async (e) => {
    e.preventDefault();
    const cleanYt = extractYouTubeId(movieForm.youtubeId);
    const poster = movieForm.posterUrl.trim() || (cleanYt ? `https://img.youtube.com/vi/${cleanYt}/maxresdefault.jpg` : '/images/showcase-cinema-2026.jpg');
    const backdrop = movieForm.backdropUrl.trim() || poster;

    const movieData = {
      ...movieForm,
      youtubeId: cleanYt,
      posterUrl: poster,
      backdropUrl: backdrop,
      cast: movieForm.cast.split(',').map((c) => c.trim()).filter(Boolean),
    };

    if (editingMovieId) {
      await updateMovie(editingMovieId, movieData);
      showToast(`Updated "${movieData.title}"! Cinema Vault refreshed.`, 'edit');
    } else {
      await addMovie(movieData);
      showToast(`Added "${movieData.title}" to Cinema Vault!`, 'movie');
    }
    setMovieModalOpen(false);
  };

  // Confirm Delete Handler
  const executeDelete = async () => {
    if (!deleteConfirm.id || !deleteConfirm.type) return;

    if (deleteConfirm.type === 'song') {
      await deleteSong(deleteConfirm.id);
      showToast(`Removed song "${deleteConfirm.title}" from library.`, 'delete');
    } else if (deleteConfirm.type === 'movie') {
      await deleteMovie(deleteConfirm.id);
      showToast(`Removed film "${deleteConfirm.title}" from vault.`, 'delete');
    } else if (deleteConfirm.type === 'collab') {
      await deleteCollaboration(deleteConfirm.id);
      showToast(`Removed collaboration proposal.`, 'delete');
    }
    setDeleteConfirm({ open: false, type: null, id: null, title: '' });
  };

  // Save Site Content Sections
  const handleSaveContentSection = async (sectionKey) => {
    await updateSiteSection(sectionKey, contentForm[sectionKey]);
    showToast(`Updated ${sectionKey.toUpperCase()} section on public website!`, 'task_alt');
  };

  // Save All Content Sections simultaneously
  const handleSaveAllContent = async () => {
    try {
      const keys = ['hero', 'homeBento', 'services', 'gaming', 'about', 'musicSection', 'cinemaSection', 'footer'];
      for (const k of keys) {
        if (contentForm[k]) {
          await updateSiteSection(k, contentForm[k]);
        }
      }
      showToast('All website sections saved & synchronized!', 'done_all');
    } catch (err) {
      showToast('All sections saved to high-speed local cache.', 'save');
    }
  };

  // Save Social Media Links
  const handleSaveSocialLinks = async (e) => {
    e.preventDefault();
    await updateSocialLinks(socialForm);
    showToast('Saved Social Media & Contact Links! Live on public footer.', 'public');
  };

  // Filtered Songs List
  const filteredSongs = useMemo(() => {
    return songs.filter((s) => {
      const matchSearch = (s.title + ' ' + s.artist + ' ' + (s.movie || '')).toLowerCase().includes(songSearch.toLowerCase());
      const matchCategory = songFilterCategory === 'all' || s.category === songFilterCategory;
      const matchStatus = songFilterStatus === 'all' || (songFilterStatus === 'published' ? s.isPublished !== false : s.isPublished === false);
      return matchSearch && matchCategory && matchStatus;
    });
  }, [songs, songSearch, songFilterCategory, songFilterStatus]);

  // Filtered Movies List
  const filteredMovies = useMemo(() => {
    return movies.filter((m) => {
      const matchSearch = (m.title + ' ' + (m.director || '') + ' ' + (m.franchise || '')).toLowerCase().includes(movieSearch.toLowerCase());
      const matchCategory = movieFilterCategory === 'all' || (m.category && m.category.includes(movieFilterCategory));
      const matchStatus = movieFilterStatus === 'all' || (movieFilterStatus === 'published' ? m.isPublished !== false && m.status !== 'draft' : (movieFilterStatus === 'draft' ? m.status === 'draft' || m.isPublished === false : m.status === 'featured'));
      return matchSearch && matchCategory && matchStatus;
    });
  }, [movies, movieSearch, movieFilterCategory, movieFilterStatus]);

  return (
    <div className="w-full text-[#dfe2ee] font-sans pb-24">
      {/* Atmospheric Glow Backdrop */}
      <div className="relative w-full px-4 md:px-10 pb-12">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-32 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* 1. DASHBOARD HEADER & SYSTEM TELEMETRY */}
        <div className="pt-6 md:pt-10 mb-6 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                  Nexus Master v4.2 // SuperAdmin
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {syncStatus}
                </span>
                {currentUser?.email && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 font-mono text-xs" title="Authenticated SuperAdmin">
                    <span className="material-symbols-outlined text-[14px] text-blue-400">verified_user</span>
                    {currentUser.email}
                  </span>
                )}
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
                disabled={isSyncing}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs sm:text-sm font-semibold shadow-sm hover:bg-slate-800 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                title="Synchronize and backup all content to Supabase database"
              >
                <span className={`material-symbols-outlined text-[18px] text-blue-400 ${isSyncing ? 'animate-spin' : ''}`}>
                  cloud_sync
                </span>
                <span>{isSyncing ? 'Syncing...' : 'Sync Database'}</span>
              </button>
              <button
                onClick={() => openSongModal()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-900/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Add Track</span>
              </button>
              <button
                onClick={() => openMovieModal()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">movie</span>
                <span>Add Film</span>
              </button>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs sm:text-sm font-semibold shadow-sm hover:bg-red-900/50 hover:text-white transition-all cursor-pointer"
                  title="Sign out and lock Nexus Console"
                >
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>

          {backupStatus && (
            <div className="mb-6 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs sm:text-sm flex items-center gap-2 animate-fade-in font-mono">
              <span className="material-symbols-outlined text-[18px]">info</span>
              <span>{backupStatus}</span>
            </div>
          )}

          {/* Quick Telemetry Status Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 rounded-2xl bg-slate-950/70 border border-slate-900 backdrop-blur-md mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">dns</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase truncate">Database Cluster</p>
                <p className="text-xs sm:text-sm font-semibold text-[#f8fafc] flex items-center gap-1.5 truncate">
                  Supabase + Postgres
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">headphones</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase truncate">Audio Vault</p>
                <p className="text-xs sm:text-sm font-semibold text-[#f8fafc] truncate font-mono">
                  {stats.publishedSongs} Live / {stats.totalSongs} Total
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">theaters</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase truncate">Cinema Vault</p>
                <p className="text-xs sm:text-sm font-semibold text-[#f8fafc] truncate font-mono">
                  {stats.publishedMovies} Live / {stats.totalMovies} Total
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase truncate">Last Sync</p>
                <p className="text-xs sm:text-sm font-semibold text-[#f8fafc] truncate font-mono">
                  {stats.lastSyncTime}
                </p>
              </div>
            </div>
          </div>

          {/* TAB BAR NAVIGATION */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>Console Nexus</span>
            </button>

            <button
              onClick={() => setActiveTab('songs')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'songs'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">headphones</span>
              <span>Music Manager ({songs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('movies')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'movies'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">movie</span>
              <span>Cinema Desk ({movies.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'content'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Homepage &amp; Content</span>
            </button>

            <button
              onClick={() => setActiveTab('social')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'social'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span>Social &amp; Contact</span>
            </button>

            <button
              onClick={() => setActiveTab('collabs')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'collabs'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">handshake</span>
              <span>Inbound Leads ({collaborations.length})</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & REAL-TIME KPI SUITE                     */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fade-in">
            {/* 4 EXECUTIVE KPI STAT CARDS */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* KPI 1: Music Library */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer" onClick={() => setActiveTab('songs')}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Music Library</span>
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    {stats.publishedSongs} Live
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-heading text-3xl font-bold text-[#f8fafc]">{stats.totalSongs}</span>
                  <span className="font-mono text-xs text-slate-400">{stats.draftSongs} Drafts</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 pt-1 text-slate-400 text-xs">
                  <span className="material-symbols-outlined text-[16px] text-blue-400">equalizer</span>
                  <p className="truncate">
                    Latest: <span className="text-[#f8fafc] font-medium">{songs[0]?.title || 'Born to Shine'}</span>
                  </p>
                </div>
              </div>

              {/* KPI 2: Cinema Desk */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer" onClick={() => setActiveTab('movies')}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Cinema Vault</span>
                  <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                    {stats.publishedMovies} Live
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-heading text-3xl font-bold text-[#f8fafc]">{stats.totalMovies}</span>
                  <span className="font-mono text-xs text-slate-400">{stats.featuredMovies} Featured</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 pt-1 text-slate-400 text-xs">
                  <span className="material-symbols-outlined text-[16px] text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <p className="truncate">
                    Top Rated: <span className="text-[#f8fafc] font-medium">{movies[0]?.title || 'Kalki 2898 AD'}</span>
                  </p>
                </div>
              </div>

              {/* KPI 3: Inbound Leads */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer" onClick={() => setActiveTab('collabs')}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Inbound Leads</span>
                  <span className="font-mono text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                    {stats.pendingLeads} Pending
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-heading text-3xl font-bold text-[#f8fafc]">{stats.totalLeads}</span>
                  <span className="font-mono text-xs text-slate-400">Total Inquiries</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 pt-1 text-slate-400 text-xs">
                  <span className="material-symbols-outlined text-[16px] text-red-400">mail</span>
                  <p className="truncate">
                    Latest: <span className="text-[#f8fafc] font-medium">{collaborations[0]?.name || 'Vikram Mehta'}</span>
                  </p>
                </div>
              </div>

              {/* KPI 4: System State */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Sync State</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-heading text-xl font-bold text-[#f8fafc] truncate">Persistent</span>
                  <span className="font-mono text-xs text-emerald-400 font-semibold">Active</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 pt-1 text-slate-400 text-xs font-mono">
                  <span className="material-symbols-outlined text-[16px] text-blue-400">verified</span>
                  <span>Database Connected</span>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS & MODULE SPOTLIGHTS */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Music Spotlight (8 Cols) */}
              <div className="lg:col-span-8 space-y-8">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/70">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-400 text-[22px]">headphones</span>
                        <h2 className="font-heading text-xl font-bold text-[#f8fafc]">Music &amp; Audio Manager</h2>
                      </div>
                      <p className="text-xs text-slate-400">{songs.length} tracks registered in public streaming lounge</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('songs')}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        Manage All Tracks
                      </button>
                      <button
                        onClick={() => openSongModal()}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        <span>Add Song</span>
                      </button>
                    </div>
                  </div>

                  {/* Tracklist Preview (First 4 items) */}
                  <div className="space-y-3">
                    {songs.slice(0, 4).map((track) => (
                      <div
                        key={track.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 transition-all gap-3 border border-slate-800/60"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-lg bg-slate-800 shrink-0 relative overflow-hidden flex items-center justify-center">
                            <img
                              className="w-full h-full object-cover"
                              src={track.coverUrl}
                              alt={track.title}
                              onError={(e) => { e.currentTarget.src = '/images/showcase-bollywood-music.jpg'; }}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-semibold text-[#f8fafc] truncate">{track.title}</h3>
                              <span
                                className={`px-2 py-0.5 rounded-full font-mono text-[10px] ${
                                  track.isPublished !== false
                                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                                    : 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
                                }`}
                              >
                                {track.isPublished !== false ? 'Live' : 'Draft'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 truncate">
                              {track.artist} {track.movie ? `• ${track.movie}` : ''} • {track.duration}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <button
                            onClick={() => toggleSongPublish(track.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                              track.isPublished !== false
                                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/60'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {track.isPublished !== false ? 'Published' : 'Hidden'}
                          </button>
                          <button
                            onClick={() => openSongModal(track)}
                            className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
                            title="Edit Track Details"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ open: true, type: 'song', id: track.id, title: track.title })}
                            className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete Song"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cinema Desk Spotlight */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/70">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-indigo-400 text-[22px]">theaters</span>
                        <h2 className="font-heading text-xl font-bold text-[#f8fafc]">Cinema &amp; Film Critique Desk</h2>
                      </div>
                      <p className="text-xs text-slate-400">{movies.length} curated movies spotlighted</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('movies')}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        Manage All Films
                      </button>
                      <button
                        onClick={() => openMovieModal()}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        <span>Add Film</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {movies.slice(0, 3).map((film) => (
                      <div
                        key={film.id}
                        className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:bg-slate-800/70 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-full h-32 rounded-lg bg-slate-800 overflow-hidden mb-3 relative">
                            <img
                              className="w-full h-full object-cover"
                              src={film.posterUrl}
                              alt={film.title}
                              onError={(e) => { e.currentTarget.src = '/images/showcase-cinema-2026.jpg'; }}
                            />
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 font-mono text-xs text-amber-400 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {film.rating}
                            </div>
                          </div>
                          <h4 className="text-sm font-bold text-[#f8fafc] truncate">{film.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5 truncate">{film.genre} • {film.releaseYear}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                          <button
                            onClick={() => toggleMoviePublish(film.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors ${
                              film.isPublished !== false && film.status !== 'draft'
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {film.isPublished !== false && film.status !== 'draft' ? 'Published' : 'Draft'}
                          </button>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openMovieModal(film)}
                              className="w-7 h-7 rounded bg-slate-800 text-slate-400 hover:text-blue-400 flex items-center justify-center"
                              title="Edit Film"
                            >
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ open: true, type: 'movie', id: film.id, title: film.title })}
                              className="w-7 h-7 rounded bg-slate-800 text-slate-400 hover:text-red-400 flex items-center justify-center"
                              title="Delete Film"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Battle Station & Inbound Leads (4 Cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Rig Specs */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-400 text-[22px]">sports_esports</span>
                      <h2 className="font-heading text-lg font-bold text-[#f8fafc]">Esports Telemetry</h2>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      Live Telemetry
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 mb-4">
                    <span className="font-mono text-[11px] text-slate-400 uppercase block mb-2 font-semibold">
                      Ayush Rig Specifications
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#f8fafc]">
                      <li className="flex items-center justify-between">
                        <span className="text-slate-400">GPU</span>
                        <span className="font-mono">{siteContent.gaming?.gpu || 'RTX 4080 Super OC'}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-slate-400">CPU</span>
                        <span className="font-mono">{siteContent.gaming?.cpu || 'Ryzen 9 7950X3D'}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-slate-400">Display</span>
                        <span className="font-mono">{siteContent.gaming?.display || '240Hz Fast IPS 1ms'}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-slate-400">Mic Audio</span>
                        <span className="font-mono">{siteContent.gaming?.mic || 'Shure SM7B + GoXLR'}</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setActiveTab('content')}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">tune</span>
                    <span>Edit Rig &amp; Stats</span>
                  </button>
                </div>

                {/* Collaboration Leads Box */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-red-400 text-[20px]">handshake</span>
                      <h3 className="font-heading text-base font-bold text-[#f8fafc]">Recent Inquiries</h3>
                    </div>
                    <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs font-mono font-bold flex items-center justify-center">
                      {collaborations.length}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {collaborations.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-800/80 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white truncate">{lead.name}</span>
                          <span className="font-mono text-[10px] text-slate-400">{lead.category}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] line-clamp-1 mt-1">{lead.message || lead.notes}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveTab('collabs')}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>View All Inquiries</span>
                    <span className="material-symbols-outlined text-[16px]">east</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: FULL MUSIC & AUDIO MANAGER                         */}
        {/* ========================================================= */}
        {activeTab === 'songs' && (
          <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            {/* Action Bar */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Music Lounge Manager</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage all songs, YouTube IDs, Spotify tracks, and publication status.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => openSongModal()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Add New Song</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-900">
              <div className="md:col-span-5 relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">search</span>
                </span>
                <input
                  type="text"
                  placeholder="Search by title, artist, movie..."
                  value={songSearch}
                  onChange={(e) => setSongSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-4 flex items-center gap-2">
                <select
                  value={songFilterCategory}
                  onChange={(e) => setSongFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="bollywood">Bollywood</option>
                  <option value="punjabi">Punjabi</option>
                  <option value="indie">Indie / Pop</option>
                  <option value="gym">Gym / Hype</option>
                </select>
              </div>

              <div className="md:col-span-3 flex items-center gap-2">
                <select
                  value={songFilterStatus}
                  onChange={(e) => setSongFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Statuses ({songs.length})</option>
                  <option value="published">Published Only ({stats.publishedSongs})</option>
                  <option value="draft">Drafts Only ({stats.draftSongs})</option>
                </select>
              </div>
            </div>

            {/* Song Items Table */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
              <div className="divide-y divide-slate-800/80">
                {filteredSongs.length === 0 ? (
                  <div className="p-12 text-center text-slate-400">
                    <span className="material-symbols-outlined text-[36px] text-slate-600 mb-2">music_off</span>
                    <p className="text-sm">No songs match your active filter.</p>
                  </div>
                ) : (
                  filteredSongs.map((song) => (
                    <div
                      key={song.id}
                      className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-850 transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-slate-800 overflow-hidden shrink-0 relative">
                          <img
                            src={song.coverUrl}
                            alt={song.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = '/images/showcase-bollywood-music.jpg'; }}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-white truncate">{song.title}</h3>
                            <span
                              className={`px-2 py-0.5 rounded-full font-mono text-[10px] ${
                                song.isPublished !== false
                                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                                  : 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
                              }`}
                            >
                              {song.isPublished !== false ? 'Live' : 'Draft'}
                            </span>
                            <span className="px-2 py-0.5 rounded-full font-mono text-[10px] bg-blue-500/10 text-blue-400 uppercase">
                              {song.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 truncate">
                            {song.artist} {song.movie ? `• ${song.movie}` : ''} • {song.duration}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-[11px] font-mono text-slate-500">
                            {song.youtubeId && <span>YT: {song.youtubeId}</span>}
                            {song.spotifyTrackId && <span>Spotify: {song.spotifyTrackId.substring(0, 8)}...</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-2 shrink-0">
                        <button
                          onClick={() => toggleSongPublish(song.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            song.isPublished !== false
                              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {song.isPublished !== false ? 'Published' : 'Hidden'}
                        </button>
                        <button
                          onClick={() => openSongModal(song)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ open: true, type: 'song', id: song.id, title: song.title })}
                          className="px-3 py-1.5 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 hover:bg-red-900/40 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: FULL MOVIES & CINEMA DESK                          */}
        {/* ========================================================= */}
        {activeTab === 'movies' && (
          <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Cinema &amp; Film Critique Desk</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage cinema reviews, trailers, ratings, categories, and featured spotlights.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => openMovieModal()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Add New Movie</span>
                </button>
              </div>
            </div>

            {/* Filter Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-900">
              <div className="md:col-span-5 relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">search</span>
                </span>
                <input
                  type="text"
                  placeholder="Search by title, director, franchise..."
                  value={movieSearch}
                  onChange={(e) => setMovieSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-4 flex items-center gap-2">
                <select
                  value={movieFilterCategory}
                  onChange={(e) => setMovieFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="bollywood">Bollywood Masterpieces</option>
                  <option value="south">South Indian Action</option>
                  <option value="marvel">Marvel Cinematic Universe</option>
                </select>
              </div>

              <div className="md:col-span-3 flex items-center gap-2">
                <select
                  value={movieFilterStatus}
                  onChange={(e) => setMovieFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Statuses ({movies.length})</option>
                  <option value="published">Published Only</option>
                  <option value="draft">Drafts Only</option>
                  <option value="featured">Featured Spotlight</option>
                </select>
              </div>
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
                >
                  <div>
                    <div className="w-full h-44 bg-slate-950 relative overflow-hidden">
                      <img
                        src={movie.backdropUrl || movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = '/images/showcase-cinema-2026.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/80 font-mono text-[10px] text-blue-400 uppercase font-semibold">
                          {movie.category}
                        </span>
                        {movie.status === 'featured' && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-semibold border border-amber-500/30">
                            Spotlight
                          </span>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-slate-950/90 font-mono text-xs text-amber-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span>{movie.rating}</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-heading text-lg font-bold text-white">{movie.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {movie.releaseYear} • {movie.director ? `Dir: ${movie.director}` : movie.primaryLanguages}
                      </p>
                      <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                        {movie.overview || movie.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4">
                    <button
                      onClick={() => toggleMoviePublish(movie.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                        movie.isPublished !== false && movie.status !== 'draft'
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {movie.isPublished !== false && movie.status !== 'draft' ? 'Published' : 'Draft'}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openMovieModal(movie)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[15px]">edit</span>
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ open: true, type: 'movie', id: movie.id, title: movie.title })}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/50 text-slate-400 hover:text-red-400 flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: COMPLETE WEBSITE & PAGES MANAGER                   */}
        {/* ========================================================= */}
        {activeTab === 'content' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            {/* Top Management Header & Save All Action */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs uppercase mb-2">
                  <span className="material-symbols-outlined text-[15px]">edit_note</span>
                  <span>Full-Stack Content Control</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  Ayush Hub Website Manager
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  Edit every single section, card, metric, heading, and description across the entire website. All changes update instantly on public views and save persistently to Supabase.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleSaveAllContent}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-900/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">done_all</span>
                  <span>Save All Changes</span>
                </button>
              </div>
            </div>

            {/* Sub-Tab Navigation Strip */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setContentSubTab('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  contentSubTab === 'home'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">home</span>
                <span>Home Page</span>
              </button>

              <button
                type="button"
                onClick={() => setContentSubTab('services')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  contentSubTab === 'services'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                <span>Services Page</span>
              </button>

              <button
                type="button"
                onClick={() => setContentSubTab('gaming')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  contentSubTab === 'gaming'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">sports_esports</span>
                <span>Gaming Arena</span>
              </button>

              <button
                type="button"
                onClick={() => setContentSubTab('about')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  contentSubTab === 'about'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>About Page</span>
              </button>

              <button
                type="button"
                onClick={() => setContentSubTab('mediaHeaders')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  contentSubTab === 'mediaHeaders'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                <span>Music &amp; Cinema Headers</span>
              </button>

              <button
                type="button"
                onClick={() => setContentSubTab('footer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  contentSubTab === 'footer'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">copyright</span>
                <span>Footer &amp; Global</span>
              </button>
            </div>

            {/* ========================================================= */}
            {/* SUB-TAB 1: HOME PAGE                                      */}
            {/* ========================================================= */}
            {contentSubTab === 'home' && (
              <div className="space-y-6 animate-fade-in">
                {/* 1.1 Hero Spotlight */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-400">space_dashboard</span>
                      <h3 className="font-heading text-lg font-bold text-white">Hero Spotlight Section</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveContentSection('hero')}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      <span>Save Hero</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Eyebrow Pill</label>
                      <input
                        type="text"
                        value={contentForm.hero?.eyebrow || ''}
                        onChange={(e) => setContentForm({ ...contentForm, hero: { ...contentForm.hero, eyebrow: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Main Heading</label>
                      <input
                        type="text"
                        value={contentForm.hero?.heading || ''}
                        onChange={(e) => setContentForm({ ...contentForm, hero: { ...contentForm.hero, heading: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Subtitle / Bio Lead</label>
                    <textarea
                      rows={2}
                      value={contentForm.hero?.subtitle || ''}
                      onChange={(e) => setContentForm({ ...contentForm, hero: { ...contentForm.hero, subtitle: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Portrait Image URL</label>
                      <input
                        type="text"
                        value={contentForm.hero?.portraitUrl || ''}
                        onChange={(e) => setContentForm({ ...contentForm, hero: { ...contentForm.hero, portraitUrl: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Explore Button Text</label>
                      <input
                        type="text"
                        value={contentForm.hero?.ctaExploreText || ''}
                        onChange={(e) => setContentForm({ ...contentForm, hero: { ...contentForm.hero, ctaExploreText: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">About Button Text</label>
                      <input
                        type="text"
                        value={contentForm.hero?.ctaAboutText || ''}
                        onChange={(e) => setContentForm({ ...contentForm, hero: { ...contentForm.hero, ctaAboutText: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 1.2 Explore The Hub Bento Cards */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-indigo-400">explore</span>
                      <h3 className="font-heading text-lg font-bold text-white">Explore The Hub — Bento Cards</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveContentSection('homeBento')}
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      <span>Save Bento Cards</span>
                    </button>
                  </div>

                  {/* 3 Channel Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Music Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-indigo-400">
                        <span className="text-xs font-mono font-bold uppercase">Card 1: Music Zone</span>
                        <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Tag Pill</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.musicCard?.tag || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              musicCard: { ...(contentForm.homeBento?.musicCard || {}), tag: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Card Title</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.musicCard?.title || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              musicCard: { ...(contentForm.homeBento?.musicCard || {}), title: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.homeBento?.musicCard?.desc || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              musicCard: { ...(contentForm.homeBento?.musicCard || {}), desc: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Image URL</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.musicCard?.image || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              musicCard: { ...(contentForm.homeBento?.musicCard || {}), image: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Button Text</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.musicCard?.btnText || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              musicCard: { ...(contentForm.homeBento?.musicCard || {}), btnText: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Cinema Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-rose-400">
                        <span className="text-xs font-mono font-bold uppercase">Card 2: Cinema World</span>
                        <span className="material-symbols-outlined text-[18px]">theaters</span>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Tag Pill</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.cinemaCard?.tag || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              cinemaCard: { ...(contentForm.homeBento?.cinemaCard || {}), tag: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Card Title</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.cinemaCard?.title || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              cinemaCard: { ...(contentForm.homeBento?.cinemaCard || {}), title: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.homeBento?.cinemaCard?.desc || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              cinemaCard: { ...(contentForm.homeBento?.cinemaCard || {}), desc: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Image URL</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.cinemaCard?.image || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              cinemaCard: { ...(contentForm.homeBento?.cinemaCard || {}), image: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Button Text</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.cinemaCard?.btnText || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              cinemaCard: { ...(contentForm.homeBento?.cinemaCard || {}), btnText: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Gaming Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-[#4edea3]">
                        <span className="text-xs font-mono font-bold uppercase">Card 3: Game On</span>
                        <span className="material-symbols-outlined text-[18px]">sports_esports</span>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Tag Pill</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.gamingCard?.tag || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              gamingCard: { ...(contentForm.homeBento?.gamingCard || {}), tag: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Card Title</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.gamingCard?.title || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              gamingCard: { ...(contentForm.homeBento?.gamingCard || {}), title: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.homeBento?.gamingCard?.desc || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              gamingCard: { ...(contentForm.homeBento?.gamingCard || {}), desc: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Image URL</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.gamingCard?.image || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              gamingCard: { ...(contentForm.homeBento?.gamingCard || {}), image: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Button Text</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.gamingCard?.btnText || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              gamingCard: { ...(contentForm.homeBento?.gamingCard || {}), btnText: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Behind the Hub & Instant Drops banner edit */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase">Behind Ayush Hub Card</span>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Title</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.behindHub?.title || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              behindHub: { ...(contentForm.homeBento?.behindHub || {}), title: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Subtitle</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.behindHub?.subtitle || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              behindHub: { ...(contentForm.homeBento?.behindHub || {}), subtitle: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Button Text</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.behindHub?.btnText || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              behindHub: { ...(contentForm.homeBento?.behindHub || {}), btnText: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Instant Drops Community Banner</span>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Title</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.instantDrops?.title || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              instantDrops: { ...(contentForm.homeBento?.instantDrops || {}), title: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Subtitle</label>
                        <input
                          type="text"
                          value={contentForm.homeBento?.instantDrops?.subtitle || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            homeBento: {
                              ...contentForm.homeBento,
                              instantDrops: { ...(contentForm.homeBento?.instantDrops || {}), subtitle: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">Discord URL</label>
                          <input
                            type="text"
                            value={contentForm.homeBento?.instantDrops?.discordUrl || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              homeBento: {
                                ...contentForm.homeBento,
                                instantDrops: { ...(contentForm.homeBento?.instantDrops || {}), discordUrl: e.target.value }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">WhatsApp URL</label>
                          <input
                            type="text"
                            value={contentForm.homeBento?.instantDrops?.whatsappUrl || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              homeBento: {
                                ...contentForm.homeBento,
                                instantDrops: { ...(contentForm.homeBento?.instantDrops || {}), whatsappUrl: e.target.value }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* SUB-TAB 2: SERVICES PAGE                                  */}
            {/* ========================================================= */}
            {contentSubTab === 'services' && (
              <div className="space-y-6 animate-fade-in">
                {/* 2.1 Header & Metric Micro-Bar */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-400">bolt</span>
                      <h3 className="font-heading text-lg font-bold text-white">Services Page Header &amp; Metric Bar</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveContentSection('services')}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      <span>Save Services</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Overline Badge</label>
                      <input
                        type="text"
                        value={contentForm.services?.badge || ''}
                        onChange={(e) => setContentForm({ ...contentForm, services: { ...contentForm.services, badge: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Main Heading</label>
                      <input
                        type="text"
                        value={contentForm.services?.heading || ''}
                        onChange={(e) => setContentForm({ ...contentForm, services: { ...contentForm.services, heading: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Subtitle Lead</label>
                    <textarea
                      rows={2}
                      value={contentForm.services?.subtitle || ''}
                      onChange={(e) => setContentForm({ ...contentForm, services: { ...contentForm.services, subtitle: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* 4 Metric Counters */}
                  <div className="pt-2">
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-2">4 Metric Stat Badges</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(contentForm.services?.metrics || [
                        { value: '240+', label: 'Handpicked Playlists' },
                        { value: '250+', label: 'Cinema Breakdowns' },
                        { value: '50k+', label: 'Gameplay Hours' },
                        { value: '99.9%', label: 'Vibe Satisfaction' },
                      ]).map((m, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                          <input
                            type="text"
                            placeholder="Value (e.g. 240+)"
                            value={m.value || ''}
                            onChange={(e) => {
                              const newMetrics = [...(contentForm.services?.metrics || [])];
                              newMetrics[idx] = { ...(newMetrics[idx] || {}), value: e.target.value };
                              setContentForm({ ...contentForm, services: { ...contentForm.services, metrics: newMetrics } });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-sm font-bold text-blue-400 font-mono"
                          />
                          <input
                            type="text"
                            placeholder="Label"
                            value={m.label || ''}
                            onChange={(e) => {
                              const newMetrics = [...(contentForm.services?.metrics || [])];
                              newMetrics[idx] = { ...(newMetrics[idx] || {}), label: e.target.value };
                              setContentForm({ ...contentForm, services: { ...contentForm.services, metrics: newMetrics } });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2.2 The 3 Primary Bento Services Cards */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-indigo-400">category</span>
                      <h3 className="font-heading text-lg font-bold text-white">3 Bento Experience Cards</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveContentSection('services')}
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      <span>Save Bento Cards</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Music Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase">Card 1: Sound &amp; Audio</span>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Category Chip</label>
                        <input
                          type="text"
                          value={contentForm.services?.cards?.music?.tag || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                music: { ...(contentForm.services?.cards?.music || {}), tag: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Overline</label>
                        <input
                          type="text"
                          value={contentForm.services?.cards?.music?.category || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                music: { ...(contentForm.services?.cards?.music || {}), category: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Card Heading</label>
                        <input
                          type="text"
                          value={contentForm.services?.cards?.music?.title || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                music: { ...(contentForm.services?.cards?.music || {}), title: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.services?.cards?.music?.desc || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                music: { ...(contentForm.services?.cards?.music || {}), desc: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">3 Features (Comma Separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(contentForm.services?.cards?.music?.features) ? contentForm.services.cards.music.features.join(' | ') : (contentForm.services?.cards?.music?.features || '')}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                music: { ...(contentForm.services?.cards?.music || {}), features: e.target.value.split('|').map((s) => s.trim()).filter(Boolean) }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Button Text</label>
                        <input
                          type="text"
                          value={contentForm.services?.cards?.music?.btnText || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                music: { ...(contentForm.services?.cards?.music || {}), btnText: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Cinema Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Card 2: Cinema &amp; Series</span>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Category Chip</label>
                        <input
                          type="text"
                          value={contentForm.services?.cards?.cinema?.tag || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                cinema: { ...(contentForm.services?.cards?.cinema || {}), tag: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Overline</label>
                        <input
                          type="text"
                          value={contentForm.services?.cards?.cinema?.category || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                cinema: { ...(contentForm.services?.cards?.cinema || {}), category: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Card Heading</label>
                        <input
                          type="text"
                          value={contentForm.services?.cards?.cinema?.title || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                cinema: { ...(contentForm.services?.cards?.cinema || {}), title: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.services?.cards?.cinema?.desc || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                cinema: { ...(contentForm.services?.cards?.cinema || {}), desc: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">3 Features (Comma Separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(contentForm.services?.cards?.cinema?.features) ? contentForm.services.cards.cinema.features.join(' | ') : (contentForm.services?.cards?.cinema?.features || '')}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                cinema: { ...(contentForm.services?.cards?.cinema || {}), features: e.target.value.split('|').map((s) => s.trim()).filter(Boolean) }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Button Text</label>
                        <input
                          type="text"
                          value={contentForm.services?.cards?.cinema?.btnText || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                cinema: { ...(contentForm.services?.cards?.cinema || {}), btnText: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Gaming Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <span className="text-xs font-mono font-bold text-sky-400 uppercase">Card 3: Gaming &amp; Esports</span>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Category Chip</label>
                        <input
                          type="text"
                          value={contentForm.services?.cards?.gaming?.tag || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                gaming: { ...(contentForm.services?.cards?.gaming || {}), tag: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Overline</label>
                        <input
                          type="text"
                          value={contentForm.services?.cards?.gaming?.category || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                gaming: { ...(contentForm.services?.cards?.gaming || {}), category: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Card Heading</label>
                        <input
                          type="text"
                          value={contentForm.services?.cards?.gaming?.title || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                gaming: { ...(contentForm.services?.cards?.gaming || {}), title: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.services?.cards?.gaming?.desc || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                gaming: { ...(contentForm.services?.cards?.gaming || {}), desc: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">3 Features (Comma Separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(contentForm.services?.cards?.gaming?.features) ? contentForm.services.cards.gaming.features.join(' | ') : (contentForm.services?.cards?.gaming?.features || '')}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                gaming: { ...(contentForm.services?.cards?.gaming || {}), features: e.target.value.split('|').map((s) => s.trim()).filter(Boolean) }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Button Text</label>
                        <input
                          type="text"
                          value={contentForm.services?.cards?.gaming?.btnText || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            services: {
                              ...contentForm.services,
                              cards: {
                                ...(contentForm.services?.cards || {}),
                                gaming: { ...(contentForm.services?.cards?.gaming || {}), btnText: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2.3 How It Works & Bottom Callout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase">How It Works Workflow</span>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Workflow Title</label>
                      <input
                        type="text"
                        value={contentForm.services?.workflow?.title || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          services: {
                            ...contentForm.services,
                            workflow: { ...(contentForm.services?.workflow || {}), title: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={contentForm.services?.workflow?.subtitle || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          services: {
                            ...contentForm.services,
                            workflow: { ...(contentForm.services?.workflow || {}), subtitle: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Collaboration Bottom Banner</span>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Heading</label>
                      <input
                        type="text"
                        value={contentForm.services?.collaborationBanner?.heading || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          services: {
                            ...contentForm.services,
                            collaborationBanner: { ...(contentForm.services?.collaborationBanner || {}), heading: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={contentForm.services?.collaborationBanner?.subtitle || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          services: {
                            ...contentForm.services,
                            collaborationBanner: { ...(contentForm.services?.collaborationBanner || {}), subtitle: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* SUB-TAB 3: GAMING ARENA                                   */}
            {/* ========================================================= */}
            {contentSubTab === 'gaming' && (
              <div className="space-y-6 animate-fade-in">
                {/* 3.1 Header & Status */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-400">sports_esports</span>
                      <h3 className="font-heading text-lg font-bold text-white">Gaming Arena Header &amp; Status Strip</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveContentSection('gaming')}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      <span>Save Gaming</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={contentForm.gaming?.badge || ''}
                        onChange={(e) => setContentForm({ ...contentForm, gaming: { ...contentForm.gaming, badge: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Heading</label>
                      <input
                        type="text"
                        value={contentForm.gaming?.heading || ''}
                        onChange={(e) => setContentForm({ ...contentForm, gaming: { ...contentForm.gaming, heading: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Subtitle</label>
                    <textarea
                      rows={2}
                      value={contentForm.gaming?.subtitle || ''}
                      onChange={(e) => setContentForm({ ...contentForm, gaming: { ...contentForm.gaming, subtitle: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Main Games Status Strip</label>
                      <input
                        type="text"
                        value={contentForm.gaming?.mainGames || ''}
                        onChange={(e) => setContentForm({ ...contentForm, gaming: { ...contentForm.gaming, mainGames: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Average Frame Rate</label>
                      <input
                        type="text"
                        value={contentForm.gaming?.avgFps || ''}
                        onChange={(e) => setContentForm({ ...contentForm, gaming: { ...contentForm.gaming, avgFps: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-[#4edea3]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3.2 The 3 Primary Arena Cards (Valorant, Free Fire, GTA V) */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
                  <span className="font-heading text-lg font-bold text-white block pb-2 border-b border-slate-800">
                    3 Competitive Arena Rosters (Valorant • Free Fire MAX • GTA V)
                  </span>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Valorant */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase">1. Valorant Dossier</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">Rank Badge</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.valorant?.rank || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  valorant: { ...(contentForm.gaming?.arenas?.valorant || {}), rank: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">Peak</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.valorant?.peak || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  valorant: { ...(contentForm.gaming?.arenas?.valorant || {}), peak: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Signature Mains</label>
                        <input
                          type="text"
                          value={contentForm.gaming?.arenas?.valorant?.mains || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            gaming: {
                              ...contentForm.gaming,
                              arenas: {
                                ...(contentForm.gaming?.arenas || {}),
                                valorant: { ...(contentForm.gaming?.arenas?.valorant || {}), mains: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <div>
                          <label className="text-[9px] font-mono text-slate-400 block">K/D</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.valorant?.stat1Value || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  valorant: { ...(contentForm.gaming?.arenas?.valorant || {}), stat1Value: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-center text-blue-400 font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-mono text-slate-400 block">Headshot %</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.valorant?.stat2Value || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  valorant: { ...(contentForm.gaming?.arenas?.valorant || {}), stat2Value: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-center text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-mono text-slate-400 block">Comms Wins</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.valorant?.stat3Value || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  valorant: { ...(contentForm.gaming?.arenas?.valorant || {}), stat3Value: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-center text-[#4edea3] font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Free Fire MAX */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <span className="text-xs font-mono font-bold text-indigo-400 uppercase">2. Free Fire MAX Dossier</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">Rank Badge</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.freeFire?.rank || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  freeFire: { ...(contentForm.gaming?.arenas?.freeFire || {}), rank: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">Season</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.freeFire?.peak || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  freeFire: { ...(contentForm.gaming?.arenas?.freeFire || {}), peak: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Weapons</label>
                        <input
                          type="text"
                          value={contentForm.gaming?.arenas?.freeFire?.mains || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            gaming: {
                              ...contentForm.gaming,
                              arenas: {
                                ...(contentForm.gaming?.arenas || {}),
                                freeFire: { ...(contentForm.gaming?.arenas?.freeFire || {}), mains: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <div>
                          <label className="text-[9px] font-mono text-slate-400 block">Winrate</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.freeFire?.stat1Value || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  freeFire: { ...(contentForm.gaming?.arenas?.freeFire || {}), stat1Value: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-center text-indigo-400 font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-mono text-slate-400 block">Avg Damage</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.freeFire?.stat2Value || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  freeFire: { ...(contentForm.gaming?.arenas?.freeFire || {}), stat2Value: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-center text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-mono text-slate-400 block">Booyahs</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.freeFire?.stat3Value || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  freeFire: { ...(contentForm.gaming?.arenas?.freeFire || {}), stat3Value: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-center text-[#4edea3] font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* GTA V & FiveM */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#4edea3] uppercase">3. GTA V &amp; FiveM Dossier</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">Rank Badge</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.gta?.rank || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  gta: { ...(contentForm.gaming?.arenas?.gta || {}), rank: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">Server</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.gta?.peak || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  gta: { ...(contentForm.gaming?.arenas?.gta || {}), peak: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Empire Net Worth</label>
                        <input
                          type="text"
                          value={contentForm.gaming?.arenas?.gta?.mains || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            gaming: {
                              ...contentForm.gaming,
                              arenas: {
                                ...(contentForm.gaming?.arenas || {}),
                                gta: { ...(contentForm.gaming?.arenas?.gta || {}), mains: e.target.value }
                              }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-[#4edea3] font-bold"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <div>
                          <label className="text-[9px] font-mono text-slate-400 block">Hours</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.gta?.stat1Value || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  gta: { ...(contentForm.gaming?.arenas?.gta || {}), stat1Value: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-center text-[#4edea3] font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-mono text-slate-400 block">Heists</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.gta?.stat2Value || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  gta: { ...(contentForm.gaming?.arenas?.gta || {}), stat2Value: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-center text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-mono text-slate-400 block">FPS</label>
                          <input
                            type="text"
                            value={contentForm.gaming?.arenas?.gta?.stat3Value || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              gaming: {
                                ...contentForm.gaming,
                                arenas: {
                                  ...(contentForm.gaming?.arenas || {}),
                                  gta: { ...(contentForm.gaming?.arenas?.gta || {}), stat3Value: e.target.value }
                                }
                              }
                            })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-center text-blue-400 font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3.3 Battlestation Rig Specs */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <span className="font-heading text-lg font-bold text-white block pb-2 border-b border-slate-800">
                    Battlestation Hardware Specifications
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Processor (CPU)</span>
                      <input
                        type="text"
                        value={contentForm.gaming?.rigSpecs?.cpuModel || contentForm.gaming?.cpu || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          gaming: {
                            ...contentForm.gaming,
                            cpu: e.target.value,
                            rigSpecs: { ...(contentForm.gaming?.rigSpecs || {}), cpuModel: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Core details"
                        value={contentForm.gaming?.rigSpecs?.cpuDetail || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          gaming: {
                            ...contentForm.gaming,
                            rigSpecs: { ...(contentForm.gaming?.rigSpecs || {}), cpuDetail: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-blue-400 font-mono"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Graphics Engine (GPU)</span>
                      <input
                        type="text"
                        value={contentForm.gaming?.rigSpecs?.gpuModel || contentForm.gaming?.gpu || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          gaming: {
                            ...contentForm.gaming,
                            gpu: e.target.value,
                            rigSpecs: { ...(contentForm.gaming?.rigSpecs || {}), gpuModel: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-bold"
                      />
                      <input
                        type="text"
                        placeholder="VRAM / DLSS"
                        value={contentForm.gaming?.rigSpecs?.gpuDetail || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          gaming: {
                            ...contentForm.gaming,
                            rigSpecs: { ...(contentForm.gaming?.rigSpecs || {}), gpuDetail: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-indigo-400 font-mono"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Memory (RAM)</span>
                      <input
                        type="text"
                        value={contentForm.gaming?.rigSpecs?.ramModel || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          gaming: {
                            ...contentForm.gaming,
                            rigSpecs: { ...(contentForm.gaming?.rigSpecs || {}), ramModel: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Speed & channels"
                        value={contentForm.gaming?.rigSpecs?.ramDetail || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          gaming: {
                            ...contentForm.gaming,
                            rigSpecs: { ...(contentForm.gaming?.rigSpecs || {}), ramDetail: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-[#4edea3] font-mono"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Display Monitor</span>
                      <input
                        type="text"
                        value={contentForm.gaming?.rigSpecs?.displayModel || contentForm.gaming?.display || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          gaming: {
                            ...contentForm.gaming,
                            display: e.target.value,
                            rigSpecs: { ...(contentForm.gaming?.rigSpecs || {}), displayModel: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Response time"
                        value={contentForm.gaming?.rigSpecs?.displayDetail || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          gaming: {
                            ...contentForm.gaming,
                            rigSpecs: { ...(contentForm.gaming?.rigSpecs || {}), displayDetail: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-amber-400 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* SUB-TAB 4: ABOUT PAGE                                     */}
            {/* ========================================================= */}
            {contentSubTab === 'about' && (
              <div className="space-y-6 animate-fade-in">
                {/* 4.1 Spotlight & Status */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-indigo-400">person</span>
                      <h3 className="font-heading text-lg font-bold text-white">About Spotlight &amp; Bio</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveContentSection('about')}
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      <span>Save About</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={contentForm.about?.badgeText || ''}
                        onChange={(e) => setContentForm({ ...contentForm, about: { ...contentForm.about, badgeText: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Heading</label>
                      <input
                        type="text"
                        value={contentForm.about?.heading || ''}
                        onChange={(e) => setContentForm({ ...contentForm, about: { ...contentForm.about, heading: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Subtitle Lead</label>
                    <textarea
                      rows={2}
                      value={contentForm.about?.subtitle || ''}
                      onChange={(e) => setContentForm({ ...contentForm, about: { ...contentForm.about, subtitle: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Status Chip</label>
                      <input
                        type="text"
                        value={contentForm.about?.statusText || ''}
                        onChange={(e) => setContentForm({ ...contentForm, about: { ...contentForm.about, statusText: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Profile ID</label>
                      <input
                        type="text"
                        value={contentForm.about?.profileId || ''}
                        onChange={(e) => setContentForm({ ...contentForm, about: { ...contentForm.about, profileId: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-blue-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 4.2 Philosophy & 4 Key Animated Counters */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <span className="font-heading text-lg font-bold text-white block pb-2 border-b border-slate-800">
                    Philosophy &amp; 4 Metric Milestones
                  </span>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Philosophy Title</label>
                    <input
                      type="text"
                      value={contentForm.about?.philosophyTitle || ''}
                      onChange={(e) => setContentForm({ ...contentForm, about: { ...contentForm.about, philosophyTitle: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Creative Philosophy Text</label>
                    <textarea
                      rows={3}
                      value={contentForm.about?.philosophyText || ''}
                      onChange={(e) => setContentForm({ ...contentForm, about: { ...contentForm.about, philosophyText: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white leading-relaxed"
                    />
                  </div>

                  {/* 4 Animated Counter Targets */}
                  <div className="pt-2">
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-2">4 Animated Counter Targets</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] font-mono text-blue-400 block uppercase">Gaming (Years)</span>
                        <input
                          type="number"
                          value={contentForm.about?.stats?.gaming ?? 10}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            about: {
                              ...contentForm.about,
                              stats: { ...(contentForm.about?.stats || {}), gaming: parseInt(e.target.value) || 0 }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-sm font-bold text-white mt-1"
                        />
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] font-mono text-indigo-400 block uppercase">Tracks (Count)</span>
                        <input
                          type="number"
                          value={contentForm.about?.stats?.tracks ?? 1500}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            about: {
                              ...contentForm.about,
                              stats: { ...(contentForm.about?.stats || {}), tracks: parseInt(e.target.value) || 0 }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-sm font-bold text-white mt-1"
                        />
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] font-mono text-blue-400 block uppercase">Movies (Critiqued)</span>
                        <input
                          type="number"
                          value={contentForm.about?.stats?.movies ?? 800}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            about: {
                              ...contentForm.about,
                              stats: { ...(contentForm.about?.stats || {}), movies: parseInt(e.target.value) || 0 }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-sm font-bold text-white mt-1"
                        />
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] font-mono text-indigo-400 block uppercase">Reach (k+)</span>
                        <input
                          type="number"
                          value={contentForm.about?.stats?.reach ?? 50}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            about: {
                              ...contentForm.about,
                              stats: { ...(contentForm.about?.stats || {}), reach: parseInt(e.target.value) || 0 }
                            }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-sm font-bold text-white mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4.3 The Origin Story (3 Narrative Chapters) */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <span className="font-heading text-lg font-bold text-white block pb-2 border-b border-slate-800">
                    The Origin Story &amp; 3 Narrative Blocks
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Story Section Title</label>
                      <input
                        type="text"
                        value={contentForm.about?.story?.originTitle || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          about: {
                            ...contentForm.about,
                            story: { ...(contentForm.about?.story || {}), originTitle: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Story Lead Paragraph</label>
                      <textarea
                        rows={2}
                        value={contentForm.about?.story?.originText || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          about: {
                            ...contentForm.about,
                            story: { ...(contentForm.about?.story || {}), originText: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    {/* Block 1 */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <span className="text-xs font-mono font-bold text-indigo-400">Chapter 1: Musical Genesis</span>
                      <input
                        type="text"
                        value={contentForm.about?.story?.block1Title || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          about: {
                            ...contentForm.about,
                            story: { ...(contentForm.about?.story || {}), block1Title: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs text-white font-semibold"
                      />
                      <textarea
                        rows={2}
                        value={contentForm.about?.story?.block1Text || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          about: {
                            ...contentForm.about,
                            story: { ...(contentForm.about?.story || {}), block1Text: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>

                    {/* Block 2 */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <span className="text-xs font-mono font-bold text-blue-400">Chapter 2: Cinematic Vision</span>
                      <input
                        type="text"
                        value={contentForm.about?.story?.block2Title || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          about: {
                            ...contentForm.about,
                            story: { ...(contentForm.about?.story || {}), block2Title: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs text-white font-semibold"
                      />
                      <textarea
                        rows={2}
                        value={contentForm.about?.story?.block2Text || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          about: {
                            ...contentForm.about,
                            story: { ...(contentForm.about?.story || {}), block2Text: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>

                    {/* Block 3 */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <span className="text-xs font-mono font-bold text-indigo-400">Chapter 3: Esports Grit</span>
                      <input
                        type="text"
                        value={contentForm.about?.story?.block3Title || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          about: {
                            ...contentForm.about,
                            story: { ...(contentForm.about?.story || {}), block3Title: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs text-white font-semibold"
                      />
                      <textarea
                        rows={2}
                        value={contentForm.about?.story?.block3Text || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          about: {
                            ...contentForm.about,
                            story: { ...(contentForm.about?.story || {}), block3Text: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 4.4 The 4 Pillars / Selected Tastes & Bottom CTA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase">Selected Tastes (4 Pillars)</span>
                    <div className="space-y-2">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block">Favorite Artists</label>
                        <input
                          type="text"
                          value={contentForm.about?.pillars?.card1Title || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            about: {
                              ...contentForm.about,
                              pillars: { ...(contentForm.about?.pillars || {}), card1Title: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block">Favorite Movies</label>
                        <input
                          type="text"
                          value={contentForm.about?.pillars?.card2Title || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            about: {
                              ...contentForm.about,
                              pillars: { ...(contentForm.about?.pillars || {}), card2Title: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block">Favorite Games</label>
                        <input
                          type="text"
                          value={contentForm.about?.pillars?.card3Title || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            about: {
                              ...contentForm.about,
                              pillars: { ...(contentForm.about?.pillars || {}), card3Title: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block">Favorite Setup</label>
                        <input
                          type="text"
                          value={contentForm.about?.pillars?.card4Title || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            about: {
                              ...contentForm.about,
                              pillars: { ...(contentForm.about?.pillars || {}), card4Title: e.target.value }
                            }
                          })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <span className="text-xs font-mono font-bold text-indigo-400 uppercase">About Bottom Connect CTA</span>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Heading</label>
                      <input
                        type="text"
                        value={contentForm.about?.cta?.title || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          about: {
                            ...contentForm.about,
                            cta: { ...(contentForm.about?.cta || {}), title: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Subtitle</label>
                      <textarea
                        rows={2}
                        value={contentForm.about?.cta?.subtitle || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          about: {
                            ...contentForm.about,
                            cta: { ...(contentForm.about?.cta || {}), subtitle: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Button Text</label>
                      <input
                        type="text"
                        value={contentForm.about?.cta?.btnText || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          about: {
                            ...contentForm.about,
                            cta: { ...(contentForm.about?.cta || {}), btnText: e.target.value }
                          }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* SUB-TAB 5: MEDIA HEADERS (MUSIC & CINEMA)                 */}
            {/* ========================================================= */}
            {contentSubTab === 'mediaHeaders' && (
              <div className="space-y-6 animate-fade-in">
                {/* Music Lounge Header */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-400">headphones</span>
                      <h3 className="font-heading text-lg font-bold text-white">Music Lounge Section Header</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveContentSection('musicSection')}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      <span>Save Music Header</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Eyebrow Pill</label>
                      <input
                        type="text"
                        value={contentForm.musicSection?.eyebrow || ''}
                        onChange={(e) => setContentForm({ ...contentForm, musicSection: { ...contentForm.musicSection, eyebrow: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Main Heading</label>
                      <input
                        type="text"
                        value={contentForm.musicSection?.heading || ''}
                        onChange={(e) => setContentForm({ ...contentForm, musicSection: { ...contentForm.musicSection, heading: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Subtitle</label>
                    <textarea
                      rows={2}
                      value={contentForm.musicSection?.subtitle || ''}
                      onChange={(e) => setContentForm({ ...contentForm, musicSection: { ...contentForm.musicSection, subtitle: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white"
                    />
                  </div>
                </div>

                {/* Cinema Vault Header */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-indigo-400">movie</span>
                      <h3 className="font-heading text-lg font-bold text-white">Cinema Vault Section Header</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveContentSection('cinemaSection')}
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      <span>Save Cinema Header</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Eyebrow Pill</label>
                      <input
                        type="text"
                        value={contentForm.cinemaSection?.eyebrow || ''}
                        onChange={(e) => setContentForm({ ...contentForm, cinemaSection: { ...contentForm.cinemaSection, eyebrow: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Main Heading</label>
                      <input
                        type="text"
                        value={contentForm.cinemaSection?.heading || ''}
                        onChange={(e) => setContentForm({ ...contentForm, cinemaSection: { ...contentForm.cinemaSection, heading: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Subtitle</label>
                    <textarea
                      rows={2}
                      value={contentForm.cinemaSection?.subtitle || ''}
                      onChange={(e) => setContentForm({ ...contentForm, cinemaSection: { ...contentForm.cinemaSection, subtitle: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* SUB-TAB 6: FOOTER & GLOBAL BRANDING                       */}
            {/* ========================================================= */}
            {contentSubTab === 'footer' && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-400">copyright</span>
                      <h3 className="font-heading text-lg font-bold text-white">Footer &amp; Global Branding</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveContentSection('footer')}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      <span>Save Footer</span>
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Brand Tagline</label>
                    <input
                      type="text"
                      value={contentForm.footer?.brandTagline || ''}
                      onChange={(e) => setContentForm({ ...contentForm, footer: { ...contentForm.footer, brandTagline: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Footer Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.footer?.description || ''}
                      onChange={(e) => setContentForm({ ...contentForm, footer: { ...contentForm.footer, description: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Copyright Notice</label>
                    <input
                      type="text"
                      value={contentForm.footer?.copyright || ''}
                      onChange={(e) => setContentForm({ ...contentForm, footer: { ...contentForm.footer, copyright: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: SOCIAL MEDIA & CONTACT MANAGER                     */}
        {/* ========================================================= */}
        {activeTab === 'social' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <h2 className="font-heading text-2xl font-bold text-white">Social Media &amp; Contact Manager</h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure your social profiles, contact email, and direct transmission links. Configured links automatically update across the website and footer.
              </p>
            </div>

            <form onSubmit={handleSaveSocialLinks} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono block mb-2">
                  WhatsApp Contact Number / Link
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-emerald-400">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </span>
                  <input
                    type="text"
                    placeholder="+91 95086 78989 or https://wa.me/919508678989"
                    value={socialForm.whatsapp || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, whatsapp: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono block mb-2">
                  Contact &amp; Administrative Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-blue-400">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </span>
                  <input
                    type="email"
                    placeholder="ayushshrivastava2108@gmail.com"
                    value={socialForm.email || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono block mb-2">
                  Instagram Profile URL
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-pink-400">
                    <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                  </span>
                  <input
                    type="text"
                    placeholder="https://instagram.com/imayush2108"
                    value={socialForm.instagram || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-pink-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono block mb-2">
                  Facebook Profile URL
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sky-400">
                    <span className="material-symbols-outlined text-[20px]">public</span>
                  </span>
                  <input
                    type="text"
                    placeholder="https://facebook.com/imayush2108"
                    value={socialForm.facebook || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Save Social &amp; Contact Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: INBOUND COLLABORATIONS & LEADS                     */}
        {/* ========================================================= */}
        {activeTab === 'collabs' && (
          <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Inbound Collaborations Desk</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Review direct partnership proposals, sponsorship leads, and scrim invites submitted through the contact gateway.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 font-mono text-xs">
                {collaborations.length} Total Inquiries
              </span>
            </div>

            <div className="space-y-4">
              {collaborations.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400">
                  <span className="material-symbols-outlined text-[36px] text-slate-600 mb-2">mark_email_read</span>
                  <p className="text-sm">No collaboration leads currently pending.</p>
                </div>
              ) : (
                collaborations.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{lead.name}</span>
                        <span className="text-xs text-blue-400 font-mono">• {lead.email}</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] ${
                            lead.status === 'Completed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {lead.status || 'Pending'}
                        </span>
                      </div>
                      <p className="text-xs text-indigo-400 font-semibold font-mono">{lead.category}</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{lead.message || lead.notes}</p>
                      {lead.tags && lead.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {lead.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {lead.status !== 'Completed' ? (
                        <button
                          onClick={() => {
                            updateCollaborationStatus(lead.id, 'Completed');
                            showToast(`Marked inquiry from ${lead.name} as completed!`, 'task_alt');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          <span>Complete</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            updateCollaborationStatus(lead.id, 'Pending');
                            showToast(`Reopened inquiry from ${lead.name}.`, 'undo');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                        >
                          Reopen
                        </button>
                      )}
                      <a
                        href={`mailto:${lead.email}?subject=Regarding%20Ayush%20Hub%20Collaboration`}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">send</span>
                        <span>Reply</span>
                      </a>
                      <button
                        onClick={() => setDeleteConfirm({ open: true, type: 'collab', id: lead.id, title: lead.name })}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* ADD / EDIT SONG MODAL                                     */}
      {/* ========================================================= */}
      {songModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSongModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">headphones</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white">
                  {editingSongId ? 'Edit Track Details' : 'Add New Track to Lounge'}
                </h3>
                <p className="text-xs text-slate-400">Configure song metadata, YouTube embed, and Spotify link.</p>
              </div>
            </div>

            <form onSubmit={handleSaveSong} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Song Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Born to Shine"
                    value={songForm.title}
                    onChange={(e) => setSongForm({ ...songForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Artist Name(s) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Diljit Dosanjh"
                    value={songForm.artist}
                    onChange={(e) => setSongForm({ ...songForm, artist: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Movie / Album</label>
                  <input
                    type="text"
                    placeholder="e.g. G.O.A.T (2020)"
                    value={songForm.movie}
                    onChange={(e) => setSongForm({ ...songForm, movie: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={songForm.category}
                    onChange={(e) => setSongForm({ ...songForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="bollywood">Bollywood</option>
                    <option value="punjabi">Punjabi</option>
                    <option value="indie">Indie Pop</option>
                    <option value="gym">Gym Hype</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 3:32 min"
                    value={songForm.duration}
                    onChange={(e) => setSongForm({ ...songForm, duration: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* YouTube Link / ID with Live Preview */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  YouTube Video Link or ID
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-red-500">
                    <span className="material-symbols-outlined text-[18px]">smart_display</span>
                  </span>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=cl0a3i2wFcc or cl0a3i2wFcc"
                    value={songForm.youtubeId}
                    onChange={(e) => setSongForm({ ...songForm, youtubeId: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                {songForm.youtubeId && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Detected ID: <code className="text-blue-400">{extractYouTubeId(songForm.youtubeId)}</code>
                  </p>
                )}
              </div>

              {/* Spotify Track Link / ID */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Spotify Track Link or ID
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-emerald-400">
                    <span className="material-symbols-outlined text-[18px]">podcasts</span>
                  </span>
                  <input
                    type="text"
                    placeholder="https://open.spotify.com/track/3RauEV9g7AOzQ3IRiH3n8P or 3RauEV9g7AOzQ3IRiH3n8P"
                    value={songForm.spotifyTrackId}
                    onChange={(e) => setSongForm({ ...songForm, spotifyTrackId: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* Cover Image URL with Live Image Preview */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Cover Image URL (Leave blank to auto-use YouTube thumbnail)
                </label>
                <input
                  type="text"
                  placeholder="https://... or auto-generated"
                  value={songForm.coverUrl}
                  onChange={(e) => setSongForm({ ...songForm, coverUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500 mb-2"
                />

                {/* Instant Cover Preview */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-16 h-16 rounded-lg bg-slate-800 overflow-hidden shrink-0">
                    <img
                      src={
                        songForm.coverUrl ||
                        (songForm.youtubeId
                          ? `https://img.youtube.com/vi/${extractYouTubeId(songForm.youtubeId)}/maxresdefault.jpg`
                          : '/images/showcase-bollywood-music.jpg')
                      }
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/images/showcase-bollywood-music.jpg'; }}
                    />
                  </div>
                  <div className="text-xs text-slate-400">
                    <p className="font-semibold text-white">Live Cover Preview</p>
                    <p className="text-[11px] mt-0.5">High-res thumbnail for music lounge player &amp; search lists.</p>
                  </div>
                </div>
              </div>

              {/* Curator Note & Lyrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Ayush Curator Note</label>
                  <textarea
                    rows={2}
                    placeholder="Why this song is iconic..."
                    value={songForm.ayushNote}
                    onChange={(e) => setSongForm({ ...songForm, ayushNote: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Song Lyrics (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Desi Crew, Desi Crew..."
                    value={songForm.lyrics}
                    onChange={(e) => setSongForm({ ...songForm, lyrics: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* Publication Status Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div>
                  <p className="text-xs font-semibold text-white">Publish Immediately</p>
                  <p className="text-[11px] text-slate-400">Visible to all visitors in the public Music Lounge.</p>
                </div>
                <input
                  type="checkbox"
                  checked={songForm.isPublished}
                  onChange={(e) => setSongForm({ ...songForm, isPublished: e.target.checked })}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSongModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md"
                >
                  {editingSongId ? 'Save Changes' : 'Publish Track'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ADD / EDIT MOVIE MODAL                                    */}
      {/* ========================================================= */}
      {movieModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setMovieModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">theaters</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white">
                  {editingMovieId ? 'Edit Cinema Entry' : 'Add New Movie to Vault'}
                </h3>
                <p className="text-xs text-slate-400">Configure title, poster, review rating, and 4K YouTube trailer.</p>
              </div>
            </div>

            <form onSubmit={handleSaveMovie} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Movie Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kalki 2898 AD"
                    value={movieForm.title}
                    onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Franchise / Universe</label>
                  <input
                    type="text"
                    placeholder="e.g. Marvel Cinematic Universe"
                    value={movieForm.franchise}
                    onChange={(e) => setMovieForm({ ...movieForm, franchise: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={movieForm.category}
                    onChange={(e) => setMovieForm({ ...movieForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="bollywood">Bollywood / Hindi</option>
                    <option value="south">South Indian Action</option>
                    <option value="marvel">Marvel (MCU)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Release Year</label>
                  <input
                    type="text"
                    placeholder="2024"
                    value={movieForm.releaseYear}
                    onChange={(e) => setMovieForm({ ...movieForm, releaseYear: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Rating (Out of 10)</label>
                  <input
                    type="text"
                    placeholder="9.2"
                    value={movieForm.rating}
                    onChange={(e) => setMovieForm({ ...movieForm, rating: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* YouTube Trailer ID with Instant Trailer Detection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">YouTube Trailer URL or ID</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-red-500">
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  </span>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=kQDd1AhGIHk or kQDd1AhGIHk"
                    value={movieForm.youtubeId}
                    onChange={(e) => setMovieForm({ ...movieForm, youtubeId: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* Poster Image URL & Preview */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Poster Image URL (Leave blank to use YouTube poster)
                </label>
                <input
                  type="text"
                  placeholder="https://... or auto-generated from YouTube"
                  value={movieForm.posterUrl}
                  onChange={(e) => setMovieForm({ ...movieForm, posterUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500 mb-2"
                />

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-14 h-16 rounded-lg bg-slate-800 overflow-hidden shrink-0">
                    <img
                      src={
                        movieForm.posterUrl ||
                        (movieForm.youtubeId
                          ? `https://img.youtube.com/vi/${extractYouTubeId(movieForm.youtubeId)}/maxresdefault.jpg`
                          : '/images/showcase-cinema-2026.jpg')
                      }
                      alt="Poster Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/images/showcase-cinema-2026.jpg'; }}
                    />
                  </div>
                  <div className="text-xs text-slate-400">
                    <p className="font-semibold text-white">Poster Image Preview</p>
                    <p className="text-[11px] mt-0.5">Will be displayed on movie card and screening room.</p>
                  </div>
                </div>
              </div>

              {/* Overview & Honest Review */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Movie Overview &amp; Synopsis</label>
                <textarea
                  rows={2}
                  placeholder="In a ruined dystopian world, an immortal warrior protects an unborn child..."
                  value={movieForm.overview}
                  onChange={(e) => setMovieForm({ ...movieForm, overview: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Editorial Verdict Text</label>
                  <input
                    type="text"
                    placeholder="Editor's Choice ★ 9.2/10"
                    value={movieForm.verdict}
                    onChange={(e) => setMovieForm({ ...movieForm, verdict: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Status</label>
                  <select
                    value={movieForm.status}
                    onChange={(e) => setMovieForm({ ...movieForm, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="featured">Featured Spotlight</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setMovieModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md"
                >
                  {editingMovieId ? 'Save Changes' : 'Publish Film'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DELETE CONFIRMATION MODAL                                 */}
      {/* ========================================================= */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-red-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[30px]">warning</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">Confirm Removal</h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Are you sure you want to delete <span className="text-white font-semibold font-mono">"{deleteConfirm.title}"</span>? This will permanently remove it from your live library.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm({ open: false, type: null, id: null, title: '' })}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-900/30"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TOAST NOTIFICATION                                        */}
      {/* ========================================================= */}
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
