<template>
  <UPageSection :ui="{ container: 'py-12 sm:py-16 lg:py-24' }">
    <ReleasesListStatusLoading
      v-if="status === 'idle' || status === 'pending'"
    />

    <ReleasesListStatusError
      v-else-if="status === 'error'"
    />

    <ReleasesListStatusEmpty
      v-else
    />
  </UPageSection>
</template>

<script setup lang="ts">
const { status } = defineProps<{
  status: ReleasesStatus
}>()
</script>
