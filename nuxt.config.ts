export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/ui',
  ],
  components: [
    { path: '@/components', pathPrefix: false },
  ],
  devtools: {
    enabled: import.meta.env.DEVTOOLS_ENABLED || false,
    timeline: {
      enabled: true,
    },
  },
  css: [
    '@/assets/css/main.css',
  ],
  colorMode: {
    preference: 'light',
  },
  compatibilityDate: '2025-07-15',
  i18n: {
    baseUrl: 'https://tryandcatch.dev',
    defaultLocale: 'es',
    locales: [
      { code: 'es', language: 'es-ES', file: 'es.json' },
    ],
    langDir: 'locales',
    restructureDir: './app',
  },
  pinia: {
    storesDirs: ['./stores/**.store.ts'],
  },
})
