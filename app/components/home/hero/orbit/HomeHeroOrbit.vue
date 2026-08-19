<template>
  <div
    class="circle isolate rounded-full relative w-full aspect-square p-8 sm:p-12 md:p-14 lg:p-10 xl:p-16 before:absolute before:inset-px before:bg-default before:rounded-full z-(--level)"
    :style="{
      '--duration': `${(level + 1) * 8}s`,
      '--level': level + 1,
    }"
  >
    <HomeHeroOrbit
      v-if="level + 1 < max"
      :categories="remainingCategories"
      :level="level + 1"
      :max="max"
    />

    <div
      v-else
      class="absolute inset-0 flex items-center justify-center"
    >
      <USkeleton class="rounded-full size-20 sm:size-28 lg:size-24 xl:size-32" />
    </div>

    <div
      ref="ringElement"
      class="chips absolute inset-0 grid"
      :style="{
        '--total': ringCategories.length,
        '--offset': `${ringWidth / 2}px`,
      }"
    >
      <UBadge
        v-for="(category, index) in ringCategories"
        :key="category"
        :label="category"
        color="neutral"
        variant="subtle"
        class="chip absolute top-1/2 left-1/2 rounded-full font-mono"
        :style="{
          '--index': index + 1,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  categories: string[]
  level?: number
  max?: number
}>(), {
  level: 0,
  max: 3,
})

const chipsPerRing = 5

const ringCategories = computed(() => props.categories.slice(0, chipsPerRing))
const remainingCategories = computed(() => props.categories.slice(chipsPerRing))

const ringElement = ref<HTMLElement | null>(null)
const ringWidth = ref(0)
let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  if (!ringElement.value) {
    return
  }

  resizeObserver = new ResizeObserver((entries) => {
    ringWidth.value = entries[0]?.contentRect.width ?? 0
  })
  resizeObserver.observe(ringElement.value)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<style scoped>
.circle:after {
  --start: 0deg;
  --end: 360deg;
  --border-color: var(--ui-border);
  --highlight-color: var(--ui-color-neutral-400);

  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: -1px;
  opacity: 1;
  border-radius: 9999px;
  z-index: -1;
  background: var(--border-color);

  @supports (background: paint(houdini)) {
    background: linear-gradient(var(--angle), var(--border-color), var(--border-color), var(--border-color), var(--border-color), var(--highlight-color));
    animation: var(--duration) rotate linear infinite;
  }
}

.dark .circle:after {
  --highlight-color: white;
}

.chips {
  --start: calc(var(--level) * 36deg);
  --end: calc(360deg + (var(--level) * 36deg));
  transform: rotate(var(--angle));
  animation: calc(var(--duration) + 60s) rotate linear infinite;
}

.chip {
  --deg: calc(var(--index) * (360deg / var(--total)));
  --transformX: calc(cos(var(--deg)) * var(--offset));
  --transformY: calc(sin(var(--deg)) * var(--offset));
  transform: translate(calc(-50% + var(--transformX)), calc(-50% + var(--transformY))) rotate(calc(360deg - var(--angle)));
}

@keyframes rotate {
  from {
    --angle: var(--start);
  }
  to {
    --angle: var(--end);
  }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: true;
}
</style>
