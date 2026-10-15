import React from 'react';

export default function Navbar({ activePage, setActivePage, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'music', label: 'Music' },
    { id: 'movies', label: 'Movies' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Admin' },
  ];

  const handleNavClick = (id, e) => {
    e.preventDefault();
    setActivePage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = id;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        {/* Desktop Header */}
        <div className="hidden xl:flex h-20 w-full px-margin items-center justify-between gap-space-md max-w-7xl mx-auto">
          {/* Logo & Brand */}
          <div className="flex items-center gap-space-md shrink-0">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick('home', e)}
              className="flex items-center gap-space-sm group cursor-pointer"
            >
              <img 
                alt="Ayush Hub Logo" 
                className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500/40" 
                src="/images/logo.jpg" 
                onError={(e) => { e.currentTarget.src = '/images/hero-ayush.jpg'; }}
              />
              <span className="font-headline-sm text-headline-sm text-[#f8fafc] tracking-tight group-hover:text-blue-400 transition-colors font-semibold">
                Ayush Hub
              </span>
            </a>
          </div>

          {/* Center Navigation Pills */}
          <nav className="flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md shadow-blue-900/40'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Suite */}
          <div className="flex items-center gap-space-md shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleNavClick('contact', e)}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold font-label-md text-label-md shadow-md shadow-blue-900/30 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-800/40 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Explore Now
            </a>

            <div className="flex items-center gap-space-xs pl-space-xs">
              <img
                alt="Ayush Shrivastava"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/50 shadow-sm cursor-pointer"
                style={{ objectPosition: 'center 18%' }}
                src="/images/hero-ayush.jpg"
                title="Ayush Shrivastava - Creator"
                onClick={(e) => handleNavClick('about', e)}
                onError={(e) => { e.currentTarget.src = '/images/logo.jpg'; }}
              />
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Header (< 1280px) */}
        <div className="xl:hidden h-16 pt-safe px-gutter-mobile flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick('home', e)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img 
                alt="Ayush Hub Logo" 
                className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-500/40" 
                src="/images/logo.jpg" 
                onError={(e) => { e.currentTarget.src = '/images/hero-ayush.jpg'; }}
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-[18px] text-[#f8fafc] font-bold tracking-tight">
                    Ayush Hub
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-tertiary-container/20 text-[#4edea3] font-label-mono text-[10px] uppercase tracking-wider flex items-center gap-1 border border-[#4edea3]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                    PRO
                  </span>
                </div>
                <span className="font-label-md text-[11px] text-[#9ca3af] font-medium capitalize -mt-0.5">
                  {activePage}
                </span>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              aria-label="Toggle Navigation Drawer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white transition-colors rounded-full active:bg-slate-800"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
            <div 
              onClick={(e) => handleNavClick('about', e)}
              className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-blue-500/40 cursor-pointer shrink-0"
            >
              <img
                alt="Ayush"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 18%' }}
                src="/images/hero-ayush.jpg"
                onError={(e) => { e.currentTarget.src = '/images/logo.jpg'; }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden w-full bg-[#0b0f17]/98 backdrop-blur-2xl border-b border-slate-800 px-margin-mobile py-space-md shadow-2xl animate-fadeIn">
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`px-space-md py-2.5 rounded-lg font-label-md text-label-md flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md shadow-blue-900/30'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="material-symbols-outlined text-[18px] opacity-70">
                      chevron_right
                    </span>
                  </a>
                );
              })}
              <div className="pt-space-sm">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick('contact', e)}
                  className="flex w-full items-center justify-center gap-2 px-space-lg py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold font-label-md text-label-md shadow-md shadow-blue-900/30 cursor-pointer"
                >
                  <span>Explore Now</span>
                  <span className="material-symbols-outlined text-[18px]">east</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
