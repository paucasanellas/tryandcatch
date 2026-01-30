<template>
  <UMain v-if="data">
    <AppContainer>
      <UPage :ui>
        <HomeFeatured
          v-if="data.featuredArticle"
          :article="data.featuredArticle"
        />
        <HomeLatest :articles="data.latestArticles" />
        <template #right>
          <HomeAside />
        </template>
      </UPage>
    </AppContainer>
  </UMain>
</template>

<script lang="ts" setup>
import type { PageProps } from '@nuxt/ui'

const { locale } = useI18n()
const { handleError } = useServer()

const { data, error } = await useAsyncData(`home-${locale.value}`, async () => {
  const { data } = await useHome().get()

  return {
    featuredArticle: data.featuredArticle,
    latestArticles: data.latestArticles,
  }
})

if (error.value) {
  handleError(error.value)
}

useSeoMeta({
  title: $t('home.meta.title'),
})

const ui: PageProps['ui'] = {
  right: 'lg:col-span-3 order-last',
  center: 'lg:col-span-7',
}
</script>
