import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  Play, 
  Copy, 
  Check, 
  ExternalLink, 
  Music, 
  Film, 
  Sparkles, 
  Clock, 
  User, 
  Share2, 
  Heart,
  MessageCircle
} from 'lucide-react';
import { getSongById, getNextPrevSong, getRelatedSongs, songsData } from '../data/songsData';
import { getAssetUrl } from '../utils/assets';

export default function TrackDetailPage({ trackId, onBack }) {
  const [copied, setCopied] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const song = getSongById(trackId) || songsData[0];
  const { prevSong, nextSong } = getNextPrevSong(song.id);
  const relatedSongs = getRelatedSongs(song.id, 4);

  // Initialize and update thumbnail when song changes
  useEffect(() => {
    if (song) {
      setImgSrc(song.thumbnail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.title = `${song.title} (${song.movie}) - Ayush Hub Media Lounge`;
    }
  }, [song?.id]);

  const handleCopyLyrics = () => {
    if (!song?.lyrics) return;
    navigator.clipboard.writeText(song.lyrics).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }).catch(err => {
      console.warn('Clipboard copy failed:', err);
    });
  };

  const handleThumbnailError = () => {
    // If hqdefault fails, try mqdefault or fallback
    if (imgSrc && imgSrc.includes('hqdefault.jpg')) {
      setImgSrc(`https://i.ytimg.com/vi/${song.youtubeId}/mqdefault.jpg`);
    } else {
      setImgSrc(getAssetUrl('images/showcase-bollywood-music.jpg'));
    }
  };

  const shareText = `Check out "${song.title}" from ${song.movie} on Ayush Hub!`;
  const shareWhatsAppUrl = `https://wa.me/919508678989?text=${encodeURIComponent(
    `Hi Ayush, I was exploring the "${song.title}" (${song.movie}) detail page on Ayush Hub! Rating: ${song.rating}. Full lyrics and player are awesome!`
  )}`;

  return (
    <div className="track-detail-page">
      {/* Top Breadcrumb & Navigation Bar */}
      <nav className="track-detail-nav-bar" aria-label="Song details navigation">
        <div className="container track-nav-container">
          <div className="track-nav-left">
            <button 
              type="button" 
              onClick={onBack} 
              className="track-back-btn"
              title="Return to My Entertainment Corner"
            >
              <ArrowLeft size={18} />
              <span>Back to My Entertainment Corner</span>
            </button>
            <div className="track-breadcrumb-crumbs">
              <span className="crumb-root" onClick={onBack}>Ayush Hub</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-root" onClick={onBack}>My Entertainment Corner</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-active">{song.title}</span>
            </div>
          </div>

          <div className="track-nav-right">
            {prevSong && (
              <a 
                href={`#/track/${prevSong.id}`} 
                className="nav-song-arrow-btn"
                title={`Previous: ${prevSong.title}`}
              >
                <ArrowLeft size={16} />
                <span className="nav-arrow-label">Prev</span>
              </a>
            )}
            {nextSong && (
              <a 
                href={`#/track/${nextSong.id}`} 
                className="nav-song-arrow-btn"
                title={`Next: ${nextSong.title}`}
              >
                <span className="nav-arrow-label">Next</span>
                <ArrowRight size={16} />
              </a>
            )}
            <a 
              href={shareWhatsAppUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="track-nav-wa-btn"
              title="Chat with Ayush on WhatsApp about this track"
            >
              <MessageCircle size={16} />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </nav>

      <div className="container track-detail-main-content">
        {/* Main Flagship Showcase Card matching Digital Content Showcases design */}
        <section className="track-flagship-showcase-card">
          <div className="track-header-banner-wrap">
            <img 
              src={imgSrc || song.thumbnail} 
              alt={`${song.title} official thumbnail from ${song.movie}`} 
              className="track-header-banner-img"
              onError={handleThumbnailError}
              loading="eager"
            />
            <div className="track-banner-gradient-overlay" />
            
            {/* Top Floating Badges */}
            <div className="track-banner-top-badges">
              <span className="showcase-category-pill">
                {song.artistTag || 'Bollywood Vault'}
              </span>
              <span className="showcase-score-badge">
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <span>{song.rating}</span>
              </span>
            </div>

            {/* Bottom Floating Info Over Banner */}
            <div className="track-banner-bottom-info">
              <span className="track-banner-subbadge">
                ✨ Official Video Still & Music Cover • From {song.movie}
              </span>
              <h1 className="track-banner-h1">{song.title}</h1>
              <p className="track-banner-meta-line">
                <span>🎤 {song.artist}</span>
                <span className="dot">•</span>
                <span>⏱ {song.duration}</span>
                <span className="dot">•</span>
                <span>🎵 {song.genre}</span>
              </p>
            </div>
          </div>

          <div className="track-showcase-body">
            {/* Curator Review Card */}
            <div className="track-curator-review-box">
              <div className="curator-avatar-wrap">
                <img 
                  src={getAssetUrl('images/hero-ayush.jpg')} 
                  alt="Ayush Shrivastava" 
                  className="curator-avatar-img"
                />
              </div>
              <div className="curator-review-content">
                <div className="curator-meta-badge">
                  <span className="curator-name">Ayush's Curator Review</span>
                  <span className="curator-score">Vault Score: {song.rating}</span>
                </div>
                <p className="curator-review-quote">
                  "{song.ayushNote}"
                </p>
                <div className="curator-mood-tags">
                  <span className="curator-tag-pill">Mood: {song.mood}</span>
                  <span className="curator-tag-pill">Category: {song.category}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="track-quick-actions-bar">
              <a 
                href={song.spotifyUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-spotify-action"
              >
                <span>🟢 Open on Spotify</span>
                <ExternalLink size={15} />
              </a>
              <a 
                href={`https://www.youtube.com/watch?v=${song.youtubeId}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-youtube-action"
              >
                <span>🎬 Watch on YouTube</span>
                <ExternalLink size={15} />
              </a>
              <button 
                type="button" 
                onClick={handleCopyLyrics} 
                className="btn btn-copy-lyrics-action"
              >
                {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                <span>{copied ? 'Lyrics Copied!' : 'Copy Full Lyrics'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* DUAL HIGH-FIDELITY MEDIA PLAYERS SECTION */}
        <section className="track-media-players-section">
          <div className="section-title-wrap text-left">
            <span className="section-tag">DUAL PLAYBACK ENGINES</span>
            <h2 className="section-heading">High-Fidelity Audio & Full HD Video</h2>
            <p className="section-subtext">
              Experience "{song.title}" through both the official YouTube music video and lossless Spotify studio playback.
            </p>
          </div>

          <div className="track-players-dual-grid">
            {/* 1. Official YouTube Music Video Embed */}
            <div className="media-player-card yt-player-card">
              <div className="media-player-card-header">
                <div className="media-engine-ident">
                  <span className="engine-icon-yt">🎬</span>
                  <div>
                    <h4>Official Music Video</h4>
                    <p>Full HD 1080p Stream from YouTube</p>
                  </div>
                </div>
                <a 
                  href={`https://www.youtube.com/watch?v=${song.youtubeId}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="engine-direct-link"
                  title="Watch on YouTube.com"
                >
                  <span>Open on YouTube</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="player-iframe-wrap yt-iframe-container">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${song.youtubeId}?rel=0&autoplay=0`}
                  title={`${song.title} - Official Music Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="embedded-media-iframe yt-frame"
                />
              </div>

              <div className="player-card-footer">
                <span className="footer-meta-txt">
                  🎬 Playing official track: <strong>{song.title}</strong> ({song.movie})
                </span>
                <span className="footer-duration-badge">⏱ {song.duration}</span>
              </div>
            </div>

            {/* 2. Official Spotify Track Embed Player */}
            <div className="media-player-card spotify-player-card">
              <div className="media-player-card-header">
                <div className="media-engine-ident">
                  <span className="engine-icon-spot">🟢</span>
                  <div>
                    <h4>Official Spotify Player</h4>
                    <p>Lossless Studio Audio Stream</p>
                  </div>
                </div>
                <a 
                  href={song.spotifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="engine-direct-link"
                  title="Open in Spotify App"
                >
                  <span>Open in Spotify</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="player-iframe-wrap spotify-iframe-container">
                <iframe
                  src={`https://open.spotify.com/embed/track/${song.spotifyTrackId}?utm_source=generator&theme=0`}
                  title={`${song.title} - Spotify Audio Stream`}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="embedded-media-iframe spotify-frame"
                />
              </div>

              <div className="player-card-footer">
                <span className="footer-meta-txt">
                  🟢 Artist: <strong>{song.artist}</strong> • Verified Spotify Master
                </span>
                <span className="footer-duration-badge">Rated {song.rating}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SONG SPECIFICATIONS / CINEMATIC CREDITS */}
        <section className="track-specs-section">
          <div className="modal-highlights-card track-specs-card">
            <div className="specs-card-header">
              <Film size={20} className="specs-icon" />
              <h3>Cinematic Production & Track Credits</h3>
            </div>
            <div className="specs-grid-layout">
              <div className="spec-item">
                <span className="spec-label">Track Title</span>
                <span className="spec-value highlight-value">{song.title}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Movie / Album</span>
                <span className="spec-value">{song.movie}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Lead Vocalist(s)</span>
                <span className="spec-value">{song.artist}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Music Director / Composer</span>
                <span className="spec-value">{song.musicDirector || 'Pritam / Top Bollywood Composer'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Lyricist</span>
                <span className="spec-value">{song.lyricist || 'Acclaimed Bollywood Lyricist'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Starring / Actors</span>
                <span className="spec-value">{song.actors || 'Iconic Ensemble Cast'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Director</span>
                <span className="spec-value">{song.director || 'Acclaimed Director'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Ayush Vault Rating</span>
                <span className="spec-value score-value">
                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                  <strong>{song.rating}</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FULL LYRICS SECTION */}
        <section className="track-lyrics-section">
          <div className="lyrics-card-wrapper">
            <div className="lyrics-card-header">
              <div className="lyrics-header-left">
                <span className="lyrics-badge">FULL COMPLETE LYRICS</span>
                <h3 className="lyrics-title">Sing Along with {song.title}</h3>
                <p className="lyrics-sub">From the movie <strong>{song.movie}</strong> • Sung by <strong>{song.artist}</strong></p>
              </div>
              <button 
                type="button" 
                onClick={handleCopyLyrics} 
                className="btn-copy-lyrics"
                title="Copy complete song lyrics to clipboard"
              >
                {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Lyrics'}</span>
              </button>
            </div>

            <div className="lyrics-display-content">
              <pre className="lyrics-formatted-pre">{song.lyrics}</pre>
            </div>

            <div className="lyrics-card-footer-note">
              <span>🎵 Verified Hindi Lyrics • Curated for Ayush Hub's Music Collection</span>
            </div>
          </div>
        </section>

        {/* MORE RECOMMENDED HITS FROM THE 28-TRACK VAULT */}
        <section className="track-related-section">
          <div className="related-header">
            <div>
              <span className="section-tag">EXPLORE THE VAULT</span>
              <h3 className="related-title">More Handpicked Bollywood Gems</h3>
            </div>
            <button type="button" onClick={onBack} className="btn-explore-all">
              <span>View All {songsData.length} Tracks</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="related-tracks-grid">
            {relatedSongs.map(related => (
              <a 
                key={related.id} 
                href={`#/track/${related.id}`} 
                className="related-track-card"
              >
                <div className="related-thumb-wrap">
                  <img 
                    src={related.thumbnail} 
                    alt={related.title} 
                    className="related-thumb-img"
                    loading="lazy"
                  />
                  <span className="related-score-tag">
                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    <span>{related.rating}</span>
                  </span>
                </div>
                <div className="related-card-info">
                  <span className="related-movie-tag">{related.movie}</span>
                  <h4 className="related-song-name">{related.title}</h4>
                  <p className="related-artist-txt">{related.artist}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* MANDATORY BOTTOM CREDIT LINE AS REQUESTED */}
        <footer className="track-mandatory-credit-footer">
          <div className="credit-footer-card">
            <div className="credit-avatar-col">
              <img 
                src={getAssetUrl('images/hero-ayush.jpg')} 
                alt="Ayush" 
                className="credit-avatar-pic" 
              />
            </div>
            <div className="credit-info-col">
              <div className="credit-line-highlight">
                <Sparkles size={18} className="credit-sparkle-icon" />
                <span className="credit-exact-quote">Edited &amp; Made by Ayush</span>
              </div>
              <p className="credit-subtext">
                Crafted with passion in Purnia, Bihar for music lovers. Each track page includes official HD video, Spotify lossless audio, complete lyrics, and curator notes.
              </p>
              <div className="credit-action-links">
                <button type="button" onClick={onBack} className="credit-btn-back">
                  ← Return to My Entertainment Corner
                </button>
                <a 
                  href="https://wa.me/919508678989?text=Hi%20Ayush,%20loved%20the%20song%20detail%20pages%20on%20Ayush%20Hub!" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="credit-btn-wa"
                >
                  <MessageCircle size={15} />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
