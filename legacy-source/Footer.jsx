import React from 'react';
import { Phone, Mail, MessageSquare, MapPin, Heart, Sparkles, Music, Film, Gamepad2 } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function Footer() {
  const handleVaultClick = (tab, cat) => (e) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('switch-lounge-tab', { detail: { tab, cat } }));
      setTimeout(() => {
        const el = document.getElementById('media-lounge');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <footer className="footer-wrap">
      <div className="container footer-container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <img src={getAssetUrl('images/logo.jpg')} alt="Ayush Hub Logo" className="footer-logo-img" />
              <div className="footer-brand-text">
                <span className="footer-brand-name">Ayush Hub</span>
                <span className="footer-brand-sub">Music • Movies • Gaming</span>
              </div>
            </div>

            <p className="footer-bio">
              A personal space crafted by Ayush, where I share my favorite music, movies, and gaming moments.
            </p>

            <div className="footer-social-chips">
              <a href="https://wa.me/919508678989" target="_blank" rel="noopener noreferrer" className="social-chip" title="Direct WhatsApp (+91 9508678989)">
                <MessageSquare size={14} className="social-chip-icon" />
                <span>WhatsApp</span>
              </a>
              <a href="mailto:ayushshrivastava2108@gmail.com" className="social-chip" title="Send Email">
                <Mail size={14} className="social-chip-icon" />
                <span>Email</span>
              </a>
              <a href="https://www.facebook.com/imayush2108" target="_blank" rel="noopener noreferrer" className="social-chip" title="Facebook (@imayush2108)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="social-chip-icon" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>
              <a href="https://www.instagram.com/imayush2108" target="_blank" rel="noopener noreferrer" className="social-chip" title="Instagram (@imayush2108)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-chip-icon" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Curated Services</a></li>
              <li><a href="#about">About Ayush</a></li>
              <li><a href="#media-lounge">My Entertainment Corner</a></li>
              <li><a href="#process">My Curation Process</a></li>
              <li><a href="#showcase">Digital Showcases</a></li>
              <li><a href="#reviews">Community Reviews</a></li>
              <li><a href="#contact">Contact & Connect</a></li>
            </ul>
          </div>

          {/* Entertainment Vaults */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Entertainment Vaults</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#media-lounge" onClick={handleVaultClick('music')}>
                  Bollywood &amp; Soulful Hits
                </a>
              </li>
              <li>
                <a href="#media-lounge" onClick={handleVaultClick('movies', 'all')}>
                  Cinema Vault
                </a>
              </li>
              <li>
                <a href="#media-lounge" onClick={handleVaultClick('movies', 'marvel')}>
                  Marvel &amp; Hollywood Picks
                </a>
              </li>
              <li>
                <a href="#media-lounge" onClick={handleVaultClick('movies', 'south')}>
                  South Indian Cinema
                </a>
              </li>
              <li>
                <a href="#media-lounge" onClick={handleVaultClick('gaming', 'all')}>
                  PC Battlestation Benchmarks
                </a>
              </li>
              <li>
                <a href="#media-lounge" onClick={handleVaultClick('gaming', 'esports')}>
                  Esports &amp; Competitive Lobbies
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Get in Touch</h4>
            <ul className="footer-contact-details">
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Purnia, Bihar, India (854301)</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <a href="https://wa.me/919508678989" target="_blank" rel="noopener noreferrer" title="Call or WhatsApp Ayush (+91 9508678989)">
                  +91 9508678989 (Call &amp; WhatsApp)
                </a>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <a href="mailto:ayushshrivastava2108@gmail.com">ayushshrivastava2108@gmail.com</a>
              </li>
            </ul>

            <div className="footer-location-badge">
              <span className="dot-pulse-green"></span>
              <span>Open for Collaborations</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} <strong>Ayush Hub</strong>. All rights reserved. Designed &amp; Built by Ayush.
          </p>
          <div className="footer-bottom-tech">
            <span>Made with React &amp; Vue</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
