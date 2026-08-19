export default defineNuxtConfig({
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
  compatibilityDate: 'latest',
  telemetry: false,
})
