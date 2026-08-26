<template>
  <UPageSection
    class="quantum-divider"
    :ui="{ container: 'py-12 sm:py-16 lg:py-24' }"
  >
    <ArticlesListStatusLoading
      v-if="status === 'idle' || status === 'pending'"
    />

    <ArticlesListStatusError
      v-else-if="status === 'error'"
    />

    <ArticlesListStatusEmpty
      v-else
    />
  </UPageSection>
</template>

<script setup lang="ts">
defineProps<{
  status: ArticlesStatus
}>()
</script>
