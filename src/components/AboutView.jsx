import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';

export default function AboutView({ onNavigate }) {
  const { siteContent } = useContent();
  const about = siteContent?.about || {};

  const [counters, setCounters] = useState({ gaming: 0, tracks: 0, movies: 0, reach: 0 });

  useEffect(() => {
    const targets = about.stats || { gaming: 10, tracks: 1500, movies: 800, reach: 50 };
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = Math.min(step / 30, 1);
      setCounters({
        gaming: Math.floor((targets.gaming ?? 10) * progress),
        tracks: Math.floor((targets.tracks ?? 1500) * progress),
        movies: Math.floor((targets.movies ?? 800) * progress),
        reach: Math.floor((targets.reach ?? 50) * progress),
      });
      if (progress >= 1) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [about.stats]);

  return (
    <div className="w-full text-[#f8fafc] font-sans pb-16">
      {/* Top Ambient Glow Scrim */}
      <div className="relative w-full">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute top-48 -right-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>
        </div>

        {/* Section 1: Hero Split (Ayush Spotlight) */}
        <section className="relative w-full px-4 md:px-12 pt-8 md:pt-12 pb-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Headshot with Cyber Frame */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative group w-full max-w-[400px]">
                {/* Outer Glow Halo */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-600/40 via-indigo-600/30 to-blue-400/30 opacity-70 blur-xl group-hover:opacity-100 transition duration-700"></div>

                {/* Frame Container */}
                <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-3 shadow-2xl backdrop-blur-xl">
                  <div className="relative overflow-hidden rounded-2xl aspect-square bg-slate-950">
                    <img
                      src="/images/hero-ayush.jpg"
                      alt="Portrait headshot of Ayush, creator & gamer"
                      className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{ objectPosition: 'center 18%' }}
                      onError={(e) => {
                        e.currentTarget.src = '/images/logo.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070a10]/80 via-transparent to-transparent"></div>
                  </div>

                  {/* Floating Status Chip */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-max px-4 py-2 rounded-full bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl shadow-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 -ml-2.5"></span>
                    <span className="text-xs font-semibold text-slate-200 tracking-wide uppercase font-sans">
                      Creator &amp; Gamer based in India
                    </span>
                  </div>
                </div>

                {/* Decorative Tag Behind */}
                <span className="absolute -top-6 -left-4 text-xs font-mono text-blue-500/40 tracking-widest uppercase select-none pointer-events-none hidden sm:block">
                  // PROFILE_ID: AYUSH-01
                </span>
              </div>
            </div>

            {/* Right: Introduction Copy & Philosophy */}
            <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span className="text-xs font-semibold uppercase tracking-wider">{about.badgeText || 'Meet The Architect'}</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#f8fafc] tracking-tight">
                {about.heading ? (
                  about.heading.includes('Ayush') ? (
                    <>
                      {about.heading.split('Ayush')[0]}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">Ayush</span>
                      {about.heading.split('Ayush')[1]}
                    </>
                  ) : (
                    about.heading
                  )
                ) : (
                  <>Hey, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">Ayush</span></>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                {about.subtitle || 'Where innovation meets creativity, and every digital experience opens new possibilities.'}
              </p>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="material-symbols-outlined">auto_awesome</span>
                  <h2 className="font-heading text-base font-bold uppercase tracking-wider text-slate-200">
                    {about.philosophyTitle || 'My Creative Philosophy'}
                  </h2>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {about.philosophyText || 'Creativity is the foundation of every meaningful digital experience. I believe in combining innovation, imagination, and thoughtful design to transform simple ideas into something extraordinary. Every detail matters, every idea has the power to inspire, and every experience opens the door to new possibilities. My goal is to create meaningful digital experiences that connect with people, spark curiosity, and leave a lasting impression.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-blue-900/30 hover:shadow-lg hover:shadow-blue-800/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Connect With Ayush</span>
                  <span className="material-symbols-outlined text-[18px]">east</span>
                </button>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200 text-sm font-semibold hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <span>View Curations</span>
                  <span className="material-symbols-outlined text-[18px]">folder_special</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Four Key Metric Counters */}
        <section className="w-full px-4 md:px-12 py-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="relative overflow-hidden p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md group hover:bg-slate-800/80 hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="material-symbols-outlined text-blue-400 text-[28px]">sports_esports</span>
                <span className="text-xs font-mono font-bold text-blue-400">ACTIVE</span>
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
                {counters.gaming}+
              </div>
              <p className="text-xs text-slate-400 mt-1">Years of gaming &amp; esports dedication</p>
            </div>

            {/* Stat 2 */}
            <div className="relative overflow-hidden p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md group hover:bg-slate-800/80 hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="material-symbols-outlined text-indigo-400 text-[28px]">library_music</span>
                <span className="text-xs font-mono font-bold text-indigo-400">HI-RES</span>
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
                {counters.tracks.toLocaleString()}+
              </div>
              <p className="text-xs text-slate-400 mt-1">Tracks across curated playlists</p>
            </div>

            {/* Stat 3 */}
            <div className="relative overflow-hidden p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md group hover:bg-slate-800/80 hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="material-symbols-outlined text-blue-400 text-[28px]">movie</span>
                <span className="text-xs font-mono font-bold text-blue-400">LOGGED</span>
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
                {counters.movies}+
              </div>
              <p className="text-xs text-slate-400 mt-1">Movies watched &amp; critiqued</p>
            </div>

            {/* Stat 4 */}
            <div className="relative overflow-hidden p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md group hover:bg-slate-800/80 hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="material-symbols-outlined text-indigo-400 text-[28px]">groups</span>
                <span className="text-xs font-mono font-bold text-indigo-400">REACH</span>
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
                {counters.reach}k+
              </div>
              <p className="text-xs text-slate-400 mt-1">Total community views &amp; engagements</p>
            </div>
          </div>
        </section>

        {/* Section 3: Deep Bio Narrative & Creative Roots */}
        {(() => {
          const story = about.story || {
            originTag: 'The Origin Story',
            originTitle: 'Roots, Rhythms & Reflexes',
            originText: 'Every journey begins with a passion, and mine brings together music, movies, and gaming. These interests inspire me to explore new ideas, discover creative experiences, and appreciate the stories, sounds, and challenges that make each world unique. Ayush Hub is a space where these passions come together, reflecting my curiosity, creativity, and enthusiasm for the digital world.',
            block1Title: 'Musical Genesis: Folk Beats to Flac Fidelity',
            block1Text: 'Music is a world of rhythm, emotion, and endless discovery. I enjoy exploring different genres, discovering memorable tracks, and creating playlists for different moods and moments. From energetic beats to relaxing melodies, every song offers a unique experience. Through Ayush Hub, I share my passion for music and celebrate the creativity that makes every track special.',
            block2Title: 'Cinematic Vision: Spectacle & Emotional Gravity',
            block2Text: 'Cinema brings together storytelling, emotions, creativity, and imagination. I enjoy exploring different films, discovering memorable characters, appreciating impressive visuals, and experiencing the stories that make each movie unique. From powerful performances to captivating soundtracks, every film offers something worth discovering. Through Ayush Hub, I celebrate the creativity and experiences that make cinema special.',
            block3Title: 'Esports Grit: Clutch Rounds & Lifelong Camaraderie',
            block3Text: 'Gaming is a world of strategy, creativity, teamwork, and exciting challenges. I enjoy exploring different games, discovering new ways to play, and appreciating the skill and dedication that make every match engaging. Whether it\'s the thrill of competition or the fun of learning something new, every gaming experience brings its own excitement. Through Ayush Hub, I celebrate gaming and the creativity that makes this world special.',
          };

          return (
            <section className="w-full px-4 md:px-12 py-12 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-4 space-y-3 sticky top-28">
                  <span className="text-xs font-semibold text-blue-400 tracking-widest uppercase">
                    {story.originTag || 'The Origin Story'}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#f8fafc]">
                    {story.originTitle || 'Roots, Rhythms & Reflexes'}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {story.originText}
                  </p>

                  {/* Visual Rhythm Bar Sparkline */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mt-4 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">
                      Creative Passion Index
                    </span>
                    <div className="flex items-end gap-1.5 h-16 pt-2">
                      <div className="w-full bg-blue-600/40 rounded-t-sm h-[45%]"></div>
                      <div className="w-full bg-blue-500/60 rounded-t-sm h-[70%]"></div>
                      <div className="w-full bg-indigo-500 rounded-t-sm h-[90%]"></div>
                      <div className="w-full bg-blue-600 rounded-t-sm h-[65%]"></div>
                      <div className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-sm h-[100%] shadow-[0_0_12px_rgba(37,99,235,0.5)]"></div>
                      <div className="w-full bg-blue-400 rounded-t-sm h-[85%]"></div>
                      <div className="w-full bg-indigo-600 rounded-t-sm h-[95%]"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 pt-1 font-mono">
                      <span>Audiophile</span>
                      <span>Cinema</span>
                      <span>Esports</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  {/* Story Block 1 */}
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition duration-300 space-y-2 shadow-md">
                    <div className="flex items-center gap-3 text-indigo-400">
                      <span className="material-symbols-outlined text-[26px]">headphones</span>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-[#f8fafc]">
                        {story.block1Title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {story.block1Text}
                    </p>
                  </div>

                  {/* Story Block 2 */}
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition duration-300 space-y-2 shadow-md">
                    <div className="flex items-center gap-3 text-blue-400">
                      <span className="material-symbols-outlined text-[26px]">theaters</span>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-[#f8fafc]">
                        {story.block2Title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {story.block2Text}
                    </p>
                  </div>

                  {/* Story Block 3 */}
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition duration-300 space-y-2 shadow-md">
                    <div className="flex items-center gap-3 text-indigo-400">
                      <span className="material-symbols-outlined text-[26px]">videogame_asset</span>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-[#f8fafc]">
                        {story.block3Title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {story.block3Text}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

        {/* Section 4: Timeline / Milestones */}
        <section className="w-full px-4 md:px-12 py-12 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Chronicles</span>
            <h2 className="font-heading text-3xl font-bold text-[#f8fafc]">The Journey So Far</h2>
            <p className="text-sm text-slate-400">A journey of creativity, passion, and the interests that inspired Ayush Hub.</p>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-indigo-500 before:to-blue-600">
            {/* Milestone 1 */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></div>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition duration-300 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-bold text-blue-400 font-mono">2016</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400">Gaming Beginnings</span>
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-[#f8fafc] mb-1">
                  The Beginning of My Gaming Journey
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Every great journey begins with curiosity and passion. This early stage of my gaming journey reflects my growing interest in competitive play, strategic thinking, and the excitement of interactive worlds.
                </p>
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform"></div>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition duration-300 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-bold text-indigo-400 font-mono">2019</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400">Music Discovery</span>
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-[#f8fafc] mb-1">
                  Exploring Bollywood &amp; Punjabi Music
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Music became an exciting way to explore different moods, rhythms, and musical styles. This chapter reflects my appreciation for Bollywood melodies, Punjabi beats, and the creativity of bringing diverse sounds together.
                </p>
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></div>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition duration-300 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-bold text-blue-400 font-mono">2022</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400">Rank</span>
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-[#f8fafc] mb-1">
                  Ranked Immortal 3 in Valorant &amp; Launched Cinema Review Threads
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Achieved tactical shooter peak performance while concurrently publishing in-depth movie breakdowns that accumulated hundreds of passionate community comments.
                </p>
              </div>
            </div>

            {/* Milestone 4 */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 group-hover:scale-125 transition-transform shadow-[0_0_12px_rgba(59,130,246,0.8)]"></div>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-blue-500/30 transition duration-300 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-bold text-blue-400 font-mono">2026</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">Present Nexus</span>
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-[#f8fafc] mb-1">
                  The Birth of Ayush Hub
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Ayush Hub was founded in 2026 as a personal space where my passion for music, movies, and gaming comes together. What started as an idea grew into a creative digital platform built to explore entertainment, discover new experiences, and share the things I love. Ayush Hub represents my creativity, curiosity, and vision for bringing different digital worlds together in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: The Pillars That Define Ayush Hub */}
        {(() => {
          const pillars = about.pillars || {
            badge: 'Selected Tastes',
            heading: 'The Pillars That Define Ayush Hub',
            subtitle: 'A blend of creative play, thoughtful reviews, and tech insights.',
            card1Title: 'Diljit Dosanjh & Arijit Singh',
            card1Sub: 'Urban Punjabi • Folk • Soulful Melodies',
            card2Title: 'Avengers: Endgame & RRR',
            card2Sub: 'Courage, friendship, and unity.',
            card3Title: 'VALORANT • Free Fire',
            card3Sub: 'Open-World Sandbox & Tactical FPS',
            card4Title: 'Complete PC setup',
            card4Sub: 'A practical workstation built for creating, editing, and smooth multitasking.',
          };

          return (
            <section className="w-full px-4 md:px-12 py-12 max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                    {pillars.badge || 'Selected Tastes'}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#f8fafc]">
                    {pillars.heading || 'The Pillars That Define Ayush Hub'}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
                  {pillars.subtitle || 'A blend of creative play, thoughtful reviews, and tech insights.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1: Artist */}
                <div 
                  onClick={() => onNavigate?.('music')}
                  className="relative overflow-hidden p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition-all duration-300 group shadow-md flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[26px]">mic</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 uppercase">Favorite Artists</span>
                      <h3 className="font-heading text-lg font-bold text-[#f8fafc] mt-1">
                        {pillars.card1Title}
                      </h3>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-slate-400">
                    <span className="text-xs">{pillars.card1Sub}</span>
                    <span className="material-symbols-outlined text-blue-400 text-[20px] group-hover:translate-x-1 transition-transform">music_note</span>
                  </div>
                </div>

                {/* Card 2: Movie */}
                <div 
                  onClick={() => onNavigate?.('movies')}
                  className="relative overflow-hidden p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition-all duration-300 group shadow-md flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[26px]">movie_filter</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 uppercase">Favorite Movies</span>
                      <h3 className="font-heading text-lg font-bold text-[#f8fafc] mt-1">
                        {pillars.card2Title}
                      </h3>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-slate-400">
                    <span className="text-xs">{pillars.card2Sub}</span>
                    <span className="material-symbols-outlined text-indigo-400 text-[20px] group-hover:translate-x-1 transition-transform">local_movies</span>
                  </div>
                </div>

                {/* Card 3: Game */}
                <div 
                  onClick={() => onNavigate?.('gaming')}
                  className="relative overflow-hidden p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition-all duration-300 group shadow-md flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[26px]">stadia_controller</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 uppercase">Favorite Games</span>
                      <h3 className="font-heading text-lg font-bold text-[#f8fafc] mt-1">
                        {pillars.card3Title}
                      </h3>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-slate-400">
                    <span className="text-xs">{pillars.card3Sub}</span>
                    <span className="material-symbols-outlined text-blue-400 text-[20px] group-hover:translate-x-1 transition-transform">play_circle</span>
                  </div>
                </div>

                {/* Card 4: Tech Gear */}
                <div 
                  onClick={() => onNavigate?.('services')}
                  className="relative overflow-hidden p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition-all duration-300 group shadow-md flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[26px]">desktop_windows</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 uppercase">Favorite Setup</span>
                      <h3 className="font-heading text-lg font-bold text-[#f8fafc] mt-1">
                        {pillars.card4Title}
                      </h3>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-slate-400">
                    <span className="text-xs">{pillars.card4Sub}</span>
                    <span className="material-symbols-outlined text-indigo-400 text-[20px] group-hover:translate-x-1 transition-transform">tune</span>
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

        {/* Section 6: Bottom Interactive CTA Box */}
        {(() => {
          const cta = about.cta || {
            badge: 'Open Invitations',
            title: "Let's Connect Over Shared Interests",
            subtitle: 'Have a favourite film to recommend, a playlist to share, or a game to discuss? Let\'s exchange ideas, discover new favourites, and connect over the things we enjoy.',
            btnText: 'Say Hello on Contact Page',
          };

          return (
            <section className="w-full px-4 md:px-12 py-8 max-w-5xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-10 shadow-2xl">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                      <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                      <span className="uppercase">{cta.badge || 'Open Invitations'}</span>
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#f8fafc]">
                      {cta.title || "Let's Connect Over Shared Interests"}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {cta.subtitle}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button
                      onClick={() => onNavigate?.('contact')}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-md shadow-blue-900/30 hover:shadow-lg hover:shadow-blue-800/40 hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <span>{cta.btnText || 'Say Hello on Contact Page'}</span>
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })()}
      </div>
    </div>
  );
}
