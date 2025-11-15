<template>
  <UDropdownMenu
    :items="loggedIn ? itemsLoggedIn : itemsLoggedOut"
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
      <UAvatar icon="mdi:user" size="lg" class="cursor-pointer" />
    </UButton>
    <template #notifications-trailing>
      <UBadge label="2" size="sm" class="rounded-full" />
    </template>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { loggedIn } = useUserSession()

const itemsLoggedIn = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user',
  },
  {
    label: 'Notifications',
    icon: 'i-lucide-bell',
    slot: 'notifications' as const,
  },
  {
    label: 'Settings',
    icon: 'i-lucide-cog',
  },
])

const itemsLoggedOut = ref<DropdownMenuItem[]>([
  {
    label: 'Login',
    icon: 'i-lucide-log-in',
    to: '/login',
  },
  {
    label: 'Register',
    icon: 'i-lucide-user-plus',
    to: '/register',
  },
])
</script>

<style scoped></style>
