export const useArticle = () => {
  const { locale } = useI18n()

  async function find(slug: string) {
    return $fetch<ArticleSlugResponse>(`/api/articles/${slug}`, {
      query: {
        locale: locale.value,
      },
    })
  }

  return {
    find,
  }
}
