import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Sparkles, Music, Film, Gamepad2 } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'My Entertainment Corner', href: '#media-lounge' },
    { name: 'Process', href: '#process' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#home" className="nav-brand">
          <div className="brand-logo-frame">
            <img src={getAssetUrl('images/logo.jpg')} alt="Ayush Hub Logo" className="brand-logo-img" />
          </div>
          <div className="brand-text-col">
            <span className="brand-title">Ayush Hub</span>
            <span className="brand-tagline">
              <span className="pulse-dot"></span> Purnia, Bihar
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <a 
                  href={link.href} 
                  className={`nav-link ${link.href === '#media-lounge' ? 'nav-link-vue' : ''}`}
                >
                  {link.href === '#media-lounge' && <Sparkles size={14} className="vue-sparkle-icon" />}
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Nav Actions */}
        <div className="nav-actions">
          <a 
            href="https://wa.me/919508678989?text=Hi%20Ayush,%20I%20am%20reaching%20out%20from%20Ayush%20Hub!"
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm nav-cta"
            title="Chat directly with Ayush on WhatsApp"
          >
            <span>Chat on WhatsApp</span>
            <span className="btn-icon">💬</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-menu-inner">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-drawer-contact">
              <a href="tel:9508678989" className="mobile-contact-pill">
                <Phone size={16} /> <span>+91 9508678989</span>
              </a>
              <a 
                href="https://wa.me/919508678989?text=Hi%20Ayush!" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <span>WhatsApp: 9508678989</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
