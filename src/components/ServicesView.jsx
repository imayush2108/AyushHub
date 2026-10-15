import React from 'react';

export default function ServicesView({ onNavigate }) {
  return (
    <div className="w-full text-[#f8fafc] font-sans pb-16">
      {/* Atmospheric Underlay Glow Layer (Sapphire Slate) */}
      <div className="relative w-full px-4 md:px-12 py-10 md:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-blue-600/10 blur-[130px] rounded-full"></div>
          <div className="pointer-events-none absolute top-96 -left-32 w-[380px] h-[380px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
          <div className="pointer-events-none absolute bottom-10 -right-32 w-[420px] h-[420px] bg-blue-500/10 blur-[130px] rounded-full"></div>
        </div>

        {/* Section Header */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center mb-12 md:mb-16">
          {/* Overline Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-sm shadow-blue-400"></span>
            <span className="text-xs font-semibold text-blue-400 tracking-widest uppercase">
              Entertainment Hub
            </span>
          </div>

          {/* Main Section Header */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#f8fafc] max-w-4xl">
            What's Inside{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">
              Ayush Hub
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mt-4 leading-relaxed font-sans">
            Discover the music, movies, and games I enjoy, all in one place. Explore my favorite entertainment picks, discover something new, and dive into the content that makes Ayush Hub unique.
          </p>

          {/* Metric Micro Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 md:mt-10 w-full max-w-4xl">
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-lg shadow-black/20 hover:border-slate-700 transition-all">
              <span className="font-heading text-2xl sm:text-3xl font-bold text-blue-400">240+</span>
              <span className="text-xs text-slate-400 mt-1 font-sans">Handpicked Playlists</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-lg shadow-black/20 hover:border-slate-700 transition-all">
              <span className="font-heading text-2xl sm:text-3xl font-bold text-indigo-400">250+</span>
              <span className="text-xs text-slate-400 mt-1 font-sans">Cinema Breakdowns</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-lg shadow-black/20 hover:border-slate-700 transition-all">
              <span className="font-heading text-2xl sm:text-3xl font-bold text-blue-400">50k+</span>
              <span className="text-xs text-slate-400 mt-1 font-sans">Gameplay Hours</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-lg shadow-black/20 hover:border-slate-700 transition-all">
              <span className="font-heading text-2xl sm:text-3xl font-bold text-sky-400">99.9%</span>
              <span className="text-xs text-slate-400 mt-1 font-sans">Vibe Satisfaction</span>
            </div>
          </div>
        </div>

        {/* 3-Column Bento Services Grid */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 md:mb-16">
          {/* Card 1: Music */}
          <div className="group relative flex flex-col justify-between rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40">
            <div className="flex flex-col">
              {/* Card Visual Anchor */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6 bg-slate-800/60 border border-slate-800">
                <img
                  src="/images/showcase-bollywood-music.jpg"
                  alt="Dark neon aesthetic music studio setup"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                {/* Category Chip Floating */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                    Sound &amp; Audio
                  </span>
                </div>
                {/* Icon Badge */}
                <div className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-md flex items-center justify-center text-blue-400 shadow-md">
                  <span className="material-symbols-outlined text-[24px]">headphones</span>
                </div>
              </div>

              {/* Section Typography */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Music Curation &amp; Playlists
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-[#f8fafc] mb-2 group-hover:text-blue-400 transition-colors">
                Music That Moves Me
              </h2>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Discover the music I enjoy, explore featured tracks, and listen to handpicked songs from different artists and genres.
              </p>

              {/* Feature List */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">Handpicked Hindi &amp; Punjabi songs I truly love</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">Tracks I keep coming back to</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">Picks that match my mood, every time</span>
                </div>
              </div>
            </div>

            {/* Button Action */}
            <button
              onClick={() => onNavigate?.('music')}
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-slate-200 hover:text-white text-sm font-semibold border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-blue-900/30"
            >
              <span>Explore Music Page</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Card 2: Cinema */}
          <div className="group relative flex flex-col justify-between rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40">
            <div className="flex flex-col">
              {/* Card Visual Anchor */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6 bg-slate-800/60 border border-slate-800">
                <img
                  src="/images/showcase-cinema-2026.jpg"
                  alt="Cinematic wide-angle film reel setup"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                {/* Category Chip Floating */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                    Cinema &amp; Series
                  </span>
                </div>
                {/* Icon Badge */}
                <div className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-md flex items-center justify-center text-indigo-400 shadow-md">
                  <span className="material-symbols-outlined text-[24px]">movie</span>
                </div>
              </div>

              {/* Section Typography */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  Film Analysis &amp; Recommendations
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-[#f8fafc] mb-2 group-hover:text-indigo-400 transition-colors">
                Films That Stay With Me
              </h2>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                In-depth breakdowns of Bollywood blockbusters, South Indian cinema, Marvel movies, OTT picks, and anime, all in one place.
              </p>

              {/* Feature List */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">Honest, spoiler-free movie reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">Live watch-parties and streaming recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">Anime picks worth your time</span>
                </div>
              </div>
            </div>

            {/* Button Action */}
            <button
              onClick={() => onNavigate?.('movies')}
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-slate-200 hover:text-white text-sm font-semibold border border-slate-700 hover:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-blue-900/30"
            >
              <span>Explore Movies Page</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Card 3: Gaming (Unchanged) */}
          <div className="group relative flex flex-col justify-between rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40">
            <div className="flex flex-col">
              {/* Card Visual Anchor */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6 bg-slate-800/60 border border-slate-800">
                <img
                  src="/images/showcase-gaming-rig.jpg"
                  alt="High performance esports battle station"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                {/* Category Chip Floating */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                    Gaming &amp; Esports
                  </span>
                </div>
                {/* Icon Badge */}
                <div className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-md flex items-center justify-center text-blue-400 shadow-md">
                  <span className="material-symbols-outlined text-[24px]">sports_esports</span>
                </div>
              </div>

              {/* Section Typography */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Gaming Hub &amp; Squad Sessions
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-[#f8fafc] mb-2 group-hover:text-blue-400 transition-colors">
                Live Streams, Guides &amp; Squad Matchups
              </h2>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                High-intensity gameplay, rank push sessions in Valorant, Free Fire tournaments, and chaotic GTA 5 roleplay moments.
              </p>

              {/* Feature List */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">Valorant competitive lineups</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">Free Fire headshot sensitivity configs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">Community custom rooms</span>
                </div>
              </div>
            </div>

            {/* Button Action */}
            <button
              onClick={() => onNavigate?.('gaming')}
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-slate-200 hover:text-white text-sm font-semibold border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-blue-900/30"
            >
              <span>Explore Gaming Page</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Interactive Experience Timeline / Workflow */}
        <div className="relative z-10 max-w-7xl mx-auto rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-6 md:p-10 mb-12 md:mb-16 shadow-lg shadow-black/20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-blue-400 tracking-widest uppercase">
                From Idea to Session
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#f8fafc] mt-1">
                How It Works
              </h3>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              A simple process to get us jamming, watching, or gaming together, wherever you like to hang out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-800 backdrop-blur-md hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-lg flex items-center justify-center mb-4 font-semibold font-mono">
                01
              </div>
              <h4 className="font-heading text-lg font-bold text-[#f8fafc] mb-1">Getting to Know Your Vibe</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                We chat about what you're into, music, movies, or games, so I know exactly what to bring to the session.
              </p>
            </div>
            {/* Step 2 */}
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-800 backdrop-blur-md hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-lg flex items-center justify-center mb-4 font-semibold font-mono">
                02
              </div>
              <h4 className="font-heading text-lg font-bold text-[#f8fafc] mb-1">Live Stream or Co-Op</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                We jump on a live session together, Discord audio for music, or a synced watch-party for movies and gaming co-op.
              </p>
            </div>
            {/* Step 3 */}
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-800 backdrop-blur-md hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-lg flex items-center justify-center mb-4 font-semibold font-mono">
                03
              </div>
              <h4 className="font-heading text-lg font-bold text-[#f8fafc] mb-1">Recap &amp; Highlights</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                After the session, I send you the final playlist, highlight clips, or review notes straight to your feed.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Collaboration Callout Banner */}
        <div className="relative z-10 max-w-5xl mx-auto overflow-hidden rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-10 shadow-lg shadow-black/30">
          <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/15 blur-[100px] rounded-full"></div>
          <div className="pointer-events-none absolute -left-20 -top-20 w-80 h-80 bg-indigo-600/15 blur-[100px] rounded-full"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
                <span className="material-symbols-outlined text-[16px]">electric_bolt</span>
                <span>Let's Collaborate</span>
              </div>
              <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-[#f8fafc] leading-tight">
                Let's Vibe Together
              </h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Whether it's jamming over music, swapping movie recommendations, or teaming up for a match, let's connect.
              </p>
            </div>
            <div className="shrink-0">
              <button
                onClick={() => onNavigate?.('contact')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-md shadow-blue-900/30 hover:shadow-lg hover:shadow-blue-800/40 hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                <span>Get in Touch</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
