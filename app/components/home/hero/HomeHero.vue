<template>
  <UPageHero
    orientation="horizontal"
    :description="description"
    :links="heroLinks"
    :ui="{
      container: 'py-16 sm:py-20 lg:py-24',
      headline: 'font-mono text-sm text-muted',
      title: 'sm:text-6xl',
    }"
  >
    <template #headline>
      {{ headline }} (main v{{ version }})
    </template>

    <template #title>
      {{ title }} <span class="text-primary">{{ titleAccent }}</span>
    </template>

    <HomeHeroSky />

    <HomeHeroOrbit
      :categories="categories"
      class="max-w-md lg:max-w-lg mx-auto"
    />
  </UPageHero>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const props = defineProps<{
  headline: string
  title: string
  titleAccent: string
  description: string
  categories: string[]
  links: {
    blog: { label: string }
    repository: { label: string }
  }
}>()

const { public: { version, repository } } = useRuntimeConfig()

const heroLinks = computed<ButtonProps[]>(() => [
  {
    label: props.links.blog.label,
    to: '/bitacora',
  },
  {
    label: props.links.repository.label,
    to: repository.url,
    target: '_blank',
    color: 'neutral',
    variant: 'subtle',
    icon: 'lucide:github',
  },
])
</script>
