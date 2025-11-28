// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    '@nuxtjs/i18n',
  ],
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
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
  image: {
    provider: 'none',
  },
})
