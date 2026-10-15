import React from 'react';

export default function MobileBottomNav({ activePage, setActivePage }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'music', label: 'Music', icon: 'headphones' },
    { id: 'movies', label: 'Movies', icon: 'movie' },
    { id: 'gaming', label: 'Gaming', icon: 'sports_esports' },
    { id: 'admin', label: 'Admin', icon: 'shield_person' },
  ];

  const handleTabClick = (id, e) => {
    e.preventDefault();
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = id;
  };

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#0b0f17]/90 backdrop-blur-2xl border-t border-slate-800 shadow-[0_-1px_16px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-16 px-space-xs max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activePage === tab.id;
          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={(e) => handleTabClick(tab.id, e)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] min-h-[44px] px-2 transition-all cursor-pointer ${
                isActive
                  ? 'text-blue-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`w-10 h-7 flex items-center justify-center rounded-full transition-all ${
                  isActive
                    ? 'bg-blue-600/25 shadow-[0_0_16px_rgba(37,99,235,0.4)] text-blue-400'
                    : 'hover:bg-slate-800/50'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {tab.icon}
                </span>
              </div>
              <span className={`font-label-md text-[11px] ${isActive ? 'font-semibold text-blue-400' : 'font-medium'}`}>
                {tab.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
