<template>
  <UApp :locale="es">
    <UPage class="min-h-screen">
      <UPageSection
        :ui="{
          container: 'min-h-screen flex items-center justify-center py-16 sm:py-24',
        }"
      >
        <div class="mx-auto max-w-2xl text-center">
          <p class="font-mono text-sm text-primary">
            {{ t('errors.path', { statusCode: error.statusCode }) }}
          </p>

          <h1 class="mt-4 text-4xl font-bold tracking-tight text-highlighted sm:text-6xl">
            {{ title }}
          </h1>

          <p class="mt-6 text-lg text-muted">
            {{ description }}
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <UButton
              v-if="!isNotFound"
              :label="t('errors.actions.retry')"
              icon="lucide:refresh-cw"
              @click="retry"
            />

            <UButton
              :label="t('errors.actions.home')"
              icon="lucide:house"
              :color="isNotFound ? 'primary' : 'neutral'"
              :variant="isNotFound ? 'solid' : 'subtle'"
              @click="goHome"
            />
          </div>
        </div>
      </UPageSection>
    </UPage>
  </UApp>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { es } from '@nuxt/ui/locale'

const { error } = defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const isNotFound = computed(() => error.statusCode === 404)
const title = computed(() => t(isNotFound.value ? 'errors.404.title' : 'errors.500.title'))
const description = computed(() => t(isNotFound.value ? 'errors.404.description' : 'errors.500.description'))

useHead(() => ({
  title: t('errors.pageTitle', { statusCode: error.statusCode }),
}))

function goHome() {
  clearError({ redirect: '/' })
}

function retry() {
  reloadNuxtApp({ force: true })
}
</script>
