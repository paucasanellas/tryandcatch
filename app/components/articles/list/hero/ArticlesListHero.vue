<template>
  <UPageHero
    :title="title"
    :description="description"
  />
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>
