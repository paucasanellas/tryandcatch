export const useServerArticle = () => {
  function getWithoutBody({ body, ...article }: Article): ArticleWithoutBody {
    return article
  }

  return {
    getWithoutBody,
  }
}
