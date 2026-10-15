import React, { useState } from 'react';
import { ExternalLink, Star, Play, Sparkles, X, Heart, Eye } from 'lucide-react';
import { DoodleSquiggle, DoodleSparkle } from './Doodles';
import { getAssetUrl } from '../utils/assets';

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const tabs = ['All', 'Music Vault', 'Cinema Watchlist', 'Gaming Arena'];

  const handleNavigateToLounge = (tab) => (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedItem(null);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('switch-lounge-tab', { detail: { tab } }));
      setTimeout(() => {
        const el = document.getElementById('media-lounge');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = '#media-lounge';
        }
      }, 60);
    }
  };

  const showcaseItems = [
    {
      id: 1,
      title: 'Bollywood & Soulful Melodies Vault',
      category: 'Music Vault',
      image: getAssetUrl('images/showcase-bollywood-music.jpg'),
      badge: "Ayush's Choice • 34 Handpicked Tracks",
      score: '9.9/10',
      tagline: 'Timeless romantic gems, soulful sufi rock, and iconic 2000s Bollywood melodies curated by Ayush.',
      highlights: [
        '34 verified tracks with lossless Spotify studio playback & official Full HD YouTube videos',
        'Complete sing-along lyrics and personalized curator reviews for every track',
        'Featuring KK, Arijit Singh, Mustafa Zahid, Mohit Chauhan, Atif Aslam & Shreya Ghoshal'
      ],
      ctaText: 'Listen in Entertainment Corner',
      loungeTab: 'music',
      ctaUrl: '#media-lounge'
    },
    {
      id: 2,
      title: '2026 Cinema Vault & Audited Reviews',
      category: 'Cinema Watchlist',
      image: getAssetUrl('images/showcase-cinema-2026.jpg'),
      badge: 'Verified 2026 Cinema • Reviews & Trailers',
      score: '9.8/10',
      tagline: 'Honest spoiler-free movie reviews, Hindi dubbing verification audits, and official studio 4K trailers.',
      highlights: [
        'Verified 2026 releases across Bollywood, South Indian Cinema, and Marvel blockbusters',
        'In-depth pros & cons, critic consensus ratings, and Hindi dub authenticity audits',
        'Full studio 4K trailer playback with interactive genre and date filters'
      ],
      ctaText: 'Explore Movies in Entertainment Corner',
      loungeTab: 'movies',
      ctaUrl: '#media-lounge'
    },
    {
      id: 3,
      title: 'PC Battlestation & 37-Game Benchmark Suite',
      category: 'Gaming Arena',
      image: getAssetUrl('images/showcase-gaming-rig.jpg'),
      badge: '37 Verified Games • RTX 4080 Super',
      score: '9.7/10',
      tagline: 'Real-time FPS performance estimates, ray tracing analysis, and competitive esports hardware benchmarks.',
      highlights: [
        'Real-time FPS simulations across 1080p Ultra, 1440p High, and 4K Cinematic presets',
        'Rigorous benchmarking on RTX 4080 Super, Ryzen 7 7800X3D, and 32GB DDR5 6000MHz',
        'Curated library: Cyberpunk 2077, GTA V, Black Myth: Wukong, Valorant, and CS2'
      ],
      ctaText: 'Check Live Benchmarks',
      loungeTab: 'gaming',
      ctaUrl: '#media-lounge'
    }
  ];

  const filteredItems = activeTab === 'All' 
    ? showcaseItems 
    : showcaseItems.filter(item => item.category === activeTab);

  return (
    <section id="showcase" className="section showcase-section">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">PORTFOLIO & CURATIONS</span>
          <h2 className="section-heading">Digital Content Showcases</h2>
          <p className="section-subtext">
            Explore the 3 flagship pillars of My Entertainment Corner: Handpicked Bollywood melodies, audited 2026 cinema releases, and real-time PC gaming benchmarks.
          </p>
        </div>

        {/* Tab Filters matching reference image */}
        <div className="showcase-tabs-row">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`showcase-tab-pill ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Showcase Grid */}
        <div className="showcase-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="showcase-card"
              onClick={() => setSelectedItem(item)}
            >
              <div className="showcase-img-wrap">
                <img src={item.image} alt={item.title} className="showcase-img" />
                <div className="showcase-img-overlay">
                  <span className="overlay-inspect-btn">
                    <Eye size={18} />
                    <span>Inspect Details</span>
                  </span>
                </div>
                <span className="showcase-score-badge">
                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                  <span>{item.score}</span>
                </span>
                <span className="showcase-category-pill">{item.category}</span>
              </div>

              <div className="showcase-content">
                <span className="showcase-subbadge">{item.badge}</span>
                <h3 className="showcase-title">{item.title}</h3>
                <p className="showcase-tagline">{item.tagline}</p>

                <div className="showcase-card-footer">
                  <button 
                    type="button"
                    className="read-more-link"
                    onClick={handleNavigateToLounge(item.loungeTab)}
                    title={`Explore ${item.title} in My Entertainment Corner`}
                  >
                    <span>Explore in Entertainment Corner</span>
                    <ExternalLink size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal */}
      {selectedItem && (
        <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="modal-window modal-showcase-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-showcase-header">
              <img src={selectedItem.image} alt={selectedItem.title} className="modal-banner-img" />
              <button 
                className="modal-close-btn modal-close-overlay" 
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-badge-group">
                <span className="section-tag">{selectedItem.category}</span>
                <span className="modal-badge-score">Rating: {selectedItem.score}</span>
              </div>

              <h3 className="modal-item-title">{selectedItem.title}</h3>
              <p className="modal-item-tagline">{selectedItem.tagline}</p>

              <div className="modal-highlights-card">
                <h4>Key Highlights & Curator Notes:</h4>
                <ul>
                  {selectedItem.highlights.map((point, idx) => (
                    <li key={idx}>
                      <span className="check-bullet">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-action-bar">
                <a 
                  href={selectedItem.ctaUrl} 
                  className="btn btn-primary"
                  onClick={handleNavigateToLounge(selectedItem.loungeTab)}
                >
                  <span>{selectedItem.ctaText}</span>
                  <ExternalLink size={16} />
                </a>
                <button className="btn btn-outline-primary" onClick={() => setSelectedItem(null)}>
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
