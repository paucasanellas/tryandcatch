<template>
  <img
    :src="image.src"
    :alt="image.alt"
    class="aspect-16/10 w-full rounded-xl border border-default object-cover shadow-xl shadow-neutral-950/5"
    fetchpriority="high"
  >
</template>

<script setup lang="ts">
defineProps<{
  image: ArticleImage
}>()
</script>
