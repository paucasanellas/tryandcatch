<template>
  <UPage>
    <ReleasesListHero
      v-if="data?.page"
      v-bind="data.page.content.hero"
    />

    <ReleasesListStatus
      v-if="status !== 'success' || !data?.releases.length"
      :status
    />

    <ReleasesListVersions
      v-else
      :releases="data.releases"
    />
  </UPage>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { getReleases } = useReleases()

const { data, error, status } = await useAsyncData(() => `page-releases-${locale.value}`, () => {
  return getReleases(locale.value)
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
  title: () => data.value?.page?.title,
  description: () => data.value?.page?.description,
})
</script>
