<template>
  <div
    class="circle relative isolate z-(--level) aspect-square w-full rounded-full p-8 sm:p-12 md:p-14 lg:p-10 xl:p-16"
    :class="{ 'black-hole': level === 0 }"
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
      <span class="black-hole-core">
        <span class="singularity" />
      </span>
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
        class="chip absolute top-1/2 left-1/2 rounded-full font-mono shadow-[0_0_1rem_color-mix(in_srgb,var(--ui-primary)_18%,transparent)]"
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
.circle {
  border: 1px solid color-mix(in srgb, var(--ui-border) 72%, transparent);
  background: radial-gradient(circle, transparent 54%, color-mix(in srgb, var(--ui-primary) 3%, transparent) 74%, transparent);
}

.circle::after {
  --start: 0deg;
  --end: 360deg;

  position: absolute;
  z-index: -1;
  inset: -1px;
  padding: 1px;
  content: '';
  background: conic-gradient(from var(--angle), transparent 0 18%, color-mix(in srgb, var(--ui-primary) 72%, transparent) 27%, transparent 36% 62%, color-mix(in srgb, var(--ui-secondary) 58%, transparent) 72%, transparent 82%);
  border-radius: 9999px;
  mask: linear-gradient(black 0 0) content-box, linear-gradient(black 0 0);
  mask-composite: exclude;
  animation: var(--duration) rotate linear infinite;
}

.black-hole {
  box-shadow:
    inset 0 0 5rem color-mix(in srgb, var(--ui-primary) 5%, transparent),
    0 0 5rem color-mix(in srgb, var(--ui-secondary) 5%, transparent);
}

.black-hole-core {
  position: relative;
  display: grid;
  width: 48%;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 9999px;
}

.black-hole-core::before {
  position: absolute;
  inset: -10%;
  content: '';
  background: color-mix(in srgb, var(--ui-secondary) 8%, var(--ui-color-neutral-50));
  border-radius: 46% 54% 48% 52% / 53% 46% 54% 47%;
  filter: blur(0.5rem) drop-shadow(0 0 0.85rem color-mix(in srgb, color-mix(in srgb, var(--ui-secondary) 5%, var(--ui-color-neutral-50)) 58%, transparent));
  mask: radial-gradient(ellipse at 49% 51%, transparent 42%, black 51% 54%, transparent 82%);
  animation: accretion-flare 5.2s ease-in-out infinite, accretion-spin 12s linear infinite;
}

.dark .black-hole-core::before {
  background: color-mix(in srgb, var(--ui-primary) 17%, var(--ui-color-neutral-950));
  filter: blur(0.5rem) drop-shadow(0 0 0.85rem color-mix(in srgb, color-mix(in srgb, var(--ui-primary) 14%, var(--ui-color-neutral-950)) 58%, transparent));
}

.singularity {
  z-index: 1;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 9999px;
  background: var(--ui-color-neutral-50);
  box-shadow: inset 0 0 2rem var(--ui-color-neutral-100), 0 0 1.5rem var(--ui-color-neutral-50);
}

.dark .singularity {
  width: 110%;
  background: var(--ui-color-neutral-950);
  box-shadow: inset 0 0 2rem var(--ui-color-neutral-950), 0 0 1.5rem var(--ui-color-neutral-950);
}

.chips {
  z-index: 2;
  --start: calc(var(--level) * 36deg);
  --end: calc(360deg + (var(--level) * 36deg));
  animation: calc(var(--duration) + 60s) rotate linear infinite;
}

.black-hole:hover::after,
.black-hole:hover .circle::after,
.black-hole:hover .chips,
.black-hole:hover .black-hole-core::before {
  animation-play-state: paused;
}

.chip {
  --deg: calc(var(--index) * (360deg / var(--total)) + var(--angle));
  --transformX: calc(cos(var(--deg)) * var(--offset));
  --transformY: calc(sin(var(--deg)) * var(--offset));
  transform: translate(calc(-50% + var(--transformX)), calc(-50% + var(--transformY)));
}

@keyframes rotate {
  from {
    --angle: var(--start);
  }
  to {
    --angle: var(--end);
  }
}

@keyframes accretion-flare {
  0%, 24%, 100% {
    opacity: 0.76;
    transform: scale(0.985, 0.995);
  }
  42% {
    opacity: 1;
    transform: scale(1.025, 1.005);
  }
  50% {
    opacity: 0.86;
    transform: scale(0.995, 1.012);
  }
  64% {
    opacity: 0.98;
    transform: scale(1.018, 0.998);
  }
  78% {
    opacity: 0.82;
    transform: scale(0.99, 1.006);
  }
}

@keyframes accretion-spin {
  to {
    rotate: 360deg;
  }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: true;
}

@media (prefers-reduced-motion: reduce) {
  .circle::after,
  .chips,
  .black-hole-core::before {
    animation: none;
  }
}
</style>
