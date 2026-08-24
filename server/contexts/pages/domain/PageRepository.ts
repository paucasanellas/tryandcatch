import type { Page } from '~~/server/contexts/pages/domain/Page'
import type { FindPageCriteria } from '~~/server/contexts/pages/domain/PageCriteria'

export interface PageRepository {
  find(criteria: FindPageCriteria): Promise<Page | null>
}
