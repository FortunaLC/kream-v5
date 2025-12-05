<template>
  <UiPopover v-model:open="popOverOpen">
    <UiPopoverTrigger as-child>
      <UiButton to="#" variant="ghost" size="sm">
        <Icon class="size-5" name="lucide:earth" />
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-44 p-3">
      <div class="space-y-3">
        <div class="text-xs font-medium text-muted-foreground">
          Language
        </div>
        <UiGradientDivider />
        <UiButton
          v-for="loc in locales"
          :key="loc.code"
          size="sm"
          class="w-full justify-start"
          :variant="locale === loc.code ? 'secondary' : 'ghost'"
          @click="handleLanguageSelect(loc.code)"
        >
          {{ loc.name }}
        </UiButton>
      </div>
    </UiPopoverContent>
  </UiPopover>
</template>

<script setup lang="ts">
import type { LocaleCodes } from '~/types/translations'

const { locales, locale, setLocale } = useI18n()

const popOverOpen = ref(false)

const handleLanguageSelect = (code: LocaleCodes) => {
  setLocale(code)
  popOverOpen.value = false
}
</script>

<style scoped></style>
