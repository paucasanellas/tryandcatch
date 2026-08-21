<template>
  <UPage v-if="page">
    <ReleasesHero v-bind="page.hero" />
    <ReleasesList
      :releases="versions || []"
      :status="status"
      @retry="refresh()"
    />
  </UPage>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { fetchPage } = usePage()
const { public: { repository } } = useRuntimeConfig()

const { data: page } = await useAsyncData(() => `page-releases-${locale.value}`, () => {
  return fetchPage(`releases_${locale.value}`)
}, {
  watch: [locale],
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const repositorySlug = repository.url.replace('https://github.com/', '')
const releasesUrl = `https://ungh.cc/repos/${repositorySlug}/releases`

const { data: versions, status, refresh } = await useLazyFetch(releasesUrl, {
  transform: (data: ReleasesApiResponse) => data.releases
    .filter(release => !release.draft)
    .map(normalizeRelease),
})

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})

function normalizeRelease(release: ReleasesApiRelease): ReleaseVersion {
  const [heading = '', ...body] = release.markdown.split('\n')
  const compareUrl = heading.match(/\]\((https:\/\/github\.com\/[^)]+\/compare\/[^)]+)\)/)?.[1]
  const markdown = heading.startsWith('## ') ? body.join('\n').trim() : release.markdown

  return {
    tag: release.tag,
    title: release.name || release.tag,
    date: release.publishedAt,
    markdown,
    url: `${repository.url}/releases/tag/${encodeURIComponent(release.tag)}`,
    compareUrl,
  }
}
</script>
