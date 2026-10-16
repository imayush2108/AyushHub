import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { songsData as initialSongs } from '../data/songsData';
import { moviesData as initialMovies } from '../data/moviesData';
import { defaultSiteContent } from '../data/defaultSiteContent';

const ContentContext = createContext(null);

const STORAGE_KEY_SONGS = 'ayush_hub_songs_cache';
const STORAGE_KEY_MOVIES = 'ayush_hub_movies_cache';
const STORAGE_KEY_SITE = 'ayush_hub_site_cache';
const STORAGE_KEY_COLLABS = 'ayush_hub_collabs_cache';

// Helper to normalize song objects for database/UI compatibility
const normalizeSong = (s) => ({
  id: s.id || `song-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
  title: s.title || '',
  artist: s.artist || '',
  movie: s.movie || '',
  category: (s.category || 'bollywood').toLowerCase(),
  subcategories: Array.isArray(s.subcategories) ? s.subcategories : [s.category || 'bollywood'],
  bpm: s.bpm || '',
  youtubeId: s.youtubeId || (s.youtube_id || ''),
  spotifyTrackId: s.spotifyTrackId || (s.spotify_track_id || ''),
  spotifyUrl: s.spotifyUrl || (s.spotify_url || ''),
  duration: s.duration || '3:30 min',
  genre: s.genre || '',
  mood: s.mood || '',
  rating: s.rating || '9.5/10',
  icon: s.icon || '🎵',
  coverUrl: s.coverUrl || s.cover_url || (s.youtubeId ? `https://img.youtube.com/vi/${s.youtubeId}/maxresdefault.jpg` : '/images/showcase-bollywood-music.jpg'),
  ayushNote: s.ayushNote || s.ayush_note || '',
  lyrics: s.lyrics || '',
  isPublished: s.isPublished !== undefined ? s.isPublished : (s.is_published !== undefined ? s.is_published : true),
  createdAt: s.createdAt || s.created_at || new Date().toISOString(),
});

// Helper to normalize movie objects
const normalizeMovie = (m) => ({
  id: m.id || `movie-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
  title: m.title || '',
  franchise: m.franchise || '',
  category: (m.category || 'bollywood').toLowerCase(),
  categoryLabel: m.categoryLabel || m.category || '',
  releaseDate: m.releaseDate || m.release_date || '',
  releaseYear: m.releaseYear || m.release_year || '2024',
  duration: m.duration || '2h 30m',
  genre: m.genre || '',
  director: m.director || '',
  cast: Array.isArray(m.cast) ? m.cast : (typeof m.cast === 'string' ? m.cast.split(',').map((c) => c.trim()) : []),
  primaryLanguages: m.primaryLanguages || m.language || 'Hindi',
  isHindiDubbed: m.isHindiDubbed !== undefined ? m.isHindiDubbed : true,
  rating: m.rating || '9.0',
  criticsRating: m.criticsRating || '4.5 / 5.0',
  audienceRating: m.audienceRating || `${m.rating || '9.0'} / 10`,
  verdict: m.verdict || `Editor's Choice ★ ${m.rating || '9.0'}/10`,
  verdictType: m.verdictType || 'recommended',
  shortDescription: m.shortDescription || m.overview || '',
  youtubeId: m.youtubeId || (m.youtube_id || ''),
  posterUrl: m.posterUrl || m.poster_url || (m.youtubeId ? `https://img.youtube.com/vi/${m.youtubeId}/maxresdefault.jpg` : '/images/showcase-cinema-2026.jpg'),
  backdropUrl: m.backdropUrl || m.backdrop_url || (m.youtubeId ? `https://img.youtube.com/vi/${m.youtubeId}/maxresdefault.jpg` : '/images/showcase-cinema-2026.jpg'),
  overview: m.overview || '',
  review: m.review || '',
  status: m.status || 'published', // 'published' | 'draft' | 'featured'
  isPublished: m.isPublished !== undefined ? m.isPublished : (m.is_published !== undefined ? m.is_published : true),
  displayOrder: m.displayOrder || m.display_order || 0,
  createdAt: m.createdAt || m.created_at || new Date().toISOString(),
});

// Helper for deep merging objects so nested configuration keys are preserved
export const deepMerge = (target, source) => {
  if (!source || typeof source !== 'object' || Array.isArray(source)) return target;
  const output = { ...target };
  Object.keys(source).forEach((key) => {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && target && target[key]) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  });
  return output;
};

export function ContentProvider({ children }) {
  // 1. Initial State from Cache or Defaults
  const [songs, setSongs] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY_SONGS);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeSong);
        }
      }
    } catch {
      // fallback
    }
    return initialSongs.map(normalizeSong);
  });

  const [movies, setMovies] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY_MOVIES);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeMovie);
        }
      }
    } catch {
      // fallback
    }
    return initialMovies.map(normalizeMovie);
  });

  const [siteContent, setSiteContent] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY_SITE);
      if (cached) {
        return deepMerge(defaultSiteContent, JSON.parse(cached));
      }
    } catch {
      // fallback
    }
    return defaultSiteContent;
  });

  const [collaborations, setCollaborations] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY_COLLABS);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // fallback
    }
    return [
      {
        id: 'collab-1',
        name: 'Vikram Mehta',
        email: 'vikram@redbull.in',
        category: 'Sponsorship',
        tags: ['#TechHardwareReview', '#SynthwaveSet'],
        message: 'Proposing exclusive energy partner integration for Ayush Hub upcoming tournament stream and podcast segment...',
        status: 'Pending',
        createdAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
      },
      {
        id: 'collab-2',
        name: 'Rohan Sharma',
        email: 'rohan@esportsguild.com',
        category: 'Gaming Squad',
        tags: ['#ValorantScout', '#FreeFireRankPush'],
        message: 'Inviting Ayush Hub roster to prime slot in Friday Invitational Scrimmages against Tier-1 contenders...',
        status: 'Pending',
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'collab-3',
        name: 'Ananya Kapoor',
        email: 'ananya@sonymusic.com',
        category: 'Playlist Curation',
        tags: ['#BollywoodBangers'],
        message: 'Reviewing featured placement for Born to Shine on official editorial Desi Heatwave with 450k listeners...',
        status: 'Pending',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
    ];
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString());
  const [syncStatus, setSyncStatus] = useState('Synchronized');

  // Helper to persist in localStorage
  const persistState = useCallback((key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('[Ayush Hub] Storage persistence failed:', e);
    }
  }, []);

  // 2. Fetch and Sync from Supabase on Initial Load
  const fetchSupabaseData = useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) return;

    setIsSyncing(true);
    setSyncStatus('Syncing with Supabase...');

    try {
      // Fetch songs from Supabase
      const { data: dbSongs, error: songsErr } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!songsErr && dbSongs && dbSongs.length > 0) {
        const normalized = dbSongs.map(normalizeSong);
        setSongs(normalized);
        persistState(STORAGE_KEY_SONGS, normalized);
      }

      // Fetch movies from Supabase
      const { data: dbMovies, error: moviesErr } = await supabase
        .from('movies')
        .select('*')
        .order('display_order', { ascending: true });

      if (!moviesErr && dbMovies && dbMovies.length > 0) {
        const normalized = dbMovies.map(normalizeMovie);
        setMovies(normalized);
        persistState(STORAGE_KEY_MOVIES, normalized);
      }

      // Fetch site settings from Supabase
      const { data: dbSettings, error: settingsErr } = await supabase
        .from('site_settings')
        .select('*');

      if (!settingsErr && dbSettings && dbSettings.length > 0) {
        let merged = { ...defaultSiteContent };
        dbSettings.forEach((item) => {
          if (item.key && item.value) {
            merged[item.key] = deepMerge(defaultSiteContent[item.key] || {}, item.value);
          }
        });
        setSiteContent(merged);
        persistState(STORAGE_KEY_SITE, merged);
      }

      // Fetch collaborations
      const { data: dbCollabs, error: collabsErr } = await supabase
        .from('collaborations')
        .select('*')
        .order('created_at', { ascending: false });

      if (!collabsErr && dbCollabs && dbCollabs.length > 0) {
        setCollaborations(dbCollabs);
        persistState(STORAGE_KEY_COLLABS, dbCollabs);
      }

      setSyncStatus('Synchronized');
      setLastSyncTime(new Date().toLocaleTimeString());
    } catch (err) {
      console.warn('[Ayush Hub] Supabase remote sync notice:', err.message || err);
      setSyncStatus('Local Cache Active');
    } finally {
      setIsSyncing(false);
    }
  }, [persistState]);

  useEffect(() => {
    fetchSupabaseData();
  }, [fetchSupabaseData]);

  // ==========================================
  // MUSIC MANAGER CRUD
  // ==========================================
  const addSong = async (songInput) => {
    const newSong = normalizeSong({
      ...songInput,
      id: songInput.id || `song-${Date.now()}`,
      createdAt: new Date().toISOString(),
    });

    const updated = [newSong, ...songs];
    setSongs(updated);
    persistState(STORAGE_KEY_SONGS, updated);

    // Persist to Supabase if available
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('songs').upsert({
          id: newSong.id,
          title: newSong.title,
          artist: newSong.artist,
          movie: newSong.movie,
          category: newSong.category,
          youtube_id: newSong.youtubeId,
          spotify_track_id: newSong.spotifyTrackId,
          spotify_url: newSong.spotifyUrl,
          cover_url: newSong.coverUrl,
          duration: newSong.duration,
          genre: newSong.genre,
          mood: newSong.mood,
          rating: newSong.rating,
          lyrics: newSong.lyrics,
          ayush_note: newSong.ayushNote,
          is_published: newSong.isPublished,
          created_at: newSong.createdAt,
        });
      } catch (err) {
        console.warn('[Ayush Hub] Song insert to Supabase notice:', err);
      }
    }
    return newSong;
  };

  const updateSong = async (id, songInput) => {
    const updated = songs.map((s) => (s.id === id ? normalizeSong({ ...s, ...songInput, id }) : s));
    setSongs(updated);
    persistState(STORAGE_KEY_SONGS, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        const target = updated.find((s) => s.id === id);
        if (target) {
          await supabase.from('songs').upsert({
            id: target.id,
            title: target.title,
            artist: target.artist,
            movie: target.movie,
            category: target.category,
            youtube_id: target.youtubeId,
            spotify_track_id: target.spotifyTrackId,
            spotify_url: target.spotifyUrl,
            cover_url: target.coverUrl,
            duration: target.duration,
            genre: target.genre,
            mood: target.mood,
            rating: target.rating,
            lyrics: target.lyrics,
            ayush_note: target.ayushNote,
            is_published: target.isPublished,
          });
        }
      } catch (err) {
        console.warn('[Ayush Hub] Song update to Supabase notice:', err);
      }
    }
  };

  const deleteSong = async (id) => {
    const updated = songs.filter((s) => s.id !== id);
    setSongs(updated);
    persistState(STORAGE_KEY_SONGS, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('songs').delete().eq('id', id);
      } catch (err) {
        console.warn('[Ayush Hub] Song delete from Supabase notice:', err);
      }
    }
  };

  const toggleSongPublish = async (id) => {
    const target = songs.find((s) => s.id === id);
    if (!target) return;
    const newStatus = !target.isPublished;
    await updateSong(id, { isPublished: newStatus });
  };

  // ==========================================
  // MOVIES MANAGER CRUD
  // ==========================================
  const addMovie = async (movieInput) => {
    const newMovie = normalizeMovie({
      ...movieInput,
      id: movieInput.id || `movie-${Date.now()}`,
      createdAt: new Date().toISOString(),
    });

    const updated = [newMovie, ...movies];
    setMovies(updated);
    persistState(STORAGE_KEY_MOVIES, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('movies').upsert({
          id: newMovie.id,
          title: newMovie.title,
          franchise: newMovie.franchise,
          category: newMovie.category,
          category_label: newMovie.categoryLabel,
          release_year: newMovie.releaseYear,
          release_date: newMovie.releaseDate,
          duration: newMovie.duration,
          genre: newMovie.genre,
          director: newMovie.director,
          cast: newMovie.cast,
          language: newMovie.primaryLanguages,
          is_hindi_dubbed: newMovie.isHindiDubbed,
          rating: parseFloat(newMovie.rating) || 9.0,
          verdict: newMovie.verdict,
          overview: newMovie.overview,
          review: newMovie.review,
          youtube_id: newMovie.youtubeId,
          poster_url: newMovie.posterUrl,
          backdrop_url: newMovie.backdropUrl,
          status: newMovie.status,
          is_published: newMovie.isPublished,
          display_order: newMovie.displayOrder,
        });
      } catch (err) {
        console.warn('[Ayush Hub] Movie insert to Supabase notice:', err);
      }
    }
    return newMovie;
  };

  const updateMovie = async (id, movieInput) => {
    const updated = movies.map((m) => (m.id === id ? normalizeMovie({ ...m, ...movieInput, id }) : m));
    setMovies(updated);
    persistState(STORAGE_KEY_MOVIES, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        const target = updated.find((m) => m.id === id);
        if (target) {
          await supabase.from('movies').upsert({
            id: target.id,
            title: target.title,
            franchise: target.franchise,
            category: target.category,
            category_label: target.categoryLabel,
            release_year: target.releaseYear,
            release_date: target.releaseDate,
            duration: target.duration,
            genre: target.genre,
            director: target.director,
            cast: target.cast,
            language: target.primaryLanguages,
            is_hindi_dubbed: target.isHindiDubbed,
            rating: parseFloat(target.rating) || 9.0,
            verdict: target.verdict,
            overview: target.overview,
            review: target.review,
            youtube_id: target.youtubeId,
            poster_url: target.posterUrl,
            backdrop_url: target.backdropUrl,
            status: target.status,
            is_published: target.isPublished,
            display_order: target.displayOrder,
          });
        }
      } catch (err) {
        console.warn('[Ayush Hub] Movie update to Supabase notice:', err);
      }
    }
  };

  const deleteMovie = async (id) => {
    const updated = movies.filter((m) => m.id !== id);
    setMovies(updated);
    persistState(STORAGE_KEY_MOVIES, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('movies').delete().eq('id', id);
      } catch (err) {
        console.warn('[Ayush Hub] Movie delete from Supabase notice:', err);
      }
    }
  };

  const toggleMoviePublish = async (id) => {
    const target = movies.find((m) => m.id === id);
    if (!target) return;
    const newStatus = !target.isPublished;
    await updateMovie(id, {
      isPublished: newStatus,
      status: newStatus ? (target.status === 'draft' ? 'published' : target.status) : 'draft',
    });
  };

  // ==========================================
  // SITE CONTENT & SOCIAL LINKS MANAGER
  // ==========================================
  const updateSiteSection = async (sectionKey, sectionData) => {
    const updated = {
      ...siteContent,
      [sectionKey]: deepMerge(siteContent[sectionKey] || {}, sectionData),
    };
    setSiteContent(updated);
    persistState(STORAGE_KEY_SITE, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('site_settings').upsert({
          key: sectionKey,
          value: updated[sectionKey],
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('[Ayush Hub] Site setting update to Supabase notice:', err);
      }
    }
  };

  const updateSocialLinks = async (socialLinksData) => {
    await updateSiteSection('socialLinks', socialLinksData);
  };

  // ==========================================
  // INBOUND COLLABORATIONS
  // ==========================================
  const submitCollaboration = async (collabData) => {
    const newLead = {
      id: `collab-${Date.now()}`,
      name: collabData.name || 'Anonymous',
      email: collabData.email || '',
      category: collabData.category || 'Collaboration',
      tags: collabData.tags || [],
      message: collabData.message || '',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    const updated = [newLead, ...collaborations];
    setCollaborations(updated);
    persistState(STORAGE_KEY_COLLABS, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('collaborations').insert({
          name: newLead.name,
          email: newLead.email,
          category: newLead.category,
          notes: newLead.message,
          status: newLead.status,
          created_at: newLead.createdAt,
        });
      } catch (err) {
        console.warn('[Ayush Hub] Collaboration insert notice:', err);
      }
    }
    return newLead;
  };

  const updateCollaborationStatus = async (id, status) => {
    const updated = collaborations.map((c) => (c.id === id ? { ...c, status } : c));
    setCollaborations(updated);
    persistState(STORAGE_KEY_COLLABS, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('collaborations').update({ status }).eq('id', id);
      } catch (err) {
        console.warn('[Ayush Hub] Collaboration status update notice:', err);
      }
    }
  };

  const deleteCollaboration = async (id) => {
    const updated = collaborations.filter((c) => c.id !== id);
    setCollaborations(updated);
    persistState(STORAGE_KEY_COLLABS, updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('collaborations').delete().eq('id', id);
      } catch (err) {
        console.warn('[Ayush Hub] Collaboration delete notice:', err);
      }
    }
  };

  // ==========================================
  // SEED TO SUPABASE (1-CLICK BULK BACKUP/SEED)
  // ==========================================
  const seedToDatabase = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase is not configured.');
    }

    setIsSyncing(true);
    try {
      // 1. Seed Songs
      const songRows = songs.map((s) => ({
        id: s.id,
        title: s.title,
        artist: s.artist,
        movie: s.movie,
        category: s.category,
        youtube_id: s.youtubeId,
        spotify_track_id: s.spotifyTrackId,
        spotify_url: s.spotifyUrl,
        cover_url: s.coverUrl,
        duration: s.duration,
        genre: s.genre,
        mood: s.mood,
        rating: s.rating,
        lyrics: s.lyrics,
        ayush_note: s.ayushNote,
        is_published: s.isPublished,
      }));
      await supabase.from('songs').upsert(songRows, { onConflict: 'id' });

      // 2. Seed Movies
      const movieRows = movies.map((m) => ({
        id: m.id,
        title: m.title,
        franchise: m.franchise,
        category: m.category,
        release_year: m.releaseYear,
        release_date: m.releaseDate,
        duration: m.duration,
        genre: m.genre,
        director: m.director,
        cast: m.cast,
        language: m.primaryLanguages,
        is_hindi_dubbed: m.isHindiDubbed,
        rating: parseFloat(m.rating) || 9.0,
        verdict: m.verdict,
        overview: m.overview,
        review: m.review,
        youtube_id: m.youtubeId,
        poster_url: m.posterUrl,
        backdrop_url: m.backdropUrl,
        status: m.status,
        is_published: m.isPublished,
        display_order: m.displayOrder,
      }));
      await supabase.from('movies').upsert(movieRows, { onConflict: 'id' });

      // 3. Seed Site Settings
      for (const [key, value] of Object.entries(siteContent)) {
        await supabase.from('site_settings').upsert({
          key,
          value,
          updated_at: new Date().toISOString(),
        });
      }

      setSyncStatus('Synchronized');
      setLastSyncTime(new Date().toLocaleTimeString());
      return { success: true, countSongs: songRows.length, countMovies: movieRows.length };
    } finally {
      setIsSyncing(false);
    }
  };

  // ==========================================
  // REAL-TIME COMPUTED STATS
  // ==========================================
  const stats = useMemo(() => {
    const publishedSongsCount = songs.filter((s) => s.isPublished !== false).length;
    const draftSongsCount = songs.length - publishedSongsCount;

    const publishedMoviesCount = movies.filter((m) => m.isPublished !== false && m.status !== 'draft').length;
    const draftMoviesCount = movies.length - publishedMoviesCount;
    const featuredMoviesCount = movies.filter((m) => m.status === 'featured').length;

    const pendingLeadsCount = collaborations.filter((c) => c.status === 'Pending').length;

    return {
      totalSongs: songs.length,
      publishedSongs: publishedSongsCount,
      draftSongs: draftSongsCount,
      totalMovies: movies.length,
      publishedMovies: publishedMoviesCount,
      draftMovies: draftMoviesCount,
      featuredMovies: featuredMoviesCount,
      pendingLeads: pendingLeadsCount,
      totalLeads: collaborations.length,
      lastSyncTime,
      syncStatus,
    };
  }, [songs, movies, collaborations, lastSyncTime, syncStatus]);

  // Publicly visible lists (filtered for public visitors)
  const publicSongs = useMemo(() => songs.filter((s) => s.isPublished !== false), [songs]);
  const publicMovies = useMemo(() => movies.filter((m) => m.isPublished !== false && m.status !== 'draft'), [movies]);

  const value = {
    // Data
    songs, // all songs for admin
    publicSongs, // filtered for public
    movies, // all movies for admin
    publicMovies, // filtered for public
    siteContent,
    collaborations,
    stats,
    isSyncing,
    syncStatus,

    // Song actions
    addSong,
    updateSong,
    deleteSong,
    toggleSongPublish,

    // Movie actions
    addMovie,
    updateMovie,
    deleteMovie,
    toggleMoviePublish,

    // Content actions
    updateSiteSection,
    updateSocialLinks,

    // Collaboration actions
    submitCollaboration,
    updateCollaborationStatus,
    deleteCollaboration,

    // Sync & Seed actions
    fetchSupabaseData,
    seedToDatabase,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
