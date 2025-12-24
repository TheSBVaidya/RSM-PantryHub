import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/users': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/address': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/wishlist': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/category': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/product': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/cart': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
