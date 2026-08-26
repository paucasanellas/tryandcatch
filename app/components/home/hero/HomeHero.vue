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

    <HomeHeroOrbit
      :categories="categories"
      class="max-w-md lg:max-w-lg mx-auto"
    />
  </UPageHero>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const props = defineProps<HomeHero>()

const { public: { version, repository } } = useRuntimeConfig()
const localePath = useLocalePath()

const heroLinks = computed<ButtonProps[]>(() => [
  {
    label: props.links.articles.label,
    to: localePath('articles'),
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
