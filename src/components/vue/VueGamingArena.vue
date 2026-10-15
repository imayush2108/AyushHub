<template>
  <div class="w-full text-[#dfe2ee] font-sans">
    <!-- Top Backdrop Ambient Glows -->
    <div class="relative w-full pb-12">
      <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div class="absolute -top-32 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div class="absolute top-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      </div>

      <!-- Header Section -->
      <section class="w-full px-margin-mobile md:px-margin pt-space-md pb-space-lg max-w-7xl mx-auto">
        <div class="max-w-5xl">
          <div class="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-slate-900 text-blue-400 mb-space-md backdrop-blur-md border border-blue-500/20 text-xs">
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span class="font-label-mono text-label-mono uppercase tracking-wider font-semibold">Ayush Arena // Live Session Ready</span>
          </div>

          <h1 class="font-display-lg text-headline-lg md:text-display-lg text-[#f8fafc] tracking-tight mb-space-sm leading-tight font-bold">
            Battleground &amp; Arena: <span class="bg-gradient-to-r from-blue-400 via-indigo-200 to-slate-200 bg-clip-text text-transparent">Gaming Realm</span>
          </h1>

          <p class="font-body-lg text-body-lg text-slate-400 max-w-3xl leading-relaxed">
            Tactical clutches, Los Santos heists, and battle royale Booyahs. Check out my competitive ranks, setups, and benchmark diagnostics.
          </p>

          <!-- Live Quick Status Strip -->
          <div class="mt-space-lg flex flex-wrap items-center gap-space-md pt-space-xs">
            <div class="flex items-center gap-space-sm px-space-md py-space-xs rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800">
              <span class="material-symbols-outlined text-blue-400 text-[20px]" style="font-variation-settings: 'FILL' 1;">sports_esports</span>
              <span class="font-label-md text-label-md text-slate-400">Main Games:</span>
              <span class="font-body-sm text-body-sm text-white font-semibold">Valorant • Free Fire MAX • GTA V</span>
            </div>
            <div class="flex items-center gap-space-sm px-space-md py-space-xs rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800">
              <span class="material-symbols-outlined text-[#4edea3] text-[20px]">bolt</span>
              <span class="font-label-md text-label-md text-slate-400">Average Frame Rate:</span>
              <span class="font-body-sm text-body-sm text-[#4edea3] font-semibold">180+ FPS Fluid</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Primary Arenas & Tier Dossiers -->
      <section class="w-full px-margin-mobile md:px-margin py-space-lg max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <span class="font-label-mono text-label-mono text-blue-400 tracking-widest uppercase font-semibold">Primary Arenas</span>
            <h2 class="font-headline-lg text-headline-lg text-[#f8fafc] mt-space-xs font-bold">Dominance Hub &amp; Main Profiles</h2>
          </div>
          <div class="text-slate-400 font-body-sm text-body-sm flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>Displaying 3 active competitive rosters</span>
          </div>
        </div>

        <!-- 3 Primary Arena Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          <!-- Card 1: Valorant -->
          <div class="group relative flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/30 overflow-hidden">
            <div class="relative h-56 w-full overflow-hidden bg-slate-950">
              <img
                :src="'/images/showcase-gaming-rig.jpg'"
                alt="Valorant Setup"
                @error="onImgError"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
              
              <!-- Rank Badge -->
              <div class="absolute top-space-md left-space-md flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080c14]/90 backdrop-blur-md text-blue-300 border border-blue-500/30 text-xs font-semibold">
                <span class="material-symbols-outlined text-[16px]">military_tech</span>
                <span class="font-label-mono tracking-wide">IMMORTAL 3</span>
              </div>
              <div class="absolute top-space-md right-space-md px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 font-label-mono text-xs border border-white/5">
                Peak: Radiant
              </div>
              <div class="absolute bottom-space-sm left-space-md">
                <span class="font-label-mono text-xs text-blue-400 uppercase tracking-wider font-semibold">Tactical 5v5</span>
                <h3 class="font-headline-md text-headline-md text-white font-bold">Valorant</h3>
              </div>
            </div>

            <!-- Content Body -->
            <div class="p-space-md md:p-space-lg flex-1 flex flex-col justify-between">
              <div class="space-y-space-md">
                <div class="p-3 rounded-xl bg-slate-950/80 flex items-center justify-between border border-slate-800">
                  <span class="font-label-md text-label-md text-slate-400">Signature Mains</span>
                  <span class="font-body-md text-white font-semibold">Sova &amp; Reyna</span>
                </div>
                <div class="grid grid-cols-3 gap-2 text-center py-space-xs">
                  <div class="p-space-sm rounded-lg bg-slate-950 border border-slate-800">
                    <p class="font-headline-sm text-headline-sm text-blue-400 font-bold">4.2K</p>
                    <p class="font-label-mono text-xs text-slate-400 mt-1">K/D Ratio</p>
                  </div>
                  <div class="p-space-sm rounded-lg bg-slate-950 border border-slate-800">
                    <p class="font-headline-sm text-headline-sm text-slate-200 font-bold">60%</p>
                    <p class="font-label-mono text-xs text-slate-400 mt-1">Headshot %</p>
                  </div>
                  <div class="p-space-sm rounded-lg bg-slate-950 border border-slate-800">
                    <p class="font-headline-sm text-headline-sm text-[#4edea3] font-bold">300+</p>
                    <p class="font-label-mono text-xs text-slate-400 mt-1">Comms Wins</p>
                  </div>
                </div>
              </div>
              <div class="mt-space-md pt-space-sm border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-label-mono">
                <span>FPS: 240+ Hz Synced</span>
                <span class="text-blue-400 font-semibold">NVIDIA Reflex Low Latency</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Free Fire MAX -->
          <div class="group relative flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/30 overflow-hidden">
            <div class="relative h-56 w-full overflow-hidden bg-slate-950">
              <img
                :src="'/images/showcase-bollywood-music.jpg'"
                alt="Free Fire MAX Setup"
                @error="onImgError"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
              
              <div class="absolute top-space-md left-space-md flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080c14]/90 backdrop-blur-md text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                <span class="material-symbols-outlined text-[16px]">military_tech</span>
                <span class="font-label-mono tracking-wide">GRANDMASTER</span>
              </div>
              <div class="absolute top-space-md right-space-md px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 font-label-mono text-xs border border-white/5">
                Season 41
              </div>
              <div class="absolute bottom-space-sm left-space-md">
                <span class="font-label-mono text-xs text-indigo-400 uppercase tracking-wider font-semibold">Fast Battle Royale</span>
                <h3 class="font-headline-md text-headline-md text-white font-bold">Free Fire MAX</h3>
              </div>
            </div>

            <div class="p-space-md md:p-space-lg flex-1 flex flex-col justify-between">
              <div class="space-y-space-md">
                <div class="p-3 rounded-xl bg-slate-950/80 flex items-center justify-between border border-slate-800">
                  <span class="font-label-md text-label-md text-slate-400">Weapons</span>
                  <span class="font-body-md text-white font-semibold">Woodpecker • M590</span>
                </div>
                <div class="grid grid-cols-3 gap-2 text-center py-space-xs">
                  <div class="p-space-sm rounded-lg bg-slate-950 border border-slate-800">
                    <p class="font-headline-sm text-headline-sm text-indigo-400 font-bold">90%</p>
                    <p class="font-label-mono text-xs text-slate-400 mt-1">CS Winrate</p>
                  </div>
                  <div class="p-space-sm rounded-lg bg-slate-950 border border-slate-800">
                    <p class="font-headline-sm text-headline-sm text-slate-200 font-bold">4500+</p>
                    <p class="font-label-mono text-xs text-slate-400 mt-1">Avg Damage</p>
                  </div>
                  <div class="p-space-sm rounded-lg bg-slate-950 border border-slate-800">
                    <p class="font-headline-sm text-headline-sm text-[#4edea3] font-bold">5K+</p>
                    <p class="font-label-mono text-xs text-slate-400 mt-1">Booyahs</p>
                  </div>
                </div>
              </div>
              <div class="mt-space-md pt-space-sm border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-label-mono">
                <span>FPS: 120Hz Ultra</span>
                <span class="text-indigo-400 font-semibold">Aggressive Sniper Spec</span>
              </div>
            </div>
          </div>

          <!-- Card 3: GTA V & FiveM -->
          <div class="group relative flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#4edea3]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/30 overflow-hidden">
            <div class="relative h-56 w-full overflow-hidden bg-slate-950">
              <img
                :src="'/images/showcase-cinema-2026.jpg'"
                alt="GTA V Setup"
                @error="onImgError"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
              
              <div class="absolute top-space-md left-space-md flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080c14]/90 backdrop-blur-md text-[#4edea3] border border-[#4edea3]/30 text-xs font-semibold">
                <span class="material-symbols-outlined text-[16px]">paid</span>
                <span class="font-label-mono tracking-wide">VIP MASTERMIND</span>
              </div>
              <div class="absolute top-space-md right-space-md px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 font-label-mono text-xs border border-white/5">
                FiveM RP
              </div>
              <div class="absolute bottom-space-sm left-space-md">
                <span class="font-label-mono text-xs text-[#4edea3] uppercase tracking-wider font-semibold">Open World Syndicate</span>
                <h3 class="font-headline-md text-headline-md text-white font-bold">GTA V &amp; FiveM</h3>
              </div>
            </div>

            <div class="p-space-md md:p-space-lg flex-1 flex flex-col justify-between">
              <div class="space-y-space-md">
                <div class="p-3 rounded-xl bg-slate-950/80 flex items-center justify-between border border-slate-800">
                  <span class="font-label-md text-label-md text-slate-400">Empire Net Worth</span>
                  <span class="font-body-md text-[#4edea3] font-semibold">$85,000,000+</span>
                </div>
                <div class="grid grid-cols-3 gap-2 text-center py-space-xs">
                  <div class="p-space-sm rounded-lg bg-slate-950 border border-slate-800">
                    <p class="font-headline-sm text-headline-sm text-[#4edea3] font-bold">500+</p>
                    <p class="font-label-mono text-xs text-slate-400 mt-1">Hours Logged</p>
                  </div>
                  <div class="p-space-sm rounded-lg bg-slate-950 border border-slate-800">
                    <p class="font-headline-sm text-headline-sm text-slate-200 font-bold">100%</p>
                    <p class="font-label-mono text-xs text-slate-400 mt-1">Heists Clear</p>
                  </div>
                  <div class="p-space-sm rounded-lg bg-slate-950 border border-slate-800">
                    <p class="font-headline-sm text-headline-sm text-blue-400 font-bold">144</p>
                    <p class="font-label-mono text-xs text-slate-400 mt-1">Ultra FPS</p>
                  </div>
                </div>
              </div>
              <div class="mt-space-md pt-space-sm border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-label-mono">
                <span>Graphics: NaturalVision</span>
                <span class="text-[#4edea3] font-semibold">Custom RP Modpack</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Hardware Rig Specifications & Benchmark Suite -->
      <section class="w-full px-margin-mobile md:px-margin py-space-lg max-w-7xl mx-auto">
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-space-lg md:p-space-xl shadow-xl">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
            <div>
              <span class="font-label-mono text-xs text-blue-400 uppercase tracking-widest font-semibold">Battlestation Hardware</span>
              <h2 class="font-headline-lg text-headline-lg text-white font-bold mt-1">Ayush Rig Specifications</h2>
              <p class="font-body-sm text-slate-400">Calibrated for zero input lag, 240Hz competitive esports and 4K ray-traced AAA gaming.</p>
            </div>

            <!-- Resolution Selector Tabs -->
            <div class="flex items-center gap-1.5 p-1 rounded-full bg-slate-950 border border-slate-800">
              <button
                v-for="res in ['1080p Ultra', '1440p High', '4K Cinematic']"
                :key="res"
                @click="selectedResolution = res"
                :class="selectedResolution === res ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-slate-400 hover:text-white'"
                class="px-3.5 py-1.5 rounded-full text-xs font-label-mono transition-all cursor-pointer"
              >
                {{ res }}
              </button>
            </div>
          </div>

          <!-- Specs Matrix -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-space-md mb-space-xl">
            <div class="p-space-md rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <span class="font-label-mono text-xs text-slate-400">PROCESSOR</span>
              <p class="font-headline-sm text-white font-bold mt-1">Ryzen 7 7800X3D</p>
              <span class="text-xs text-blue-400 font-label-mono">8 Cores • 3D V-Cache</span>
            </div>
            <div class="p-space-md rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <span class="font-label-mono text-xs text-slate-400">GRAPHICS ENGINE</span>
              <p class="font-headline-sm text-white font-bold mt-1">RTX 4070 Ti Super</p>
              <span class="text-xs text-indigo-400 font-label-mono">16GB GDDR6X • DLSS 3.5</span>
            </div>
            <div class="p-space-md rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <span class="font-label-mono text-xs text-slate-400">MEMORY</span>
              <p class="font-headline-sm text-white font-bold mt-1">32GB DDR5</p>
              <span class="text-xs text-[#4edea3] font-label-mono">6000MHz Dual Channel</span>
            </div>
            <div class="p-space-md rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <span class="font-label-mono text-xs text-slate-400">DISPLAY</span>
              <p class="font-headline-sm text-white font-bold mt-1">240Hz Fast-IPS</p>
              <span class="text-xs text-amber-400 font-label-mono">0.5ms Response Time</span>
            </div>
          </div>

          <!-- Games Benchmark Grid from gamesData.js -->
          <div>
            <div class="flex items-center justify-between mb-space-sm">
              <h3 class="font-headline-sm text-white font-semibold">Real-Time Benchmark Telemetry ({{ selectedResolution }})</h3>
              <span class="font-label-mono text-xs text-slate-400">Tested Across 12 AAA Titles</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-sm">
              <div
                v-for="g in benchmarkGames"
                :key="g.id"
                class="p-space-sm rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
              >
                <div class="min-w-0 pr-2">
                  <p class="font-title-md text-sm text-white font-medium truncate">{{ g.name }}</p>
                  <p class="font-label-mono text-xs text-slate-400 truncate">{{ g.genre }}</p>
                </div>
                <div class="text-right shrink-0">
                  <span class="font-headline-sm text-base text-blue-400 font-bold">
                    {{ g.baseFps && g.baseFps[selectedResolution] ? g.baseFps[selectedResolution] + ' FPS' : (g.avgFps || '144 FPS') }}
                  </span>
                  <p class="font-label-mono text-[10px] text-[#4edea3]">Stable Frame</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { gamesData } from '../../data/gamesData.js';

const allGames = ref(gamesData || []);
const selectedResolution = ref('1080p Ultra');

const benchmarkGames = computed(() => {
  return allGames.value.slice(0, 12);
});

function onImgError(e) {
  e.currentTarget.src = '/images/showcase-gaming-rig.jpg';
}
</script>
