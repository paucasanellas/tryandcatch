export const useHome = () => {
  const { locale } = useI18n()

  async function get() {
    return $fetch<PageHomeResponse>(`/api/home`, {
      query: {
        locale: locale.value,
      },
    })
  }

  return {
    get,
  }
}
