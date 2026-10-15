import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vue()],
  base: './',
  server: {
    port: 5173,
    host: true
  }
})
