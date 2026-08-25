<template>
  <UPageSection :ui="{ container: 'max-w-3xl pt-10 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20' }">
    <MDC :value="content" />
  </UPageSection>
</template>

<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>
