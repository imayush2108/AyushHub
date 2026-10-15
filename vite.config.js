import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

function rewritePublicImagesPlugin() {
  let base = '/';
  return {
    name: 'rewrite-public-images',
    enforce: 'pre',
    configResolved(config) {
      base = config.base.endsWith('/') ? config.base : config.base + '/';
    },
    transform(code, id) {
      if (id.includes('node_modules') || !/\.(jsx?|tsx?|vue)$/.test(id)) return null;
      if (!code.includes('/images/')) return null;
      return {
        code: code.replaceAll('/images/', base + 'images/'),
        map: null
      };
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    rewritePublicImagesPlugin(),
    react(),
    vue()
  ],
  base: '/AyushHub/',
  server: {
    port: 5173,
    host: true
  }
})
