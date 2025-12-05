// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    'motion-v/nuxt',
    '@nuxt/icon',
    '@nuxt/fonts',
  ],

  imports: {
    imports: [{
      from: 'tailwind-variants',
      name: 'tv',
    }, {
      from: 'tailwind-variants',
      name: 'VariantProps',
      type: true,
    }],
  },

  devtools: { enabled: true },
  css: ['./app/assets/css/main.css', '~/assets/css/main.css'],

  colorMode: {
    storageKey: 'kream-v5-color-mode',
    classSuffix: '',
  },

  runtimeConfig: {
    directusUrl: '',
    directusToken: '',
    public: {
      assetsUrl: 'http://46.224.65.187:8055/assets',
    },
  },

  compatibilityDate: '2025-07-15',

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en-US',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'kream-lang',
      fallbackLocale: 'en-US',
    },
    locales: [
      { code: 'en-US', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'de-DE', iso: 'de-DE', file: 'de.json', name: 'Deutsch' },
    ],
  },

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 0,
    },

    mode: 'svg',
    class: 'shrink-0',
    fetchTimeout: 2000,
    serverBundle: 'local',
  },

  image: {
    provider: 'none',
  },
})
