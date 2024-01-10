import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgx from "@svgx/vite-plugin-react";
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgx(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('http://localhost:8000'),
    __PROJECT__: JSON.stringify('frontend'),
  },
  server: {
    port: 3000,
  },
});
