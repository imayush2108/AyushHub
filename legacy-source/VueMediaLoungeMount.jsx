import React, { useEffect, useRef } from 'react';
import { createApp } from 'vue';
import InteractiveMediaLounge from './InteractiveMediaLounge.vue';

export default function VueMediaLoungeMount() {
  const containerRef = useRef(null);

  useEffect(() => {
    let app = null;
    try {
      if (containerRef.current) {
        // Mount the reactive Vue 3 application into the React DOM container
        app = createApp(InteractiveMediaLounge);
        app.mount(containerRef.current);
      }
    } catch (err) {
      console.error('Error mounting Vue lounge:', err);
    }

    return () => {
      try {
        if (app) {
          app.unmount();
        }
      } catch (err) {
        console.warn('Error unmounting Vue lounge:', err);
      }
    };
  }, []);


  return (
    <section id="media-lounge" className="section section-lounge">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag tag-amber">⚡ ENTERTAINMENT VAULT</span>
          <h2 className="section-heading">My Entertainment Corner</h2>
          <p className="section-subtext">
            Immerse yourself in Ayush's real-time entertainment dashboard. Listen to favorite music, explore verified cinema, and check gaming benchmark estimates.
          </p>
        </div>

        {/* Vue 3 Component Mount Container */}
        <div ref={containerRef} className="vue-lounge-container" />
      </div>
    </section>
  );
}
