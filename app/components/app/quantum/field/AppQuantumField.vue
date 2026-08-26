<template>
  <div
    class="quantum-field"
    aria-hidden="true"
  >
    <div class="quantum-field-glow" />

    <span
      v-for="particle in particles"
      :key="particle.id"
      class="quantum-field-particle"
      :class="particle.isPrimary ? 'text-primary' : 'text-secondary'"
      :style="{
        '--particle-x': `${particle.x}%`,
        '--particle-y': `${particle.y}%`,
        '--particle-size': `${particle.size}px`,
        '--particle-delay': `${particle.delay}s`,
        '--particle-duration': `${particle.duration}s`,
      }"
    />

    <slot />
  </div>
</template>

<script setup lang="ts">
const particles = Array.from({ length: 72 }, (_, index) => ({
  id: index,
  x: 2 + ((index * 37) % 96),
  y: 4 + ((index * 53) % 92),
  size: 2 + (index % 4),
  delay: -((index * 0.37) % 5),
  duration: 1.8 + ((index * 0.29) % 3.2),
  isPrimary: index % 3 !== 1,
}))
</script>
