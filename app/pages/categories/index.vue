<template>
  <div class="w-full flex justify-center">
    <div class="container py-5">
      <div v-if="categoriesError?.message" class="w-full flex justify-center">
        <UAlert
          class="md:w-1/2"
          color="error"
          variant="subtle"
          title="Error"
          :description="categoriesError.message"
          icon="i-lucide-alert-circle"
        />
      </div>
      <div v-else-if="categoriesPending" class="w-full grid gap-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-1">
        <USkeleton v-for="i in 20" :key="i" class="w-[230px] aspect-video" />
      </div>
      <div v-else class="w-full grid gap-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-1">
        <NuxtLink v-for="category in categories" :key="category.id" :to="`/categories/${category.slug}`">
          <NuxtImg
            :src="`${config.public.assetsUrl}/${category.cover?.id}`"
            :alt="category.cover.description"
          />
          {{ getTranslation(category.translations, locale, 'title') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { categories, categoriesError, categoriesPending } = useContent()
const { getTranslation } = useDirectus()
const { locale } = useI18n()

const config = useRuntimeConfig()
</script>

<style scoped></style>
