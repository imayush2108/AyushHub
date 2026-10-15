import React from 'react';
import { Star, Quote, CheckCircle2, ExternalLink } from 'lucide-react';
import { DoodleDots, DoodleSparkle } from './Doodles';
import { getAssetUrl } from '../utils/assets';

export default function TestimonialsSection() {
  const handleNavigateToLounge = (tab) => (e) => {
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

  const testimonials = [
    {
      id: 1,
      quote: "Ayush's Bollywood & Soulful Melodies vault is pure magic. From KK's iconic classics like 'Zara Sa' to Mustafa Zahid and Arijit's gems, having verified lyrics with lossless Spotify audio in one place makes it my daily sanctuary. Zero skip rate!",
      name: "Pooja Verma",
      role: "Creative Director & Podcaster",
      location: "Patna, Bihar",
      avatar: getAssetUrl('images/avatar-1.jpg'),
      rating: 5,
      favorite: "Bollywood & Soulful Vault",
      tab: "music"
    },
    {
      id: 2,
      quote: "Ayush Hub's 2026 Cinema Vault is the most reliable movie guide I've seen. His honest spoiler-free reviews, clear pros & cons, and especially the Hindi dubbing authenticity audits save me every weekend. The 4K trailer integrations are seamless.",
      name: "Rohan Mehta",
      role: "Film Critic & Cinephile",
      location: "Kolkata, WB",
      avatar: getAssetUrl('images/avatar-2.jpg'),
      rating: 5,
      favorite: "2026 Cinema Vault",
      tab: "movies"
    },
    {
      id: 3,
      quote: "The RTX 4080 Super benchmark suite across 37 games gives astonishingly accurate FPS estimates from 1080p Ultra to 4K. Whether optimizing Cyberpunk ray tracing or jumping into competitive Valorant lobbies, Ayush's tech breakdowns are top-tier.",
      name: "Vikram Sengupta",
      role: "Competitive FPS Gamer",
      location: "Bengaluru, Karnataka",
      avatar: getAssetUrl('images/avatar-3.jpg'),
      rating: 5,
      favorite: "PC Battlestation & Benchmarks",
      tab: "gaming"
    }
  ];

  return (
    <section id="reviews" className="section testimonials-section">
      <div className="section-doodle doodle-testi-dots">
        <DoodleDots color="#CBD5E1" count={12} />
      </div>

      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">COMMUNITY VOICES</span>
          <h2 className="section-heading">What People Say About Us</h2>
          <p className="section-subtext">
            Authentic feedback from fellow music lovers, cinephiles, and gamers who explore My Entertainment Corner.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testi-stars-row">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              <p className="testi-quote-text">"{t.quote}"</p>

              <div className="testi-author-row">
                <div className="testi-avatar-frame">
                  <img src={t.avatar} alt={t.name} className="testi-avatar-img" />
                </div>
                <div className="testi-author-info">
                  <h4 className="testi-author-name">{t.name}</h4>
                  <span className="testi-author-role">{t.role} • {t.location}</span>
                </div>
              </div>

              <div className="testi-favorite-pill">
                <button 
                  type="button" 
                  className="testi-favorite-btn"
                  onClick={handleNavigateToLounge(t.tab)}
                  title={`Jump to ${t.favorite} in My Entertainment Corner`}
                >
                  <span>Favorite: {t.favorite}</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
