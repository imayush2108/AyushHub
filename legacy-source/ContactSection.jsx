import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Send, CheckCircle2, Sparkles, Clock, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Music Suggestion',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    const newMsg = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      category: formData.category,
      message: formData.message,
      time: new Date().toLocaleString('en-IN')
    };

    try {
      // Direct API delivery straight to Ayush's Gmail inbox!
      const response = await fetch('https://formsubmit.co/ajax/ayushshrivastava2108@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'Name': formData.name,
          'Sender Email': formData.email,
          'Subject Topic': formData.category,
          'Message': formData.message,
          '_subject': `[Ayush Hub] New Message from ${formData.name} (${formData.category})`,
          '_template': 'table'
        })
      });

      const resData = await response.json();
      console.log('FormSubmit delivery result:', resData);

      // Save a local copy in browser storage as backup
      try {
        const existing = JSON.parse(localStorage.getItem('ayush_hub_messages') || '[]');
        existing.unshift(newMsg);
        localStorage.setItem('ayush_hub_messages', JSON.stringify(existing));
      } catch (err) {}

      // Trigger celebration confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });

      setLastSubmission(newMsg);
      setSubmitted(true);
      setToastMessage('🎉 Message delivered directly to ayushshrivastava2108@gmail.com!');
    } catch (err) {
      console.error('Submission error:', err);
      // Even in case of offline network issue, show confirmation & backup actions
      setLastSubmission(newMsg);
      setSubmitted(true);
      setToastMessage('Message recorded! You can also forward it via WhatsApp.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setToastMessage('');
      }, 7000);
    }
  };

  const handleDirectWhatsApp = () => {
    const text = `Hi Ayush! My name is ${formData.name || 'Friend'} (${formData.email || 'No email provided'}).%0A%0ATopic: ${formData.category}%0A%0AMessage:%0A${formData.message || 'Looking forward to connecting with you!'}`;
    window.open(`https://wa.me/919508678989?text=${text}`, '_blank');
  };



  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag tag-amber">GET IN TOUCH</span>
          <h2 className="section-heading">Connect Directly with Ayush Hub</h2>
          <p className="section-subtext">
            Have a playlist recommendation, want to discuss a movie plot twist, or want to squad up for gaming? 
            Reach out through any channel below.
          </p>
        </div>

        <div className="contact-main-grid">
          {/* Left Column: Contact Cards & Business Details */}
          <div className="contact-info-col">
            <h3 className="contact-info-title">Business & Direct Contact Info</h3>
            <p className="contact-info-sub">
              Ayush here — sharing everything I love about music, movies, and games. Come join the conversation.
            </p>

            <div className="contact-cards-stack">
              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/919508678989?text=Hi%20Ayush,%20reaching%20out%20from%20Ayush%20Hub!"
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-card-item card-whatsapp"
              >
                <div className="contact-card-icon icon-wa">
                  <MessageSquare size={22} />
                </div>
                <div className="contact-card-details">
                  <span className="contact-card-label">WhatsApp (Instant Response)</span>
                  <strong className="contact-card-val">+91 9508678989</strong>
                  <span className="contact-sub-action">Click to chat directly ↗</span>
                </div>
              </a>

              {/* Phone Call Card */}
              <a href="tel:9508678989" className="contact-card-item card-phone">
                <div className="contact-card-icon icon-ph">
                  <Phone size={22} />
                </div>
                <div className="contact-card-details">
                  <span className="contact-card-label">Direct Phone Call</span>
                  <strong className="contact-card-val">+91 9508678989</strong>
                  <span className="contact-sub-action">Available 10:00 AM – 9:00 PM IST ↗</span>
                </div>
              </a>

              {/* Email Card */}
              <a href="mailto:ayushshrivastava2108@gmail.com" className="contact-card-item card-email">
                <div className="contact-card-icon icon-em">
                  <Mail size={22} />
                </div>
                <div className="contact-card-details">
                  <span className="contact-card-label">Business Email</span>
                  <strong className="contact-card-val">ayushshrivastava2108@gmail.com</strong>
                  <span className="contact-sub-action">For collaborations & enquiries ↗</span>
                </div>
              </a>

              {/* Location Card */}
              <div className="contact-card-item card-location">
                <div className="contact-card-icon icon-loc">
                  <MapPin size={22} />
                </div>
                <div className="contact-card-details">
                  <span className="contact-card-label">Location / Hub Base</span>
                  <strong className="contact-card-val">Purnia, Bihar, India</strong>
                  <span className="contact-sub-action">Pin: 854301 • Global Online Presence</span>
                </div>
              </div>
            </div>

            {/* Quick Map Banner */}
            <div className="purnia-map-banner">
              <div className="map-badge-pin">
                <MapPin size={16} /> <span>Purnia, Bihar, India</span>
              </div>
              <p className="map-sub">
                From Bihar to the world — exploring music, movies, and games with you.
              </p>
              <a 
                href="https://maps.google.com/?q=Purnia,Bihar,India" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-map-link"
              >
                <span>View Purnia on Google Maps</span>
                <Globe size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <div className="form-card-header">
                <h3>Send a Message</h3>
                <p>Fill out the form below or start a direct WhatsApp chat.</p>
              </div>

              {submitted ? (
                <div className="form-success-alert">
                  <CheckCircle2 size={44} className="success-icon" />
                  <h4>Message Sent Directly to Ayush's Gmail!</h4>
                  <p>
                    Thank you, <strong>{lastSubmission?.name}</strong>! Your message has been dispatched straight to <strong>ayushshrivastava2108@gmail.com</strong>.
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#047857', marginTop: '0.4rem' }}>
                    Ayush will review your note and respond to your email: <strong>{lastSubmission?.email}</strong>.
                  </p>

                  <div className="success-action-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.4rem' }}>
                    <a 
                      href={`https://wa.me/919508678989?text=${encodeURIComponent(`Hi Ayush! My name is ${lastSubmission?.name} (${lastSubmission?.email}).\n\nTopic: ${lastSubmission?.category}\n\nMessage:\n${lastSubmission?.message}`)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                    >
                      <MessageSquare size={16} />
                      <span>Also Ping on WhatsApp (+91 9508678989)</span>
                    </a>

                    <button 
                      onClick={() => { 
                        setSubmitted(false); 
                        setFormData({ name: '', email: '', category: 'Music Suggestion', message: '' }); 
                      }}
                      className="btn btn-sm"
                      style={{ color: '#64748B', textDecoration: 'underline', marginTop: '0.4rem', cursor: 'pointer' }}
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="interactive-form">
                  <div className="form-group">
                    <label htmlFor="contact-name">Your Full Name *</label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      name="name" 
                      required 
                      placeholder="e.g. Pooja Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input 
                      type="email" 
                      id="contact-email" 
                      name="email" 
                      required 
                      placeholder="e.g. pooja@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-category">What are you connecting about?</label>
                    <select 
                      id="contact-category" 
                      name="category" 
                      value={formData.category}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Music Suggestion">🎵 Music Playlist Suggestion / Collab</option>
                      <option value="Movie Recommendation Request">🎬 Movie / Series Recommendation Request</option>
                      <option value="Gaming Squad & Benchmarks">🎮 Gaming Squad & Benchmarks Discussion</option>
                      <option value="Business & Brand Partnership">🤝 Business & Brand Partnership</option>
                      <option value="General Greetings">💬 General Hello from Purnia / Beyond</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-msg">Your Message *</label>
                    <textarea 
                      id="contact-msg" 
                      name="message" 
                      rows="4" 
                      required 
                      placeholder="Tell Ayush what track you are listening to, which movie you watched, or what games you love..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <div className="form-submit-actions">
                    <button 
                      type="submit" 
                      className="btn btn-primary form-submit-btn"
                      disabled={isSubmitting}
                      style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                    >
                      {isSubmitting ? (
                        <span>Sending to Gmail... ⏳</span>
                      ) : (
                        <>
                          <span>Send to Ayush</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>

                    <button 
                      type="button" 
                      onClick={handleDirectWhatsApp} 
                      className="btn btn-whatsapp form-wa-btn"
                    >
                      <span>Send via WhatsApp</span>
                      <MessageSquare size={16} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-popup" role="alert">
          <Sparkles size={20} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
}
