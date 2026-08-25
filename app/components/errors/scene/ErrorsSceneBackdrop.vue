<template>
  <div
    class="error-backdrop pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <div class="quantum-field absolute inset-0" />

    <span
      v-for="particle in particles"
      :key="particle.id"
      class="quantum-particle"
      :class="particle.isPrimary ? 'quantum-particle-primary' : 'quantum-particle-secondary'"
      :style="{
        '--particle-x': `${particle.x}%`,
        '--particle-y': `${particle.y}%`,
        '--particle-size': `${particle.size}px`,
        '--particle-delay': `${particle.delay}s`,
        '--particle-duration': `${particle.duration}s`,
      }"
    />

    <span class="absolute bottom-8 left-8 font-mono text-xs text-dimmed">ERR_{{ statusCode }}</span>
    <span class="absolute right-8 top-8 font-mono text-xs text-dimmed">TRY → CATCH</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  statusCode: number
}>()

const particles = Array.from({ length: 88 }, (_, index) => ({
  id: index,
  x: 2 + ((index * 37) % 96),
  y: 4 + ((index * 53) % 92),
  size: 2 + (index % 4),
  delay: -((index * 0.37) % 5),
  duration: 1.8 + ((index * 0.29) % 3.2),
  isPrimary: index % 3 !== 1,
}))
</script>

<style scoped>
.error-backdrop {
  mask-image: linear-gradient(to bottom, transparent, black 9%, black 91%, transparent);
}

.quantum-field {
  background:
    radial-gradient(circle at 50% 42%, color-mix(in srgb, var(--ui-primary) 11%, transparent), transparent 35%),
    radial-gradient(circle at 50% 55%, color-mix(in srgb, var(--ui-secondary) 9%, transparent), transparent 44%);
}

.quantum-particle {
  position: absolute;
  top: var(--particle-y);
  left: var(--particle-x);
  width: var(--particle-size);
  aspect-ratio: 1;
  border-radius: 9999px;
  background: currentColor;
  box-shadow: 0 0 calc(var(--particle-size) * 2.5) currentColor;
  opacity: 0.12;
  animation: particle-twinkle var(--particle-duration) ease-in-out var(--particle-delay) infinite;
}

.quantum-particle-primary { color: var(--ui-primary); }
.quantum-particle-secondary { color: var(--ui-secondary); }

@keyframes particle-twinkle {
  0%, 100% { opacity: 0.08; scale: 0.65; }
  45% { opacity: 0.8; scale: 1.15; }
  52% { opacity: 0.2; scale: 0.8; }
  68% { opacity: 0.55; scale: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .quantum-particle {
    opacity: 0.25;
    animation: none;
  }
}
</style>
