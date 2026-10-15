import React, { useEffect, useRef } from 'react';
import { createApp } from 'vue';

/**
 * Universal React wrapper to mount Vue 3 components seamlessly
 * @param {Object} props
 * @param {Object} props.component - Vue 3 Single File Component
 * @param {Object} [props.vueProps] - Props to pass into Vue component
 * @param {string} [props.className] - CSS class for wrapper
 */
export default function VueMount({ component, vueProps = {}, className = '' }) {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !component) return;

    try {
      // Create and mount Vue 3 app instance
      const app = createApp(component, vueProps);
      if (vueProps.onNavigate) {
        app.provide('onNavigate', vueProps.onNavigate);
      }
      app.mount(containerRef.current);
      appRef.current = app;
    } catch (err) {
      console.error('Error mounting Vue 3 component:', err);
    }

    return () => {
      if (appRef.current) {
        try {
          appRef.current.unmount();
        } catch (err) {
          console.warn('Error unmounting Vue 3 component:', err);
        }
        appRef.current = null;
      }
    };
  }, [component]);

  return <div ref={containerRef} className={className} />;
}
