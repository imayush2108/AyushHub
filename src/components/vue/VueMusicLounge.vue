<template>
  <div class="w-full text-[#dfe2ee] font-sans">
    <!-- Top Ambient Glows -->
    <div class="relative w-full pb-12">
      <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div class="absolute -top-32 left-1/4 w-[550px] h-[550px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none"></div>
        <div class="absolute top-96 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none"></div>
      </div>

      <!-- Hero Header Section -->
      <section class="w-full px-margin-mobile md:px-margin pt-space-md pb-space-lg max-w-7xl mx-auto">
        <div class="text-center space-y-space-md max-w-5xl mx-auto">
          <!-- Eyebrow Pill -->
          <div class="inline-flex items-center gap-space-xs px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 shadow-sm backdrop-blur-md">
            <span class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse"></span>
            <span class="font-label-sm text-label-sm text-blue-400 uppercase tracking-widest font-semibold">
              {{ musicSection?.eyebrow || 'All the Songs I Love' }}
            </span>
          </div>

          <!-- Main Title -->
          <h1 class="font-display-hero text-display-hero-mobile md:text-display-hero text-[#f8fafc] tracking-tight">
            <template v-if="musicSection?.heading">
              {{ musicSection.heading }}
            </template>
            <template v-else>
              Vibe &amp; Rhythm: <span class="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent">Bollywood &amp; Punjabi</span>
            </template>
          </h1>

          <!-- Subtitle -->
          <p class="font-body-lg text-body-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {{ musicSection?.subtitle || 'Discover the music I enjoy, explore featured tracks, and listen to handpicked Bollywood and Punjabi songs that define my taste.' }}
          </p>

          <!-- Stats Bar & Hero Metadata Strip -->
          <!-- Stats Bar & Hero Metadata Strip (2x2 Grid on Mobile, Flex Row on Desktop) -->
          <div class="pt-space-sm w-full max-w-md sm:max-w-lg md:max-w-none mx-auto grid grid-cols-2 md:flex md:flex-nowrap items-center justify-center gap-2 sm:gap-3 md:gap-space-md text-slate-400 font-label-md text-label-md md:whitespace-nowrap">
            <!-- Item 1: Bollywood & Punjabi Hits -->
            <div class="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md md:bg-transparent md:border-0 md:p-0">
              <span class="material-symbols-outlined text-blue-400 text-[18px] sm:text-[20px] shrink-0" style="font-variation-settings: 'FILL' 1;">headphones</span>
              <span class="text-slate-200 font-title-md text-xs sm:text-sm font-medium text-center md:text-left leading-tight">Bollywood &amp; Punjabi Hits</span>
            </div>
            
            <div class="h-4 w-px bg-slate-800 hidden md:block shrink-0"></div>

            <!-- Item 2: Spotify & YouTube -->
            <div class="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md md:bg-transparent md:border-0 md:p-0">
              <span class="material-symbols-outlined text-indigo-400 text-[18px] sm:text-[20px] shrink-0" style="font-variation-settings: 'FILL' 1;">equalizer</span>
              <span class="text-slate-200 font-title-md text-xs sm:text-sm font-medium text-center md:text-left leading-tight">Spotify &amp; YouTube</span>
            </div>

            <div class="h-4 w-px bg-slate-800 hidden md:block shrink-0"></div>

            <!-- Item 3: 50+ Curated Bangers -->
            <div class="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md md:bg-transparent md:border-0 md:p-0">
              <span class="material-symbols-outlined text-blue-400 text-[18px] sm:text-[20px] shrink-0" style="font-variation-settings: 'FILL' 1;">graphic_eq</span>
              <span class="text-slate-200 font-title-md text-xs sm:text-sm font-medium text-center md:text-left leading-tight">50+ Curated Bangers</span>
            </div>

            <div class="h-4 w-px bg-slate-800 hidden md:block shrink-0"></div>
            
            <!-- Item 4: Live Audio Visualizer Pill -->
            <div class="flex items-center justify-center gap-1.5 p-2 sm:p-2.5 md:py-1 md:px-3 rounded-xl md:rounded-full bg-slate-900/80 md:bg-slate-900 border border-slate-800/80 md:border-slate-800 backdrop-blur-md shadow-sm">
              <span class="material-symbols-outlined text-blue-400 text-[18px] shrink-0">graphic_eq</span>
              <div class="flex items-end gap-1 h-4 px-0.5 sm:px-1 shrink-0">
                <span class="w-1 bg-blue-500 rounded-full hero-freq-bar" style="height:14px; animation-delay:0ms;"></span>
                <span class="w-1 bg-blue-400 rounded-full hero-freq-bar" style="height:18px; animation-delay:180ms;"></span>
                <span class="w-1 bg-indigo-400 rounded-full hero-freq-bar" style="height:11px; animation-delay:360ms;"></span>
                <span class="w-1 bg-blue-500 rounded-full hero-freq-bar" style="height:16px; animation-delay:90ms;"></span>
                <span class="w-1 bg-indigo-400 rounded-full hero-freq-bar" style="height:13px; animation-delay:270ms;"></span>
                <span class="w-1 bg-blue-400 rounded-full hero-freq-bar" style="height:15px; animation-delay:450ms;"></span>
              </div>
              <span class="text-xs font-medium text-slate-300 uppercase tracking-wider pl-0.5 sm:pl-1 shrink-0">Live Hi-Fi EQ</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ACTIVE DUAL-ENGINE SPOTIFY & YOUTUBE STREAMING CONSOLE -->
      <section id="master-console" class="w-full px-margin-mobile md:px-margin mb-space-xl max-w-7xl mx-auto">
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-2xl p-space-md md:p-space-lg shadow-2xl shadow-black/40">
          <div class="flex flex-col lg:flex-row items-center justify-between gap-space-md pb-space-md border-b border-slate-800">
            <div class="flex items-center gap-space-md w-full lg:w-auto">
              <div class="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-800 border border-slate-700/80 shrink-0">
                <img :src="currentSong.coverUrl || getYoutubeThumb(currentSong.youtubeId)" :alt="currentSong.title" @error="onImgError" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-blue-600/20"></div>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-label-mono uppercase">
                    Now Active
                  </span>
                  <span class="font-label-mono text-xs text-slate-400">{{ currentSong.bpm || 'BPM Synced' }}</span>
                </div>
                <h2 class="font-headline-sm text-headline-sm text-slate-100 font-bold truncate">
                  {{ currentSong.title }}
                </h2>
                <p class="font-body-sm text-body-sm text-slate-400 truncate">
                  {{ currentSong.artist }} • {{ currentSong.movie }}
                </p>
              </div>
            </div>

            <!-- Dual Engine Selector Controls -->
            <div class="flex items-center gap-space-sm w-full lg:w-auto justify-end">
              <div class="flex items-center p-1 rounded-full bg-slate-950 border border-slate-800 shadow-inner">
                <button
                  type="button"
                  @click="activeEngine = 'spotify'"
                  :class="activeEngine === 'spotify' ? 'bg-[#1DB954] text-black font-semibold shadow-md' : 'text-slate-400 hover:text-white'"
                  class="px-4 py-1.5 rounded-full text-xs font-label-md flex items-center gap-1.5 transition-all"
                  title="Stream Studio Audio via Spotify"
                >
                  <span class="w-2 h-2 rounded-full" :class="activeEngine === 'spotify' ? 'bg-black' : 'bg-[#1DB954]'"></span>
                  Spotify Audio
                </button>
                <button
                  type="button"
                  @click="activeEngine = 'youtube'"
                  :class="activeEngine === 'youtube' ? 'bg-rose-600 text-white font-semibold shadow-md' : 'text-slate-400 hover:text-white'"
                  class="px-4 py-1.5 rounded-full text-xs font-label-md flex items-center gap-1.5 transition-all"
                  title="Stream Official Video via YouTube"
                >
                  <span class="material-symbols-outlined text-[14px]">smart_display</span>
                  YouTube Video
                </button>
              </div>

              <button
                v-if="currentSong.lyrics"
                type="button"
                @click="showLyricsModal = true"
                class="px-3.5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-white border border-slate-700 text-xs font-label-md flex items-center gap-1 transition-all"
              >
                <span class="material-symbols-outlined text-[16px]">lyrics</span>
                <span>Lyrics</span>
              </button>
            </div>
          </div>

          <!-- The Working Player Embed Frame -->
          <div class="mt-space-md w-full">
            <!-- 1. SPOTIFY EMBED ENGINE -->
            <div v-if="activeEngine === 'spotify'" class="w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-2 shadow-inner">
              <iframe
                v-if="currentSong.spotifyTrackId"
                :src="'https://open.spotify.com/embed/track/' + currentSong.spotifyTrackId + '?utm_source=generator&theme=0'"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                class="rounded-lg w-full"
                :title="currentSong.title + ' Spotify Embed'"
              ></iframe>
              <div v-else class="p-6 text-center text-slate-400">
                <p>Direct Spotify Track ID syncing with master audio stream...</p>
              </div>
            </div>

            <!-- 2. YOUTUBE EMBED ENGINE -->
            <div v-if="activeEngine === 'youtube'" class="w-full aspect-video max-h-[480px] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
              <iframe
                v-if="currentSong.youtubeId"
                :src="'https://www.youtube-nocookie.com/embed/' + currentSong.youtubeId + '?rel=0&autoplay=1'"
                class="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                :title="currentSong.title + ' YouTube Player'"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- Three Strip Bento Feature Highlights -->
      <section class="w-full px-margin-mobile md:px-margin mb-space-xl max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          <!-- Highlight 1: Punjabi Energy -->
          <div class="relative group rounded-xl p-space-lg bg-slate-900/70 border border-slate-800/90 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900 shadow-lg overflow-hidden">
            <div class="flex items-center justify-between mb-space-md">
              <div class="w-11 h-11 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-blue-400">
                <span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">bolt</span>
              </div>
              <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/60 text-blue-300 uppercase tracking-wider font-medium">High Energy</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm text-slate-100 mb-space-xs font-semibold">Desi Bass &amp; Dhol Drops</h3>
            <p class="font-body-sm text-body-sm text-slate-400 leading-relaxed">
              Unstoppable energy and authentic thumping rhythms from Sidhu Moosewala, Diljit Dosanjh, Karan Aujla, and AP Dhillon.
            </p>
            <div class="mt-space-md pt-space-sm flex items-center gap-space-xs text-blue-400 font-label-sm text-label-sm group-hover:text-blue-300 transition-colors">
              <span>808 Sub-Bass • Live Dhol</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>

          <!-- Highlight 2: Bollywood Melodies -->
          <div class="relative group rounded-xl p-space-lg bg-slate-900/70 border border-slate-800/90 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900 shadow-lg overflow-hidden">
            <div class="flex items-center justify-between mb-space-md">
              <div class="w-11 h-11 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-indigo-400">
                <span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">favorite</span>
              </div>
              <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 uppercase tracking-wider font-medium">Acoustic Soul</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm text-slate-100 mb-space-xs font-semibold">Soulful Bollywood Melodies</h3>
            <p class="font-body-sm text-body-sm text-slate-400 leading-relaxed">
              Late-night acoustic vibes and golden lyrical poetry with Arijit Singh, Mohit Chauhan, and Amit Trivedi.
            </p>
            <div class="mt-space-md pt-space-sm flex items-center gap-space-xs text-indigo-400 font-label-sm text-label-sm group-hover:text-indigo-300 transition-colors">
              <span>Sufi Strings • Velvet Vocals</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>

          <!-- Highlight 3: Curated Playlists -->
          <div class="relative group rounded-xl p-space-lg bg-slate-900/70 border border-slate-800/90 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900 shadow-lg overflow-hidden">
            <div class="flex items-center justify-between mb-space-md">
              <div class="w-11 h-11 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-blue-400">
                <span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">queue_music</span>
              </div>
              <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/60 text-blue-300 uppercase tracking-wider font-medium">Hand-Picked</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm text-slate-100 mb-space-xs font-semibold">Curated Weekly Playlists</h3>
            <p class="font-body-sm text-body-sm text-slate-400 leading-relaxed">
              Zero skips guaranteed. Scientifically calibrated tempos and flow states tailored for night drives, deep focus, and PR gym sessions.
            </p>
            <div class="mt-space-md pt-space-sm flex items-center gap-space-xs text-blue-400 font-label-sm text-label-sm group-hover:text-blue-300 transition-colors">
              <span>Smart Flow • BPM Balanced</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Filter Chips & Search Bar -->
      <section class="w-full px-margin-mobile md:px-margin mb-space-lg max-w-7xl mx-auto">
        <div class="rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-space-md md:p-space-lg shadow-lg flex flex-col lg:flex-row items-center justify-between gap-space-md">
          <!-- Filter Tabs -->
          <div class="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="activeCategory = cat.id"
              :class="activeCategory === cat.id ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-900/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'"
              class="shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer"
            >
              {{ cat.label }}
            </button>
          </div>

          <!-- Total Count -->
          <div class="flex items-center gap-space-sm w-full lg:w-auto justify-end shrink-0 text-xs text-slate-400 font-label-mono">
            <span>Showing {{ filteredSongs.length }} of {{ songs.length }} Songs</span>
          </div>
        </div>
      </section>

      <!-- Track Cards Showcase Grid -->
      <section class="w-full px-margin-mobile md:px-margin mb-space-xl max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-space-md">
          <div>
            <h2 class="font-headline-md text-headline-md text-slate-100 flex items-center gap-space-xs font-semibold">
              <span>Heavy Rotation Master Tapes</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-blue-950/70 text-blue-300 border border-blue-800/60 font-label-sm uppercase font-semibold">
                {{ filteredSongs.length }} Tracks
              </span>
            </h2>
            <p class="font-body-sm text-body-sm text-slate-400">
              Click any track to immediately load into the master player console above.
            </p>
          </div>
          <div class="hidden sm:flex items-center gap-space-xs text-slate-400 font-label-sm text-label-sm">
            <span class="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.6)]"></span>
            <span>Auto-Bitrate 320kbps</span>
          </div>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          <div
            v-for="(song, idx) in filteredSongs"
            :key="song.id || idx"
            @click="selectSong(song)"
            :class="currentSong.id === song.id ? 'ring-2 ring-blue-500 bg-slate-900 shadow-xl shadow-blue-950/40' : 'bg-slate-900/70 hover:bg-slate-900 hover:border-slate-700'"
            class="group relative rounded-xl p-space-md border border-slate-800/90 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div class="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 mb-space-md shadow-inner">
                <img
                  :src="song.coverUrl || getYoutubeThumb(song.youtubeId)"
                  :alt="song.title"
                  @error="onImgError"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                <!-- Genre/Tag Badge -->
                <div class="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-blue-300 backdrop-blur-md flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px] text-blue-400">graphic_eq</span>
                  <span class="font-label-sm text-xs font-medium uppercase tracking-wider">{{ song.genre || 'Desi Audio' }}</span>
                </div>

                <!-- Quick Play Button -->
                <button
                  type="button"
                  :aria-label="'Play ' + song.title"
                  class="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-all"
                >
                  <span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1;">
                    {{ currentSong.id === song.id && isPlaying ? 'pause' : 'play_arrow' }}
                  </span>
                </button>
              </div>

              <div class="space-y-1">
                <h3 class="font-title-md text-title-md text-slate-100 font-semibold group-hover:text-blue-400 transition-colors truncate">
                  {{ song.title }}
                </h3>
                <p class="font-body-sm text-body-sm text-slate-400 truncate">
                  {{ song.artist }}
                </p>
                <p class="font-body-sm text-xs text-slate-500 truncate">
                  {{ song.movie }}
                </p>
              </div>
            </div>

            <div class="mt-space-md pt-space-xs flex items-center justify-between font-label-sm text-label-sm text-slate-400 border-t border-slate-800/60">
              <span class="inline-flex items-center gap-1 text-blue-400">
                <span class="material-symbols-outlined text-[16px]">speed</span>
                {{ song.bpm || '320 kbps' }}
              </span>
              <div class="flex items-end gap-1 h-3 px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/50">
                <span class="w-0.5 bg-blue-400 rounded-full hero-freq-bar" style="height:100%; animation-delay:0ms;"></span>
                <span class="w-0.5 bg-indigo-400 rounded-full hero-freq-bar" style="height:70%; animation-delay:200ms;"></span>
                <span class="w-0.5 bg-blue-400 rounded-full hero-freq-bar" style="height:90%; animation-delay:400ms;"></span>
                <span class="w-0.5 bg-indigo-400 rounded-full hero-freq-bar" style="height:50%; animation-delay:150ms;"></span>
              </div>
              <span>{{ song.duration || '3:45' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- External Streaming Hubs Sync Banner -->
      <section class="w-full px-margin-mobile md:px-margin mb-space-xl max-w-7xl mx-auto">
        <div class="rounded-xl bg-slate-900/80 border border-slate-800 p-space-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div class="space-y-space-xs text-center md:text-left">
            <div class="inline-flex items-center gap-space-xs text-blue-400 font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              <span class="material-symbols-outlined text-[18px]">cell_tower</span>
              <span>External Streaming Hubs</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm text-slate-100 font-semibold">Listen on Your Favorite App</h3>
            <p class="font-body-sm text-body-sm text-slate-400 max-w-xl">
              Follow my complete Hindi and Punjabi playlist on Spotify and Apple Music.
            </p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-space-sm shrink-0">
            <a
              class="px-space-md py-space-sm rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 transition-all flex items-center gap-space-xs font-label-md text-label-md font-medium"
              href="https://spotify.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span class="material-symbols-outlined text-[20px] text-green-400">podcasts</span>
              <span>Open Spotify</span>
            </a>
            <a
              class="px-space-md py-space-sm rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 transition-all flex items-center gap-space-xs font-label-md text-label-md font-medium"
              href="https://music.apple.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span class="material-symbols-outlined text-[20px] text-indigo-400">radio</span>
              <span>Apple Music</span>
            </a>
          </div>
        </div>
      </section>
    </div>

    <!-- Lyrics Modal Drawer -->
    <div
      v-if="showLyricsModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      @click.self="showLyricsModal = false"
    >
      <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl max-h-[85vh] flex flex-col">
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 class="font-headline-sm text-white font-bold">{{ currentSong.title }}</h3>
            <p class="text-sm text-slate-400">{{ currentSong.artist }} • {{ currentSong.movie }}</p>
          </div>
          <button
            type="button"
            @click="showLyricsModal = false"
            class="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="overflow-y-auto py-4 text-slate-300 font-sans whitespace-pre-line leading-relaxed text-sm">
          {{ currentSong.lyrics || 'Lyrics currently syncing with artist database...' }}
        </div>
        <div class="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            @click="showLyricsModal = false"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-xs hover:bg-blue-500"
          >
            Close Lyrics
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { songsData } from '../../data/songsData.js';

const props = defineProps({
  songs: {
    type: Array,
    default: () => songsData || [],
  },
  musicSection: {
    type: Object,
    default: () => ({}),
  },
  onNavigate: {
    type: Function,
    default: null,
  },
});

const songs = ref(props.songs && props.songs.length > 0 ? props.songs : (songsData || []));
const currentSong = ref(songs.value[0] || {});

watch(
  () => props.songs,
  (newSongs) => {
    if (newSongs && newSongs.length > 0) {
      songs.value = newSongs;
      if (!currentSong.value?.id || !newSongs.find((s) => s.id === currentSong.value.id)) {
        currentSong.value = newSongs[0] || {};
      }
    }
  },
  { deep: true }
);

const activeEngine = ref('spotify'); // 'spotify' | 'youtube'
const activeCategory = ref('all');
const isPlaying = ref(true);
const showLyricsModal = ref(false);

const categories = [
  { id: 'all', label: 'All Artists', query: '' },
  { id: 'arijit', label: 'Arijit Singh', query: 'Arijit Singh' },
  { id: 'kk', label: 'KK', query: 'KK' },
  { id: 'sonu', label: 'Sonu Nigam', query: 'Sonu Nigam' },
  { id: 'atif', label: 'Atif Aslam', query: 'Atif Aslam' },
  { id: 'diljit', label: 'Diljit Dosanjh', query: 'Diljit Dosanjh' },
  { id: 'karan', label: 'Karan Aujla', query: 'Karan Aujla' },
  { id: 'ap', label: 'AP Dhillon', query: 'AP Dhillon' },
  { id: 'armaan', label: 'Armaan Malik', query: 'Armaan Malik' },
  { id: 'shreya', label: 'Shreya Ghoshal', query: 'Shreya Ghoshal' },
  { id: 'mohit', label: 'Mohit Chauhan', query: 'Mohit Chauhan' },
  { id: 'mustafa', label: 'Mustafa Zahid', query: 'Mustafa Zahid' },
];

const filteredSongs = computed(() => {
  if (activeCategory.value === 'all') return songs.value;
  const current = categories.find((c) => c.id === activeCategory.value);
  if (!current || !current.query) return songs.value;

  const regex = new RegExp('(?:^|[^a-zA-Z0-9])' + current.query + '(?:$|[^a-zA-Z0-9])', 'i');
  return songs.value.filter((s) => {
    return regex.test(s.artist || '') || (s.artistTag && regex.test(s.artistTag));
  });
});

function selectSong(song) {
  currentSong.value = song;
  isPlaying.value = true;
  // Scroll to master console for immediate immersion
  const el = document.getElementById('master-console');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function getYoutubeThumb(ytId) {
  if (!ytId) return '/images/showcase-bollywood-music.jpg';
  return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
}

function onImgError(e) {
  e.currentTarget.src = '/images/showcase-bollywood-music.jpg';
}
</script>
