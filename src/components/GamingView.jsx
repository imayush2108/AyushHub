import React from 'react';
import VueMount from './VueMount';
import VueGamingArena from './vue/VueGamingArena.vue';
import { useContent } from '../context/ContentContext';

export default function GamingView({ onNavigate }) {
  const { siteContent } = useContent();

  return (
    <div className="w-full">
      <VueMount
        component={VueGamingArena}
        vueProps={{
          onNavigate,
          gaming: siteContent?.gaming,
        }}
      />
    </div>
  );
}
