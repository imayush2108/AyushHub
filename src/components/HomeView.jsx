import React from 'react';
import { useContent } from '../context/ContentContext';

export default function HomeView({ setActivePage, onNavigate }) {
  const { siteContent, stats } = useContent();
  const hero = siteContent?.hero || {};

  const navigate = onNavigate || setActivePage;
  const handleNav = (id, e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = id;
  };

  return (
    <div className="w-full text-[#dfe2ee]">
      {/* Dynamic Atmospheric Glows */}
      <div className="relative w-full">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[680px] h-[440px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"></div>
          <div className="absolute top-96 -left-48 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute top-[680px] -right-36 w-[450px] h-[450px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none"></div>
        </div>

        {/* HERO SECTION */}
        <section className="relative w-full px-margin-mobile md:px-margin pt-space-lg md:pt-space-xl pb-16 md:pb-28 flex flex-col items-center text-center max-w-7xl mx-auto">
          {/* Floating Spatial Emblem Frame */}
          <div 
            onClick={(e) => handleNav('about', e)}
            className="relative mb-space-lg group cursor-pointer"
          >
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-600/50 via-indigo-500/40 to-blue-400/30 opacity-75 blur-xl group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full bg-slate-900 border-2 border-blue-500/50 shadow-2xl shadow-blue-950/60 p-1 flex items-center justify-center backdrop-blur-xl overflow-hidden">
              <img
                alt="Ayush Portrait"
                className="w-full h-full object-cover rounded-full shadow-inner group-hover:scale-105 transition-transform duration-300 ring-2 ring-blue-400/40"
                style={{ objectPosition: 'center 18%' }}
                src={hero.portraitUrl || '/images/hero-ayush.jpg'}
                onError={(e) => { e.currentTarget.src = '/images/about-ayush.jpg'; }}
              />
            </div>
            <span className="absolute bottom-1 right-1 flex h-7 w-7">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-7 w-7 bg-blue-600 text-white items-center justify-center font-bold text-[11px] shadow-lg shadow-blue-900/60 ring-2 ring-slate-900">
                <span className="material-symbols-outlined text-[15px]">bolt</span>
              </span>
            </span>
          </div>

          {/* Overline Meta Tag */}
          <div className="inline-flex items-center gap-space-xs px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md mb-space-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-sm shadow-blue-400 animate-pulse"></span>
            <span className="font-label-sm text-label-sm tracking-wide text-blue-400 font-semibold">
              {hero.eyebrow || 'Hello, I’m Ayush'}
            </span>
          </div>

          {/**/}
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-[#f8fafc] max-w-4xl tracking-tight mb-space-md font-bold">
            {hero.heading ? (
              hero.heading.includes('Ayush Hub') ? (
                <>
                  {hero.heading.split('Ayush Hub')[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">Ayush Hub</span>
                  {hero.heading.split('Ayush Hub')[1]}
                </>
              ) : (
                hero.heading
              )
            ) : (
              <>Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">Ayush Hub</span></>
            )}
          </h1>

          {/**/}
          <p className="font-body-lg text-body-lg text-slate-400 max-w-2xl mb-space-xl leading-relaxed">
            {hero.subtitle || 'A personal space for music, movies, gaming, and the digital content I enjoy and create.'}
          </p>

          {/**/}
          <div className="flex flex-col sm:flex-row items-center gap-space-md w-full justify-center max-w-md mb-space-xl">
            <a
              href={`#${hero.ctaExploreLink || 'services'}`}
              onClick={(e) => handleNav(hero.ctaExploreLink || 'services', e)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold font-label-md text-label-md shadow-md shadow-blue-900/30 hover:shadow-lg hover:shadow-blue-800/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span>{hero.ctaExploreText || 'Explore My World'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              href={`#${hero.ctaAboutLink || 'about'}`}
              onClick={(e) => handleNav(hero.ctaAboutLink || 'about', e)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-8 py-3.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200 font-label-md text-label-md backdrop-blur-md hover:bg-slate-800 hover:text-white hover:border-slate-600 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span>{hero.ctaAboutText || 'About Ayush'}</span>
            </a>
          </div>

          {/**/}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md w-full max-w-3xl">
            <div 
              onClick={(e) => handleNav('music', e)}
              className="group relative overflow-hidden rounded-xl bg-slate-900/80 border border-slate-800 p-space-md backdrop-blur-xl shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-blue-950/20 flex items-center justify-center gap-space-sm cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[22px]">queue_music</span>
              </div>
              <div className="text-left">
                <p className="font-headline-sm text-headline-sm text-[#f8fafc] font-bold">{stats.publishedSongs || '50+'}</p>
                <p className="font-label-sm text-label-sm text-slate-400">Handpicked Tracks</p>
              </div>
            </div>

            <div 
              onClick={(e) => handleNav('movies', e)}
              className="group relative overflow-hidden rounded-xl bg-slate-900/80 border border-slate-800 p-space-md backdrop-blur-xl shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-indigo-950/20 flex items-center justify-center gap-space-sm cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[22px]">movie</span>
              </div>
              <div className="text-left">
                <p className="font-headline-sm text-headline-sm text-[#f8fafc] font-bold">{stats.publishedMovies || '25+'}</p>
                <p className="font-label-sm text-label-sm text-slate-400">Reviewed Films</p>
              </div>
            </div>

            <div 
              onClick={(e) => handleNav('gaming', e)}
              className="group relative overflow-hidden rounded-xl bg-slate-900/80 border border-slate-800 p-space-md backdrop-blur-xl shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-blue-950/20 flex items-center justify-center gap-space-sm cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[22px]">sports_esports</span>
              </div>
              <div className="text-left">
                <p className="font-headline-sm text-headline-sm text-[#f8fafc] font-bold">500+</p>
                <p className="font-label-sm text-label-sm text-slate-400">Gaming Hours</p>
              </div>
            </div>
          </div>
        </section>

        {/* EXPLORE THE HUB SECTION / BENTO GRID */}
        <section className="w-full px-margin-mobile md:px-margin py-space-xl bg-[#0d131f]/60 backdrop-blur-md border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto">
            {/**/}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-sm">
              <div>
                <div className="inline-flex items-center gap-2 mb-space-xs">
                  <span className="material-symbols-outlined text-blue-400 text-[20px]">explore</span>
                  <span className="font-label-sm text-label-sm tracking-widest uppercase text-blue-400 font-semibold">
                    Discover More
                  </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-[#f8fafc] font-bold">Explore The Hub</h2>
                <p className="font-body-md text-body-md text-slate-400 mt-1">Everything I enjoy, all in one place</p>
              </div>
              <div className="hidden md:flex items-center gap-space-xs text-slate-400 font-label-md text-label-md">
                <span>Active Nodes</span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                <span className="text-slate-200">6 Portals Live</span>
              </div>
            </div>

            {/* Dynamic Channel Cards */}
            {(() => {
              const bento = siteContent?.homeBento || {};
              const musicCard = bento.musicCard || {
                tag: 'Music Zone',
                title: 'Bollywood & Punjabi Beats',
                desc: 'Top chart selections, high-tempo Punjabi anthems, and soulful midnight Bollywood melodies curated with pristine lossless acoustic balance.',
                image: '/images/showcase-bollywood-music.jpg',
                btnText: 'Listen Now',
              };
              const cinemaCard = bento.cinemaCard || {
                tag: 'Cinema World',
                title: 'Cinema: Bollywood, South & Marvel',
                desc: 'In-depth film reviews, honest ratings, and 4K YouTube trailers for Kalki 2898 AD, RRR, Avengers, 3 Idiots, and Spider-Verse.',
                image: '/images/showcase-cinema-2026.jpg',
                btnText: 'Explore Films',
              };
              const gamingCard = bento.gamingCard || {
                tag: 'Game On',
                title: 'Gaming Realm & Benchmarks',
                desc: 'Immortal 3 Valorant tactical clutch highlights, Grandmaster Free Fire MAX stats, GTA V heists, and battlestation FPS benchmark estimates.',
                image: '/images/showcase-gaming-rig.jpg',
                btnText: 'Enter Arena',
              };
              const behindHub = bento.behindHub || {
                title: 'Behind Ayush Hub',
                subtitle: 'Know the person behind the hub',
                btnText: 'Know More',
              };
              const instantDrops = bento.instantDrops || {
                title: 'Join the Instant Drops',
                subtitle: 'Get notified for real-time live music sessions & watchalongs',
                discordUrl: siteContent?.socialLinks?.discord || 'https://discord.com/users/imayush2108',
                whatsappUrl: siteContent?.socialLinks?.whatsapp ? `https://wa.me/${siteContent.socialLinks.whatsapp.replace(/[^0-9]/g, '')}` : 'https://wa.me/919508678989',
              };

              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-lg">
                    {/* Card 1: Music */}
                    <div 
                      onClick={(e) => handleNav('music', e)}
                      className="group relative rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 backdrop-blur-xl p-space-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40 min-h-[360px] cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-space-md">
                          <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-label-sm text-label-sm font-semibold">
                            {musicCard.tag || 'Music Zone'}
                          </span>
                          <span className="material-symbols-outlined text-indigo-400 animate-pulse text-[26px]">
                            graphic_eq
                          </span>
                        </div>
                        <div className="relative w-full h-36 rounded-lg overflow-hidden mb-space-md bg-slate-800/60 border border-slate-800">
                          <img 
                            src={musicCard.image || '/images/showcase-bollywood-music.jpg'} 
                            alt={musicCard.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            onError={(e) => { e.currentTarget.src = '/images/logo.jpg'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-[#f8fafc] group-hover:text-indigo-400 transition-colors mb-2 font-semibold">
                          {musicCard.title}
                        </h3>
                        <p className="font-body-sm text-body-sm text-slate-400 leading-relaxed line-clamp-3">
                          {musicCard.desc}
                        </p>
                      </div>
                      <div className="pt-space-md mt-space-md border-t border-slate-800/50">
                        <span className="inline-flex items-center gap-space-xs font-label-md text-label-md text-indigo-400 group-hover:text-indigo-300 transition-colors font-medium">
                          <span>{musicCard.btnText || 'Listen Now'}</span>
                          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                        </span>
                      </div>
                    </div>

                    {/* Card 2: Cinema */}
                    <div 
                      onClick={(e) => handleNav('movies', e)}
                      className="group relative rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 backdrop-blur-xl p-space-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40 min-h-[360px] cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-space-md">
                          <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-label-sm text-label-sm font-semibold">
                            {cinemaCard.tag || 'Cinema World'}
                          </span>
                          <span className="material-symbols-outlined text-rose-400 text-[26px]">
                            theaters
                          </span>
                        </div>
                        <div className="relative w-full h-36 rounded-lg overflow-hidden mb-space-md bg-slate-800/60 border border-slate-800">
                          <img 
                            src={cinemaCard.image || '/images/showcase-cinema-2026.jpg'} 
                            alt={cinemaCard.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            onError={(e) => { e.currentTarget.src = '/images/logo.jpg'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-[#f8fafc] group-hover:text-rose-400 transition-colors mb-2 font-semibold">
                          {cinemaCard.title}
                        </h3>
                        <p className="font-body-sm text-body-sm text-slate-400 leading-relaxed line-clamp-3">
                          {cinemaCard.desc}
                        </p>
                      </div>
                      <div className="pt-space-md mt-space-md border-t border-slate-800/50">
                        <span className="inline-flex items-center gap-space-xs font-label-md text-label-md text-rose-400 group-hover:text-rose-300 transition-colors font-medium">
                          <span>{cinemaCard.btnText || 'Explore Films'}</span>
                          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                        </span>
                      </div>
                    </div>

                    {/* Card 3: Gaming */}
                    <div 
                      onClick={(e) => handleNav('gaming', e)}
                      className="group relative rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 backdrop-blur-xl p-space-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40 min-h-[360px] cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-space-md">
                          <span className="px-3 py-1 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/20 text-[#4edea3] font-label-sm text-label-sm font-semibold">
                            {gamingCard.tag || 'Game On'}
                          </span>
                          <span className="material-symbols-outlined text-[#4edea3] text-[26px]">
                            sports_esports
                          </span>
                        </div>
                        <div className="relative w-full h-36 rounded-lg overflow-hidden mb-space-md bg-slate-800/60 border border-slate-800">
                          <img 
                            src={gamingCard.image || '/images/showcase-gaming-rig.jpg'} 
                            alt={gamingCard.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            onError={(e) => { e.currentTarget.src = '/images/logo.jpg'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-[#f8fafc] group-hover:text-[#4edea3] transition-colors mb-2 font-semibold">
                          {gamingCard.title}
                        </h3>
                        <p className="font-body-sm text-body-sm text-slate-400 leading-relaxed line-clamp-3">
                          {gamingCard.desc}
                        </p>
                      </div>
                      <div className="pt-space-md mt-space-md border-t border-slate-800/50">
                        <span className="inline-flex items-center gap-space-xs font-label-md text-label-md text-[#4edea3] group-hover:text-emerald-300 transition-colors font-medium">
                          <span>{gamingCard.btnText || 'Enter Arena'}</span>
                          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Behind the Hub & Admin Quick Link */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-xl">
                    <div 
                      onClick={(e) => handleNav('about', e)}
                      className="rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-space-md md:p-space-lg flex items-center justify-between gap-space-md cursor-pointer transition-all hover:bg-slate-850"
                    >
                      <div className="flex items-center gap-space-md min-w-0">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shrink-0 overflow-hidden">
                          <img 
                            src={hero.portraitUrl || '/images/hero-ayush.jpg'} 
                            alt="Ayush Shrivastava" 
                            className="w-full h-full rounded-full object-cover" 
                            style={{ objectPosition: 'center 18%' }}
                            onError={(e) => { e.currentTarget.src = '/images/logo.jpg'; }}
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-headline-sm text-headline-sm font-bold text-white truncate">{behindHub.title || 'Behind Ayush Hub'}</span>
                          <span className="font-body-sm text-body-sm text-slate-400 truncate">{behindHub.subtitle || 'Know the person behind the hub'}</span>
                        </div>
                      </div>
                      <span className="shrink-0 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white font-label-md text-label-md font-medium">
                        {behindHub.btnText || 'Know More'}
                      </span>
                    </div>

                    <div 
                      onClick={(e) => handleNav('admin', e)}
                      className="rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-space-md md:p-space-lg flex items-center justify-between gap-space-md cursor-pointer transition-all hover:bg-slate-850"
                    >
                      <div className="flex items-center gap-space-md min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                          <span className="material-symbols-outlined text-[28px]">terminal</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-headline-sm text-headline-sm font-bold text-white">Admin Panel</span>
                            <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                          </div>
                          <span className="font-label-mono text-label-mono text-slate-400 truncate">Manage content and settings for the site</span>
                        </div>
                      </div>
                      <span className="shrink-0 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-label-md text-label-md font-semibold flex items-center gap-1">
                        <span>Manage</span>
                        <span className="material-symbols-outlined text-[16px]">security</span>
                      </span>
                    </div>
                  </div>

                  {/* Instant Drops Banner */}
                  <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-[#070a10] border border-slate-800 p-space-lg md:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg relative overflow-hidden shadow-2xl">
                    <div className="flex items-center gap-space-md">
                      <div className="w-14 h-14 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                        <span className="material-symbols-outlined text-[28px]">mark_chat_unread</span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-headline-md font-bold text-white">{instantDrops.title || 'Join the Instant Drops'}</h3>
                        <p className="font-body-sm text-body-sm text-slate-400">{instantDrops.subtitle || 'Get notified for real-time live music sessions & watchalongs'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-sm w-full md:w-auto">
                      <a
                        href={instantDrops.discordUrl || 'https://discord.com/users/imayush2108'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-initial flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-label-md text-label-md transition-all border border-slate-700"
                      >
                        <span className="material-symbols-outlined text-[18px] text-indigo-400">forum</span>
                        <span>Discord Hub</span>
                      </a>
                      <a
                        href={instantDrops.whatsappUrl || 'https://wa.me/919508678989'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-initial flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#007d55] hover:bg-[#009667] text-white font-label-md text-label-md transition-all shadow-md"
                      >
                        <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                        <span>WhatsApp Alert</span>
                      </a>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </section>
      </div>
    </div>
  );
}
