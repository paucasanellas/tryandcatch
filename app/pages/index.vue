<template>
  <UMain v-if="data">
    <AppContainer>
      <UPage :ui>
        <HomeFeatured
          v-if="data.featured"
          :article="data.featured"
        />
        <HomeLatests :articles="data.latests" />
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
const { handleError } = useServerError()

const { data, error } = await useAsyncData(`home-${locale.value}`, async () => {
  return useHome().get()
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
