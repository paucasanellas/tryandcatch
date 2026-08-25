import { queryCollection } from '@nuxt/content/server'
import { useEvent } from 'nitropack/runtime'

import type { FindPageCriteria } from '~~/server/contexts/pages/domain/PageCriteria'
import type { PageRepository } from '~~/server/contexts/pages/domain/PageRepository'

import { InvalidPageError } from '~~/server/contexts/pages/domain/PageErrors'

export class ContentPageRepository implements PageRepository {
  async find(criteria: FindPageCriteria) {
    try {
      const event = useEvent()
      const collection = this.buildCollectionName(criteria)

      return await queryCollection(event, collection)
        .select('title', 'description', 'content')
        .first()
    }
    catch {
      throw new InvalidPageError()
    }
  }

  private buildCollectionName(criteria: FindPageCriteria) {
    return `${criteria.page}_${criteria.locale}` as 'home_es'
  }
}
