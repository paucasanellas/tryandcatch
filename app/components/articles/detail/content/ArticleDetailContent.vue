<template>
  <UPageSection
    :ui="{ container: 'max-w-3xl pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-20' }"
  >
    <MDC :value="content" />
  </UPageSection>
</template>

<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>
