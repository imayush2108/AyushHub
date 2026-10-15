<template>
  <div class="w-full text-[#dfe2ee] font-sans">
    <!-- Top Atmospheric Ambient Glow -->
    <div class="relative w-full pb-12">
      <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div class="pointer-events-none absolute -top-28 left-1/3 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[130px]"></div>
        <div class="pointer-events-none absolute top-12 right-12 w-[420px] h-[420px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      </div>

      <!-- Header Section -->
      <section class="w-full px-margin-mobile md:px-margin pt-space-md pb-space-xl max-w-7xl mx-auto">
        <div class="max-w-5xl mx-auto text-center flex flex-col items-center">
          <div class="inline-flex items-center gap-space-xs px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md mb-space-md shadow-sm">
            <span class="w-2 h-2 rounded-full bg-blue-400 shadow-sm shadow-blue-400 animate-pulse"></span>
            <span class="font-label-sm text-label-sm text-blue-400 tracking-wider uppercase font-semibold">All the Movies I Love</span>
          </div>

          <h1 class="font-display-hero text-display-hero-mobile md:text-4xl lg:text-[2.65rem] xl:text-display-hero text-[#f8fafc] tracking-tight mb-space-sm max-w-6xl drop-shadow-md lg:whitespace-nowrap">
            Cinema Vault: <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">Bollywood, South &amp; Marvel</span>
          </h1>

          <p class="font-body-lg text-body-lg text-slate-400 max-w-2xl mb-space-lg leading-relaxed">
            Epic sagas, thunderous action set-pieces, and MCU multiversal lore reviewed and ranked for true cinephiles. Authentic HD trailer screening room.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-space-md mb-space-xl">
            <button
              type="button"
              @click="scrollTo('vault-grid')"
              class="inline-flex items-center gap-space-xs px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold font-label-md text-label-md shadow-md shadow-blue-900/30 hover:shadow-lg hover:shadow-blue-800/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">movie</span>
              <span>Explore Movies</span>
            </button>
            <button
              type="button"
              @click="scrollTo('trailers-arena')"
              class="inline-flex items-center gap-space-xs px-8 py-3.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200 font-label-md text-label-md backdrop-blur-md hover:bg-slate-800 hover:text-white hover:border-slate-600 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span class="material-symbols-outlined text-[20px] text-blue-400">play_circle</span>
              <span>Watch Trailers</span>
            </button>
          </div>

          <!-- Filter Category Ribbon -->
          <div class="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl max-w-3xl shadow-lg">
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="activeCategory = cat.id"
              :class="activeCategory === cat.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/30 font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'"
              class="px-space-md md:px-space-lg py-space-xs rounded-full font-label-md text-label-md transition-all duration-200 cursor-pointer"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>
      </section>

      <!-- Featured Blockbuster Spotlight: Kalki 2898 AD -->
      <section class="w-full px-margin-mobile md:px-margin mb-space-xl max-w-7xl mx-auto">
        <div class="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl shadow-black/40 group">
          <!-- Background Backdrop with Scrim -->
          <div
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            :style="{ backgroundImage: 'url(' + (spotlightMovie.backdropUrl || 'https://img.youtube.com/vi/' + spotlightMovie.youtubeId + '/maxresdefault.jpg') + ')' }"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#070a10] via-[#070a10]/85 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-[#070a10] via-[#070a10]/80 to-transparent md:w-3/4"></div>

          <!-- Spotlight Content -->
          <div class="relative z-10 p-space-lg md:p-space-xl flex flex-col justify-end min-h-[460px] md:min-h-[560px] max-w-3xl">
            <div class="flex flex-wrap items-center gap-space-sm mb-space-sm">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 font-label-sm text-label-sm shadow-sm font-semibold">
                <span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">star</span>
                <span>{{ spotlightMovie.verdict || "Editor's Choice ★ 9.2/10" }}</span>
              </span>
              <span class="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 font-label-sm text-label-sm tracking-wide uppercase">
                {{ spotlightMovie.genre || 'Sci-Fi Epic • Mythology' }}
              </span>
              <span class="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 font-label-sm text-label-sm">
                {{ spotlightMovie.releaseYear }} • {{ spotlightMovie.duration || '3h 01m' }}
              </span>
            </div>

            <h2 class="font-display-hero text-headline-lg md:text-display-hero text-[#f8fafc] font-bold tracking-tight mb-space-xs drop-shadow-md">
              {{ spotlightMovie.title }}
            </h2>

            <p class="font-body-md text-body-md text-slate-400 mb-space-lg line-clamp-3 md:line-clamp-none max-w-2xl leading-relaxed">
              {{ spotlightMovie.overview }}
            </p>

            <div class="flex flex-wrap items-center gap-space-md">
              <button
                type="button"
                @click="openTrailer(spotlightMovie)"
                class="inline-flex items-center gap-space-xs px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold font-label-md text-label-md shadow-md shadow-blue-900/30 hover:shadow-lg hover:shadow-blue-800/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
                <span>Play Official Trailer</span>
              </button>

              <div class="flex items-center gap-space-xs text-slate-300 font-body-sm text-body-sm bg-slate-900/80 border border-slate-800 px-space-md py-space-sm rounded-full backdrop-blur-md">
                <span class="material-symbols-outlined text-[18px] text-blue-400">verified</span>
                <span>Directed by {{ spotlightMovie.director }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Cinema Vault Responsive Grid -->
      <section id="vault-grid" class="w-full px-margin-mobile md:px-margin mb-space-xl max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <div class="flex items-center gap-space-xs text-blue-400 font-label-sm text-label-sm uppercase tracking-wider mb-1">
              <span class="material-symbols-outlined text-[16px]">local_activity</span>
              <span>Curated Selection</span>
            </div>
            <h2 class="font-headline-lg text-headline-lg text-[#f8fafc]">Curated Vault Collection</h2>
          </div>
          <p class="font-body-sm text-body-sm text-slate-400">
            Displaying {{ filteredMovies.length }} cinematic monuments evaluated across direction, scale &amp; impact.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          <article
            v-for="movie in filteredMovies"
            :key="movie.id"
            class="flex flex-col rounded-xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-lg shadow-black/20 hover:border-slate-700 hover:-translate-y-1.5 transition-all duration-300 group"
          >
            <!-- Poster Frame -->
            <div class="relative w-full aspect-[16/10] overflow-hidden bg-slate-800">
              <img
                :src="movie.posterUrl || 'https://img.youtube.com/vi/' + movie.youtubeId + '/maxresdefault.jpg'"
                :alt="movie.title"
                @error="onImgError"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

              <!-- Category Badge -->
              <div class="absolute top-space-sm left-space-sm flex items-center gap-space-xs">
                <span class="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-label-sm text-label-sm font-semibold tracking-wider uppercase">
                  {{ movie.categoryLabel || movie.category }}
                </span>
              </div>

              <!-- Rating Badge -->
              <div class="absolute top-space-sm right-space-sm flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-blue-400 font-label-sm text-label-sm">
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
                <span>★ {{ movie.rating }}/10</span>
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-space-md flex flex-col flex-1 justify-between">
              <div>
                <div class="flex items-center justify-between text-slate-400 font-label-sm text-label-sm mb-1">
                  <span>{{ movie.genre }}</span>
                  <span>{{ movie.releaseYear }}</span>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-[#f8fafc] group-hover:text-blue-400 transition-colors mb-space-xs font-semibold">
                  {{ movie.title }}
                </h3>
                <p class="font-body-sm text-body-sm text-slate-400 line-clamp-2 mb-space-md leading-relaxed">
                  {{ movie.shortDescription || movie.overview }}
                </p>
              </div>

              <div class="pt-space-sm flex items-center justify-between border-t border-slate-800/80 -mx-space-md -mb-space-md p-space-md bg-slate-950/40">
                <span class="font-label-sm text-label-sm text-slate-400 truncate max-w-[180px]">
                  Dir. {{ movie.director }}
                </span>
                <button
                  type="button"
                  @click="openTrailer(movie)"
                  class="inline-flex items-center gap-1 font-label-sm text-label-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer font-semibold"
                >
                  <span>Watch Trailer</span>
                  <span class="material-symbols-outlined text-[16px]">play_circle</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Multiverse Metrics & Telemetry Ribbon -->
      <section class="w-full px-margin-mobile md:px-margin mb-space-xl max-w-7xl mx-auto">
        <div class="w-full rounded-2xl bg-slate-900/90 border border-slate-800 p-space-lg md:p-space-xl relative overflow-hidden shadow-lg shadow-black/20">
          <div class="pointer-events-none absolute -right-10 -bottom-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-space-lg items-center relative z-10">
            <div class="lg:col-span-1">
              <div class="inline-flex items-center gap-space-xs text-blue-400 font-label-sm text-label-sm uppercase tracking-wider mb-space-xs font-semibold">
                <span class="material-symbols-outlined text-[18px]">insights</span>
                <span>Multiverse Metrics</span>
              </div>
              <h3 class="font-headline-md text-headline-md text-[#f8fafc] font-bold mb-space-xs">Curator Critic Ratio</h3>
              <p class="font-body-sm text-body-sm text-slate-400 leading-relaxed">
                Cross-genre analytics contrasting emotional resonance with cinematic scale and technical craft.
              </p>
            </div>

            <!-- Metric Cards -->
            <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-space-md">
              <div class="rounded-xl bg-slate-950/60 border border-slate-800/80 p-space-md flex flex-col justify-between">
                <div class="flex items-center justify-between mb-space-sm">
                  <span class="font-label-md text-label-md text-[#f8fafc] font-medium">Marvel Universe</span>
                  <span class="font-label-sm text-label-sm text-blue-400 font-bold">92% Metascore</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
                  <div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full w-[92%]"></div>
                </div>
                <span class="font-body-sm text-xs text-slate-400">34 Global MCU Entries Logged</span>
              </div>

              <div class="rounded-xl bg-slate-950/60 border border-slate-800/80 p-space-md flex flex-col justify-between">
                <div class="flex items-center justify-between mb-space-sm">
                  <span class="font-label-md text-label-md text-[#f8fafc] font-medium">South Action</span>
                  <span class="font-label-sm text-label-sm text-[#4edea3] font-bold">96% High Octane</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
                  <div class="bg-gradient-to-r from-blue-600 to-[#4edea3] h-full rounded-full w-[96%]"></div>
                </div>
                <span class="font-body-sm text-xs text-slate-400">Industry Leading Sequences</span>
              </div>

              <div class="rounded-xl bg-slate-950/60 border border-slate-800/80 p-space-md flex flex-col justify-between">
                <div class="flex items-center justify-between mb-space-sm">
                  <span class="font-label-md text-label-md text-[#f8fafc] font-medium">Bollywood Soul</span>
                  <span class="font-label-sm text-label-sm text-indigo-400 font-bold">94% Story Index</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
                  <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full w-[94%]"></div>
                </div>
                <span class="font-body-sm text-xs text-slate-400">Box-Office Mastery &amp; Heart</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trailer Embed Space Arena -->
      <section id="trailers-arena" class="w-full px-margin-mobile md:px-margin mb-space-xl max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <div class="inline-flex items-center gap-space-xs px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-label-sm text-label-sm mb-1 shadow-sm font-semibold">
              <span class="material-symbols-outlined text-[16px] text-rose-500">smart_display</span>
              <span>Official 4K Vault Streams</span>
            </div>
            <h2 class="font-headline-lg text-headline-lg text-[#f8fafc]">Trailer Embed Space Arena</h2>
          </div>
          <p class="font-body-sm text-body-sm text-slate-400 max-w-md">
            Select a high-definition preview card below to launch full theater playback inside Ayush Hub.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          <!-- Trailer 1: Marvel Secret Wars Anticipation -->
          <div class="flex flex-col rounded-xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-xl shadow-black/30 group">
            <div
              @click="openTrailer(secretWarsMovie)"
              class="relative w-full aspect-video overflow-hidden bg-slate-800 cursor-pointer"
            >
              <img
                src="https://img.youtube.com/vi/el_Pby3iQ50/maxresdefault.jpg"
                alt="Avengers: Secret Wars"
                @error="onImgError"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#070a10] via-[#070a10]/40 to-transparent"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-16 h-16 rounded-full bg-blue-600/90 border border-blue-400/40 flex items-center justify-center text-white shadow-lg shadow-blue-900/50 group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                  <span class="material-symbols-outlined text-[32px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
                </div>
              </div>
              <div class="absolute top-space-sm right-space-sm px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-200 font-label-sm text-label-sm flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>4K HDR</span>
              </div>
              <div class="absolute bottom-space-sm left-space-sm right-space-sm flex items-center justify-between text-[#f8fafc]">
                <span class="font-label-md text-label-md truncate">Avengers: Secret Wars Anticipation Reel</span>
                <span class="font-label-sm text-label-sm text-slate-300 bg-slate-900/80 border border-slate-800 px-2 py-0.5 rounded">02:44</span>
              </div>
            </div>
            <div class="p-space-md flex items-center justify-between bg-slate-900">
              <div>
                <div class="flex items-center gap-space-xs mb-1">
                  <span class="px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-400 font-label-sm text-label-sm font-semibold">MCU MULTIVERSE</span>
                  <span class="font-label-sm text-label-sm text-slate-400">2.8M Views</span>
                </div>
                <h4 class="font-title-md text-title-md text-[#f8fafc]">Incursion Protocol Breakdown</h4>
              </div>
              <button
                type="button"
                @click="openTrailer(secretWarsMovie)"
                class="inline-flex items-center gap-space-xs px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 font-label-sm text-label-sm border border-slate-700 transition-all cursor-pointer"
              >
                <span>Watch Trailer</span>
                <span class="material-symbols-outlined text-[16px]">play_circle</span>
              </button>
            </div>
          </div>

          <!-- Trailer 2: South Indian Action Symphony -->
          <div class="flex flex-col rounded-xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-xl shadow-black/30 group">
            <div
              @click="openTrailer(spotlightMovie)"
              class="relative w-full aspect-video overflow-hidden bg-slate-800 cursor-pointer"
            >
              <img
                src="https://img.youtube.com/vi/kQDd1AhGIHk/maxresdefault.jpg"
                alt="Kalki 2898 AD"
                @error="onImgError"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#070a10] via-[#070a10]/40 to-transparent"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-16 h-16 rounded-full bg-blue-600/90 border border-blue-400/40 flex items-center justify-center text-white shadow-lg shadow-blue-900/50 group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                  <span class="material-symbols-outlined text-[32px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
                </div>
              </div>
              <div class="absolute top-space-sm right-space-sm px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-200 font-label-sm text-label-sm flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span>Dolby Atmos</span>
              </div>
              <div class="absolute bottom-space-sm left-space-sm right-space-sm flex items-center justify-between text-[#f8fafc]">
                <span class="font-label-md text-label-md truncate">Kalki 2898 AD Theatrical Trailer</span>
                <span class="font-label-sm text-label-sm text-slate-300 bg-slate-900/80 border border-slate-800 px-2 py-0.5 rounded">03:12</span>
              </div>
            </div>
            <div class="p-space-md flex items-center justify-between bg-slate-900">
              <div>
                <div class="flex items-center gap-space-xs mb-1">
                  <span class="px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 text-blue-400 font-label-sm text-label-sm font-semibold">MASS BLOCKBUSTER</span>
                  <span class="font-label-sm text-label-sm text-slate-400">4.1M Views</span>
                </div>
                <h4 class="font-title-md text-title-md text-[#f8fafc]">Mythology Meets Sci-Fi</h4>
              </div>
              <button
                type="button"
                @click="openTrailer(spotlightMovie)"
                class="inline-flex items-center gap-space-xs px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 font-label-sm text-label-sm border border-slate-700 transition-all cursor-pointer"
              >
                <span>Watch Trailer</span>
                <span class="material-symbols-outlined text-[16px]">play_circle</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- FULL INTERACTIVE WORKING YOUTUBE TRAILER MODAL -->
    <div
      v-if="selectedMovie"
      class="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-slate-950/90 backdrop-blur-md animate-fadeIn"
      @click.self="selectedMovie = null"
    >
      <div class="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-800 p-space-lg shadow-2xl flex flex-col">
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-space-md mb-space-md border-b border-slate-800">
          <div>
            <span class="font-label-sm text-label-sm text-blue-400 uppercase tracking-widest font-semibold">Ayush Cinema Screening Room</span>
            <h3 class="font-headline-md text-headline-md text-[#f8fafc] font-bold">
              {{ selectedMovie.title }}
            </h3>
            <p class="font-body-sm text-body-sm text-slate-400">
              Directed by {{ selectedMovie.director }} • Rating: ★ {{ selectedMovie.rating }}/10
            </p>
          </div>
          <button
            type="button"
            @click="selectedMovie = null"
            class="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Real Working YouTube Player Iframe -->
        <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
          <iframe
            :src="'https://www.youtube-nocookie.com/embed/' + selectedMovie.youtubeId + '?rel=0&autoplay=1&enablejsapi=1'"
            :title="selectedMovie.title + ' Official Trailer'"
            class="w-full h-full rounded-xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Modal Footer -->
        <div class="pt-space-md mt-space-md border-t border-slate-800 flex flex-wrap items-center justify-between gap-space-sm text-xs text-slate-400">
          <div class="flex items-center gap-space-xs">
            <span class="material-symbols-outlined text-rose-500 text-[18px]">verified</span>
            <span>Official 4K trailer streamed directly via YouTube. Audio does not auto-loop.</span>
          </div>
          <a
            :href="'https://www.youtube.com/watch?v=' + selectedMovie.youtubeId"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
          >
            <span>Open on YouTube</span>
            <span class="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { moviesData } from '../../data/moviesData.js';

const movies = ref(moviesData || []);
const activeCategory = ref('all');
const selectedMovie = ref(null);

const spotlightMovie = computed(() => {
  return movies.value.find((m) => m.id === 'kalki-2898-ad') || movies.value[0] || {};
});

const secretWarsMovie = computed(() => {
  return movies.value.find((m) => m.id === 'avengers-secret-wars') || movies.value[1] || {};
});

const categories = [
  { id: 'all', label: 'All Films' },
  { id: 'marvel', label: 'Marvel Cinematic Universe' },
  { id: 'south', label: 'South Indian Action' },
  { id: 'bollywood', label: 'Bollywood Masterpieces' },
];

const filteredMovies = computed(() => {
  if (activeCategory.value === 'all') return movies.value;
  return movies.value.filter((m) => {
    return m.category && m.category.toLowerCase().includes(activeCategory.value);
  });
});

function openTrailer(movie) {
  selectedMovie.value = movie;
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function onImgError(e) {
  e.currentTarget.src = '/images/showcase-cinema-2026.jpg';
}
</script>
