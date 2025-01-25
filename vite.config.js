import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import posts from './src/utils/source'
import { slugify } from './src/utils/functions'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'generate-static-pages',
      apply: 'build',
      async closeBundle() {
        const routes = posts.map(post => `/${slugify(post.name)}`);
        // You can implement static page generation here if needed
        console.log('Routes to be generated:', routes);
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
