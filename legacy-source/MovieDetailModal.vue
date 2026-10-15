<template>
  <div class="movie-modal-backdrop" @click.self="$emit('close')">
    <div class="movie-modal-card" role="dialog" aria-modal="true" :aria-label="movie.title + ' Details'">
      <!-- Modal Top Sticky Header -->
      <div class="modal-top-bar">
        <div class="modal-header-meta">
          <span class="modal-cat-chip">{{ movie.categoryLabel }}</span>
          <span class="modal-release-chip">Released: {{ movie.releaseDate }}</span>
        </div>
        <button 
          type="button" 
          class="modal-close-btn" 
          @click="$emit('close')" 
          title="Close Movie Details (Esc)"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>

      <!-- Modal Body (Scrollable) -->
      <div class="modal-body-scroll">
        <!-- 1. MOVIE HEADER & BACKDROP HERO -->
        <div class="movie-modal-hero" :style="{ background: movie.themeGradient }">
          <div class="hero-overlay-shade"></div>
          <div class="hero-content-grid">
            <div class="hero-poster-box">
              <img 
                :src="movie.posterUrl" 
                :alt="movie.title + ' Official Poster'" 
                class="hero-poster-img"
                loading="eager"
                @error="onPosterError"
              />
              <span class="poster-rating-badge">★ {{ movie.rating }}/10</span>
            </div>

            <div class="hero-info-box">
              <span class="hero-franchise-tag">{{ movie.franchise }}</span>
              <h2 class="hero-movie-title">{{ movie.title }}</h2>
              <p class="hero-one-liner">{{ movie.shortDescription }}</p>

              <!-- Badges Row -->
              <div class="hero-badge-strip">
                <span class="meta-pill pill-genre">🎭 {{ movie.genre }}</span>
                <span class="meta-pill pill-date">📅 {{ movie.releaseDate }}</span>
                <span 
                  class="meta-pill" 
                  :class="movie.isHindiDubbed ? 'pill-hindi-yes' : 'pill-hindi-no'"
                  :title="movie.hindiStatusNote"
                >
                  <span v-if="movie.isHindiDubbed">🇮🇳 {{ movie.hindiStatusNote }}</span>
                  <span v-else>🌐 {{ movie.primaryLanguages }} (Hindi Dub Unverified)</span>
                </span>
                <span class="meta-pill pill-verdict">⚡ Verdict: {{ movie.verdict }}</span>
              </div>

              <!-- Quick Specs Grid -->
              <div class="hero-specs-list">
                <div class="spec-row">
                  <span class="spec-label">Director:</span>
                  <span class="spec-val">{{ movie.director }}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">Producers:</span>
                  <span class="spec-val">{{ movie.producers }}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">Main Cast:</span>
                  <span class="spec-val cast-val">
                    <span v-for="(actor, idx) in movie.cast" :key="idx" class="actor-tag">
                      {{ actor }}
                    </span>
                  </span>
                </div>
              </div>

              <!-- Jump to Trailer Button -->
              <div class="hero-cta-row">
                <button type="button" class="btn-jump-trailer" @click="scrollToTrailer">
                  ▶ Watch Official Trailer
                </button>
                <a 
                  :href="'https://wa.me/919508678989?text=Hi%20Ayush,%20let%27s%20discuss%20the%202026%20movie%20' + encodeURIComponent(movie.title) + '!'" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-hero-wa"
                >
                  💬 Discuss on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. OFFICIAL YOUTUBE TRAILER -->
        <div ref="trailerSection" class="modal-section trailer-section">
          <div class="section-title-wrap">
            <span class="sec-icon">🎬</span>
            <h3>Official YouTube Trailer</h3>
            <span class="badge-studio-verified">Verified Studio Embed</span>
          </div>

          <div class="trailer-embed-container">
            <iframe 
              :src="'https://www.youtube-nocookie.com/embed/' + movie.youtubeId + '?rel=0&enablejsapi=1'" 
              :title="movie.title + ' Official Trailer'"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen
              class="trailer-iframe"
            ></iframe>
          </div>

          <div class="trailer-meta-footer">
            <span class="trailer-note">
              🎥 Official trailer streamed via YouTube Studio CDN. Audio does not autoplay.
            </span>
            <a 
              :href="'https://www.youtube.com/watch?v=' + movie.youtubeId" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="link-yt-external"
            >
              Open on YouTube ↗
            </a>
          </div>
        </div>

        <!-- 3. SPOILER-FREE MOVIE OVERVIEW -->
        <div class="modal-section overview-section">
          <div class="section-title-wrap">
            <span class="sec-icon">📖</span>
            <h3>Spoiler-Free Overview</h3>
          </div>
          <div class="overview-box">
            <p class="overview-body">{{ movie.overview }}</p>
          </div>
        </div>

        <!-- 4. WHAT TO EXPECT -->
        <div class="modal-section expect-section">
          <div class="section-title-wrap">
            <span class="sec-icon">✨</span>
            <h3>What to Expect</h3>
          </div>
          <div class="expect-grid">
            <div 
              v-for="(val, key) in movie.whatToExpect" 
              :key="key" 
              class="expect-card"
            >
              <div class="expect-header">
                <span class="expect-icon">{{ getExpectIcon(key) }}</span>
                <span class="expect-label">{{ formatExpectLabel(key) }}</span>
              </div>
              <p class="expect-desc">{{ val }}</p>
            </div>
          </div>
        </div>

        <!-- 5. REVIEW & RATING -->
        <div class="modal-section review-section">
          <div class="section-title-wrap">
            <span class="sec-icon">⭐</span>
            <h3>Review &amp; Verified Ratings</h3>
          </div>

          <div class="ratings-dashboard">
            <div class="score-card score-overall">
              <span class="score-label">Ayush Hub Overall</span>
              <span class="score-num">{{ movie.rating }}<small>/10</small></span>
              <span class="score-sub">Aggregated Score</span>
            </div>
            <div class="score-card score-critics">
              <span class="score-label">Critics' Rating</span>
              <span class="score-source">{{ movie.criticsRating }}</span>
              <span class="score-sub">Verified Reviews</span>
            </div>
            <div class="score-card score-audience">
              <span class="score-label">Audience Reception</span>
              <span class="score-source">{{ movie.audienceRating }}</span>
              <span class="score-sub">Viewer Feedback</span>
            </div>
          </div>

          <div class="review-summary-box">
            <h6>Review Summary:</h6>
            <p>{{ movie.reviewSummary }}</p>
          </div>
        </div>

        <!-- 6. PROS & CONS -->
        <div class="modal-section pros-cons-section">
          <div class="section-title-wrap">
            <span class="sec-icon">⚖️</span>
            <h3>Pros &amp; Cons</h3>
          </div>

          <div class="pros-cons-grid">
            <div class="pros-card">
              <div class="card-head head-pros">
                <span>✓ Pros (What Shines)</span>
              </div>
              <ul class="pros-list">
                <li v-for="(pro, idx) in movie.pros" :key="idx">
                  <span class="item-check">✓</span>
                  <span>{{ pro }}</span>
                </li>
              </ul>
            </div>

            <div class="cons-card">
              <div class="card-head head-cons">
                <span>⚠️ Cons (Room for Improvement)</span>
              </div>
              <ul class="cons-list">
                <li v-for="(con, idx) in movie.cons" :key="idx">
                  <span class="item-cross">✕</span>
                  <span>{{ con }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 7. IS IT WORTH WATCHING? (VERDICT) -->
        <div class="modal-section verdict-section">
          <div class="section-title-wrap">
            <span class="sec-icon">🎯</span>
            <h3>Is It Worth Watching?</h3>
          </div>

          <div class="verdict-banner-box" :class="'verdict-' + movie.verdictType">
            <div class="verdict-badge-big">
              <span class="verdict-flag">VERDICT:</span>
              <span class="verdict-status">{{ movie.verdict }}</span>
            </div>
            <p class="verdict-reason">{{ movie.verdictExplanation }}</p>
          </div>
        </div>

        <!-- 8. RECOMMENDED AUDIENCE & 9. CONCLUSION -->
        <div class="modal-section audience-conclusion-grid">
          <div class="info-card-panel">
            <div class="panel-head">
              <span>👥 Recommended Audience</span>
            </div>
            <p>{{ movie.recommendedAudience }}</p>
          </div>

          <div class="info-card-panel">
            <div class="panel-head">
              <span>🏁 Final Conclusion</span>
            </div>
            <p>{{ movie.conclusion }}</p>
          </div>
        </div>

        <!-- 10. RELATED MOVIES -->
        <div class="modal-section related-section">
          <div class="section-title-wrap">
            <span class="sec-icon">🎞️</span>
            <h3>Related Movies &amp; Similar Vibes</h3>
          </div>

          <div class="related-movies-grid">
            <div 
              v-for="(rel, idx) in movie.relatedMovies" 
              :key="idx" 
              class="related-movie-card"
            >
              <div class="rel-top">
                <span class="rel-genre">{{ rel.genre }}</span>
                <span class="rel-year">{{ rel.year }}</span>
              </div>
              <h5>{{ rel.title }}</h5>
              <span class="rel-hint">Similar tone &amp; thematic style</span>
            </div>
          </div>
        </div>

        <!-- BOTTOM ACTION ROW -->
        <div class="modal-bottom-actions">
          <button 
            type="button" 
            class="btn-modal-watchlist"
            :class="{ active: isWatched }"
            @click="toggleWatch"
          >
            {{ isWatched ? '✓ Saved in Watchlist' : '+ Add to Watchlist' }}
          </button>

          <a 
            :href="'https://wa.me/919508678989?text=Hi%20Ayush,%20I%20just%20read%20your%20review%20of%20' + encodeURIComponent(movie.title) + '%20(Rating:%20' + movie.rating + '/10)!%20Let%27s%20discuss.'" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn-modal-wa"
          >
            <span>💬 Chat About This Movie on WhatsApp</span>
            <span>↗</span>
          </a>

          <button 
            type="button" 
            class="btn-modal-dismiss" 
            @click="$emit('close')"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  movie: {
    type: Object,
    required: true
  },
  initialScrollToTrailer: {
    type: Boolean,
    default: false
  },
  isInWatchlist: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'toggle-watchlist']);

const isWatched = ref(props.isInWatchlist);
const trailerSection = ref(null);

function toggleWatch() {
  isWatched.value = !isWatched.value;
  emit('toggle-watchlist', props.movie.id);
}

function scrollToTrailer() {
  if (trailerSection.value) {
    trailerSection.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function onPosterError(e) {
  // Graceful fallback to placeholder background if CDN image has a glitch
  if (e && e.target) {
    e.target.style.display = 'none';
  }
}

function getExpectIcon(key) {
  const icons = {
    story: '📜',
    suspense: '⚡',
    action: '💥',
    comedy: '😄',
    performances: '🎭',
    drama: '🫂',
    romance: '❤️',
    music: '🎶',
    visuals: '🎨',
    cinematography: '🎥',
    heist: '💎',
    fantasy: '✨',
    adventure: '🗺️'
  };
  return icons[key.toLowerCase()] || '⭐';
}

function formatExpectLabel(key) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

function handleKeyDown(e) {
  if (e.key === 'Escape') {
    emit('close');
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
  // Lock body scroll while modal is open
  document.body.style.overflow = 'hidden';

  if (props.initialScrollToTrailer) {
    setTimeout(() => {
      scrollToTrailer();
    }, 150);
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.movie-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(3, 7, 18, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}

.movie-modal-card {
  width: 100%;
  max-width: 960px;
  max-height: 90vh;
  background: #0B1120;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(79, 70, 229, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

/* Modal Top Bar */
.modal-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 1.4rem;
  background: #0F172A;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 10;
}

.modal-header-meta {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
}

.modal-cat-chip {
  font-size: 0.75rem;
  font-weight: 700;
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.15);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.modal-release-chip {
  font-size: 0.75rem;
  color: #94A3B8;
}

.modal-close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #F8FAFC;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: #EF4444;
  border-color: #EF4444;
  transform: rotate(90deg);
}

/* Modal Scrollable Body */
.modal-body-scroll {
  overflow-y: auto;
  padding: 0;
  flex: 1;
  -webkit-overflow-scrolling: touch;
}

/* 1. Hero Header */
.movie-modal-hero {
  position: relative;
  padding: 2.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.hero-overlay-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(11, 17, 32, 0.4) 0%, rgba(11, 17, 32, 0.95) 100%);
  pointer-events: none;
}

.hero-content-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2rem;
  align-items: flex-start;
}

.hero-poster-box {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  aspect-ratio: 2 / 3;
  background: #1E293B;
}

.hero-poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.poster-rating-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  color: #FBBF24;
  font-size: 0.82rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  border: 1px solid rgba(245, 158, 11, 0.4);
}

.hero-info-box {
  display: flex;
  flex-direction: column;
}

.hero-franchise-tag {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #A5B4FC;
  margin-bottom: 0.35rem;
}

.hero-movie-title {
  font-size: 2.1rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.2;
  margin-bottom: 0.6rem;
  letter-spacing: -0.02em;
}

.hero-one-liner {
  font-size: 1rem;
  color: #CBD5E1;
  line-height: 1.5;
  margin-bottom: 1.1rem;
}

.hero-badge-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}

.meta-pill {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  color: #E2E8F0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.pill-genre {
  background: rgba(79, 70, 229, 0.25);
  color: #C7D2FE;
  border-color: rgba(99, 102, 241, 0.4);
}

.pill-date {
  background: rgba(15, 23, 42, 0.6);
  color: #94A3B8;
}

.pill-hindi-yes {
  background: rgba(16, 185, 129, 0.18);
  color: #6EE7B7;
  border-color: rgba(16, 185, 129, 0.4);
}

.pill-hindi-no {
  background: rgba(245, 158, 11, 0.15);
  color: #FCD34D;
  border-color: rgba(245, 158, 11, 0.35);
}

.pill-verdict {
  background: rgba(236, 72, 153, 0.2);
  color: #F472B6;
  border-color: rgba(236, 72, 153, 0.4);
}

.hero-specs-list {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 0.9rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}

.spec-row {
  display: flex;
  gap: 0.6rem;
  font-size: 0.85rem;
  line-height: 1.4;
}

.spec-label {
  color: #94A3B8;
  font-weight: 600;
  min-width: 85px;
}

.spec-val {
  color: #F1F5F9;
  font-weight: 500;
}

.cast-val {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.actor-tag {
  background: rgba(255, 255, 255, 0.06);
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #E2E8F0;
}

.hero-cta-row {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.btn-jump-trailer {
  background: #DC2626;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  padding: 0.65rem 1.2rem;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.35);
  transition: all 0.2s ease;
}

.btn-jump-trailer:hover {
  background: #B91C1C;
  transform: translateY(-2px);
}

.btn-hero-wa {
  background: rgba(34, 197, 94, 0.15);
  color: #4ADE80;
  border: 1px solid rgba(34, 197, 94, 0.35);
  border-radius: 10px;
  padding: 0.65rem 1.2rem;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;
}

.btn-hero-wa:hover {
  background: rgba(34, 197, 94, 0.25);
  color: #86EFAC;
}

/* Sections Global */
.modal-section {
  padding: 1.8rem 2.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.1rem;
}

.sec-icon {
  font-size: 1.3rem;
}

.section-title-wrap h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #F8FAFC;
  margin: 0;
}

.badge-studio-verified {
  font-size: 0.72rem;
  color: #38BDF8;
  background: rgba(56, 189, 248, 0.12);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid rgba(56, 189, 248, 0.25);
  margin-left: auto;
}

/* 2. Trailer Embed */
.trailer-embed-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  overflow: hidden;
  background: #000000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.trailer-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.trailer-meta-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-size: 0.82rem;
}

.trailer-note {
  color: #94A3B8;
}

.link-yt-external {
  color: #F87171;
  font-weight: 600;
  text-decoration: none;
}

.link-yt-external:hover {
  text-decoration: underline;
}

/* 3. Overview */
.overview-box {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1.3rem 1.5rem;
}

.overview-body {
  font-size: 0.98rem;
  color: #CBD5E1;
  line-height: 1.7;
  margin: 0;
}

/* 4. What to Expect */
.expect-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.expect-card {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1rem 1.1rem;
  transition: all 0.2s ease;
}

.expect-card:hover {
  border-color: rgba(99, 102, 241, 0.4);
  transform: translateY(-2px);
}

.expect-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.45rem;
}

.expect-icon {
  font-size: 1.15rem;
}

.expect-label {
  font-size: 0.88rem;
  font-weight: 700;
  color: #F1F5F9;
}

.expect-desc {
  font-size: 0.84rem;
  color: #94A3B8;
  line-height: 1.5;
  margin: 0;
}

/* 5. Review & Rating */
.ratings-dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.score-card {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 1.2rem 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.score-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.3rem;
}

.score-num {
  font-size: 2rem;
  font-weight: 800;
  color: #FBBF24;
}

.score-num small {
  font-size: 1.1rem;
  color: #94A3B8;
}

.score-source {
  font-size: 0.95rem;
  font-weight: 700;
  color: #38BDF8;
  margin: 0.4rem 0;
  line-height: 1.3;
}

.score-sub {
  font-size: 0.72rem;
  color: #64748B;
  margin-top: auto;
}

.review-summary-box {
  background: rgba(30, 41, 59, 0.4);
  border-left: 3px solid #6366F1;
  padding: 1rem 1.2rem;
  border-radius: 0 10px 10px 0;
}

.review-summary-box h6 {
  font-size: 0.88rem;
  font-weight: 700;
  color: #A5B4FC;
  margin-bottom: 0.3rem;
}

.review-summary-box p {
  font-size: 0.92rem;
  color: #CBD5E1;
  line-height: 1.6;
  margin: 0;
}

/* 6. Pros & Cons */
.pros-cons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
}

.pros-card, .cons-card {
  background: rgba(15, 23, 42, 0.6);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.card-head {
  padding: 0.75rem 1.1rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.head-pros {
  background: rgba(16, 185, 129, 0.15);
  color: #34D399;
  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
}

.head-cons {
  background: rgba(245, 158, 11, 0.12);
  color: #FBBF24;
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
}

.pros-list, .cons-list {
  list-style: none;
  padding: 1rem 1.1rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.pros-list li, .cons-list li {
  display: flex;
  gap: 0.55rem;
  font-size: 0.86rem;
  color: #CBD5E1;
  line-height: 1.45;
}

.item-check {
  color: #10B981;
  font-weight: 800;
}

.item-cross {
  color: #F59E0B;
  font-weight: 800;
}

/* 7. Verdict */
.verdict-banner-box {
  border-radius: 14px;
  padding: 1.4rem 1.6rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.verdict-recommended {
  border-color: rgba(16, 185, 129, 0.4);
  background: linear-gradient(135deg, rgba(6, 78, 59, 0.3) 0%, rgba(15, 23, 42, 0.8) 100%);
}

.verdict-badge-big {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.verdict-flag {
  font-size: 0.78rem;
  font-weight: 800;
  color: #94A3B8;
  letter-spacing: 0.08em;
}

.verdict-status {
  font-size: 1.3rem;
  font-weight: 800;
  color: #34D399;
}

.verdict-reason {
  font-size: 0.95rem;
  color: #E2E8F0;
  line-height: 1.6;
  margin: 0;
}

/* 8 & 9. Audience & Conclusion */
.audience-conclusion-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
}

.info-card-panel {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.2rem 1.3rem;
}

.panel-head {
  font-size: 0.88rem;
  font-weight: 700;
  color: #F8FAFC;
  margin-bottom: 0.5rem;
}

.info-card-panel p {
  font-size: 0.88rem;
  color: #CBD5E1;
  line-height: 1.6;
  margin: 0;
}

/* 10. Related Movies */
.related-movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.9rem;
}

.related-movie-card {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.rel-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: #94A3B8;
  margin-bottom: 0.4rem;
}

.rel-genre {
  color: #A5B4FC;
  font-weight: 600;
}

.related-movie-card h5 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.35rem;
}

.rel-hint {
  font-size: 0.72rem;
  color: #64748B;
  margin-top: auto;
}

/* Bottom Action Row */
.modal-bottom-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.3rem 2.2rem;
  background: #0F172A;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-modal-watchlist {
  background: rgba(79, 70, 229, 0.15);
  border: 1px solid rgba(79, 70, 229, 0.35);
  color: #A5B4FC;
  padding: 0.7rem 1.3rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-modal-watchlist:hover {
  background: rgba(79, 70, 229, 0.25);
  color: #FFFFFF;
}

.btn-modal-watchlist.active {
  background: #10B981;
  color: #FFFFFF;
  border-color: #10B981;
}

.btn-modal-wa {
  background: #22C55E;
  color: #FFFFFF;
  text-decoration: none;
  padding: 0.7rem 1.4rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  transition: all 0.2s ease;
}

.btn-modal-wa:hover {
  background: #16A34A;
  transform: translateY(-2px);
}

.btn-modal-dismiss {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #94A3B8;
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-modal-dismiss:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .movie-modal-card {
    max-height: 95vh;
    border-radius: 16px;
  }

  .movie-modal-hero {
    padding: 1.4rem 1.2rem;
  }

  .hero-content-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .hero-poster-box {
    max-width: 180px;
    margin: 0 auto;
  }

  .hero-movie-title {
    font-size: 1.6rem;
  }

  .modal-section {
    padding: 1.3rem 1.2rem;
  }

  .ratings-dashboard {
    grid-template-columns: 1fr;
  }

  .pros-cons-grid {
    grid-template-columns: 1fr;
  }

  .audience-conclusion-grid {
    grid-template-columns: 1fr;
  }

  .modal-bottom-actions {
    padding: 1rem 1.2rem;
    flex-direction: column;
    align-items: stretch;
  }

  .btn-modal-watchlist,
  .btn-modal-wa,
  .btn-modal-dismiss {
    text-align: center;
    justify-content: center;
  }
}
</style>
