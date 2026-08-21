export const useReleases = () => {
  async function getReleases() {
    return await $fetch<GetReleasesResponse>('/api/pages/releases')
  }

  return {
    getReleases,
  }
}
