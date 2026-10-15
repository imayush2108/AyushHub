<template>
  <div class="vue-media-lounge">
    <!-- Header with title -->
    <div class="lounge-header">
      <h3 class="lounge-title">My Entertainment Corner</h3>
      <p class="lounge-subtitle">
        Experience live audio synthesis, test movie mood curations, and run game benchmark estimates in real time.
      </p>
    </div>

    <!-- Interactive Tabs -->
    <div class="lounge-tabs">
      <button 
        :class="['lounge-tab-btn', { active: activeTab === 'music' }]"
        @click="activeTab = 'music'"
      >
        <span class="tab-icon">🎧</span>
        <span class="tab-label-full">Listen Now</span>
        <span class="tab-label-short">Listen</span>
      </button>
      <button 
        :class="['lounge-tab-btn', { active: activeTab === 'movies' }]"
        @click="activeTab = 'movies'"
      >
        <span class="tab-icon">🎬</span>
        <span class="tab-label-full">Explore Movies</span>
        <span class="tab-label-short">Movies</span>
      </button>
      <button 
        :class="['lounge-tab-btn', { active: activeTab === 'gaming' }]"
        @click="activeTab = 'gaming'"
      >
        <span class="tab-icon">🎮</span>
        <span class="tab-label-full">Check Benchmarks</span>
        <span class="tab-label-short">Benchmarks</span>
      </button>
    </div>

    <!-- TAB 1: MUSIC LOUNGE (HINDI SOULFUL & BOLLYWOOD HITS) -->
    <div v-if="activeTab === 'music'" class="tab-content music-content">
      <!-- Artist Filter Chips -->
      <div class="artist-filters-row">
        <span class="filter-lead-label">Favorite Artists:</span>
        <div class="artist-chips-wrap">
          <button 
            v-for="artist in artistFilters" 
            :key="artist"
            :class="['artist-chip', { active: selectedArtistFilter === artist }]"
            @click="selectedArtistFilter = artist"
          >
            {{ artist }}
          </button>
        </div>
      </div>

      <div class="music-card-grid">
        <!-- Player Deck -->
        <div class="player-deck">
          <div class="deck-top">
            <div class="vinyl-display" :class="{ spinning: isAudioPlaying }">
              <div class="vinyl-inner">
                <span class="vinyl-center-dot"></span>
              </div>
            </div>
            <div class="deck-meta">
              <span class="deck-pill">Ayush's Handpicked Hindi Gem</span>
              <h4>{{ currentSong.title }}</h4>
              <p class="track-desc">{{ currentSong.movie }} • {{ currentSong.artist }}</p>
              <div class="track-tags">
                <span class="track-tag">{{ currentSong.genre }}</span>
                <span class="track-tag">{{ currentSong.mood }}</span>
                <span class="track-tag">Curated by Ayush</span>
              </div>
              <div class="deck-page-link-wrap">
                <a 
                  :href="'#/track/' + currentSong.id" 
                  class="deck-direct-page-btn"
                  title="Open dedicated song detail page with lyrics, HD video & Spotify"
                >
                  <span>📖 Full Song Page &amp; Lyrics</span>
                  <span class="arr-ico">↗</span>
                </a>
              </div>
            </div>
          </div>

          <!-- DIRECT SPOTIFY EMBED & FULL HD YOUTUBE PLAYER -->
          <div class="full-song-embed-box">
            <div class="video-player-topbar">
              <div class="player-engine-toggle">
                <button 
                  type="button"
                  class="engine-tab-btn" 
                  :class="{ active: playerEngine === 'spotify' }" 
                  @click="playerEngine = 'spotify'"
                  title="Play full studio audio via Spotify Embed"
                >
                  <span class="spot-icon">🟢</span> Spotify Audio
                </button>
                <button 
                  type="button"
                  class="engine-tab-btn" 
                  :class="{ active: playerEngine === 'youtube' }" 
                  @click="playerEngine = 'youtube'"
                  title="Watch official Full HD Video on YouTube"
                >
                  <span class="yt-icon">🎬</span> YouTube Video
                </button>
              </div>
              <span class="video-duration-pill">⏱ {{ playerEngine === 'spotify' && currentSong.spotifyDuration ? currentSong.spotifyDuration : currentSong.duration }}</span>
            </div>
            
            <!-- SPOTIFY EMBED PLAYER (Full Studio Audio) -->
            <iframe 
              v-if="playerEngine === 'spotify'"
              class="spotify-song-iframe"
              :src="'https://open.spotify.com/embed/track/' + currentSong.spotifyTrackId + '?utm_source=generator&theme=0'" 
              width="100%" 
              height="230" 
              frameborder="0" 
              allowfullscreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              :title="currentSong.title + ' Spotify Embed Track'"
            ></iframe>

            <!-- YOUTUBE PLAYER (Full HD Video) -->
            <iframe 
              v-else
              class="full-song-iframe"
              :src="'https://www.youtube-nocookie.com/embed/' + currentSong.youtubeId + '?rel=0&autoplay=0'" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen
              :title="currentSong.title + ' Official Full Video'"
            ></iframe>

            <div class="full-song-footer-tag">
              <span class="video-meta-txt">
                <template v-if="playerEngine === 'spotify'">
                  🟢 Spotify Audio: <strong>{{ currentSong.title }}</strong> • {{ currentSong.movie }} • {{ currentSong.artist }}
                </template>
                <template v-else>
                  🎬 YouTube Video: <strong>{{ currentSong.title }}</strong> • {{ currentSong.movie }} • {{ currentSong.artist }}
                </template>
              </span>
              <a 
                v-if="playerEngine === 'spotify'"
                :href="currentSong.spotifyUrl" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="tag-direct-spotify"
              >
                Open in Spotify ↗
              </a>
              <a 
                v-else
                :href="'https://www.youtube.com/watch?v=' + currentSong.youtubeId" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="tag-direct-yt"
              >
                Open on YouTube ↗
              </a>
            </div>
          </div>

          <!-- Equalizer Bar Visualization -->
          <div class="equalizer-strip">
            <div 
              v-for="bar in 24" 
              :key="bar" 
              class="eq-bar active"
              :style="{ animationDelay: (bar * 0.08) + 's' }"
            ></div>
          </div>

          <!-- Ayush's Personal Curator Note -->
          <div class="curator-music-note">
            <div class="curator-mini-avatar">
              <img :src="getAssetUrl('images/hero-ayush.jpg')" alt="Ayush Shrivastava" />
            </div>
            <div class="curator-mini-text">
              <strong>Ayush's Review Note:</strong>
              <p>"{{ currentSong.ayushNote }}"</p>
            </div>
          </div>

          <!-- Deck Quick Actions (Compact 4-Button Row) -->
          <div class="deck-controls deck-controls-hindi">
            <button 
              type="button"
              class="ctrl-btn btn-spotify-link"
              :class="{ 'ctrl-active': playerEngine === 'spotify' }"
              @click="playerEngine = 'spotify'"
              title="Switch to Spotify Embed Audio Player"
            >
              <span>🟢 Spotify</span>
            </button>

            <button 
              type="button"
              class="ctrl-btn btn-yt-watch"
              :class="{ 'ctrl-active': playerEngine === 'youtube' }"
              @click="playerEngine = 'youtube'"
              title="Switch to YouTube HD Video Player"
            >
              <span>▶ YouTube</span>
            </button>

            <a 
              :href="'#/track/' + currentSong.id" 
              class="ctrl-btn btn-page-link-deck"
              title="View full detail page & complete lyrics"
            >
              <span>📖 Lyrics &amp; Details ↗</span>
            </a>

            <a 
              :href="'https://wa.me/919508678989?text=Hi%20Ayush,%20I%20love%20the%20song%20' + encodeURIComponent(currentSong.title) + '%20(' + encodeURIComponent(currentSong.movie) + ')!'" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="ctrl-btn btn-wa-discuss-song"
              title="Chat about this track on WhatsApp"
            >
              <span>💬 WhatsApp</span>
            </a>
          </div>
        </div>

        <!-- Track Playlist Selection -->
        <div class="tracks-list-panel">
          <div class="tracks-panel-head">
            <div class="panel-head-titles">
              <h5>Bollywood & Soulful Vault</h5>
              <p class="panel-head-sub">{{ hindiTracks.length }} Curated Hits • Instant HD Playback</p>
            </div>
            <span class="tracks-count-badge">{{ filteredSongs.length }} Tracks</span>
          </div>

          <!-- Search Box -->
          <div class="vault-search-box">
            <span class="search-lens">🔍</span>
            <input 
              v-model="songSearchQuery" 
              type="text" 
              placeholder="Search by song name, movie, singer..." 
              class="vault-search-input"
            />
            <button v-if="songSearchQuery" @click="songSearchQuery = ''" class="clear-search-btn" title="Clear search">✕</button>
          </div>

          <!-- Category Quick Filters -->
          <div class="category-pills-row">
            <button 
              v-for="cat in musicCategories" 
              :key="cat.id" 
              :class="['category-pill-btn', { active: selectedCategory === cat.id }]"
              @click="selectedCategory = cat.id"
            >
              {{ cat.label }}
            </button>
          </div>
          
          <div class="tracks-scroll-list">
            <div 
              v-for="(song, idx) in filteredSongs" 
              :key="song.id" 
              :class="['track-select-card', { selected: selectedSongId === song.id }]"
              @click="selectedSongId = song.id"
            >
              <div class="track-num">
                <span v-if="selectedSongId === song.id" class="now-playing-icon">▶</span>
                <span v-else class="track-idx">{{ idx + 1 }}</span>
              </div>
              <div class="track-info">
                <h6>{{ song.title }}</h6>
                <span>{{ song.movie }} • {{ song.artist }}</span>
              </div>
              <div class="track-card-right">
                <span class="badge-mini">{{ song.artistTag }}</span>
                <a 
                  :href="'#/track/' + song.id" 
                  class="track-card-lyrics-link" 
                  @click.stop 
                  title="Open dedicated page for this track with lyrics, HD video & Spotify"
                >
                  Page &amp; Lyrics ↗
                </a>
                <span class="track-time">{{ song.duration }}</span>
              </div>
            </div>

            <div v-if="filteredSongs.length === 0" class="no-songs-found">
              <span>🎵 No matching tracks found</span>
              <button @click="songSearchQuery = ''; selectedCategory = 'all'; selectedArtistFilter = 'All Artists'" class="btn-reset-filters">Reset Filters</button>
            </div>
          </div>

          <div class="spotify-link-box">
            <h6>Want Ayush's Complete 500+ Hindi Vault?</h6>
            <p>From late-night lo-fi edits to iconic 2000s Bollywood melodies.</p>
            <a 
              href="https://wa.me/919508678989?text=Hi%20Ayush,%20please%20send%20your%20curated%20Bollywood%20%26%20Hindi%20Spotify%20playlists!" 
              target="_blank" 
              rel="noopener" 
              class="btn-spotify-wa"
            >
              <span>Get Full Playlist via WhatsApp</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>


    <!-- TAB 2: 2026 CINEMA VAULT (MODERN MOVIES SECTION) -->
    <div v-if="activeTab === 'movies'" class="tab-content movie-content">
      <div class="movies-vault-wrapper">
        <!-- Vault Section Header -->
        <div class="vault-hero-bar">
          <div class="vault-titles">
            <h4>Curated 2026 Cinema Vault</h4>
            <p class="vault-subtitle">
              Verified Releases (by Oct 13, 2026) • In-Depth Reviews, Pros &amp; Cons, Language Audits &amp; Official Studio Trailers
            </p>
          </div>
          <div class="vault-counter-pill">
            <span>{{ filteredMovies.length }} of {{ moviesData.length }} Movies Available</span>
          </div>
        </div>

        <!-- Category Tabs Navigation -->
        <div class="movie-category-nav">
          <button 
            v-for="cat in movieCategories" 
            :key="cat.id"
            type="button"
            :class="['movie-cat-tab-btn', { active: selectedMovieCategory === cat.id }]"
            @click="selectedMovieCategory = cat.id"
          >
            <span class="cat-tab-label">{{ cat.label }}</span>
            <span class="cat-tab-count">{{ cat.count }}</span>
          </button>
        </div>

        <!-- Search, Filter & Sort Toolbar -->
        <div class="movie-controls-toolbar">
          <div class="movie-search-field">
            <span class="search-ico">🔍</span>
            <input 
              v-model="movieSearchQuery" 
              type="text" 
              placeholder="Search by title, genre, actor (Ajay, Vijay Sethupathi, Tom Holland), or director..."
              class="movie-search-input"
            />
            <button 
              v-if="movieSearchQuery" 
              type="button" 
              class="search-clear-btn" 
              @click="movieSearchQuery = ''"
              title="Clear search"
            >
              ✕
            </button>
          </div>

          <div class="movie-filter-dropdowns">
            <div class="filter-select-wrap">
              <label>Genre:</label>
              <select v-model="selectedMovieGenre" class="movie-select">
                <option v-for="g in movieGenresList" :key="g.id" :value="g.id">
                  {{ g.label }}
                </option>
              </select>
            </div>

            <div class="filter-select-wrap">
              <label>Sort By:</label>
              <select v-model="selectedMovieSort" class="movie-select">
                <option value="rating">Top Rated (Highest First)</option>
                <option value="date">Release Date (Newest First)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Movies Cards Grid -->
        <div v-if="filteredMovies.length > 0" class="movies-grid-layout">
            <div 
              v-for="movie in filteredMovies" 
              :key="movie.id" 
              class="modern-movie-card"
            >
              <!-- Card Poster Banner -->
              <div class="card-poster-wrap" @click="openMovieDetails(movie, false)">
                <img 
                  :src="movie.posterUrl" 
                  :alt="movie.title + ' poster'" 
                  class="card-poster-img"
                  loading="lazy"
                />
                <div class="poster-badges-overlay">
                  <span class="card-badge-date">{{ movie.releaseDayBadge }}</span>
                  <span class="card-badge-rating">★ {{ movie.rating }}</span>
                </div>
                <div class="poster-cat-badge">
                  {{ movie.categoryLabel }}
                </div>
                <div class="poster-hover-cta">
                  <span>View Details &amp; Trailer ↗</span>
                </div>
              </div>

              <!-- Card Body -->
              <div class="card-content-wrap">
                <div class="card-header-meta">
                  <span class="card-genre-tag">{{ movie.genre }}</span>
                  <span 
                    class="card-lang-tag" 
                    :class="movie.isHindiDubbed ? 'lang-dubbed-yes' : 'lang-dubbed-no'"
                    :title="movie.hindiStatusNote"
                  >
                    {{ movie.isHindiDubbed ? '🇮🇳 Hindi Original / Dub' : '🌐 Tamil/Telugu (Dub Unverified)' }}
                  </span>
                </div>

                <h5 class="card-movie-title" @click="openMovieDetails(movie, false)">{{ movie.title }}</h5>
                <div class="card-crew-row">
                  <span><strong>Dir:</strong> {{ movie.director }}</span>
                  <span>•</span>
                  <span><strong>Cast:</strong> {{ movie.cast[0] }}</span>
                </div>

                <p class="card-one-liner">{{ movie.shortDescription }}</p>

                <div class="card-score-strip">
                  <div class="critics-snippet">
                    <span class="critics-dot">●</span>
                    <span>{{ movie.criticsRating }}</span>
                  </div>
                  <div class="verdict-tag-card">
                    <span>{{ movie.verdict }}</span>
                  </div>
                </div>

                <!-- Card Action Buttons -->
                <div class="card-action-btns">
                  <button 
                    type="button" 
                    class="btn-card-details" 
                    @click="openMovieDetails(movie, false)"
                  >
                    <span>👁️ View Details</span>
                  </button>
                  <button 
                    type="button" 
                    class="btn-card-trailer" 
                    @click="openMovieDetails(movie, true)"
                  >
                    <span>▶ Trailer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Zero State -->
          <div v-else class="movie-zero-state">
            <span class="zero-state-icon">🎬</span>
            <h5>No Movies Found</h5>
            <p>No titles matched your query in this category.</p>
            <button type="button" class="btn-zero-reset" @click="resetMovieFilters">
              Reset Filters &amp; Show All (9) Movies
            </button>
          </div>
      </div>

      <!-- Detail Modal -->
      <MovieDetailModal 
        v-if="selectedModalMovie" 
        :movie="selectedModalMovie" 
        :initial-scroll-to-trailer="modalScrollToTrailer"
        :is-in-watchlist="watchlist.has(selectedModalMovie.id)"
        @close="selectedModalMovie = null"
        @toggle-watchlist="toggleMovieWatchlist"
      />
    </div>

    <!-- TAB 3: GAMING BENCHMARKS -->
    <div v-if="activeTab === 'gaming'" class="tab-content gaming-content">
      <div class="gaming-tool-grid">
        <!-- Controls -->
        <div class="benchmark-controls">
          <div class="control-group">
            <div class="game-select-header-row">
              <label>Select Game Title:</label>
              <span class="game-count-badge">{{ filteredGames.length }} Games</span>
            </div>

            <!-- Quick Game Category Filter Pills -->
            <div class="game-cat-chips-row">
              <button 
                v-for="cat in gameCategoryFilters" 
                :key="cat"
                type="button"
                :class="['game-cat-chip-btn', { active: selectedGameCategory === cat }]"
                @click="onSelectGameCategory(cat)"
              >
                {{ cat }}
              </button>
            </div>

            <select v-model="selectedGameId" class="game-select">
              <option v-for="game in filteredGames" :key="game.id" :value="game.id">
                {{ game.name }} ({{ game.genre }})
              </option>
            </select>
          </div>

          <div class="control-group">
            <label>Testing Resolution &amp; Quality:</label>
            <div class="res-buttons">
              <button 
                v-for="res in ['1080p Ultra', '1440p High', '4K Cinematic']" 
                :key="res"
                :class="['res-btn', { active: selectedResolution === res }]"
                @click="selectedResolution = res"
              >
                {{ res }}
              </button>
            </div>
          </div>

          <div class="rig-specs-box">
            <h6>Ayush's BattleRig Configuration</h6>
            <ul>
              <li><strong>GPU:</strong> NVIDIA RTX 4080 Super (16GB)</li>
              <li><strong>CPU:</strong> AMD Ryzen 7 7800X3D</li>
              <li><strong>RAM:</strong> 32GB DDR5 6000MHz CL30</li>
              <li><strong>Display:</strong> 165Hz IPS Ultra-Wide</li>
            </ul>
          </div>
        </div>

        <!-- Result Card -->
        <div class="benchmark-result-card">
          <div class="result-header">
            <div>
              <span class="game-tag">{{ currentGame.category }} • {{ currentGame.genre }}</span>
              <h4>{{ currentGame.name }}</h4>
            </div>
            <div class="fps-meter">
              <span class="fps-number">{{ calculatedFps }}</span>
              <span class="fps-label">FPS Avg</span>
            </div>
          </div>

          <div class="verdict-banner" :class="verdictClass">
            <span class="verdict-icon">⚡</span>
            <span>Verdict: {{ currentGame.verdict }}</span>
          </div>

          <div class="benchmark-breakdown">
            <div class="metric-item">
              <span>Ayush's Fun Rating</span>
              <strong>{{ currentGame.rating }}/10</strong>
            </div>
            <div class="metric-item">
              <span>Ray Tracing Overhead</span>
              <strong>{{ currentGame.rayTracing }}</strong>
            </div>
            <div class="metric-item">
              <span>Recommended GPU</span>
              <strong>{{ currentGame.recommendedGpu }}</strong>
            </div>
          </div>

          <div class="gamer-note">
            <p><strong>Ayush's Verdict:</strong> "{{ currentGame.ayushNote }}"</p>
          </div>

          <a 
            :href="'https://wa.me/919508678989?text=Hey%20Ayush,%20want%20to%20team%20up%20or%20talk%20about%20' + encodeURIComponent(currentGame.name) + '!'"
            target="_blank" 
            rel="noopener" 
            class="btn-gamer-squad"
          >
            <span>🎮 Team Up with Ayush on Discord / WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { getAssetUrl } from '../utils/assets';
import { songsData as hindiTracks } from '../data/songsData.js';
import { gamesData as games } from '../data/gamesData.js';
import { moviesData, movieCategories } from '../data/moviesData.js';
import MovieDetailModal from './MovieDetailModal.vue';


// State
const activeTab = ref('music');
const selectedGameId = ref('cyberpunk-2077');
const selectedResolution = ref('1440p High');
const watchlist = ref(new Set());
const watchlistCount = ref(0);

// Movies Lounge State (2026 Verified Cinema Vault)
const selectedMovieCategory = ref('all');
const movieSearchQuery = ref('');
const selectedMovieGenre = ref('all');
const selectedMovieSort = ref('rating'); // 'rating' or 'date'
const selectedModalMovie = ref(null);
const modalScrollToTrailer = ref(false);

// Gaming Category Filters
const selectedGameCategory = ref('All (37)');
const gameCategoryFilters = [
  'All (37)',
  'Ray Tracing',
  'PlayStation',
  'Open World',
  'Action RPG',
  'Esports / MP',
  'Upcoming'
];

const filteredGames = computed(() => {
  if (selectedGameCategory.value === 'All (37)') return games;
  if (selectedGameCategory.value === 'Ray Tracing') return games.filter(g => g.category === 'Ray Tracing Showcase');
  if (selectedGameCategory.value === 'PlayStation') return games.filter(g => g.category === 'PlayStation Hits');
  if (selectedGameCategory.value === 'Open World') return games.filter(g => g.category === 'Open World Masterpiece');
  if (selectedGameCategory.value === 'Action RPG') return games.filter(g => g.category === 'Action RPG');
  if (selectedGameCategory.value === 'Esports / MP') return games.filter(g => g.category === 'Esports & Multiplayer');
  if (selectedGameCategory.value === 'Upcoming') return games.filter(g => g.category === 'Upcoming Anticipated');
  return games;
});

function onSelectGameCategory(cat) {
  selectedGameCategory.value = cat;
  const list = filteredGames.value;
  if (list.length > 0 && !list.some(g => g.id === selectedGameId.value)) {
    selectedGameId.value = list[0].id;
  }
}

// Hindi Music Lounge State (Ayush's Favorite Bollywood & Soulful Hits)
const isAudioPlaying = ref(true);
const playerEngine = ref('spotify'); // 'spotify' (Spotify Embed Player) or 'youtube' (YouTube Full Video)
const songSearchQuery = ref('');
const selectedCategory = ref('all');
const selectedArtistFilter = ref('All Artists');
const selectedSongId = ref('mohit-tum-se-hi');

const artistFilters = [
  'All Artists',
  'KK Classics',
  'Arijit Singh',
  'Mustafa Zahid',
  'Shreya Ghoshal',
  'Sonu Nigam',
  'Atif Aslam',
  'Mohit Chauhan',
  'Aditya Rikhari'
];

const musicCategories = [
  { id: 'all', label: 'All Songs' },
  { id: 'soulful', label: 'Soulful & Romantic' },
  { id: 'nostalgia', label: '2000s Nostalgia & SRK' },
  { id: 'salman', label: 'Salman Khan Vault' },
  { id: 'bangers', label: 'Party & Upbeat' }
];

const filteredSongs = computed(() => {
  return hindiTracks.filter(song => {
    // 1. Search Query filter (matches title, movie, artist, genre, variations like tere/tera)
    if (songSearchQuery.value && songSearchQuery.value.trim()) {
      const q = songSearchQuery.value.toLowerCase().trim();
      const titleAlt = song.title.toLowerCase().replace(/\btera\b/g, 'tere').replace(/\btere\b/g, 'tera');
      const matchText = `${song.title} ${titleAlt} ${song.movie} ${song.artist} ${song.genre} ${song.artistTag} ${song.ayushNote || ''}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    // 2. Category filter
    if (selectedCategory.value !== 'all' && song.category !== selectedCategory.value) {
      return false;
    }
    // 3. Artist filter
    if (selectedArtistFilter.value !== 'All Artists') {
      if (selectedArtistFilter.value === 'Salman Hits') {
        const isSalman = song.category === 'salman' || song.artistTag === 'Salman Hits' || song.movie.includes('Mujhse Shaadi') || song.movie.includes('Tere Naam') || song.movie.includes('Kick');
        if (!isSalman) return false;
      } else {
        const matchArtist = song.artistTag === selectedArtistFilter.value || song.artist.includes(selectedArtistFilter.value);
        if (!matchArtist) return false;
      }
    }
    return true;
  });
});

const currentSong = computed(() => {
  return hindiTracks.find(s => s.id === selectedSongId.value) || hindiTracks[0];
});


// Movies Data & Filtering Logic (2026 Cinema Vault)
const movieGenresList = [
  { id: 'all', label: 'All Genres' },
  { id: 'thriller', label: 'Crime Thrillers' },
  { id: 'comedy', label: 'Comedy & Campus' },
  { id: 'psychological', label: 'Psychological' },
  { id: 'investigative', label: 'Investigative' },
  { id: 'drama', label: 'Emotional Drama' },
  { id: 'romance', label: 'Romantic Fantasy' },
  { id: 'heist', label: 'Action & Heist' },
  { id: 'fantasy', label: 'Fantasy Adventure' },
  { id: 'superhero', label: 'Superhero Action' }
];

const filteredMovies = computed(() => {
  return moviesData.filter(movie => {
    // 1. Category filter
    if (selectedMovieCategory.value !== 'all' && movie.category !== selectedMovieCategory.value) {
      return false;
    }
    // 2. Search query filter (matches title, genre, director, cast, franchise)
    if (movieSearchQuery.value && movieSearchQuery.value.trim()) {
      const q = movieSearchQuery.value.toLowerCase().trim();
      const castStr = movie.cast.join(' ').toLowerCase();
      const matchText = `${movie.title} ${movie.genre} ${movie.director} ${castStr} ${movie.franchise}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    // 3. Genre filter
    if (selectedMovieGenre.value !== 'all') {
      if (!movie.genre.toLowerCase().includes(selectedMovieGenre.value.toLowerCase())) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (selectedMovieSort.value === 'rating') {
      return parseFloat(b.rating) - parseFloat(a.rating);
    }
    if (selectedMovieSort.value === 'date') {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    }
    return 0;
  });
});

function openMovieDetails(movie, scrollToTrailer = false) {
  selectedModalMovie.value = movie;
  modalScrollToTrailer.value = scrollToTrailer;
}

function toggleMovieWatchlist(id) {
  if (watchlist.value.has(id)) {
    watchlist.value.delete(id);
  } else {
    watchlist.value.add(id);
  }
  watchlistCount.value = watchlist.value.size;
}

function resetMovieFilters() {
  selectedMovieCategory.value = 'all';
  movieSearchQuery.value = '';
  selectedMovieGenre.value = 'all';
  selectedMovieSort.value = 'rating';
}

const currentGame = computed(() => {
  return games.find(g => g.id === selectedGameId.value) || games[0];
});

const calculatedFps = computed(() => {
  return currentGame.value.baseFps[selectedResolution.value] || 90;
});

const verdictClass = computed(() => {
  return calculatedFps.value >= 60 ? 'verdict-smooth' : 'verdict-heavy';
});

function handleSwitchLoungeTab(e) {
  const { tab, cat } = (e && e.detail) || {};
  if (tab) {
    activeTab.value = tab;
  }
  if (tab === 'movies') {
    if (cat) selectedMovieCategory.value = cat;
  } else if (tab === 'gaming') {
    if (cat === 'esports') onSelectGameCategory('Esports / MP');
    else if (cat === 'all') onSelectGameCategory('All (37)');
    else if (cat) onSelectGameCategory(cat);
  }
}

onMounted(() => {
  window.addEventListener('switch-lounge-tab', handleSwitchLoungeTab);
});

onUnmounted(() => {
  window.removeEventListener('switch-lounge-tab', handleSwitchLoungeTab);
});
</script>

<style scoped>
.vue-media-lounge {
  background: #0B0F19;
  border-radius: var(--radius-xl);
  padding: 2.5rem 2.8rem;
  color: #F8FAFC;
  box-shadow: 0 30px 70px -15px rgba(11, 15, 25, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  width: 100%;
}

.vue-media-lounge::before {
  content: '';
  position: absolute;
  top: -150px;
  right: -150px;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(79, 70, 229, 0.25) 0%, transparent 70%);
  pointer-events: none;
}

.lounge-header {
  text-align: center;
  margin-bottom: 1.35rem;
  position: relative;
  z-index: 2;
}

.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(30, 41, 59, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.3rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.76rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
}

.tech-dot {
  width: 7px;
  height: 7px;
  background: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 10px #10B981;
}

.badge-framework {
  background: #42B883;
  color: #0B0F19;
  font-size: 0.68rem;
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
  font-weight: 700;
}

.lounge-title {
  font-size: clamp(1.5rem, 2.6vw, 2.1rem);
  color: #FFFFFF;
  margin-bottom: 0.35rem;
}

.lounge-subtitle {
  color: #94A3B8;
  max-width: 580px;
  margin: 0 auto;
  font-size: 0.9rem;
  line-height: 1.45;
}

/* Tabs */
.lounge-tabs {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.35rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

.lounge-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  padding: 0.6rem 1.3rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.88rem;
  transition: all 0.25s ease;
}

.lounge-tab-btn:hover {
  background: rgba(49, 65, 96, 0.8);
  color: #FFFFFF;
}

.lounge-tab-btn.active {
  background: #4F46E5;
  color: #FFFFFF;
  border-color: #6366F1;
  box-shadow: 0 8px 24px -4px rgba(79, 70, 229, 0.5);
}

.tab-label-short {
  display: none;
}

.tab-label-full {
  display: inline;
}

/* Artist Filters */
.artist-filters-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.35rem;
  flex-wrap: wrap;
}

.filter-lead-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: #FBBF24;
}

.artist-chips-wrap {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.artist-chip {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #CBD5E1;
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
}

.artist-chip:hover {
  background: rgba(49, 65, 96, 0.8);
  color: #FFFFFF;
}

.artist-chip.active {
  background: var(--accent-gold-gradient);
  color: #0B0F19;
  font-weight: 700;
  border-color: #F59E0B;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35);
}

/* Music Tab Grid */
.music-card-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 1.8rem;
  align-items: start;
}

.player-deck {
  background: #141B2D;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 1.6rem 1.8rem;
}

.deck-top {
  display: flex;
  gap: 1.1rem;
  align-items: center;
  margin-bottom: 0.95rem;
}

.vinyl-display {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: radial-gradient(circle, #222 10%, #111 40%, #000 70%);
  border: 3px solid #334155;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  animation: spinVinyl 6s linear infinite;
}

@keyframes spinVinyl {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.vinyl-inner {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #F59E0B;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
}

.vinyl-center-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0B0F19;
}

.deck-meta h4 {
  font-size: 1.35rem;
  color: #FFFFFF;
  margin: 0.15rem 0;
}

.deck-pill {
  font-size: 0.7rem;
  background: rgba(245, 158, 11, 0.15);
  color: #FBBF24;
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  font-weight: 700;
  display: inline-block;
}

.track-desc {
  font-size: 0.82rem;
  color: #94A3B8;
  margin-bottom: 0.35rem;
}

.track-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.track-tag {
  font-size: 0.7rem;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  color: #CBD5E1;
}

/* Full HD Video & Audio Player Box */
.full-song-embed-box {
  margin: 0.85rem 0;
  border-radius: 12px;
  overflow: hidden;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.6);
  position: relative;
}

.video-player-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem 0.8rem;
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.live-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #34D399;
  font-size: 0.74rem;
  font-weight: 600;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 8px #10B981;
  animation: pulseDot 1.8s infinite;
}

@keyframes pulseDot {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.video-duration-pill {
  background: rgba(255, 255, 255, 0.08);
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  color: #94A3B8;
  font-weight: 600;
}

.full-song-iframe {
  width: 100%;
  height: 230px;
  aspect-ratio: 16 / 9;
  border: none;
  display: block;
  background: #000000;
}

.full-song-footer-tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.8rem;
  background: rgba(15, 23, 42, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-wrap: wrap;
}

.video-meta-txt {
  color: #E2E8F0;
  font-size: 0.74rem;
}

.tag-direct-yt {
  background: rgba(239, 68, 68, 0.15);
  color: #F87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tag-direct-yt:hover {
  background: #EF4444;
  color: #FFFFFF;
}

.tag-direct-spotify {
  background: rgba(29, 185, 84, 0.15);
  color: #34D399;
  border: 1px solid rgba(29, 185, 84, 0.35);
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tag-direct-spotify:hover {
  background: #1DB954;
  color: #FFFFFF;
}

.player-engine-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(30, 41, 59, 0.9);
  padding: 0.2rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.engine-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  border: none;
  background: transparent;
  color: #94A3B8;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.engine-tab-btn:hover {
  color: #FFFFFF;
}

.engine-tab-btn.active {
  background: rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.spotify-song-iframe {
  width: 100%;
  height: 245px;
  border: none;
  display: block;
  background: #121212;
}

.deck-controls-hindi .ctrl-btn.ctrl-active {
  outline: 2px solid #FFFFFF;
  outline-offset: 2px;
}

.video-meta-txt strong {
  color: #FBBF24;
}


/* Equalizer */
.equalizer-strip {
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 22px;
  background: rgba(15, 23, 42, 0.7);
  padding: 3px 8px;
  border-radius: 6px;
  margin-bottom: 0.85rem;
}

.eq-bar {
  flex: 1;
  background: #4F46E5;
  border-radius: 2px;
  transition: height 0.2s ease;
}

.eq-bar.active {
  animation: bounceEq 0.9s ease-in-out infinite alternate;
  background: linear-gradient(to top, #4F46E5, #F59E0B);
}

@keyframes bounceEq {
  0% { height: 4px; }
  50% { height: 18px; }
  100% { height: 8px; }
}

/* Curator Music Note */
.curator-music-note {
  display: flex;
  gap: 0.75rem;
  background: rgba(30, 41, 59, 0.5);
  border-left: 3px solid #F59E0B;
  padding: 0.6rem 0.85rem;
  border-radius: 0 10px 10px 0;
  margin-bottom: 0.9rem;
}

.curator-mini-avatar img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #F59E0B;
}

.curator-mini-text strong {
  font-size: 0.76rem;
  color: #FBBF24;
  display: block;
}

.curator-mini-text p {
  font-size: 0.8rem;
  color: #E2E8F0;
  font-style: italic;
  margin-top: 0.15rem;
  line-height: 1.35;
}

/* Controls - 2x2 Grid (Row 1: Spotify + YouTube | Row 2: Lyrics + WhatsApp) */
.deck-controls-hindi {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
}

.deck-controls-hindi .ctrl-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.65rem 0.75rem;
  border-radius: 9px;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s ease;
  width: 100%;
}

.btn-yt-watch {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: #FFFFFF;
  box-shadow: 0 4px 12px -2px rgba(239, 68, 68, 0.4);
}

.btn-yt-watch:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -2px rgba(239, 68, 68, 0.55);
  background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
}

.btn-spotify-link {
  background: #1DB954;
  color: #FFFFFF;
  box-shadow: 0 4px 12px -2px rgba(29, 185, 84, 0.35);
}

.btn-spotify-link:hover {
  transform: translateY(-2px);
  background: #1AA34A;
  box-shadow: 0 8px 16px -2px rgba(29, 185, 84, 0.5);
}

.btn-wa-discuss-song {
  background: #25D366;
  color: #FFFFFF;
  box-shadow: 0 4px 12px -2px rgba(37, 211, 102, 0.3);
}

.btn-wa-discuss-song:hover {
  background: #1EBE5D;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -2px rgba(37, 211, 102, 0.45);
}

/* Track list */
.tracks-list-panel {
  background: #141B2D;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 1.6rem 1.8rem;
  display: flex;
  flex-direction: column;
}

.tracks-panel-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.65rem;
}

.panel-head-titles h5 {
  font-size: 1.05rem;
  color: #FFFFFF;
  margin: 0;
}

.panel-head-sub {
  font-size: 0.74rem;
  color: #94A3B8;
  margin-top: 0.15rem;
}

.tracks-count-badge {
  font-size: 0.7rem;
  background: rgba(245, 158, 11, 0.15);
  color: #FBBF24;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  font-weight: 700;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

/* Vault Search Box */
.vault-search-box {
  display: flex;
  align-items: center;
  position: relative;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.35rem 0.75rem;
  margin-bottom: 0.55rem;
  transition: all 0.2s ease;
}

.vault-search-box:focus-within {
  border-color: #6366F1;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
}

.search-lens {
  font-size: 0.8rem;
  margin-right: 0.45rem;
  opacity: 0.7;
}

.vault-search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #FFFFFF;
  font-size: 0.8rem;
  width: 100%;
}

.vault-search-input::placeholder {
  color: #64748B;
}

.clear-search-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #94A3B8;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.clear-search-btn:hover {
  background: #EF4444;
  color: #FFFFFF;
}

/* Category Quick Pills */
.category-pills-row {
  display: flex;
  gap: 0.35rem;
  overflow-x: auto;
  padding-bottom: 0.4rem;
  margin-bottom: 0.55rem;
  scrollbar-width: thin;
}

.category-pill-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.category-pill-btn:hover {
  color: #FFFFFF;
  background: rgba(49, 65, 96, 0.7);
}

.category-pill-btn.active {
  background: #4F46E5;
  color: #FFFFFF;
  border-color: #6366F1;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.4);
}

.tracks-scroll-list {
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  max-height: 480px;
  overflow-y: auto;
  padding-right: 6px;
}

/* Sleek custom scrollbar */
.tracks-scroll-list::-webkit-scrollbar {
  width: 5px;
}

.tracks-scroll-list::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.6);
  border-radius: 4px;
}

.tracks-scroll-list::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}

.tracks-scroll-list::-webkit-scrollbar-thumb:hover {
  background: #F59E0B;
}

.track-select-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.52rem 0.75rem;
  border-radius: 8px;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition: all 0.2s ease;
}

.track-select-card:hover {
  background: rgba(49, 65, 96, 0.6);
  transform: translateX(3px);
  border-color: rgba(255, 255, 255, 0.12);
}

.track-select-card.selected {
  background: rgba(79, 70, 229, 0.3);
  border-color: #6366F1;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.track-num {
  font-size: 0.75rem;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  color: #94A3B8;
  font-weight: 700;
  flex-shrink: 0;
}

.track-select-card.selected .track-num {
  background: #F59E0B;
  color: #0B0F19;
}

.now-playing-icon {
  font-size: 0.7rem;
  animation: pulseDot 1.2s infinite;
}

.track-info {
  flex: 1;
  min-width: 0;
}

.track-info h6 {
  font-size: 0.82rem;
  color: #FFFFFF;
  margin: 0 0 0.1rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-info span {
  font-size: 0.7rem;
  color: #94A3B8;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
  flex-shrink: 0;
}

.badge-mini {
  font-size: 0.64rem;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.12rem 0.4rem;
  border-radius: 4px;
  color: #CBD5E1;
  font-weight: 600;
}

.track-select-card.selected .badge-mini {
  background: rgba(99, 102, 241, 0.35);
  color: #E0E7FF;
  border: 1px solid rgba(99, 102, 241, 0.5);
}

.track-time {
  font-size: 0.66rem;
  color: #64748B;
  font-family: monospace;
}

.no-songs-found {
  padding: 2rem 1rem;
  text-align: center;
  color: #94A3B8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.82rem;
}

.btn-reset-filters {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.74rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-reset-filters:hover {
  background: #4F46E5;
  border-color: #6366F1;
}

.spotify-link-box {
  margin-top: 0.75rem;
  padding-top: 0.65rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.spotify-link-box h6 {
  font-size: 0.86rem;
  color: #10B981;
  margin-bottom: 0.15rem;
}

.spotify-link-box p {
  font-size: 0.74rem;
  color: #94A3B8;
  margin-bottom: 0.55rem;
}

.btn-spotify-wa {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #10B981;
  color: #FFFFFF;
  padding: 0.48rem 0.95rem;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.btn-spotify-wa:hover {
  background: #059669;
  transform: translateY(-2px);
}

/* --------------------------------------------------------------------------
   TAB 2: 2026 CINEMA VAULT (MODERN MOVIES SECTION)
   -------------------------------------------------------------------------- */
.movies-vault-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Vault Hero Bar */
.vault-hero-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 1.2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.vault-titles h4 {
  font-size: 1.6rem;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 0.35rem;
  letter-spacing: -0.02em;
}

.vault-subtitle {
  font-size: 0.88rem;
  color: #94A3B8;
  margin: 0;
  max-width: 650px;
  line-height: 1.4;
}

.vault-counter-pill {
  font-size: 0.78rem;
  font-weight: 700;
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  white-space: nowrap;
}

/* Category Tabs Navigation */
.movie-category-nav {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
}

.movie-cat-tab-btn {
  background: #141B2D;
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #CBD5E1;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  transition: all 0.2s ease;
}

.movie-cat-tab-btn:hover {
  background: #1E293B;
  color: #FFFFFF;
  border-color: rgba(255, 255, 255, 0.2);
}

.movie-cat-tab-btn.active {
  background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
  color: #FFFFFF;
  border-color: #6366F1;
  box-shadow: 0 4px 18px rgba(79, 70, 229, 0.35);
}

.cat-tab-count {
  font-size: 0.72rem;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.15);
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
}

.movie-cat-tab-btn.active .cat-tab-count {
  background: rgba(255, 255, 255, 0.25);
  color: #FFFFFF;
}

/* Search & Toolbar */
.movie-controls-toolbar {
  display: flex;
  gap: 1rem;
  background: #141B2D;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 0.9rem 1.2rem;
  align-items: center;
  flex-wrap: wrap;
}

.movie-search-field {
  flex: 1;
  min-width: 260px;
  position: relative;
  display: flex;
  align-items: center;
}

.movie-search-field .search-ico {
  position: absolute;
  left: 12px;
  font-size: 0.9rem;
  opacity: 0.6;
  pointer-events: none;
}

.movie-search-input {
  width: 100%;
  background: #0B1120;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.6rem 2.2rem 0.6rem 2.3rem;
  color: #F8FAFC;
  font-size: 0.88rem;
  outline: none;
  transition: all 0.2s ease;
}

.movie-search-input:focus {
  border-color: #6366F1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.search-clear-btn {
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  color: #94A3B8;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 4px;
}

.search-clear-btn:hover {
  color: #FFFFFF;
}

.movie-filter-dropdowns {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
}

.filter-select-wrap {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  color: #94A3B8;
  font-weight: 600;
}

.movie-select {
  background: #0B1120;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #F1F5F9;
  padding: 0.5rem 0.8rem;
  font-size: 0.82rem;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.movie-select:focus {
  border-color: #6366F1;
}

/* Movie Cards Grid */
.movies-grid-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;
}

.modern-movie-card {
  background: #141B2D;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
}

.modern-movie-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 18px 36px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(99, 102, 241, 0.15);
}

.card-poster-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  background: #0B1120;
  overflow: hidden;
  cursor: pointer;
}

.card-poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}

.modern-movie-card:hover .card-poster-img {
  transform: scale(1.05);
}

.poster-badges-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 2;
}

.card-badge-date {
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(6px);
  color: #CBD5E1;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-badge-rating {
  font-size: 0.75rem;
  font-weight: 800;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(6px);
  color: #FBBF24;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
  border: 1px solid rgba(245, 158, 11, 0.35);
}

.poster-cat-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(15, 23, 42, 0.88);
  backdrop-filter: blur(6px);
  color: #A5B4FC;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  border: 1px solid rgba(99, 102, 241, 0.3);
  z-index: 2;
}

.poster-hover-cta {
  position: absolute;
  inset: 0;
  background: rgba(11, 17, 32, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 0.88rem;
  font-weight: 700;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 3;
}

.card-poster-wrap:hover .poster-hover-cta {
  opacity: 1;
}

.card-content-wrap {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-header-meta {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
  min-height: 26px;
  align-items: center;
}

.card-genre-tag {
  font-size: 0.72rem;
  font-weight: 600;
  background: rgba(79, 70, 229, 0.2);
  color: #C7D2FE;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
}

.card-lang-tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
}

.lang-dubbed-yes {
  background: rgba(16, 185, 129, 0.15);
  color: #6EE7B7;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.lang-dubbed-no {
  background: rgba(245, 158, 11, 0.12);
  color: #FCD34D;
  border: 1px solid rgba(245, 158, 11, 0.25);
}

.card-movie-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.35;
  margin-bottom: 0.4rem;
  cursor: pointer;
  transition: color 0.2s ease;
  min-height: 3.1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-movie-title:hover {
  color: #FBBF24;
}

.card-crew-row {
  display: flex;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: #94A3B8;
  margin-bottom: 0.65rem;
  flex-wrap: wrap;
  min-height: 20px;
}

.card-crew-row strong {
  color: #CBD5E1;
}

.card-one-liner {
  font-size: 0.85rem;
  color: #94A3B8;
  line-height: 1.5;
  margin-bottom: 0.9rem;
  height: 2.55rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-score-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 0.45rem 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  min-height: 36px;
}

.critics-snippet {
  color: #CBD5E1;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.critics-dot {
  color: #38BDF8;
  font-size: 0.65rem;
}

.verdict-tag-card {
  color: #34D399;
  font-weight: 700;
}

/* Card Action Buttons */
.card-action-btns {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 0.55rem;
  margin-top: auto;
}

.btn-card-details {
  background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 9px;
  padding: 0.55rem 0.8rem;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  transition: all 0.2s ease;
}

.btn-card-details:hover {
  background: linear-gradient(135deg, #4338CA 0%, #4F46E5 100%);
  transform: translateY(-1px);
}

.btn-card-trailer {
  background: rgba(220, 38, 38, 0.15);
  color: #F87171;
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 9px;
  padding: 0.55rem 0.8rem;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  transition: all 0.2s ease;
}

.btn-card-trailer:hover {
  background: #DC2626;
  color: #FFFFFF;
  border-color: #DC2626;
  transform: translateY(-1px);
}

/* Zero state */
.movie-zero-state {
  text-align: center;
  padding: 3.5rem 1.5rem;
  background: #141B2D;
  border-radius: 16px;
  border: 1px dashed rgba(255, 255, 255, 0.15);
}

.zero-state-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.8rem;
}

.movie-zero-state h5 {
  font-size: 1.3rem;
  color: #FFFFFF;
  margin-bottom: 0.4rem;
}

.movie-zero-state p {
  color: #94A3B8;
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
}

.btn-zero-reset {
  background: #4F46E5;
  color: #FFFFFF;
  border: none;
  padding: 0.65rem 1.4rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-zero-reset:hover {
  background: #4338CA;
}

/* Responsive Grid for Movies */
@media (max-width: 1024px) {
  .movies-grid-layout {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .movies-grid-layout {
    grid-template-columns: 1fr;
  }
  .vault-hero-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  .movie-controls-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .movie-filter-dropdowns {
    flex-direction: column;
    align-items: stretch;
  }
  .filter-select-wrap {
    justify-content: space-between;
  }
  .movie-select {
    flex: 1;
  }
  .card-action-btns {
    grid-template-columns: 1fr;
  }
}

/* Gaming Tab */
.gaming-tool-grid {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 2.2rem;
  align-items: start;
}

.benchmark-controls {
  background: #141B2D;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.control-group {
  margin-bottom: 1.5rem;
}

.control-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #CBD5E1;
  margin-bottom: 0.6rem;
}

.game-select-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.game-select-header-row label {
  margin-bottom: 0;
}

.game-count-badge {
  font-size: 0.72rem;
  font-weight: 800;
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.35);
  padding: 0.15rem 0.6rem;
  border-radius: 9999px;
}

.game-cat-chips-row {
  display: flex;
  overflow-x: auto;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.25rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.game-cat-chips-row::-webkit-scrollbar {
  display: none;
}

.game-cat-chip-btn {
  flex-shrink: 0;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94A3B8;
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.game-cat-chip-btn:hover {
  color: #FFFFFF;
  background: rgba(49, 65, 96, 0.8);
}

.game-cat-chip-btn.active {
  background: #F59E0B;
  color: #0F172A;
  border-color: #F59E0B;
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.35);
}

.game-select {
  width: 100%;
  background: #1E293B;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.8rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  outline: none;
}

.res-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.res-btn {
  background: #1E293B;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94A3B8;
  padding: 0.6rem 0.4rem;
  border-radius: var(--radius-sm);
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.res-btn.active {
  background: #4F46E5;
  color: #FFFFFF;
  border-color: #6366F1;
}

.rig-specs-box {
  background: rgba(30, 41, 59, 0.4);
  padding: 1.2rem;
  border-radius: var(--radius-md);
  border: 1px dashed rgba(255, 255, 255, 0.12);
}

.rig-specs-box h6 {
  font-size: 0.9rem;
  color: #F59E0B;
  margin-bottom: 0.6rem;
}

.rig-specs-box ul {
  list-style: none;
  font-size: 0.82rem;
  color: #CBD5E1;
}

.rig-specs-box li {
  margin-bottom: 0.35rem;
}

.benchmark-result-card {
  background: #141B2D;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.game-tag {
  font-size: 0.8rem;
  color: #60A5FA;
  font-weight: 700;
  text-transform: uppercase;
}

.result-header h4 {
  font-size: 1.5rem;
  color: #FFFFFF;
  margin-top: 0.25rem;
}

.fps-meter {
  text-align: right;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid #10B981;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-md);
}

.fps-number {
  font-size: 2.2rem;
  font-weight: 900;
  color: #10B981;
  display: block;
  line-height: 1;
}

.fps-label {
  font-size: 0.75rem;
  color: #A7F3D0;
  font-weight: 700;
  text-transform: uppercase;
}

.verdict-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.2rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 0.95rem;
}

.verdict-smooth {
  background: rgba(16, 185, 129, 0.15);
  color: #34D399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.benchmark-breakdown {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  background: rgba(30, 41, 59, 0.4);
  padding: 1rem;
  border-radius: var(--radius-md);
}

.metric-item span {
  display: block;
  font-size: 0.75rem;
  color: #94A3B8;
  margin-bottom: 0.25rem;
}

.metric-item strong {
  font-size: 0.95rem;
  color: #FFFFFF;
}

.gamer-note {
  font-size: 0.9rem;
  color: #CBD5E1;
  font-style: italic;
  margin-bottom: 1.6rem;
  line-height: 1.5;
}

.btn-gamer-squad {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-gold-gradient);
  color: #0B0F19;
  padding: 0.9rem 1.5rem;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  box-shadow: 0 8px 20px -4px rgba(245, 158, 11, 0.4);
}

.btn-gamer-squad:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px -4px rgba(245, 158, 11, 0.55);
}

/* --------------------------------------------------------------------------
   INTERACTIVE MEDIA LOUNGE RESPONSIVE DESIGN (ALL DEVICES)
   -------------------------------------------------------------------------- */
@media (max-width: 980px) {
  .music-card-grid, .gaming-tool-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .vue-media-lounge {
    padding: 1.5rem 1.2rem;
  }
}

@media (max-width: 768px) {
  .vue-media-lounge {
    padding: 0.85rem 0.65rem 1.15rem 0.65rem;
    border-radius: var(--radius-lg);
    box-sizing: border-box;
    max-width: 100%;
    overflow: hidden;
  }

  /* Hide duplicate inner header on mobile to avoid overlap */
  .lounge-header {
    display: none;
  }

  /* 3-Column Segmented Tab Bar in Single Row */
  .tab-label-full {
    display: none !important;
  }

  .tab-label-short {
    display: inline !important;
  }

  .lounge-tabs {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 0.35rem !important;
    width: 100% !important;
    margin-bottom: 0.85rem !important;
  }

  .lounge-tab-btn {
    width: 100% !important;
    padding: 0.48rem 0.2rem !important;
    font-size: 0.76rem !important;
    font-weight: 700 !important;
    text-align: center !important;
    justify-content: center !important;
    gap: 0.25rem !important;
    border-radius: 9999px !important;
    white-space: nowrap !important;
  }

  .tab-icon {
    font-size: 0.88rem !important;
  }

  /* --------------------------------------------------------------------------
     AUDIO LOUNGE MOBILE RESPONSIVE
     -------------------------------------------------------------------------- */
  .artist-filters-row {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0.35rem !important;
    margin-bottom: 0.75rem !important;
    width: 100% !important;
  }

  .filter-lead-label {
    font-size: 0.76rem !important;
    font-weight: 700 !important;
    color: #F59E0B !important;
  }

  .artist-chips-wrap {
    display: flex !important;
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    padding-bottom: 0.25rem !important;
    width: 100% !important;
    gap: 0.35rem !important;
  }

  .artist-chips-wrap::-webkit-scrollbar {
    display: none !important;
  }

  .artist-chip {
    flex-shrink: 0 !important;
    white-space: nowrap !important;
    font-size: 0.72rem !important;
    padding: 0.28rem 0.65rem !important;
  }

  .music-card-grid {
    gap: 0.85rem !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }

  /* Player Deck */
  .player-deck {
    padding: 0.85rem 0.7rem !important;
    border-radius: 12px !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }

  .deck-top {
    display: flex !important;
    gap: 0.65rem !important;
    align-items: center !important;
    margin-bottom: 0.65rem !important;
  }

  .vinyl-display {
    width: 48px !important;
    height: 48px !important;
    flex-shrink: 0 !important;
  }

  .vinyl-inner {
    width: 18px !important;
    height: 18px !important;
  }

  .deck-meta {
    flex-grow: 1 !important;
    min-width: 0 !important;
    overflow: hidden !important;
  }

  .deck-pill {
    font-size: 0.65rem !important;
    padding: 0.12rem 0.45rem !important;
    border-radius: 9999px !important;
  }

  .deck-meta h4 {
    font-size: 1.05rem !important;
    font-weight: 800 !important;
    line-height: 1.2 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin: 0.15rem 0 !important;
  }

  .track-desc {
    font-size: 0.74rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin-bottom: 0.25rem !important;
  }

  .track-tags {
    display: flex !important;
    gap: 0.25rem !important;
    flex-wrap: wrap !important;
  }

  .track-tag {
    font-size: 0.65rem !important;
    padding: 0.12rem 0.42rem !important;
    border-radius: 5px !important;
    white-space: nowrap !important;
  }

  .deck-page-link-wrap {
    margin-top: 0.45rem !important;
  }

  .deck-direct-page-btn {
    font-size: 0.72rem !important;
    padding: 0.32rem 0.65rem !important;
    border-radius: 6px !important;
  }

  /* Embedded Player Box */
  .full-song-embed-box {
    border-radius: 10px !important;
    margin-bottom: 0.65rem !important;
    overflow: hidden !important;
  }

  .full-song-iframe {
    width: 100% !important;
    aspect-ratio: 16 / 9 !important;
    height: auto !important;
    max-height: 185px !important;
  }

  .spotify-song-iframe {
    height: 152px !important;
    width: 100% !important;
  }

  .video-player-topbar {
    padding: 0.35rem 0.55rem !important;
  }

  .engine-tab-btn {
    font-size: 0.68rem !important;
    padding: 0.2rem 0.5rem !important;
  }

  .video-duration-pill {
    font-size: 0.65rem !important;
    padding: 0.12rem 0.4rem !important;
  }

  .full-song-footer-tag {
    padding: 0.35rem 0.55rem !important;
    font-size: 0.68rem !important;
    gap: 0.35rem !important;
  }

  .video-meta-txt {
    font-size: 0.68rem !important;
    line-height: 1.25 !important;
  }

  .tag-direct-yt, .tag-direct-spotify {
    font-size: 0.64rem !important;
    padding: 0.15rem 0.45rem !important;
  }

  .equalizer-strip {
    height: 16px !important;
    gap: 2px !important;
    margin-bottom: 0.65rem !important;
  }

  .curator-music-note {
    padding: 0.45rem 0.65rem !important;
    margin-bottom: 0.65rem !important;
    gap: 0.55rem !important;
    border-radius: 0 8px 8px 0 !important;
  }

  .curator-mini-avatar img {
    width: 30px !important;
    height: 30px !important;
  }

  .curator-mini-text strong {
    font-size: 0.72rem !important;
  }

  .curator-mini-text p {
    font-size: 0.74rem !important;
    line-height: 1.3 !important;
  }

  /* 2x2 Compact Grid Controls on Mobile */
  .deck-controls-hindi {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.45rem !important;
    width: 100% !important;
    margin-top: 0.65rem !important;
  }

  .deck-controls-hindi .ctrl-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    min-width: 0 !important;
    padding: 0.55rem 0.35rem !important;
    font-size: 0.74rem !important;
    font-weight: 700 !important;
    white-space: nowrap !important;
    border-radius: 8px !important;
    text-align: center !important;
    box-sizing: border-box !important;
  }

  /* Track list panel */
  .tracks-list-panel {
    padding: 0.85rem 0.7rem !important;
    border-radius: 12px !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }

  .tracks-panel-head {
    margin-bottom: 0.55rem !important;
  }

  .panel-head-titles h5 {
    font-size: 0.95rem !important;
  }

  .panel-head-sub {
    font-size: 0.7rem !important;
  }

  .tracks-count-badge {
    font-size: 0.68rem !important;
    padding: 0.15rem 0.45rem !important;
  }

  .vault-search-box {
    margin-bottom: 0.55rem !important;
  }

  .vault-search-input {
    font-size: 0.76rem !important;
    padding: 0.45rem 0.65rem 0.45rem 1.8rem !important;
    border-radius: 7px !important;
  }

  .category-pills-row {
    display: flex !important;
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    gap: 0.3rem !important;
    margin-bottom: 0.55rem !important;
    padding-bottom: 0.25rem !important;
    width: 100% !important;
  }

  .category-pills-row::-webkit-scrollbar {
    display: none !important;
  }

  .category-pill-btn {
    flex-shrink: 0 !important;
    white-space: nowrap !important;
    font-size: 0.7rem !important;
    padding: 0.22rem 0.55rem !important;
  }

  .tracks-scroll-list {
    max-height: 250px !important;
    gap: 0.35rem !important;
  }

  .track-select-card {
    padding: 0.45rem 0.55rem !important;
    gap: 0.45rem !important;
    border-radius: 7px !important;
  }

  .track-info h6 {
    font-size: 0.82rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .track-info span {
    font-size: 0.68rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .track-card-right {
    display: flex !important;
    align-items: center !important;
    gap: 0.3rem !important;
    flex-shrink: 0 !important;
  }

  .track-card-lyrics-link {
    font-size: 0.65rem !important;
    padding: 0.15rem 0.4rem !important;
  }

  .track-time {
    font-size: 0.68rem !important;
  }

  /* --------------------------------------------------------------------------
     MOVIE MATCHER RESPONSIVE
     -------------------------------------------------------------------------- */
  .movie-mock-frame {
    max-width: 320px !important;
    margin: 0 auto !important;
    width: 100% !important;
  }

  .poster-graphic {
    min-height: 200px !important;
    padding: 1rem !important;
  }

  .poster-graphic h5 {
    font-size: 1.15rem !important;
  }

  .cinema-icon {
    font-size: 2.5rem !important;
  }

  .movie-action-row {
    flex-direction: column !important;
    width: 100% !important;
    gap: 0.55rem !important;
  }

  .btn-watchlist, .btn-discuss {
    width: 100% !important;
    justify-content: center !important;
    text-align: center !important;
  }

  /* --------------------------------------------------------------------------
     GAMING BENCHMARKS MOBILE RESPONSIVE
     -------------------------------------------------------------------------- */
  .gaming-tool-grid {
    grid-template-columns: 1fr !important;
    gap: 0.85rem !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }

  .benchmark-controls {
    padding: 0.85rem 0.7rem !important;
    border-radius: 12px !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }

  .control-group {
    margin-bottom: 0.75rem !important;
  }

  .game-select-header-row {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    margin-bottom: 0.4rem !important;
  }

  .game-select-header-row label {
    font-size: 0.78rem !important;
    font-weight: 700 !important;
    color: #F59E0B !important;
    margin-bottom: 0 !important;
  }

  .game-count-badge {
    font-size: 0.66rem !important;
    padding: 0.12rem 0.45rem !important;
  }

  .game-cat-chips-row {
    display: flex !important;
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    gap: 0.35rem !important;
    margin-bottom: 0.65rem !important;
    padding-bottom: 0.25rem !important;
    width: 100% !important;
  }

  .game-cat-chips-row::-webkit-scrollbar {
    display: none !important;
  }

  .game-cat-chip-btn {
    flex-shrink: 0 !important;
    white-space: nowrap !important;
    font-size: 0.72rem !important;
    padding: 0.25rem 0.6rem !important;
  }

  .game-select {
    width: 100% !important;
    max-width: 100% !important;
    font-size: 0.82rem !important;
    padding: 0.55rem 0.65rem !important;
    border-radius: 8px !important;
    box-sizing: border-box !important;
    margin-bottom: 0.65rem !important;
  }

  .control-group label {
    font-size: 0.78rem !important;
    font-weight: 700 !important;
    margin-bottom: 0.35rem !important;
    display: block !important;
  }

  /* Resolution buttons: 3 columns guaranteed with min-width: 0 */
  .res-buttons {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 0.35rem !important;
    width: 100% !important;
    margin-bottom: 0.75rem !important;
  }

  .res-btn {
    width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
    font-size: 0.72rem !important;
    padding: 0.48rem 0.15rem !important;
    text-align: center !important;
    justify-content: center !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    border-radius: 6px !important;
  }

  /* Rig specs box: 2x2 symmetrical grid on mobile */
  .rig-specs-box {
    padding: 0.65rem 0.75rem !important;
    border-radius: 8px !important;
    margin-top: 0.5rem !important;
  }

  .rig-specs-box h6 {
    font-size: 0.8rem !important;
    margin-bottom: 0.35rem !important;
    font-weight: 700 !important;
  }

  .rig-specs-box ul {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 0.25rem 0.5rem !important;
    padding: 0 !important;
    margin: 0 !important;
    font-size: 0.72rem !important;
  }

  .rig-specs-box li {
    margin-bottom: 0 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    line-height: 1.35 !important;
  }

  /* Benchmark result card */
  .benchmark-result-card {
    padding: 0.85rem 0.7rem !important;
    border-radius: 12px !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }

  .result-header {
    margin-bottom: 0.6rem !important;
    gap: 0.5rem !important;
    align-items: center !important;
  }

  .game-tag {
    font-size: 0.68rem !important;
  }

  .result-header h4 {
    font-size: 1.05rem !important;
    font-weight: 800 !important;
    line-height: 1.25 !important;
    margin-top: 0.15rem !important;
  }

  .fps-meter {
    padding: 0.3rem 0.6rem !important;
    border-radius: 8px !important;
    flex-shrink: 0 !important;
    text-align: center !important;
  }

  .fps-number {
    font-size: 1.55rem !important;
    line-height: 1 !important;
  }

  .fps-label {
    font-size: 0.62rem !important;
  }

  .verdict-banner {
    font-size: 0.74rem !important;
    padding: 0.4rem 0.65rem !important;
    margin-bottom: 0.65rem !important;
    border-radius: 7px !important;
    gap: 0.45rem !important;
  }

  /* 3-column compact metric breakdown bar */
  .benchmark-breakdown {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 0.35rem !important;
    padding: 0.55rem 0.35rem !important;
    margin-bottom: 0.65rem !important;
    border-radius: 8px !important;
    text-align: center !important;
  }

  .metric-item {
    min-width: 0 !important;
    padding: 0.25rem 0.15rem !important;
  }

  .metric-item span {
    font-size: 0.62rem !important;
    line-height: 1.15 !important;
    display: block !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .metric-item strong {
    font-size: 0.8rem !important;
    margin-top: 0.15rem !important;
    display: block !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .gamer-note {
    font-size: 0.74rem !important;
    line-height: 1.35 !important;
    margin-bottom: 0.65rem !important;
    padding: 0.45rem 0.65rem !important;
    border-radius: 7px !important;
    background: rgba(30, 41, 59, 0.4) !important;
  }

  .btn-gamer-squad {
    font-size: 0.78rem !important;
    padding: 0.65rem 0.75rem !important;
    border-radius: 8px !important;
    text-align: center !important;
    justify-content: center !important;
  }
}

@media (max-width: 360px) {
  .vue-media-lounge {
    padding: 0.75rem 0.45rem 1rem 0.45rem !important;
  }

  .lounge-tab-btn {
    font-size: 0.72rem !important;
    padding: 0.4rem 0.1rem !important;
  }

  .deck-controls-hindi .ctrl-btn {
    font-size: 0.68rem !important;
    padding: 0.5rem 0.15rem !important;
  }

  .res-btn {
    font-size: 0.66rem !important;
    padding: 0.4rem 0.1rem !important;
  }

  .vinyl-display {
    width: 40px !important;
    height: 40px !important;
  }

  .result-header h4 {
    font-size: 0.95rem !important;
  }

  .fps-number {
    font-size: 1.35rem !important;
  }
}
</style>

