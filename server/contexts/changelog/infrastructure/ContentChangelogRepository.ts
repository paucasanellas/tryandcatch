import { queryCollection } from '@nuxt/content/server'
import type { ChangelogCollectionItem } from '@nuxt/content'
import type { ChangelogRepository } from '@@/server/contexts/changelog/domain/ChangelogRepository'
import type { ChangelogSearchCriteria } from '@@/server/contexts/changelog/domain/Changelog'

export class ContentChangelogRepository implements ChangelogRepository {
  constructor(private readonly event: ServerEvent) {}

  async search(criteria: ChangelogSearchCriteria) {
    const changelogs = await queryCollection(this.event, 'changelog')
      .where('locale', '=', criteria.locale)
      .all()

    return changelogs.map(this.changelogToDomain)
  }

  private changelogToDomain(changelog: ChangelogCollectionItem): Changelog {
    return {
      title: changelog.title,
      body: changelog.body,
      locale: changelog.locale,
      version: changelog.version,
      date: changelog.date,
    }
  }
}
