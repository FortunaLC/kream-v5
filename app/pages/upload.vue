<template>
  <div class="w-full flex justify-center">
    <UiContainer class="py-5">
      <div class="w-full">
        <VideoFileUploadButton v-model="file" />
      </div>
      <div v-if="1 === 1" class="w-full">
        <UiGradientDivider class="my-5" />
        <div class="w-full">
          <VideoFileForm />
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script setup lang="ts">
const file = ref<File | null>(null)
</script>

<style scoped></style>
