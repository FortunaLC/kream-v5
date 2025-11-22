<template>
  <div class="w-full flex justify-center">
    <div class="container py-5 space-y-5">
      <h1 class="text-2xl font-semibold">
        {{ $t('common.hotVideos') }}
      </h1>
      <div>
        <p v-if="pending">
          Loading...
        </p>
        <div v-else class="flex gap-5">
          <NuxtLink v-for="video in videos" :key="video.id" :to="`/watch/${video.id}`">
            {{ getTranslation(video.translations, locale, "title") }}
          </NuxtLink>
        </div>
      </div>
      <div class="w-full flex justify-center">
        <ClientOnly>
          <UPagination
            v-model:page="page"
            :total="100"
            :items-per-page="40"
            :sibling-count="2"
            active-variant="subtle"
            size="lg"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getTranslation } = useDirectus()
const { locale } = useI18n()

const sampleVideoSrc = 'https://www.w3schools.com/html/mov_bbb.mp4'
const sampleQualities = [
  { label: '1080p', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { label: '720p', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { label: '480p', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
]

const page = ref(1)

const { data: videos, pending } = await useFetch('/api/videos', {
  method: 'GET',
})
</script>

<style scoped></style>
