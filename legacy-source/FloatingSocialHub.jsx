import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MessageCircle, X, Share2 } from 'lucide-react';

/**
 * FloatingSocialHub
 * Clean, modern floating social media button that expands directly
 * from the bottom-right corner with a smooth pop/scale animation and subtle pulse ripple.
 * Uses official brand icons and verified site links without text labels or popups.
 */
export default function FloatingSocialHub() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Existing social links verified across the website
  const socialItems = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      url: 'https://wa.me/919508678989?text=Hi%20Ayush,%20reaching%20out%20from%20Ayush%20Hub!',
      ariaLabel: 'Chat directly on WhatsApp',
      className: 'social-item-whatsapp',
      icon: (
        // Official WhatsApp Vector Icon
        <svg 
          viewBox="0 0 24 24" 
          width="23" 
          height="23" 
          fill="currentColor" 
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.06 16.29C4.24 14.98 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.05 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 14.36C16.32 14.24 15.1 13.64 14.88 13.56C14.65 13.48 14.49 13.44 14.32 13.68C14.16 13.93 13.69 14.48 13.55 14.64C13.41 14.8 13.26 14.82 13.02 14.7C12.77 14.58 11.98 14.32 11.04 13.49C10.31 12.84 9.82 12.04 9.68 11.79C9.53 11.55 9.66 11.41 9.79 11.29C9.9 11.18 10.03 11.01 10.15 10.87C10.28 10.72 10.32 10.62 10.4 10.46C10.48 10.29 10.44 10.15 10.38 10.03C10.32 9.91 9.83 8.7 9.62 8.21C9.43 7.73 9.22 7.8 9.07 7.79C8.92 7.78 8.76 7.78 8.6 7.78C8.43 7.78 8.16 7.84 7.93 8.09C7.71 8.33 7.07 8.93 7.07 10.15C7.07 11.37 7.96 12.55 8.08 12.71C8.21 12.88 9.83 15.38 12.3 16.44C12.89 16.7 13.35 16.85 13.71 16.96C14.3 17.15 14.84 17.12 15.26 17.06C15.73 16.99 16.71 16.47 16.91 15.89C17.12 15.32 17.12 14.83 17.06 14.72C17 14.62 16.82 14.49 16.57 14.36Z" />
        </svg>
      )
    },
    {
      id: 'instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/imayush2108',
      ariaLabel: 'Follow on Instagram',
      className: 'social-item-instagram',
      icon: (
        // Official Instagram Vector Icon
        <svg 
          viewBox="0 0 24 24" 
          width="21" 
          height="21" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      )
    },
    {
      id: 'facebook',
      name: 'Facebook',
      url: 'https://www.facebook.com/imayush2108',
      ariaLabel: 'Connect on Facebook',
      className: 'social-item-facebook',
      icon: (
        // Official Facebook Vector Icon
        <svg 
          viewBox="0 0 24 24" 
          width="21" 
          height="21" 
          fill="currentColor" 
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      id: 'email',
      name: 'Email',
      url: 'mailto:ayushshrivastava2108@gmail.com',
      ariaLabel: 'Send an Email',
      className: 'social-item-email',
      icon: <Mail size={20} strokeWidth={2.2} />
    },
    {
      id: 'phone',
      name: 'Phone',
      url: 'tel:9508678989',
      ariaLabel: 'Call +91 9508678989',
      className: 'social-item-phone',
      icon: <Phone size={20} strokeWidth={2.2} />
    }
  ];

  return (
    <div className="floating-social-widget" ref={containerRef}>
      {/* Revealed Social Icons Stack */}
      <div 
        className={`social-items-stack ${isOpen ? 'is-expanded' : ''}`}
        aria-hidden={!isOpen}
      >
        {socialItems.map((item, index) => (
          <a
            key={item.id}
            href={item.url}
            target={item.url.startsWith('http') ? '_blank' : undefined}
            rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`social-reveal-item ${item.className}`}
            aria-label={item.ariaLabel}
            title={item.name}
            tabIndex={isOpen ? 0 : -1}
            style={{
              // Staggered pop animation delay from bottom to top
              transitionDelay: isOpen 
                ? `${(socialItems.length - 1 - index) * 45}ms` 
                : `${index * 30}ms`
            }}
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* Main Floating Social Trigger Button */}
      <button
        type="button"
        className={`floating-social-main-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close social channels' : 'Open social media channels'}
        title={isOpen ? 'Close' : 'Connect with Ayush'}
      >
        <span className="social-btn-icon-wrap">
          {isOpen ? (
            <X size={24} className="social-icon-close" />
          ) : (
            <MessageCircle size={24} className="social-icon-open" />
          )}
        </span>
        {/* Subtle Pulse Ripple Ring */}
        <span className="pulse-ripple-ring" aria-hidden="true" />
      </button>
    </div>
  );
}
