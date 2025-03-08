// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/todo-app/', 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});