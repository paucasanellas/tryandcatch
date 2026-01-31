import type { ChangelogSearchCriteria } from '@@/server/contexts/changelog/domain/Changelog'

export interface ChangelogRepository {
  search(criteria: ChangelogSearchCriteria): Promise<Changelog[]>
}
