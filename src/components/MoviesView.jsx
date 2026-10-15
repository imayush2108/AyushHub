import React from 'react';
import VueMount from './VueMount';
import VueMovieVault from './vue/VueMovieVault.vue';

export default function MoviesView({ onNavigate }) {
  return (
    <div className="w-full">
      <VueMount component={VueMovieVault} vueProps={{ onNavigate }} />
    </div>
  );
}
