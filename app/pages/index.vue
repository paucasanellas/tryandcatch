<template>
  <UPage v-if="page">
    <HomeHero v-bind="page.hero" />
  </UPage>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { fetchPage } = usePage()

const { data: page } = await useAsyncData(() => `page-home-${locale.value}`, () => {
  return fetchPage(`home_${locale.value}`)
}, {
  watch: [locale],
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>
