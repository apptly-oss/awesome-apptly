// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

const isDevelopment = process.env.NODE_ENV !== 'production';

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    'nuxt-studio',
  ],
  devtools: { enabled: isDevelopment },
  css: ['~/assets/css/main.css'],
  content: {
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
  },
  compatibilityDate: '2026-03-24',
  nitro: {
    preset: 'cloudflare-module',
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [],
    },
    build: {
      sourcemap: isDevelopment,
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'apptly-dev',
      repo: 'awesome-apptly',
      branch: 'stage',
    },
  },
});
