export const useArticles = () => {
  async function getArticles(locale: string) {
    return await $fetch<GetArticlesResponse>('/api/pages/articles', {
      query: {
        locale,
      },
    })
  }

  async function getArticle(locale: string, slug: string) {
    return await $fetch<GetArticleResponse>(`/api/pages/articles/${slug}`, {
      query: {
        locale,
      },
    })
  }

  return {
    getArticle,
    getArticles,
  }
}
