import type { Collections } from '@nuxt/content'

export const usePage = () => {
  async function fetchPage<Collection extends keyof Collections>(collection: Collection) {
    return await queryCollection(collection).first()
  }

  return {
    fetchPage,
  }
}
