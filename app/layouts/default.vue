<template>
  <div class="relative isolate flex min-h-screen flex-col overflow-x-clip bg-default">
    <AppQuantumField class="absolute inset-0 -z-10" />

    <AppHeader />

    <UMain class="flex-1">
      <slot />
    </UMain>

    <AppFooter />
  </div>
</template>
