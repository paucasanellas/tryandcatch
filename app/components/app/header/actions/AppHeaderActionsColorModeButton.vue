<template>
  <UButton
    :aria-label="t('actions.changeTheme')"
    color="neutral"
    variant="ghost"
    size="sm"
    @click="toggleColorMode"
  >
    <template #leading="{ ui }">
      <UIcon
        :name="appConfig.ui.icons.dark"
        :class="ui.leadingIcon({ class: 'hidden dark:inline-block' })"
      />
      <UIcon
        :name="appConfig.ui.icons.light"
        :class="ui.leadingIcon({ class: 'dark:hidden' })"
      />
    </template>
  </UButton>
</template>

<script setup lang="ts">
const { t } = useI18n()
const colorMode = useColorMode()
const appConfig = useAppConfig()

const isDark = computed(() => colorMode.value === 'dark')

function updateColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

async function toggleColorMode(event: MouseEvent) {
  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    updateColorMode()
    return
  }

  const button = event.currentTarget as HTMLElement
  const { left, top, width, height } = button.getBoundingClientRect()
  const x = left + width / 2
  const y = top + height / 2
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  const transition = document.startViewTransition(updateColorMode)
  await transition.ready

  document.documentElement.animate(
    [
      { clipPath: `circle(0 at ${x}px ${y}px)` },
      { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
    ],
    {
      duration: 400,
      easing: 'ease-in-out',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
</style>
