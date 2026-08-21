<template>
  <UPage>
    <ReleasesHero
      v-if="data?.page"
      v-bind="data.page.hero"
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
const { fetchPage } = usePage()
const { getReleases } = useReleases()

const { data, status } = await useAsyncData(() => `page-releases-${locale.value}`, async () => {
  const [page, releasesResponse] = await Promise.all([
    fetchPage(`releases_${locale.value}`),
    getReleases(),
  ])

  return {
    page,
    releases: releasesResponse.releases,
  }
}, {
  watch: [locale],
})

if (status.value === 'success' && !data.value?.page) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: () => data.value?.page?.title,
  description: () => data.value?.page?.description,
})
</script>
