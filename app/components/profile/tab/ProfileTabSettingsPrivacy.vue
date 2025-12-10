<template>
  <ProfileTabGeneric>
    <div class="grid md:grid-cols-3 grid-cols-1 gap-5">
      <div>
        <UiLabel class="mb-2 text-lg" for="settings-show-likes">
          Show likes
        </UiLabel>
        <p class="text-sm text-muted-foreground">
          Determines whether your liked videos are visible to others on your profile.
        </p>
      </div>
      <div class="md:col-span-2 col-span-1 flex items-center">
        <UiSwitch id="settings-show-likes" />
      </div>

      <UiGradientDivider class="md:col-span-3 col-span-1" />

      <div>
        <UiLabel class="mb-2 text-lg" for="settings-show-favorites">
          Show Favorites
        </UiLabel>
        <p class="text-sm text-muted-foreground">
          Determines whether your favorite videos are visible to others on your profile.
        </p>
      </div>
      <div class="md:col-span-2 col-span-1 flex items-center">
        <UiSwitch id="settings-show-favorites" />
      </div>

      <UiGradientDivider class="md:col-span-3 col-span-1" />

      <div>
        <UiLabel class="mb-2 text-lg" for="settings-show-playlists">
          Show playlists
        </UiLabel>
        <p class="text-sm text-muted-foreground">
          Determines whether your playlists are visible to others on your profile.
        </p>
      </div>
      <div class="md:col-span-2 col-span-1 flex items-center">
        <UiSwitch id="settings-show-playlists" />
      </div>
    </div>
  </ProfileTabGeneric>
</template>

<script setup lang="ts">
/**
 * Show likes
 * Show favorites
 * Show playlists
 */
</script>
