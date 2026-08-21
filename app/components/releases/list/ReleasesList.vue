<template>
  <UPageSection :ui="{ container: 'py-12 sm:py-16 lg:py-24' }">
    <UEmpty
      v-if="status === 'idle' || status === 'pending'"
      loading
      variant="naked"
      :title="t('releases.loading.title')"
      :description="t('releases.loading.description')"
    />

    <UAlert
      v-else-if="status === 'error'"
      color="error"
      variant="soft"
      icon="lucide:circle-alert"
      :title="t('releases.error.title')"
      :description="t('releases.error.description')"
      class="max-w-2xl mx-auto"
    >
      <template #actions>
        <UButton
          color="error"
          variant="soft"
          size="xs"
          :label="t('releases.actions.retry')"
          @click="emit('retry')"
        />
      </template>
    </UAlert>

    <UEmpty
      v-else-if="releases.length === 0"
      icon="lucide:package-open"
      :title="t('releases.empty.title')"
      :description="t('releases.empty.description')"
      class="max-w-2xl mx-auto"
    />

    <UChangelogVersions
      v-else
      class="max-w-5xl mx-auto"
    >
      <UChangelogVersion
        v-for="(release, index) in releases"
        :key="release.tag"
        :title="release.title"
        :date="release.date"
        :badge="index === 0 ? latestBadge : undefined"
        :ui="releaseUi"
      >
        <template #body>
          <MDC
            v-if="release.markdown"
            :value="release.markdown"
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
    </UChangelogVersions>
  </UPageSection>
</template>

<script setup lang="ts">
const { releases, status } = defineProps<{
  releases: ReleaseVersion[]
  status: ReleasesStatus
}>()

const emit = defineEmits<{
  retry: []
}>()

const { t } = useI18n()

const latestBadge = computed(() => ({
  label: t('releases.latest'),
  color: 'secondary' as const,
  variant: 'subtle' as const,
}))

const releaseUi = {
  root: 'flex items-start lg:gap-8',
  container: 'w-full max-w-2xl',
  header: 'border-b border-default pb-4',
  title: 'font-mono text-2xl sm:text-3xl',
  date: 'font-mono text-xs/6 text-highlighted',
  indicator: 'sticky top-20 self-start',
  dotInner: 'bg-secondary',
  footer: 'mt-6',
}
</script>
