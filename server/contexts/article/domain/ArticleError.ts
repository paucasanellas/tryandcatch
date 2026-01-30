import { NotFoundError } from '@@/server/contexts/shared/errors/Error'

export class ArticleNotFoundError extends NotFoundError {
  constructor(slug: string) {
    super(`Article not found: ${slug}`)
  }
}
