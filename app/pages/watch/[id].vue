<template>
  <div class="w-full grid grid-cols-8 gap-8 p-8">
    <div class="md:col-span-6 col-span-8 flex flex-col items-center">
      <div class="aspect-video bg-primary-600 w-full" />
    </div>
    <div class="md:col-span-2 col-span-8 flex justify-center">
      <div class="md:flex hidden flex-col items-center w-full gap-8">
        <div v-for="i in 10" :key="i" class="aspect-video bg-primary-600 w-full" />
      </div>
      <div class="w-full px-10">
        <UCarousel
          v-slot="{ item }"
          :items="sampleRecommended"
          class="w-full md:hidden"
          :ui="{ item: 'basis-1/3' }"
          arrows
          :autoplay="{ delay: 8000, stopOnMouseEnter: true }"
          loop
        >
          <img :src="item" class="rounded-lg aspect-video">
        </UCarousel>
      </div>
    </div>
    <!-- <VideoPlayer :sources="videoSources" poster="/images/example-poster.jpg" :autoplay="false" preload="metadata"
            @quality-change="(q) => console.log('Quality changed to', q)"
            @timeupdate="(p) => console.log('Timeupdate', p)" /> -->
  </div>
</template>

<script setup lang="ts">
const sampleRecommended = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6',
]

const videoSources = [
  {
    label: '1080p',
    quality: '1080p',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    type: 'video/mp4',
  },
  {
    label: '720p',
    quality: '720p',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    type: 'video/mp4',
  },
  {
    label: '480p',
    quality: '480p',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    type: 'video/mp4',
  },
]
</script>
