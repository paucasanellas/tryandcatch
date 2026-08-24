import type { Release } from '~~/server/contexts/releases/domain/Release'

export interface ReleaseRepository {
  search(): Promise<Release[]>
}
