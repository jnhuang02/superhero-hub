import { defineConfig } from 'vite'

export default defineConfig({
  // base path for GitHub Pages: https://<user>.github.io/superhero-hub/
  base: '/superhero-hub/',
  build: {
    outDir: '../server/public',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/gifts': {
        target: 'http://localhost:3001',
        base: '/superhero-hub/' 
      }
    }
  }
})