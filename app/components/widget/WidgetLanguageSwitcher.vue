<template>
  <UDropdownMenu
    :items="mappedLanguages"
    arrow
    :content="{
      align: 'center',
      side: 'bottom',
      sideOffset: 8,
    }"
    :ui="{
      content: 'w-48',
    }"
  >
    <UButton class="p-0 rounded-full" variant="link">
      <UAvatar icon="material-symbols:language" size="lg" class="cursor-pointer" />
    </UButton>
    <template #notifications-trailing>
      <UBadge label="2" size="sm" class="rounded-full" />
    </template>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { locales, locale, setLocale } = useI18n()

const mappedLanguages = computed<DropdownMenuItem[]>(() => {
  const mappedLang = locales.value.map(loc => ({
    label: loc.name,
    onClick: () => setLocale(loc.code),
    active: locale.value === loc.code,
  }))

  return [...mappedLang]
})
</script>

<style scoped></style>
