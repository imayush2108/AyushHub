import React from 'react';
import VueMount from './VueMount';
import VueMusicLounge from './vue/VueMusicLounge.vue';
import { useContent } from '../context/ContentContext';

export default function MusicView({ onNavigate }) {
  const { publicSongs, siteContent } = useContent();

  return (
    <div className="w-full">
      <VueMount
        component={VueMusicLounge}
        vueProps={{
          onNavigate,
          songs: publicSongs,
          musicSection: siteContent?.musicSection,
        }}
      />
    </div>
  );
}
