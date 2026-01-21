import { version } from '@@/package.json'

describe('Config: AppConfig', () => {
  it('should return an app config', () => {
    const config = useAppConfig()

    expect(config).toMatchObject({
      app: {
        name: 'Try & Catch',
        version,
      },
    })
  })
})
