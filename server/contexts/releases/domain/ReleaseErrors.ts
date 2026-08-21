export class InvalidReleaseDataError extends Error {
  override name = 'InvalidReleaseDataError'

  constructor(options?: ErrorOptions) {
    super('Invalid release data', options)
  }
}

export class ReleaseSearchError extends Error {
  override name = 'ReleaseSearchError'

  constructor(options?: ErrorOptions) {
    super('Releases could not be retrieved', options)
  }
}
