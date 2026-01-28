export class ArticleNotFoundError extends NotFoundError {
  constructor() {
    super(`Article not found`)
  }
}
