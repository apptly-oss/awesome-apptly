// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

const isDevelopment = process.env.NODE_ENV !== 'production';

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
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
    storage: {
      versions: {
        driver: 'cloudflare-kv-binding',
        binding: 'VERSIONS_KV',
      },
    },
    devStorage: {
      versions: {
        driver: 'memory',
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: isDevelopment,
    },
  },
  hooks: {
    'vite:extendConfig'(config) {
      // @nuxtjs/mdc pushes remark/rehype entries into optimizeDeps.include
      // after config merges, but they're unresolvable (server-only deps).
      const include = config.optimizeDeps?.include;
      if (include) {
        config.optimizeDeps!.include = include.filter(
          (entry: string) => !entry.includes('@nuxtjs/mdc >'),
        );
      }
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  icon: {
    clientBundle: {
      scan: true,
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
