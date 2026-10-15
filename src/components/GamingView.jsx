import React from 'react';
import VueMount from './VueMount';
import VueGamingArena from './vue/VueGamingArena.vue';

export default function GamingView({ onNavigate }) {
  return (
    <div className="w-full">
      <VueMount component={VueGamingArena} vueProps={{ onNavigate }} />
    </div>
  );
}
