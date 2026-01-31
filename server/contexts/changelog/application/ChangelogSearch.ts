import type { ChangelogRepository } from '@@/server/contexts/changelog/domain/ChangelogRepository'
import type { ChangelogSearchCriteria } from '@@/server/contexts/changelog/domain/Changelog'

export class ChangelogSearch {
  constructor(readonly repository: ChangelogRepository) {}

  async handle(criteria: ChangelogSearchCriteria) {
    return this.repository.search(criteria)
  }
}
