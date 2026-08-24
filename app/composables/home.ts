export const useHome = () => {
  async function getHome(locale: string) {
    return await $fetch<GetHomeResponse>('/api/pages/home', {
      query: {
        locale,
      },
    })
  }

  return {
    getHome,
  }
}
