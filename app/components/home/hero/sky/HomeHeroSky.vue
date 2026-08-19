<template>
  <div class="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
    <div
      v-for="(star, index) in stars"
      :key="index"
      class="star absolute rounded-full"
      :style="{
        'left': `${star.x}%`,
        'top': `${star.y}%`,
        'transform': 'translate(-50%, -50%)',
        '--star-size': `${star.size}px`,
        '--twinkle-delay': `${star.twinkleDelay}s`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
interface Star {
  x: number
  y: number
  size: number
  twinkleDelay: number
}

const starCount = 60
const minSize = 1
const maxSize = 2.5

const stars = useState<Star[]>('home-hero-sky', () => {
  return Array.from({ length: starCount }, () => ({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    size: Math.random() * (maxSize - minSize) + minSize,
    twinkleDelay: Math.random() * 5,
  }))
})
</script>

<style scoped>
.star {
  width: var(--star-size);
  height: var(--star-size);
  background-color: var(--ui-primary);
  animation: twinkle 4s ease-in-out infinite;
  animation-delay: var(--twinkle-delay);
  will-change: opacity;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.1;
  }

  50% {
    opacity: 0.6;
  }
}
</style>
