<template>
  <UChangelogVersion
    :title="release.title"
    :date="release.publishedAt"
    :ui="releaseUi"
  >
    <template #badge>
      <div
        v-if="latest || release.prerelease"
        class="flex flex-wrap items-center gap-2"
      >
        <UBadge
          v-if="latest"
          :label="t('releases.latest')"
          color="secondary"
          variant="subtle"
        />

        <UBadge
          v-if="release.prerelease"
          :label="t('releases.prerelease')"
          color="warning"
          variant="subtle"
        />
      </div>
    </template>

    <template #body>
      <MDC
        v-if="release.content"
        :value="release.content"
        class="mt-6"
      />
    </template>

    <template #actions>
      <UButton
        :to="release.url"
        target="_blank"
        color="neutral"
        variant="link"
        size="sm"
        trailing-icon="lucide:arrow-up-right"
        :label="t('releases.actions.viewRelease')"
      />

      <UButton
        v-if="release.compareUrl"
        :to="release.compareUrl"
        target="_blank"
        color="neutral"
        variant="link"
        size="sm"
        trailing-icon="lucide:arrow-up-right"
        :label="t('releases.actions.fullChangelog')"
      />
    </template>
  </UChangelogVersion>
</template>

<script setup lang="ts">
const { release, latest } = defineProps<{
  release: Release
  latest: boolean
}>()

const { t } = useI18n()

const releaseUi = {
  root: 'quantum-state flex items-start lg:gap-8',
  container: 'w-full max-w-2xl',
  header: 'border-b border-default pb-4',
  title: 'font-mono text-2xl sm:text-3xl',
  date: 'font-mono text-xs/6 text-highlighted',
  indicator: 'sticky top-20 self-start',
  dot: 'shadow-[0_0_1rem_color-mix(in_srgb,var(--ui-secondary)_35%,transparent)]',
  dotInner: 'bg-secondary shadow-[0_0_0.75rem_var(--ui-secondary)]',
  footer: 'mt-6',
}
</script>
