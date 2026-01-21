import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reportsDirectory: './tests/unit/coverage',
    },
    projects: [
      await defineVitestProject({
        test: {
          name: 'nuxt',
          globals: true,
          setupFiles: ['./tests/vitest.nuxt.ts'],
          include: [
            'app/**/*.{test,spec}.ts',
          ],
          environment: 'nuxt',
          environmentOptions: {
            nuxt: {
              domEnvironment: 'happy-dom',
            },
          },
        },
      }),
    ],
  },
})
