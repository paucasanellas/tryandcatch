export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
  ],
  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],
  devtools: {
    enabled: true,
  },
  css: [
    '@/assets/css/main.css',
  ],
  runtimeConfig: {
    public: {
      i18n: {
        baseUrl: '',
      },
    },
  },
  compatibilityDate: 'latest',
  telemetry: false,
  i18n: {
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
    ],
    langDir: 'locales',
    restructureDir: './app',
  },
})
