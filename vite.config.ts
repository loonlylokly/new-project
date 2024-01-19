import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      widgets: resolve(__dirname, 'src/widgets'),
      shared: resolve(__dirname, 'src/shared'),
      entities: resolve(__dirname, 'src/entities'),
      features: resolve(__dirname, 'src/features'),
      pages: resolve(__dirname, 'src/pages'),
      public: resolve(__dirname, '../public'),
      types: resolve(__dirname, '../types'),
    },
  },
});
