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
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
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
  experimental: {
    asyncContext: true,
  },
  compatibilityDate: 'latest',
  telemetry: false,
  i18n: {
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    customRoutes: 'meta',
    detectBrowserLanguage: false,
    locales: [
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
    ],
    langDir: 'locales',
    restructureDir: './app',
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
})
