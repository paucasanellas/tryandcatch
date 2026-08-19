export default defineNuxtConfig({
  compatibilityDate: 'latest',
  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],
  css: [
    '@/assets/css/main.css',
  ],
  telemetry: false,
  devtools: {
    enabled: true
  }
})
