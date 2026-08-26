<template>
  <UNavigationMenu
    :items="items"
    highlight
    :ui="{ link: 'font-mono text-xs' }"
  />
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()
const { navigation } = useAppConfig()

const items = computed<NavigationMenuItem[]>(() => navigation.desktop.map(item => ({
  label: t(item.labelKey),
  to: localePath(item.to),
})))
</script>
