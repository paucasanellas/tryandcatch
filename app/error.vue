<template>
  <UApp :locale="es">
    <NuxtLayout name="error">
      <ErrorsScene
        :status-code="statusCode"
        :title="title"
        :description="description"
        :is-not-found="isNotFound"
        @home="goHome"
        @retry="retry"
      />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { es } from '@nuxt/ui/locale'

const error = useError()
const { t } = useI18n()
const localePath = useLocalePath()

const statusCode = computed(() => error.value?.status ?? error.value?.statusCode ?? 500)
const isNotFound = computed(() => statusCode.value === 404)
const title = computed(() => t(isNotFound.value ? 'errors.404.title' : 'errors.500.title'))
const description = computed(() => t(isNotFound.value ? 'errors.404.description' : 'errors.500.description'))

useHead(() => ({
  title: t('errors.pageTitle', { statusCode: statusCode.value }),
}))

function goHome() {
  clearError({ redirect: localePath('/') })
}

function retry() {
  reloadNuxtApp({ force: true })
}
</script>
