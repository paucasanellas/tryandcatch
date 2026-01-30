<template>
  <UApp :locale="currentLocale">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script lang="ts" setup>
import { es } from '@nuxt/ui/locale'

const { app } = useAppConfig()
const { locale } = useI18n()
const { init } = useAppStore()

const currentLocale = computed(() => {
  const locales = {
    es,
  }
  return locales[locale.value]
})

useSeoMeta({
  titleTemplate: `%s | ${app.name}`,
})

const head = useLocaleHead({
  dir: true,
  seo: true,
})

useHead({
  htmlAttrs: {
    lang: head.value.htmlAttrs?.lang,
    class: 'scroll-smooth',
  },
})

async function initApp() {
  const { data } = await useApp().get()

  init(data)
}

await callOnce('app', async () => {
  await initApp()
})

watch(locale, async () => {
  await initApp()
})
</script>
