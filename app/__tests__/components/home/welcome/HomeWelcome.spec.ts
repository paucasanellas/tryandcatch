import { HomeWelcome } from '#components'
import { render, screen } from '@@/tests/utils/nuxt'

describe('Component: HomeWelcome', () => {
  it('should see welcome message', async () => {
    await renderComponent()

    const title = screen.getByRole('heading', {
      level: 1,
      name: `HomeWelcome`,
    })
    expect(title).toBeInTheDocument()
  })
})

async function renderComponent() {
  await render(HomeWelcome)
}
