<template>
  <div class="w-full flex justify-center">
    <div class="container py-5">
      <div v-if="error?.message" class="w-full flex justify-center">
        <UAlert
          class="md:w-1/2"
          color="error"
          variant="subtle"
          title="Error"
          :description="error.message"
          icon="i-lucide-alert-circle"
        />
      </div>
      <div v-else-if="pending" class="w-full grid gap-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-1">
        <USkeleton v-for="i in 20" :key="i" class="w-[230px] aspect-video" />
      </div>
      <div v-else class="w-full grid gap-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-1">
        <NuxtLink
          v-for="video in videos"
          :key="video.id"
          :to="`/watch/${video.id}`"
          class="w-full"
        >
          <p> {{ getTranslation(video.translations, locale, 'title') }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getTranslation } = useDirectus()
const { locale } = useI18n()

const route = useRoute()

const { data: videos, error, pending } = await useAsyncData(
  'kream-category-videos', () => $fetch(`/api/categories/${route.params.slug}/videos`, { method: 'GET' }),
)
</script>
