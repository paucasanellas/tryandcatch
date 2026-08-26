<template>
  <UPageSection
    class="quantum-divider"
    :ui="{ container: 'max-w-4xl pt-10 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20' }"
  >
    <div class="quantum-surface rounded-2xl px-5 py-8 sm:px-10 sm:py-12 lg:px-16">
      <MDC :value="content" />
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>
