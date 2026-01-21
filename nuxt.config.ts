export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
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
  compatibilityDate: '2025-07-15',
  pinia: {
    storesDirs: ['./stores/**.store.ts'],
  },
})
