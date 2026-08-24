import type { ReleaseRepository } from '~~/server/contexts/releases/domain/ReleaseRepository'

export class ReleaseSearcher {
  constructor(private readonly repository: ReleaseRepository) {}

  search() {
    return this.repository.search()
  }
}
