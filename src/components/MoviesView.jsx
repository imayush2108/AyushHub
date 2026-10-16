import React from 'react';
import VueMount from './VueMount';
import VueMovieVault from './vue/VueMovieVault.vue';
import { useContent } from '../context/ContentContext';

export default function MoviesView({ onNavigate }) {
  const { publicMovies, siteContent } = useContent();

  return (
    <div className="w-full">
      <VueMount
        component={VueMovieVault}
        vueProps={{
          onNavigate,
          movies: publicMovies,
          cinemaSection: siteContent?.cinemaSection,
        }}
      />
    </div>
  );
}
