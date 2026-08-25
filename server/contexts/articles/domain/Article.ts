import { ARTICLE_CATEGORIES } from '~~/shared/types/articles'

import { InvalidArticleError } from '~~/server/contexts/articles/domain/ArticleErrors'

export type ArticlePrimitives = {
  title: string
  description: string
  publishedAt: string
  readingTime: number
  author: string
  categories: string[]
  image: {
    src: string
    alt: string
  }
  content: string
}

export class Article {
  private constructor(
    readonly title: string,
    readonly description: string,
    readonly publishedAt: string,
    readonly readingTime: number,
    readonly author: string,
    readonly categories: ArticleCategory[],
    readonly image: ArticleImage,
    readonly content: string,
  ) {}

  static create(article: ArticlePrimitives) {
    this.ensureArticleIsValid(article)

    return new Article(
      article.title,
      article.description,
      article.publishedAt,
      article.readingTime,
      article.author,
      article.categories as ArticleCategory[],
      article.image,
      article.content,
    )
  }

  private static ensureArticleIsValid(article: ArticlePrimitives) {
    if (!article?.title?.trim()) {
      throw new InvalidArticleError('Article title must be a non-empty string')
    }

    if (!article.description?.trim()) {
      throw new InvalidArticleError('Article description must be a non-empty string')
    }

    if (typeof article.publishedAt !== 'string' || Number.isNaN(Date.parse(article.publishedAt))) {
      throw new InvalidArticleError('Article published date must be valid')
    }

    if (!Number.isInteger(article.readingTime) || article.readingTime <= 0) {
      throw new InvalidArticleError('Article reading time must be a positive integer')
    }

    if (!article.author?.trim()) {
      throw new InvalidArticleError('Article author must be a non-empty string')
    }

    if (!Array.isArray(article.categories) || !article.categories.length) {
      throw new InvalidArticleError('Article must have at least one category')
    }

    if (article.categories.some(category => !ARTICLE_CATEGORIES.includes(category as ArticleCategory))) {
      throw new InvalidArticleError('Article contains an invalid category')
    }

    if (new Set(article.categories).size !== article.categories.length) {
      throw new InvalidArticleError('Article categories must be unique')
    }

    if (!article.image?.src?.trim() || !article.image.alt?.trim()) {
      throw new InvalidArticleError('Article image must include src and alt')
    }

    if (!article.content?.trim()) {
      throw new InvalidArticleError('Article content must be a non-empty string')
    }
  }
}
