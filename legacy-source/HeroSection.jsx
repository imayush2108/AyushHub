import React from 'react';
import { Play, Sparkles, ArrowRight, Star, Heart, CheckCircle2 } from 'lucide-react';
import { DoodleeSpiral, DoodleSquiggle, DoodleSparkle, DoodleArrow, DoodleDots } from './Doodles';
import { getAssetUrl } from '../utils/assets';


export default function HeroSection() {
  return (
    <section id="home" className="hero-section">
      {/* Decorative Background Doodles */}
      <div className="hero-doodle hero-doodle-top-left">
        <DoodleDots color="rgba(255, 255, 255, 0.45)" count={8} />
      </div>
      <div className="hero-doodle hero-doodle-spiral">
        <DoodleeSpiral color="#FBBF24" size={54} className="doodle-float" />
      </div>
      <div className="hero-doodle hero-doodle-sparkle">
        <DoodleSparkle color="#FFFFFF" size={34} className="doodle-pulse" />
      </div>

      <div className="container hero-container">
        {/* Left Column: Intro & Content */}
        <div className="hero-content-col">
          {/* Top Pill / Small Intro */}
          <div className="hero-welcome-badge">
            <span className="badge-sparkle">✨</span>
            <span>Hello, I'm Ayush</span>
          </div>

          {/* Heading */}
          <h1 className="hero-headline">
            Welcome to <br />
            <span className="hero-name">Ayush Hub</span>
          </h1>

          {/* Subtext */}
          <p className="hero-subtext">
            A personal space for music, movies, gaming, and the digital content I enjoy and create.
          </p>

          {/* CTAs */}
          <div className="hero-actions-row">
            <a href="#services" className="btn btn-primary btn-lg hero-cta-btn">
              <span>Explore My World</span>
              <ArrowRight size={18} />
            </a>

            <a href="#media-lounge" className="hero-video-link" title="Explore My Entertainment Corner">
              <span className="video-play-disc">
                <Play size={16} fill="#FBBF24" color="#FBBF24" />
              </span>
              <span className="video-link-text">My Entertainment Corner</span>
            </a>
          </div>

          {/* Real Community Badge matching reference image */}
          <div className="hero-community-card">
            <div className="avatar-cluster">
              <img src={getAssetUrl('images/avatar-1.jpg')} alt="Community Member 1" className="cluster-avatar" />
              <img src={getAssetUrl('images/avatar-2.jpg')} alt="Community Member 2" className="cluster-avatar" />
              <img src={getAssetUrl('images/avatar-3.jpg')} alt="Vikram Sengupta" className="cluster-avatar" />
              <span className="cluster-avatar-extra">100+</span>
            </div>
            <div className="community-meta">
              <span className="community-label">Active Community</span>
              <span className="community-rating">
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <strong>4.9/5 Rating</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Portrait with organic yellow background and doodles */}
        <div className="hero-image-col">
          {/* Hand-drawn Doodles around portrait */}
          <div className="portrait-doodle portrait-doodle-curl">
            <DoodleSquiggle color="#FFFFFF" width={75} height={25} />
          </div>
          <div className="portrait-doodle portrait-doodle-arrow">
            <DoodleArrow color="#FBBF24" width={48} height={32} />
          </div>

          {/* Main Visual Stage */}
          <div className="hero-visual-stage">
            {/* Organic Golden Amber Background Blob */}
            <div className="hero-blob-bg"></div>

            {/* Ayush's Portrait */}
            <div className="hero-image-frame">
              <img
                src={getAssetUrl('images/hero-ayush.jpg')}
                alt="Ayush Shrivastava - Founder & Curator of Ayush Hub"
                className="hero-portrait-img"
              />
            </div>

            {/* Floating Experience Badge (matching reference) */}
            <div className="floating-badge badge-experience">
              <span className="exp-number">20+</span>
              <div className="exp-text">
                <strong>Years</strong>
                <span>Experience</span>
              </div>
            </div>

            {/* Floating Location Badge */}
            <div className="floating-badge badge-location">
              <span className="loc-icon">📍</span>
              <div className="loc-text">
                <strong>Purnia, Bihar</strong>
                <span>India • Entertainment Hub</span>
              </div>
            </div>

            {/* Vertical Dot Accent on Right Edge */}
            <div className="hero-side-dots">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
