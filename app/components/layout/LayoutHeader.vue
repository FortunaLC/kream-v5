<template>
  <div class="w-full flex justify-center border-b border-default p-4">
    <div class="container flex items-center gap-3">
      <div class="w-10 h-8 bg-emerald-500 rounded-lg" />
      <div class="w-full flex flex-col gap-4 items-center">
        <UInput icon="i-lucide-search" :placeholder="$t('common.search')" size="lg" class="w-90" />
        <UNavigationMenu highlight highlight-color="primary" :items="navItems" class="w-full justify-center" />
      </div>
      <div class="flex items-center gap-3">
        <WidgetAccountMenu />
        <UColorModeButton class="p-2 rounded-full cursor-pointer" />
        <WidgetLanguageSwitcher />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { t } = useI18n()

const navItems = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: t("common.home"),
      icon: "ic:round-home",
      to: "/",
      active: true,
      defaultOpen: true,
    },
    {
      label: t("common.video", 2),
      icon: "bxs:videos",
      to: "/videos",
      children: [
        {
          label: "Introduction",
          description: "Fully styled and customizable components for Nuxt.",
          icon: "i-lucide-house",
        },
        {
          label: "Installation",
          description:
            "Learn how to install and configure Nuxt UI in your application.",
          icon: "i-lucide-cloud-download",
        },
        {
          label: "Icons",
          icon: "i-lucide-smile",
          description:
            "You have nothing to do, @nuxt/icon will handle it automatically.",
        },
        {
          label: "Colors",
          icon: "i-lucide-swatch-book",
          description:
            "Choose a primary and a neutral color from your Tailwind CSS theme.",
        },
        {
          label: "Theme",
          icon: "i-lucide-cog",
          description:
            "You can customize components by using the `class` / `ui` props or in your app.config.ts.",
        },
      ],
    },
    {
      label: t("common.category", 2),
      icon: "iconamoon:category-fill",
      to: "/categories",
      children: [
        {
          label: "Introduction",
          description: "Fully styled and customizable components for Nuxt.",
          icon: "i-lucide-house",
        },
        {
          label: "Installation",
          description:
            "Learn how to install and configure Nuxt UI in your application.",
          icon: "i-lucide-cloud-download",
        },
        {
          label: "Icons",
          icon: "i-lucide-smile",
          description:
            "You have nothing to do, @nuxt/icon will handle it automatically.",
        },
        {
          label: "Colors",
          icon: "i-lucide-swatch-book",
          description:
            "Choose a primary and a neutral color from your Tailwind CSS theme.",
        },
        {
          label: "Theme",
          icon: "i-lucide-cog",
          description:
            "You can customize components by using the `class` / `ui` props or in your app.config.ts.",
        },
      ],
    },
    {
      label: t("common.star", 2),
      icon: "mdi:user",
      to: "/stars",
      children: [
        {
          label: "defineShortcuts",
          icon: "i-lucide-file-text",
          description: "Define shortcuts for your application.",
          to: "/docs/composables/define-shortcuts",
        },
        {
          label: "useOverlay",
          icon: "i-lucide-file-text",
          description: "Display a modal/slideover within your application.",
          to: "/docs/composables/use-overlay",
        },
        {
          label: "useToast",
          icon: "i-lucide-file-text",
          description: "Display a toast within your application.",
          to: "/docs/composables/use-toast",
        },
      ],
    },
  ],
]);
</script>
