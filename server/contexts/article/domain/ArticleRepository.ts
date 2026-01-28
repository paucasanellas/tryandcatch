export interface ArticleRepository {
  search(query: ArticleCriteria): Promise<Article[]>
}
