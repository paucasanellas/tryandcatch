import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
}, {
  rules: {
    'nuxt/nuxt-config-keys-order': 'warn',
  },
})
