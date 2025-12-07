<template>
  <UiContainer class="relative">
    <div class="relative z-10 flex flex-col items-center justify-center py-8 text-center lg:py-12">
      <slot name="icon">
        <UiFancyIcon v-if="props.icon" :icon="props.icon" />
      </slot>
      <slot name="title">
        <p class="mt-6 mb-2 text-xl font-bold tracking-tight text-balance" v-html="props.title" />
      </slot>
      <slot name="description">
        <p class="text-muted-foreground" v-html="props.description" />
      </slot>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    icon?: string
  }>(),
  {
    icon: 'lucide:circle-question-mark',
    title: 'No results found',
    description: 'Try to look at something different.',
  },
)
</script>
