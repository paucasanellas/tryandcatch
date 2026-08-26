<template>
  <UPage class="relative min-h-full flex-1 overflow-hidden">
    <ErrorsSceneBackdrop :status-code="statusCode" />

    <UPageSection
      :ui="{
        container: 'relative flex min-h-[calc(100svh-8rem)] items-center justify-center py-16 sm:py-24',
      }"
    >
      <div class="relative z-10 mx-auto max-w-3xl text-center">
        <UBadge
          :label="t('errors.badge')"
          icon="lucide:shield-check"
          :color="isNotFound ? 'primary' : 'error'"
          variant="subtle"
          class="font-mono uppercase tracking-[0.18em]"
        />

        <ErrorsSceneAtom
          :status-code="statusCode"
          class="mx-auto my-3"
        />

        <p class="font-mono text-xs uppercase tracking-[0.24em] text-toned sm:text-sm">
          {{ t('errors.path', { statusCode }) }}
        </p>

        <h1 class="mt-5 text-3xl font-bold tracking-tight text-highlighted sm:text-5xl">
          {{ title }}
        </h1>

        <p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          {{ description }}
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UButton
            v-if="!isNotFound"
            :label="t('errors.actions.retry')"
            icon="lucide:refresh-cw"
            size="lg"
            @click="emit('retry')"
          />

          <UButton
            :label="t('errors.actions.home')"
            icon="lucide:house"
            :color="isNotFound ? 'primary' : 'neutral'"
            :variant="isNotFound ? 'solid' : 'outline'"
            size="xl"
            @click="emit('home')"
          />
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>

<script setup lang="ts">
defineProps<{
  statusCode: number
  title: string
  description: string
  isNotFound: boolean
}>()

const emit = defineEmits<{
  home: []
  retry: []
}>()

const { t } = useI18n()
</script>
