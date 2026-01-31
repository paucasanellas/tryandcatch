import type { MarkdownRoot } from '@nuxt/content'

export type Changelog = {
  version: string
  title: string
  date: string
  locale: string
  body: MarkdownRoot
}
