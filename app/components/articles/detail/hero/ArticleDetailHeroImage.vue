<template>
  <img
    :src="image.src"
    :alt="image.alt"
    class="aspect-16/10 w-full rounded-xl border border-default object-cover shadow-[0_1.5rem_4rem_color-mix(in_srgb,var(--ui-primary)_12%,transparent),0_0_2rem_color-mix(in_srgb,var(--ui-secondary)_8%,transparent)]"
    fetchpriority="high"
  >
</template>

<script setup lang="ts">
defineProps<{
  image: ArticleImage
}>()
</script>
