import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ProcessSection from './components/ProcessSection';
import VueMediaLoungeMount from './components/VueMediaLoungeMount';
import ErrorBoundary from './components/ErrorBoundary';
import ShowcaseSection from './components/ShowcaseSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import TrackDetailPage from './components/TrackDetailPage';
import Footer from './components/Footer';
import FloatingSocialHub from './components/FloatingSocialHub';
import useScrollReveal from './hooks/useScrollReveal';
import { ArrowUp } from 'lucide-react';
import './App.css';

const getTrackIdFromHash = () => {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash || '';
  const match = hash.match(/^#\/track\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(getTrackIdFromHash);

  // Activate smooth, consistent scroll-reveal animations across all elements
  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const trackId = getTrackIdFromHash();
      setCurrentTrackId(trackId);
      if (!trackId && window.location.hash === '#media-lounge') {
        setTimeout(() => {
          const el = document.getElementById('media-lounge');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLounge = () => {
    window.location.hash = '#media-lounge';
    setCurrentTrackId(null);
    setTimeout(() => {
      const el = document.getElementById('media-lounge');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="app-root">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      {currentTrackId ? (
        <main>
          <TrackDetailPage trackId={currentTrackId} onBack={handleBackToLounge} />
        </main>
      ) : (
        <main>
          {/* Hero Section matching reference style */}
          <HeroSection />

          {/* Services Section with 3 cards including highlighted royal card */}
          <ServicesSection />

          {/* About Section matching reference circular cutout */}
          <AboutSection />

          {/* Interactive Dual-Engine Vue 3 Media Lounge */}
          <ErrorBoundary>
            <VueMediaLoungeMount />
          </ErrorBoundary>

          {/* Process Section with 4-step curation roadmap */}
          <ProcessSection />

          {/* Showcase Portfolio Section with category tabs */}
          <ShowcaseSection />

          {/* Community Testimonials with 5-star ratings */}
          <TestimonialsSection />

          {/* Contact Section with full business details & WhatsApp form */}
          <ContactSection />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Floating Action Hub (Clean Social Hub & Quick Scroll-To-Top) */}
      <div className="floating-hub-container" role="region" aria-label="Social connections and navigation">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button 
            onClick={scrollToTop} 
            className="floating-scroll-top-btn"
            aria-label="Scroll back to top"
            title="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        )}

        {/* Clean Floating Social Media Main Button (Expands on click) */}
        <FloatingSocialHub />
      </div>
    </div>
  );
}
