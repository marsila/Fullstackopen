import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
    },
  },
  test : {
    exclude: [
      '**/node_modules/**',
      '**/tests/**', // this line to ignore the Playwright folder
    ],
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/testSetup.js',
  },
})
