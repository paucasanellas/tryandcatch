export const useReleases = () => {
  async function getReleases(locale: string) {
    return await $fetch<GetReleasesResponse>('/api/pages/releases', {
      query: {
        locale,
      },
    })
  }

  return {
    getReleases,
  }
}
