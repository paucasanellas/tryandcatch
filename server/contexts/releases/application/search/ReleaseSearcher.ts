import type { Release } from '#server/contexts/releases/domain/Release'
import type { ReleaseRepository } from '#server/contexts/releases/domain/ReleaseRepository'

export class ReleaseSearcher {
  constructor(private readonly repository: ReleaseRepository) {}

  search(): Promise<Release[]> {
    return this.repository.search()
  }
}
