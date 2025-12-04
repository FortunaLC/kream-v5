<template>
  <UDrawer
    v-model:open="open"
    direction="right"
    :handle="false"
    handle-only
  >
    <UButton
      :label="props.title"
      color="neutral"
      variant="subtle"
      trailing-icon="mynaui:filter"
    />

    <template #content>
      <div class="w-120 p-7 space-y-4">
        <div class="w-full flex justify-between items-center">
          <p>Filter</p>
          <UButton
            icon="material-symbols:close-rounded"
            color="neutral"
            variant="subtle"
            size="sm"
            @click="open = false"
          />
        </div>
        <USeparator />
        <div class="w-full gap-4">
          <div class="w-full">
            <p class="mb-2">
              Sort by
            </p>
            <USelect v-model="sortCriteria" :items="sortItems" class="w-full" />
          </div>
        </div>
        <div class="w-full gap-4">
          <div class="w-full">
            <p class="mb-2">
              Video duration
            </p>
            <USlider v-model="durationCriteria" class="w-full" tooltip />
            <div class="w-full flex justify-between items-center">
              <p>0 min</p>
              <p>100 min</p>
            </div>
          </div>
        </div>
        <div class="w-full gap-4">
          <div class="w-full">
            <p class="mb-2">
              Categories
            </p>
            <USelectMenu
              v-model="categoryCriteria"
              placeholder="Select cateogories"
              :items="categoryItems"
              multiple
              class="w-full"
            />
          </div>
        </div>
      </div>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const props = defineProps<{
  title: string
}>()

const open = ref(false)
const sortCriteria = ref('newest')
const durationCriteria = ref(20)
const categoryCriteria = ref([''])

const sortItems = ref<SelectItem[]>([
  {
    label: 'Newest',
    value: 'newest',
  },
  {
    label: 'Most Popular',
    value: 'most_popular',
  },
  {
    label: 'Most Viewed',
    value: 'most_viewed',
  },
  {
    label: 'Top Rated',
    value: 'top_rated',
  },
])

const categoryItems = ref<SelectItem[]>([
  {
    label: 'Education',
    value: 'education',
  },
  {
    label: 'Entertainment',
    value: 'entertainment',
  },
  {
    label: 'Music',
    value: 'music',
  },
  {
    label: 'Sports',
    value: 'sports',
  },
])
</script>

<style scoped>

</style>
