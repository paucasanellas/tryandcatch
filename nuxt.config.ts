import { version } from './package.json'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/ui',
    '@nuxt/content',
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
  colorMode: {
    preference: 'system',
  },
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
  runtimeConfig: {
    public: {
      version,
      repository: {
        url: 'https://github.com/paucasanellas/tryandcatch',
      },
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
