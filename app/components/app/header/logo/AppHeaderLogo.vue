<template>
  <span class="app-logo inline-flex items-center font-mono text-sm font-medium tracking-tight">
    <span
      class="app-logo-brace app-logo-brace-left text-primary"
      aria-hidden="true"
    >
      {
    </span>
    <span class="app-logo-name text-highlighted">
      {{ t('app.name') }}
    </span>
    <span
      class="app-logo-brace app-logo-brace-right text-secondary"
      aria-hidden="true"
    >
      }
    </span>
  </span>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.app-logo-brace,
.app-logo-name {
  transition: color 180ms ease, transform 180ms ease;
}

.app-logo-name {
  position: relative;
  margin-inline: 0.35rem;
}

.app-logo-name::after {
  position: absolute;
  right: 0;
  bottom: -0.2rem;
  left: 0;
  height: 1px;
  content: '';
  background: linear-gradient(90deg, var(--ui-primary), var(--ui-secondary));
  opacity: 0;
  transform: scaleX(0.35);
  transition: opacity 180ms ease, transform 180ms ease;
}

.app-logo:hover .app-logo-brace-left,
:global(a:focus-visible) .app-logo-brace-left {
  transform: translateX(-0.2rem) rotate(-3deg);
}

.app-logo:hover .app-logo-brace-right,
:global(a:focus-visible) .app-logo-brace-right {
  transform: translateX(0.2rem) rotate(3deg);
}

.app-logo:hover .app-logo-name,
:global(a:focus-visible) .app-logo-name {
  transform: translateY(-1px);
}

.app-logo:hover .app-logo-name::after,
:global(a:focus-visible) .app-logo-name::after {
  opacity: 0.75;
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .app-logo-brace,
  .app-logo-name,
  .app-logo-name::after {
    transition: none;
  }
}
</style>
