import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import MusicView from './components/MusicView';
import MoviesView from './components/MoviesView';
import GamingView from './components/GamingView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import AdminView from './components/AdminView';

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const valid = ['home', 'services', 'music', 'movies', 'gaming', 'about', 'contact', 'admin'];
    return valid.includes(hash) ? hash : 'home';
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync with browser hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const valid = ['home', 'services', 'music', 'movies', 'gaming', 'about', 'contact', 'admin'];
      if (valid.includes(hash)) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title dynamically
  useEffect(() => {
    const titles = {
      home: 'Ayush Hub - Ultimate Entertainment Universe',
      services: 'Ayush Hub - Services & Curations',
      music: 'Ayush Hub - Bollywood & Punjabi Music Lounge',
      movies: 'Ayush Hub - Cinema Vault & HD Trailers',
      gaming: 'Ayush Hub - Gaming Arena & Esports Telemetry',
      about: 'Ayush Hub - About Ayush Shrivastava',
      contact: 'Ayush Hub - Connect & Direct Transmission',
      admin: 'Ayush Hub - Nexus Master SuperAdmin Console',
    };
    document.title = titles[activePage] || 'Ayush Hub';
  }, [activePage]);

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-[#f8fafc] flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        {activePage === 'home' && <HomeView setActivePage={navigateTo} onNavigate={navigateTo} />}
        {activePage === 'services' && <ServicesView onNavigate={navigateTo} />}
        {activePage === 'music' && <MusicView onNavigate={navigateTo} />}
        {activePage === 'movies' && <MoviesView onNavigate={navigateTo} />}
        {activePage === 'gaming' && <GamingView onNavigate={navigateTo} />}
        {activePage === 'about' && <AboutView onNavigate={navigateTo} />}
        {activePage === 'contact' && <ContactView onNavigate={navigateTo} />}
        {activePage === 'admin' && <AdminView onNavigate={navigateTo} />}
      </main>

      {/* Footer */}
      <Footer setActivePage={navigateTo} />

      {/* Mobile Fixed Bottom Tab Bar */}
      <MobileBottomNav activePage={activePage} setActivePage={navigateTo} />

      {/* Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-20 xl:bottom-8 right-6 z-40 w-11 h-11 rounded-full bg-slate-900/90 border border-slate-700/80 text-blue-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer animate-fade-in"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_upward</span>
        </button>
      )}
    </div>
  );
}
