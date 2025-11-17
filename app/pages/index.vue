<template>
  <div>
    <WidgetVideoPlayer :src="sampleVideoSrc" :qualities="sampleQualities" />
  </div>
</template>

<script setup lang="ts">
const sampleVideoSrc = 'https://www.w3schools.com/html/mov_bbb.mp4'
const sampleQualities = [
  { label: '1080p', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { label: '720p', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { label: '480p', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
]
</script>

<style scoped></style>
