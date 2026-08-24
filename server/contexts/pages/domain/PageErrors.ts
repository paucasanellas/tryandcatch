import type { FindPageCriteria } from '~~/server/contexts/pages/domain/PageCriteria'

import { NotFoundError, UnprocessableEntityError } from '~~/server/contexts/shared/domain/DomainErrors'

export class PageNotFoundError extends NotFoundError {
  constructor(criteria: FindPageCriteria) {
    super(`Page "${criteria.page}" not found for locale "${criteria.locale}"`)
  }
}

export class InvalidPageError extends UnprocessableEntityError {
  constructor() {
    super('Page could not be retrieved')
  }
}
