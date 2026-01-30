export const useHome = () => {
  const { locale } = useI18n()

  async function get() {
    return $fetch<PageHomeResponse>(`/api/pages/home`, {
      query: {
        locale: locale.value,
      },
    })
  }

  return {
    get,
  }
}
