/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_APP_TARGET || '';
  const outDir = target ? `dist-${target}` : 'dist';

  return {
    plugins: [
      vue(),
      tailwindcss(),
      legacy(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir,
      emptyOutDir: true,
    },
    test: {
      globals: true,
      environment: 'jsdom'
    }
  }
})
