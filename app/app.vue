<template>
  <UApp :locale="currentLocale">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { en, es } from '@nuxt/ui/locale'

const { locale } = useI18n()
const localeHead = useLocaleHead()

const currentLocale = computed(() => locale.value === 'es' ? es : en)

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: [
    ...(localeHead.value.link ?? []),
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '16x16 32x32' },
  ],
  meta: localeHead.value.meta,
}))
</script>
