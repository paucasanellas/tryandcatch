export const useArticle = () => {
  const { locale } = useI18n()

  async function getBySlug(slug: string) {
    return $fetch<PageArticlesSlug>(`/api/pages/articles/${slug}`, {
      query: {
        locale: locale.value,
      },
    })
  }

  return {
    getBySlug,
  }
}
