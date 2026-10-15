import React from 'react';
import { Sparkles, Flame, Heart, Phone, MessageSquare } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-container">
        {/* Left Column: Creator Circular Cutout matching reference design */}
        <div className="about-visual-col">
          <div className="about-circle-stage">
            {/* Ambient diffuse golden halo glow */}
            <div className="about-halo-glow" aria-hidden="true" />

            {/* Glowing Golden Ring Frame hugging the portrait */}
            <div className="about-yellow-ring" />

            {/* Ayush's Portrait Frame */}
            <div className="about-image-frame">
              <img 
                src={getAssetUrl('images/about-ayush.jpg')} 
                alt="Ayush Shrivastava - Founder & Curator of Ayush Hub" 
                className="about-portrait-img"
                loading="lazy"
              />
            </div>

            {/* Top-Left Playful Geometric Accents (Matching Reference) */}
            <div className="about-geometric-accents" aria-hidden="true">
              {/* Amber Triangle */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="accent-tri-svg">
                <polygon points="12,2 22,20 2,20" fill="#F59E0B" />
              </svg>
              {/* Indigo Dot */}
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="accent-dot-svg">
                <circle cx="6" cy="6" r="5" fill="#4F46E5" />
              </svg>
            </div>

            {/* Bottom-Right Curved Swoop Doodle Arrow (Matching Reference) */}
            <div className="about-doodle-arrow" aria-hidden="true">
              <svg width="68" height="54" viewBox="0 0 68 54" fill="none" className="arrow-swoop-svg">
                {/* Curved path along the bottom-right arc */}
                <path 
                  d="M 6 36 C 22 52 46 48 58 20" 
                  stroke="#F59E0B" 
                  strokeWidth="3.2" 
                  strokeLinecap="round"
                />
                {/* Arrowhead pointing up-right toward cards */}
                <path 
                  d="M 44 18 L 59 19 L 61 32" 
                  stroke="#F59E0B" 
                  strokeWidth="3.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Experience details matching reference */}
        <div className="about-content-col">
          <span className="about-badge-tag">About Ayush Shrivastava</span>
          
          <h2 className="about-main-heading">
            Where Passion Meets Purpose
          </h2>

          <p className="about-description-text">
            I started Ayush Hub because I was tired of scrolling for hours just to find one good song or movie worth my time. Now, everything I love about music, movies and gaming lives in one place, built by me.
          </p>

          {/* Metric Highlight Cards matching reference */}
          <div className="about-metrics-list">
            <div className="metric-box">
              <div className="metric-icon-box" aria-hidden="true">
                <Sparkles size={22} className="icon-metric" />
              </div>
              <div className="metric-details">
                <h4>500+ Curations</h4>
                <p>Handpicked, tested, and worth your time, nothing random makes the list.</p>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-icon-box" aria-hidden="true">
                <Flame size={22} className="icon-metric" />
              </div>
              <div className="metric-details">
                <h4>20+ Years of Obsession</h4>
                <p>From underground tracks to blockbuster releases, I've followed it all closely.</p>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-icon-box" aria-hidden="true">
                <Heart size={22} className="icon-metric" />
              </div>
              <div className="metric-details">
                <h4>Just Being Myself</h4>
                <p>No fancy title, just genuine passion for music, movies and gaming that I love sharing.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons matching reference */}
          <div className="about-actions-row">
            <a 
              href="https://wa.me/919508678989?text=Hi%20Ayush,%20I%20read%20your%20story%20on%20Ayush%20Hub!"
              target="_blank" 
              rel="noopener noreferrer"
              className="about-btn-whatsapp"
              id="about-cta-whatsapp"
            >
              <span>Say Hello on WhatsApp</span>
              <MessageSquare size={17} />
            </a>

            <a 
              href="tel:9508678989" 
              className="about-btn-call"
              id="about-cta-call"
            >
              <Phone size={17} />
              <span>Call: +91 9508678989</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
