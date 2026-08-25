<template>
  <UBlogPost
    :title="article.title"
    :description="article.description"
    :date="article.publishedAt"
    :image="article.image"
    :to
    orientation="horizontal"
    variant="ghost"
    :ui="articleUi"
  >
    <template #badge>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="category in article.categories"
          :key="category"
          :label="t(`articles.categories.${category}`)"
          color="primary"
          variant="subtle"
        />
      </div>
    </template>

    <template #authors>
      <div class="flex min-w-0 flex-col gap-3 text-sm text-muted">
        <span class="truncate font-mono text-xs text-toned">
          {{ `~${to}` }}
        </span>

        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <span class="flex min-w-0 items-center gap-1.5">
            <UIcon
              name="lucide:user-round"
              class="size-4 shrink-0"
            />
            <span class="truncate">{{ t('articles.author', { author: article.author }) }}</span>
          </span>

          <span class="flex items-center gap-1.5 font-mono text-xs">
            <UIcon
              name="lucide:clock-3"
              class="size-4"
            />
            {{ t('articles.readingTime', { minutes: article.readingTime }) }}
          </span>
        </div>
      </div>
    </template>
  </UBlogPost>
</template>

<script setup lang="ts">
const { article } = defineProps<{
  article: ArticleSummary
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const to = computed(() => localePath({
  name: 'articles-slug',
  params: {
    slug: article.slug,
  },
}))

const articleUi = {
  root: 'lg:gap-10',
  header: 'aspect-[16/10]',
  body: 'min-w-0',
  title: 'text-2xl sm:text-3xl',
  date: 'font-mono text-xs',
  authors: 'pt-5',
}
</script>
