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

export type HomeContent = {
  hero: HomeHero
}

export type GetHomeResponse = {
  page: PageResponse<HomeContent>
}
