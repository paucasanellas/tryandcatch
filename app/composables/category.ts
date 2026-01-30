export const useCategory = () => {
  const { locale } = useI18n()

  async function getBySlug(slug: string) {
    return $fetch<PageCategoriesSlug>(`/api/pages/categories/${slug}`, {
      query: {
        locale: locale.value,
      },
    })
  }

  return {
    getBySlug,
  }
}
