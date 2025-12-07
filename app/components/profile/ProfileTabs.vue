<template>
  <div class="flex justify-center w-full">
    <UiTabs default-value="videos" class="w-full">
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
      <UiTabsContent value="videos">
        <ProfileTabVideos />
      </UiTabsContent>
      <UiTabsContent value="playlists">
        <ProfileTabPlaylists />
      </UiTabsContent>
      <UiTabsContent value="likes">
        <ProfileTabLikes />
      </UiTabsContent>
      <UiTabsContent value="favorites">
        <ProfileTabFavorites />
      </UiTabsContent>
      <UiTabsContent value="about">
        <ProfileTabAbout />
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
const tabs = [
  {
    title: 'Videos',
    tabName: 'videos',
    icon: 'lucide:play',
  },
  {
    title: 'Playlists',
    tabName: 'playlists',
    icon: 'lucide:list-end',
  },
  {
    title: 'Likes',
    tabName: 'likes',
    icon: 'lucide:thumbs-up',
  },
  {
    title: 'Favorites',
    tabName: 'favorites',
    icon: 'lucide:heart',
  },
  {
    title: 'About',
    tabName: 'about',
    icon: 'lucide:user',
  },
]
</script>
