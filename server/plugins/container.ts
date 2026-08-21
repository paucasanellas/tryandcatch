import { createServerContainer } from '#server/contexts/di/container'

export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig()

  nitroApp.container = createServerContainer(config)
})
