import { InvalidReleaseError } from '~~/server/contexts/releases/domain/ReleaseErrors'

export type ReleasePrimitives = {
  tag: string
  title: string
  publishedAt: string
  content: string
  url: string
  compareUrl: string | null
  draft: boolean
  prerelease: boolean
}

export class Release {
  private constructor(
    readonly tag: string,
    readonly title: string,
    readonly publishedAt: string,
    readonly content: string,
    readonly url: string,
    readonly compareUrl: string | null,
    readonly draft: boolean,
    readonly prerelease: boolean,
  ) {}

  static create(release: ReleasePrimitives) {
    this.ensureReleaseIsValid(release)

    return new Release(
      release.tag,
      release.title,
      release.publishedAt,
      release.content,
      release.url,
      release.compareUrl,
      release.draft,
      release.prerelease,
    )
  }

  private static ensureReleaseIsValid(release: ReleasePrimitives) {
    if (typeof release?.tag !== 'string') {
      throw new InvalidReleaseError('Release tag must be a string')
    }

    if (typeof release.title !== 'string') {
      throw new InvalidReleaseError('Release title must be a string')
    }

    if (typeof release.publishedAt !== 'string') {
      throw new InvalidReleaseError('Release published date must be a string')
    }

    if (Number.isNaN(Date.parse(release.publishedAt))) {
      throw new InvalidReleaseError('Release published date must be valid')
    }

    if (typeof release.content !== 'string') {
      throw new InvalidReleaseError('Release content must be a string')
    }

    if (typeof release.url !== 'string') {
      throw new InvalidReleaseError('Release URL must be a string')
    }

    if (release.compareUrl !== null && typeof release.compareUrl !== 'string') {
      throw new InvalidReleaseError('Release compare URL must be a string or null')
    }

    if (typeof release.draft !== 'boolean') {
      throw new InvalidReleaseError('Release draft must be a boolean')
    }

    if (typeof release.prerelease !== 'boolean') {
      throw new InvalidReleaseError('Release prerelease must be a boolean')
    }
  }
}
