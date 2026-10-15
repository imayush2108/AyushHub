import React, { useState } from 'react';
import { Music, Film, Gamepad2, ArrowRight, X, ExternalLink, Sparkles } from 'lucide-react';

export default function ServicesSection() {
  const [activeModal, setActiveModal] = useState(null);

  const handleNavigateToLounge = (tab) => (e) => {
    if (!tab) return;
    if (e) e.preventDefault();
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

  const services = [
    {
      id: 'music',
      title: 'Music & Playlists',
      subtitle: 'SONIC BEATS & TRACKS',
      icon: <Music size={28} className="service-icon-svg" />,
      highlight: false,
      desc: 'Discover music I enjoy, explore featured tracks, and listen to handpicked songs from different artists and genres.',
      stats: 'Handpicked Songs • Spotify & YouTube Embeds',
      loungeTab: 'music',
      buttonText: 'Listen Now',
      picks: [
        { name: 'Music Discovery', genre: 'Fresh Indie & New Releases', mood: 'Uncovering Unique Melodies', duration: 'Discovery' },
        { name: 'Chill / Late-Night Listening', genre: 'Soulful Lo-Fi & Acoustics', mood: 'Late-Night Calm & Focus', duration: 'Chill Vibes' },
        { name: 'Hindi / Indian Music', genre: 'Timeless Bollywood Hits', mood: 'Mohit Chauhan & KK Classics', duration: 'Hindi Hits' },
        { name: 'Personal Music Pick', genre: 'Tum Se Hi (Jab We Met)', mood: 'Acoustic Soul & Serenity', duration: 'Personal Pick' },
      ],
      whatsappMsg: 'Hi Ayush, I would love to talk about your music recommendations!'
    },
    {
      id: 'movies',
      title: 'Movies & Reviews',
      subtitle: 'CINEMA & REVIEWS',
      icon: <Film size={28} className="service-icon-svg" />,
      highlight: true, // Featured card with Royal Indigo background matching website aesthetic
      desc: 'Explore movie trailers, discover films across different categories, and read overviews, reviews, and ratings to help you choose what to watch.',
      stats: 'Movie Trailers • Overviews & Ratings',
      loungeTab: 'movies',
      buttonText: 'Explore Movies',
      picks: [
        { name: 'Featured Movie', genre: 'Interstellar (2014)', mood: 'Sci-Fi Odyssey & Grand Drama', duration: 'Featured' },
        { name: 'Story & Experience', genre: 'Blade Runner 2049', mood: 'Atmospheric Neo-Noir Visuals', duration: 'Cinematic' },
        { name: 'Honest Review', genre: 'Past Lives (2023)', mood: 'Bittersweet Realism & Emotion', duration: 'Honest Review' },
        { name: 'Personal Movie Pick', genre: 'Tumbbad (2018)', mood: 'Atmospheric Mythological Story', duration: 'Personal Pick' },
      ],
      whatsappMsg: 'Hi Ayush, I need a great movie recommendation!'
    },
    {
      id: 'gaming',
      title: 'Gaming Zone',
      subtitle: 'GAMING ZONE',
      icon: <Gamepad2 size={28} className="service-icon-svg" />,
      highlight: false,
      desc: 'Step into the world of gaming, explore featured games, and discover gaming content that brings entertainment and excitement together.',
      stats: 'Featured Games • Benchmark Insights',
      loungeTab: 'gaming',
      buttonText: 'Explore Gaming',
      picks: [
        { name: 'Featured Game', genre: 'Cyberpunk 2077: Phantom Liberty', mood: 'Next-Gen Path Tracing Showcase', duration: 'Featured' },
        { name: 'Story & Adventure', genre: 'Red Dead Redemption 2', mood: 'Living Western World & Story', duration: 'Adventure' },
        { name: 'Competitive Gaming', genre: 'Valorant', mood: 'Tactical Shooter & High-FPS Play', duration: 'Competitive' },
        { name: 'Personal Gaming Pick', genre: 'Elden Ring: Shadow of the Erdtree', mood: 'Action RPG Mastery & Discovery', duration: 'Personal Pick' },
      ],
      whatsappMsg: 'Hi Ayush, let us squad up or discuss gaming titles!'
    }
  ];

  return (
    <section id="services" className="section services-section">
      <div className="container">
        {/* Section Heading matching exact user copy */}
        <div className="section-title-wrap services-title-wrap">
          <span className="section-tag services-tag">SERVICES</span>
          <h2 className="section-heading services-heading">
            My Entertainment Picks — Explore <br />
            What I Love
          </h2>
          <p className="section-subtext services-subtext">
            Discover the music, movies, and games I enjoy, all in one place. Explore my favorite entertainment picks, discover something new, and dive into the content that makes Ayush Hub unique.
          </p>
        </div>

        {/* 3 Grid Cards */}
        <div className="services-grid">
          {services.map((srv) => (
            <div 
              key={srv.id} 
              className={`service-card ${srv.highlight ? 'service-card-featured' : ''}`}
            >
              <div className="service-icon-wrap" aria-hidden="true">
                {srv.icon}
              </div>

              <span className="service-subtitle-badge">{srv.subtitle}</span>
              <h3 className="service-card-title">{srv.title}</h3>
              <p className="service-card-desc">{srv.desc}</p>
              
              <div className="service-meta-stats">
                <Sparkles size={14} className="sparkle-gold" />
                <span>{srv.stats}</span>
              </div>

              <div className="service-card-footer">
                <a 
                  href="#media-lounge"
                  onClick={handleNavigateToLounge(srv.loungeTab)}
                  className={`service-action-btn ${srv.highlight ? 'btn-featured-action' : ''}`}
                  aria-label={`${srv.buttonText} - ${srv.title}`}
                >
                  <span>{srv.buttonText}</span>
                  <ArrowRight size={16} />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveModal(srv)}
                  className={`service-preview-link ${srv.highlight ? 'preview-link-featured' : ''}`}
                  title={`View highlights for ${srv.title}`}
                  aria-label={`View quick details for ${srv.title}`}
                >
                  Highlights
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Details Modal (Gaming & Entertainment Explore Area) */}
      {activeModal && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <span className="modal-tag">{activeModal.subtitle}</span>
                <h3>{activeModal.title}</h3>
              </div>
              <button 
                className="modal-close-btn" 
                onClick={() => setActiveModal(null)}
                aria-label="Close details"
              >
                <X size={22} />
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-desc">{activeModal.desc}</p>

              <h4 className="picks-heading">Ayush's Featured Picks in this Category:</h4>
              <div className="picks-list">
                {activeModal.picks.map((pick, i) => (
                  <div key={i} className="pick-item-card">
                    <div className="pick-number">0{i + 1}</div>
                    <div className="pick-info">
                      <h5>{pick.name}</h5>
                      <span>{pick.genre} • {pick.mood}</span>
                    </div>
                    <span className="pick-badge">{pick.duration}</span>
                  </div>
                ))}
              </div>

              <div className="modal-footer-cta">
                <p>Ready to jump into {activeModal.title} with interactive players and live content?</p>
                <div className="modal-cta-group">
                  <a 
                    href="#media-lounge"
                    onClick={(e) => {
                      setActiveModal(null);
                      handleNavigateToLounge(activeModal.loungeTab)(e);
                    }}
                    className="btn btn-primary"
                  >
                    <span>{activeModal.buttonText} in Entertainment Corner</span>
                    <ArrowRight size={16} />
                  </a>

                  <a 
                    href={`https://wa.me/919508678989?text=${encodeURIComponent(activeModal.whatsappMsg)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <span>Connect on WhatsApp</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
