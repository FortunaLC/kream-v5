<template>
  <div>
    <div class="border-b bg-linear-to-r from-primary/10 via-primary/5 to-background">
      <UiContainer class="px-4 py-8 md:px-6">
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div class="flex items-start gap-4">
            <slot name="icon">
              <div v-if="props.icon" class="flex size-16 items-center justify-center rounded-xl border shadow-sm">
                <Icon :name="props.icon" class="size-8 text-primary" />
              </div>
            </slot>
            <div class="flex flex-col gap-0.5">
              <slot name="title">
                <h1 v-if="props.title" class="text-lg font-bold">
                  {{ props.title }}
                </h1>
                <h1 v-else class="text-lg font-bold">
                  Username
                </h1>
              </slot>
              <slot name="description">
                <p v-if="props.description" class="text-[15px] text-muted-foreground">
                  {{ props.description }}
                </p>
                <p v-else class="text-[15px] text-muted-foreground">
                  {{ $t('profile.noSubtitle') }}
                </p>
              </slot>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <UiButton
              v-for="social in props.socials"
              :key="social.name"
              variant="outline"
              size="sm"
            >
              <Icon :name="social.icon" class="size-4" />
            </UiButton>
          </div>
        </div>
      </UiContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    icon?: string
    socials?: Array<{ name: string, icon: string, link: string }>
    tabs?: string[]
  }>(),
  {
    title: 'Username',
    description: '',
    icon: 'lucide:store',
    tabs: () => ['Videos', 'Playlists', 'Likes', 'Favorites'],
    socials: () => [{
      name: 'website',
      icon: 'lucide:globe',
      link: 'https://kream.com',
    },
    {
      name: 'twitter',
      icon: 'lucide:twitter',
      link: 'https://twitter.com/kream',
    },
    {
      name: 'instagram',
      icon: 'lucide:instagram',
      link: 'https://instagram.com/kream',
    }],
  },
)
</script>
