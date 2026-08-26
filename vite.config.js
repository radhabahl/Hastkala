import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
        thankYou: resolve(import.meta.dirname, 'thank-you.html'),
      },
    },
  },
});
