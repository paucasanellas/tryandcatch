export const useArticle = () => {
  const { locale } = useI18n()

  async function find(slug: string) {
    return $fetch<ArticleFindResponse>(`/api/articles/${slug}`, {
      query: {
        locale: locale.value,
      },
    })
  }

  return {
    find,
  }
}
