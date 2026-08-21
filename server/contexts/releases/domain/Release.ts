export class Release {
  constructor(
    readonly tag: string,
    readonly title: string,
    readonly publishedAt: string,
    readonly content: string,
    readonly url: string,
    readonly compareUrl: string | null,
    readonly draft: boolean,
    readonly prerelease: boolean,
  ) {}
}
