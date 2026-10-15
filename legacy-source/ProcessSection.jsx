import React from 'react';
import { Music, Film, Gamepad2, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { DoodleSparkle } from './Doodles';

export default function ProcessSection() {
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

  const steps = [
    {
      num: '01',
      title: 'Handpicked Melodies',
      icon: <Music size={24} />,
      desc: 'Hunting down timeless 2000s Bollywood gems, soulful Sufi rock, and verified sing-along lyrics with zero skip rate.',
      badge: 'Music Vault',
      theme: 'theme-rose',
      loungeTab: 'music'
    },
    {
      num: '02',
      title: 'Unfiltered Movie Audits',
      icon: <Film size={24} />,
      desc: 'Watching verified 2026 releases without spoilers, auditing Hindi dubbing quality, and embedding studio 4K trailers.',
      badge: 'Cinema Vault',
      theme: 'theme-indigo',
      loungeTab: 'movies'
    },
    {
      num: '03',
      title: 'RTX 4080 Benchmarks',
      icon: <Gamepad2 size={24} />,
      desc: 'Rigorous real-time frame time testing on the RTX 4080 Super rig across 1080p, 1440p, and 4K with no sponsor bias.',
      badge: 'Gaming Arena',
      theme: 'theme-amber',
      loungeTab: 'gaming'
    },
    {
      num: '04',
      title: 'Live in the Corner',
      icon: <Sparkles size={24} />,
      desc: 'Delivered directly to My Entertainment Corner with 1-click Spotify playback, Full HD video, and direct WhatsApp chats.',
      badge: 'Hub Experience',
      theme: 'theme-emerald',
      loungeTab: 'music'
    }
  ];

  return (
    <section id="process" className="section process-section">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">HOW AYUSH HUB WORKS</span>
          <h2 className="section-heading">How I Curate Everything</h2>
          <p className="section-subtext">
            From late-night listening in Purnia to real-world PC gaming benchmarks — here's how every track, movie, and game earns its spot on the hub.
          </p>
        </div>

        <div className="process-flow-grid">
          {steps.map((step, idx) => (
            <div 
              key={step.num} 
              className={`process-step-card ${step.theme}`}
              onClick={handleNavigateToLounge(step.loungeTab)}
              role="button"
              tabIndex={0}
              title={`Explore ${step.title} in My Entertainment Corner`}
            >
              <div className="step-top-row">
                <div className="step-icon-circle">
                  {step.icon}
                </div>
                <span className="step-num-watermark">{step.num}</span>
              </div>

              <span className="step-badge">{step.badge}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>

              <div className="step-card-footer">
                <span className="step-explore-hint">
                  <span>Explore in Corner</span>
                  <ExternalLink size={12} />
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div className="step-connector-arrow" aria-hidden="true">
                  <ArrowRight size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
