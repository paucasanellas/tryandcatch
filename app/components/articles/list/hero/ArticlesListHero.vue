<template>
  <UPageHero
    :headline="headline"
    :title="title"
    :description="description"
  />
</template>

<script setup lang="ts">
defineProps<{
  headline: string
  title: string
  description: string
}>()
</script>
