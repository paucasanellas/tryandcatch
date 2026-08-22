export type HomeHeroLink = {
  label: string
}

export type HomeHero = {
  headline: string
  title: string
  titleAccent: string
  description: string
  categories: string[]
  links: {
    articles: HomeHeroLink
    repository: HomeHeroLink
  }
}
