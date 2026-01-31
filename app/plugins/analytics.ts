export default defineNuxtPlugin(() => {
  const { analytics } = useRuntimeConfig().public

  const umami = useScriptUmamiAnalytics({
    websiteId: analytics.id,
    autoTrack: true,
    domains: [
      analytics.domain,
    ],
    scriptInput: {
      src: analytics.script,
    },
  })

  return {
    provide: {
      umami,
    },
  }
})
