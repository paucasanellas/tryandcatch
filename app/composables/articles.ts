export const useArticles = () => {
  async function getArticle(locale: string, slug: string) {
    return await $fetch<GetArticleResponse>(`/api/pages/articles/${slug}`, {
      query: {
        locale,
      },
    })
  }

  return {
    getArticle,
  }
}
