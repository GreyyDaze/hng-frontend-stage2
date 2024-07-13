import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.timbu.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
