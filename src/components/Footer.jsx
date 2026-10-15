import React from 'react';

export default function Footer({ setActivePage }) {
  const handleNav = (id, e) => {
    e.preventDefault();
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = id;
  };

  return (
    <footer className="w-full bg-[#070a10] border-t border-slate-800/80 pt-space-xl pb-24 xl:pb-space-xl px-margin-mobile md:px-margin text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
        {/* Top Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img 
                alt="Ayush Hub Logo" 
                className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/40" 
                src="/images/logo.jpg" 
                onError={(e) => { e.currentTarget.src = '/images/hero-ayush.jpg'; }}
              />
              <div>
                <span className="font-headline-sm text-lg text-[#f8fafc] font-bold block leading-tight">
                  Ayush Hub
                </span>
                <span className="text-xs text-blue-400 font-medium tracking-wide">
                  Music • Movies • Gaming
                </span>
              </div>
            </div>

            <p className="font-body-sm text-sm text-slate-400 max-w-sm leading-relaxed">
              A personal space crafted by Ayush, where I share my favorite music, movies, and gaming moments.
            </p>

            {/* 4 Social/Contact Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919508678989"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp: +91 9508678989"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Email */}
              <a
                href="mailto:ayushshrivastava2108@gmail.com"
                title="Email: ayushshrivastava2108@gmail.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium transition-all hover:scale-105"
              >
                <span className="material-symbols-outlined text-[15px]">mail</span>
                <span>Email</span>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/imayush2108"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook: imayush2108"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-medium transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/imayush2108"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram: imayush2108"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-400 text-xs font-medium transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 2: Entertainment Vaults */}
          <div className="lg:col-span-3">
            <span className="font-label-mono text-xs uppercase tracking-wider text-slate-300 font-semibold mb-3 block">
              Entertainment Vaults
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#music" onClick={(e) => handleNav('music', e)} className="hover:text-blue-400 transition-colors">
                  Bollywood & Soulful Hits
                </a>
              </li>
              <li>
                <a href="#movies" onClick={(e) => handleNav('movies', e)} className="hover:text-blue-400 transition-colors">
                  Cinema World
                </a>
              </li>
              <li>
                <a href="#movies" onClick={(e) => handleNav('movies', e)} className="hover:text-blue-400 transition-colors">
                  Marvel & Hollywood Picks
                </a>
              </li>
              <li>
                <a href="#movies" onClick={(e) => handleNav('movies', e)} className="hover:text-blue-400 transition-colors">
                  South Indian Cinema
                </a>
              </li>
              <li>
                <a href="#gaming" onClick={(e) => handleNav('gaming', e)} className="hover:text-blue-400 transition-colors">
                  PC Battlestation Benchmarks
                </a>
              </li>
              <li>
                <a href="#gaming" onClick={(e) => handleNav('gaming', e)} className="hover:text-blue-400 transition-colors">
                  Esports & Competitive Lobbies
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="lg:col-span-2">
            <span className="font-label-mono text-xs uppercase tracking-wider text-slate-300 font-semibold mb-3 block">
              Navigation
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" onClick={(e) => handleNav('home', e)} className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNav('services', e)} className="hover:text-blue-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#music" onClick={(e) => handleNav('music', e)} className="hover:text-blue-400 transition-colors">
                  Music
                </a>
              </li>
              <li>
                <a href="#movies" onClick={(e) => handleNav('movies', e)} className="hover:text-blue-400 transition-colors">
                  Movies
                </a>
              </li>
              <li>
                <a href="#gaming" onClick={(e) => handleNav('gaming', e)} className="hover:text-blue-400 transition-colors">
                  Gaming
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNav('about', e)} className="hover:text-blue-400 transition-colors">
                  About Ayush
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNav('contact', e)} className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#admin" onClick={(e) => handleNav('admin', e)} className="hover:text-blue-400 transition-colors">
                  Admin Panel
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-label-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
              Get in Touch
            </span>
            
            {/* 3 Contact Info Lines with Icons */}
            <div className="flex flex-col gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5 text-slate-400">
                <span className="material-symbols-outlined text-[18px] text-blue-400 shrink-0">location_on</span>
                <span>Purnia, Bihar, India (854301)</span>
              </div>
              <a 
                href="https://wa.me/919508678989" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-400 hover:text-emerald-400 transition-colors group"
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">call</span>
                <span>+91 9508678989 (Call & WhatsApp)</span>
              </a>
              <a 
                href="mailto:ayushshrivastava2108@gmail.com" 
                className="flex items-center gap-2.5 text-slate-400 hover:text-blue-400 transition-colors group"
              >
                <span className="material-symbols-outlined text-[18px] text-blue-400 shrink-0 group-hover:scale-110 transition-transform">mail</span>
                <span className="truncate">ayushshrivastava2108@gmail.com</span>
              </a>
            </div>

            {/* Green Badge: Open for Collaborations */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
                <span>Open for Collaborations</span>
              </div>
            </div>

            {/* Join Discord Community Button */}
            <a 
              href="https://discord.com/users/imayush2108" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 hover:border-indigo-500 text-indigo-300 hover:text-white transition-all text-xs font-medium shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">forum</span>
              <span>Join Discord Community</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-space-md border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-mono text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 Ayush Hub. All rights reserved. Designed & Built by Ayush.</p>
          <p className="text-slate-400">
            Made with React & Vue
          </p>
        </div>
      </div>
    </footer>
  );
}
