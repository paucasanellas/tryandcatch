<template>
  <figure class="article-cover relative isolate w-full rounded-xl">
    <img
      :src="image.src"
      :alt="image.alt"
      class="aspect-16/10 w-full rounded-xl object-cover shadow-[0_1.5rem_4rem_color-mix(in_srgb,var(--ui-primary)_12%,transparent),0_0_2rem_color-mix(in_srgb,var(--ui-secondary)_8%,transparent)]"
      fetchpriority="high"
    >
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  image: ArticleImage
}>()
</script>

<style scoped>
.article-cover::before {
  position: absolute;
  z-index: 1;
  inset: 0;
  padding: 2px;
  pointer-events: none;
  content: '';
  background: linear-gradient(110deg, var(--ui-secondary), var(--ui-primary), var(--ui-secondary));
  background-size: 220% 100%;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 200ms ease;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.article-cover:hover::before {
  opacity: 1;
  animation: article-cover-energy 1.8s linear infinite;
}

@keyframes article-cover-energy {
  to { background-position: 220% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .article-cover::before {
    transition: none;
  }

  .article-cover:hover::before {
    background-position: 50% 0;
    animation: none;
  }
}
</style>
