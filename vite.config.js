import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'template',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8091,
    proxy: {
      // string shorthand: http://localhost:8091/api -> http://localhost:8090/api
      '/template/api': 'http://localhost:8090',
    }
  }
})
