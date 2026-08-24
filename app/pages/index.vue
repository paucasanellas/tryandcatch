<template>
  <UPage v-if="data?.page">
    <HomeHero v-bind="data.page.content.hero" />
  </UPage>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { getHome } = useHome()

const { data, error } = await useAsyncData(() => `page-home-${locale.value}`, () => {
  return getHome(locale.value)
}, {
  watch: [locale],
})

if (error.value) {
  throw createError({
    cause: error.value,
    data: error.value.data,
    fatal: true,
    message: error.value.message,
    status: error.value.status,
    statusText: error.value.statusText,
  })
}

useSeoMeta({
  title: () => data.value?.page.title,
  description: () => data.value?.page.description,
})
</script>
