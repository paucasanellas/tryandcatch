<template>
  <UPageHero
    orientation="vertical"
    :headline="headline"
    :title="title"
    :description="description"
    :links="heroLinks"
    :ui="{
      container: 'py-16 sm:py-20 lg:py-24',
      headline: 'font-mono text-sm text-muted',
      title: 'sm:text-6xl',
      description: 'max-w-2xl mx-auto',
    }"
  />
</template>

<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const props = defineProps<ReleasesListHero>()

const { public: { repository } } = useRuntimeConfig()

const heroLinks = computed<ButtonProps[]>(() => [{
  label: props.links.repository.label,
  to: `${repository.url}/releases`,
  target: '_blank',
  color: 'neutral',
  variant: 'subtle',
  icon: 'lucide:github',
}])
</script>
