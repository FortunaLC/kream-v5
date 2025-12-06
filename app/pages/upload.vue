<template>
  <div class="w-full flex justify-center">
    <div class="container p-10 space-y-5">
      <div class="w-full">
        <VideoFileUploadButton v-model="file" />
      </div>
      <div v-if="1 === 1" class="w-full">
        <UiGradientDivider />
      </div>
      <div class="w-full">
        <VideoFileForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const file = ref<File | null>(null)
</script>

<style scoped></style>
