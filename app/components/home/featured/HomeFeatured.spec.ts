import { HomeFeatured } from '#components'
import { render, screen, within } from '@@/tests/utils/nuxt'

describe('Component: HomeFeatured', () => {
  it('should see featured article', async () => {
    await renderComponent()

    const article = screen.getByRole('article')

    within(article).getByRole('link', { name: 'Featured Article' })
    within(article).getByRole('heading', { name: 'Featured Article', level: 2 })
    within(article).getByText('hace 5 años')
    within(article).getByRole('img', { name: 'Featured Article' })
  })
})

async function renderComponent() {
  await render(HomeFeatured, {
    props: {
      article: {
        title: 'Featured Article',
        cover: 'imageUrl',
        description: 'This is a featured article.',
        date: '2021-02-06',
        slug: 'featured-article',
        locale: 'es',
        featured: true,
        readTime: 8,
      },
    },
  })
}
