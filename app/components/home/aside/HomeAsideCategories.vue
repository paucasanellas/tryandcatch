<template>
  <UPageSection :ui>
    <template #title>
      {{ $t('home.aside.categories.title') }}
    </template>

    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="category in store.state.categories"
        :key="category.slug"
        :label="category.name"
        :color="category.color"
        variant="subtle"
      />
    </div>
  </UPageSection>
</template>

<script lang="ts" setup>
import type { PageSectionProps } from '@nuxt/ui'

const store = useAppStore()

const ui: PageSectionProps['ui'] = {
  title: 'text-xl sm:text-xl lg:text-2xl text-left',
  container: 'py-0 sm:py-0 lg:py-0 px-0 sm:px-0 lg:px-0 gap-4 sm:gap-4',
}
</script>
