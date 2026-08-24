import type { FindPageCriteria } from '~~/server/contexts/pages/domain/PageCriteria'
import type { PageRepository } from '~~/server/contexts/pages/domain/PageRepository'

import { PageNotFoundError } from '~~/server/contexts/pages/domain/PageErrors'

export class PageFinder {
  constructor(private readonly repository: PageRepository) {}

  async find<T>(criteria: FindPageCriteria) {
    const page = await this.repository.find(criteria)

    if (!page) {
      throw new PageNotFoundError(criteria)
    }

    return page as T
  }
}
