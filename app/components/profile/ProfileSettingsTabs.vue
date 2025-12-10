<template>
  <div class="flex justify-center w-full">
    <UiTabs default-value="about" class="w-full">
      <UiScrollArea orientation="horizontal" class="w-full">
        <UiTabsList
          class="relative mb-3 h-auto gap-2 rounded-none border-b border-border bg-transparent px-0 py-1 text-foreground w-full"
        >
          <UiTabsTrigger
            v-for="t in tabs"
            :key="t.tabName"
            :value="t.tabName"
            class="relative hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:hover:bg-accent"
          >
            <Icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
            {{ t.title }}
          </UiTabsTrigger>
          <UiTabsIndicator />
        </UiTabsList>
      </UiScrollArea>
      <UiTabsContent value="about">
        <ProfileTabSettingsAbout />
      </UiTabsContent>
      <UiTabsContent value="privacy">
        <ProfileTabSettingsPrivacy />
      </UiTabsContent>
      <UiTabsContent value="notifications">
        <ProfileTabSettingsNotifications />
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  settings: any
}>()

const tabs = [
  {
    title: 'About',
    tabName: 'about',
    icon: 'lucide:user',
  },
  {
    title: 'Privacy',
    tabName: 'privacy',
    icon: 'lucide:lock',
  },
  {
    title: 'Notifications',
    tabName: 'notifications',
    icon: 'lucide:bell',
  },
]
</script>
