export const useApp = () => {
  const { locale } = useI18n()

  async function get() {
    return $fetch<AppState>(`/api/app`, {
      query: {
        locale: locale.value,
      },
    })
  }

  return {
    get,
  }
}
