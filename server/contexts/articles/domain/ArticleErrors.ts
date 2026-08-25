import type { FindArticleCriteria } from '~~/server/contexts/articles/domain/ArticleCriteria'

import { NotFoundError, UnprocessableEntityError } from '~~/server/contexts/shared/domain/DomainErrors'

export class ArticleNotFoundError extends NotFoundError {
  constructor(criteria: FindArticleCriteria) {
    super(`Article "${criteria.slug}" not found for locale "${criteria.locale}"`)
  }
}

export class InvalidArticleError extends UnprocessableEntityError {
  constructor(override readonly cause: string) {
    super(cause)
  }
}
