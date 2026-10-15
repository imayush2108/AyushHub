import React from 'react';
import VueMount from './VueMount';
import VueMusicLounge from './vue/VueMusicLounge.vue';

export default function MusicView({ onNavigate }) {
  return (
    <div className="w-full">
      <VueMount component={VueMusicLounge} vueProps={{ onNavigate }} />
    </div>
  );
}
