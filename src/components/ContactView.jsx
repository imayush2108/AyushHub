import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'gaming',
    tags: ['#ValorantScout'],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const availableTags = [
    '#ValorantScout',
    '#SynthwaveSet',
    '#IMAXScreening',
    '#TechHardwareReview',
    '#BollywoodBangers',
    '#FreeFireRankPush',
  ];

  const toggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#6366f1', '#4edea3'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full text-[#f8fafc] font-sans pb-16">
      <div className="relative w-full overflow-hidden px-4 md:px-12 py-10 md:py-16">
        {/* Atmospheric Ambient Glows */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 -right-24 w-[420px] h-[420px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-[110px] pointer-events-none -z-10"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-sm shadow-blue-400"></span>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Direct Transmission Hub
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#f8fafc] tracking-tight">
              Get in Touch with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">
                Ayush
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              Have a project collaboration, playlist suggestion, movie recommendation, or want to join the gaming squad? Drop a message!
            </p>
          </div>

          {/* Main Two-Column Bento Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Contact & Channels (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Channels Header Tagline */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Priority Channels
                </span>
                <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full font-mono">
                  3 Active Modes
                </span>
              </div>

              {/* Cards Stack */}
              <div className="flex flex-col gap-4">
                {/* WhatsApp Card */}
                <div className="group relative p-6 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/20">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-blue-400 shadow-sm group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          chat
                        </span>
                      </div>
                      <div>
                        <h2 className="font-heading text-lg font-bold text-[#f8fafc]">WhatsApp</h2>
                        <p className="text-base font-semibold text-blue-400 tracking-wide mt-0.5 font-mono">
                          +91 98765 43210
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                      Fastest Response
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mb-4">
                    Direct conversational line for rapid audio curation tips, sudden movie watchalongs, or urgent project briefs.
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Within 2 Hours
                    </span>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-900/30 hover:shadow-lg transition-all"
                    >
                      <span>Chat on WhatsApp</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                    </a>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="group relative p-6 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/20">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-blue-400 shadow-sm group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        call
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="font-heading text-lg font-bold text-[#f8fafc]">Direct Phone</h2>
                        <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono">
                          Voice Line
                        </span>
                      </div>
                      <p className="text-base font-semibold text-blue-400 tracking-wide mt-0.5 font-mono">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-blue-400">schedule</span>
                    Available Mon-Fri, 10 AM - 7 PM IST
                  </p>
                </div>

                {/* Email Card */}
                <div className="group relative p-6 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/20">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-indigo-400 shadow-sm group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        mail
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="font-heading text-lg font-bold text-[#f8fafc]">Official Email</h2>
                        <span className="text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-mono">
                          Enterprise
                        </span>
                      </div>
                      <p className="text-base font-semibold text-indigo-400 tracking-wide mt-0.5 font-mono">
                        ayush@ayushhub.com
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400">
                    For business collaborations, technical consults, event sponsorships, and branded productions.
                  </p>
                </div>
              </div>

              {/* Social Profiles Strip */}
              <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl flex flex-col gap-4 shadow-lg shadow-black/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Digital Presence
                  </span>
                  <span className="text-xs text-slate-500">Unified Handles</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 group-hover:text-blue-400 transition-colors">Instagram</p>
                      <p className="text-xs font-semibold text-[#f8fafc] truncate font-mono">@ayush_hub</p>
                    </div>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[20px]">public</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 group-hover:text-blue-400 transition-colors">Facebook</p>
                      <p className="text-xs font-semibold text-[#f8fafc] truncate">Ayush Hub Official</p>
                    </div>
                  </a>

                  {/* Discord */}
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[20px]">sports_esports</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 group-hover:text-indigo-400 transition-colors">Discord</p>
                      <p className="text-xs font-semibold text-[#f8fafc] truncate font-mono">Ayush#0001</p>
                    </div>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[20px]">smart_display</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 group-hover:text-red-400 transition-colors">YouTube</p>
                      <p className="text-xs font-semibold text-[#f8fafc] truncate font-mono">@AyushHubMedia</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Studio Activity Preview Card */}
              <div className="relative overflow-hidden rounded-xl bg-slate-900/90 border border-slate-800 p-4 flex items-center gap-4 shadow-md">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                  <img
                    src="/images/showcase-gaming-rig.jpg"
                    alt="Audio production studio setup"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/images/logo.jpg'; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 text-blue-400 text-xs font-semibold uppercase">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> Streaming Rig Online
                  </div>
                  <h3 className="font-heading text-sm font-bold text-[#f8fafc] truncate">
                    Bengaluru Sound Lounge
                  </h3>
                  <p className="text-xs text-slate-400 truncate">Live 7.1.4 Dolby Spatial setup</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl shadow-black/30 flex flex-col gap-6">
                {/* Form Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                      Encrypted Dispatch
                    </span>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#f8fafc] mt-1">
                      Send a Direct Message
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs self-start">
                    <span className="material-symbols-outlined text-[16px] text-blue-400">bolt</span>
                    <span>Average reply: 3.5 hrs</span>
                  </div>
                </div>

                {/* Form Content */}
                {submitted ? (
                  <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 flex flex-col items-center text-center gap-3 animate-fade-in py-12">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                      <span className="material-symbols-outlined text-[36px]">task_alt</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white">Transmission Received!</h3>
                    <p className="text-sm text-slate-300 max-w-md">
                      Thank you <span className="font-semibold text-white">{formData.name || 'Friend'}</span>. Your message has been encrypted and dispatched to Ayush. Expect a response soon!
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', category: 'gaming', tags: ['#ValorantScout'], message: '' });
                      }}
                      className="mt-4 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Row 1: Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between" htmlFor="user-name">
                          <span>Your Name</span>
                          <span className="text-blue-400 text-xs">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-4 text-slate-500 pointer-events-none material-symbols-outlined text-[20px]">
                            person
                          </span>
                          <input
                            id="user-name"
                            type="text"
                            required
                            placeholder="Ayush Sharma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-slate-800/70 border border-slate-700/80 text-[#f8fafc] placeholder-slate-500 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between" htmlFor="user-email">
                          <span>Your Email Address</span>
                          <span className="text-blue-400 text-xs">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-4 text-slate-500 pointer-events-none material-symbols-outlined text-[20px]">
                            alternate_email
                          </span>
                          <input
                            id="user-email"
                            type="email"
                            required
                            placeholder="collaborator@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-800/70 border border-slate-700/80 text-[#f8fafc] placeholder-slate-500 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Subject / Category Selection */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-300" htmlFor="form-category">
                        Subject / Collaboration Category
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-slate-500 pointer-events-none material-symbols-outlined text-[20px]">
                          category
                        </span>
                        <select
                          id="form-category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-slate-800/70 border border-slate-700/80 text-[#f8fafc] pl-11 pr-10 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer shadow-inner transition-all"
                        >
                          <option value="music" className="bg-slate-900 text-[#f8fafc]">Music Collaboration &amp; Playlists</option>
                          <option value="film" className="bg-slate-900 text-[#f8fafc]">Film Review Request</option>
                          <option value="gaming" className="bg-slate-900 text-[#f8fafc]">Gaming Squad / Matchup</option>
                          <option value="general" className="bg-slate-900 text-[#f8fafc]">General Feedback &amp; Ideas</option>
                        </select>
                        <span className="absolute right-4 text-slate-500 pointer-events-none material-symbols-outlined text-[20px]">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* Interest Tags */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Interest Tags (Select all that apply)
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => {
                          const isSelected = formData.tags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTag(tag)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold font-mono transition-all ${
                                isSelected
                                  ? 'bg-blue-600/30 border border-blue-500 text-blue-300 shadow-sm'
                                  : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Your Message */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-300" htmlFor="user-message">
                          Your Message
                        </label>
                        <span className="text-xs text-slate-500">Markdown supported</span>
                      </div>
                      <div className="relative">
                        <textarea
                          id="user-message"
                          required
                          rows={4}
                          placeholder="Share your thoughts, playlist links, or gaming IDs..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-slate-800/70 border border-slate-700/80 text-[#f8fafc] placeholder-slate-500 p-4 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner transition-all resize-y"
                        />
                      </div>
                    </div>

                    {/* Submit & Security Policy */}
                    <div className="flex flex-col gap-3 pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white font-semibold text-sm tracking-wide shadow-md shadow-blue-900/40 hover:shadow-lg hover:shadow-blue-800/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <span className="text-base font-bold">Send Message 🚀</span>
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                          send
                        </span>
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs">
                        <span className="material-symbols-outlined text-[16px] text-blue-400">verified_user</span>
                        <span>Zero spam guaranteed. Your personal details are protected by platform privacy keys.</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
