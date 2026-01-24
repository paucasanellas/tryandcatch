<template>
  <UMain v-if="data">
    <AppContainer>
      <UPage>
        <HomeFeatured
          v-if="data.featured"
          :article="data.featured"
        />

        <template #right>
          <div>Aside</div>
        </template>
      </UPage>
    </AppContainer>
  </UMain>
</template>

<script lang="ts" setup>
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
</script>
