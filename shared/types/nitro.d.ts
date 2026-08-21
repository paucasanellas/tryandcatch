import type { ServerContainer } from '#server/contexts/di/container'

declare module 'nitropack/types' {
  interface NitroApp {
    container: ServerContainer
  }
}
