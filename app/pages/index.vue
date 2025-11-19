<template>
  <div class="w-full flex justify-center">
    <div class="container py-5 space-y-5">
      <h1 class="text-2xl font-semibold">
        {{ $t('common.hotVideos') }}
      </h1>
      <!-- <div class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5">
        <div v-for="i in 40" :key="i">
          <VideoPlayerPlaceholder :src="sampleVideoSrc" :qualities="sampleQualities" />
        </div>
      </div> -->
      <div class="w-full flex justify-center">
        <UPagination
          v-model:page="page"
          :total="100"
          :items-per-page="40"
          :sibling-count="2"
          active-variant="subtle"
          size="lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sampleVideoSrc = 'https://www.w3schools.com/html/mov_bbb.mp4'
const sampleQualities = [
  { label: '1080p', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { label: '720p', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { label: '480p', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
]

const page = ref(1)
</script>

<style scoped></style>
