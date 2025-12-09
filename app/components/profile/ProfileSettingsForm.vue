<template>
  <UiContainer class="py-5">
    <div class="w-full grid grid-cols-2 gap-5">
      <div>
        <UiLabel class="mb-2" for="settings-show-likes">
          {{ $t('profile.settings.email') }}
        </UiLabel>
        <UiInput id="settings-email" v-model="settingsRef.email" disabled />
      </div>
      <div class="grid grid-cols-3 gap-5">
        <div>
          <UiLabel class="mb-2" for="settings-show-likes">
            {{ $t('profile.settings.showLikes') }}
          </UiLabel>
          <UiSelect id="settings-show-likes" v-model="settingsRef.settings.show_likes">
            <UiSelectTrigger placeholder="Select an option" />
            <UiSelectContent>
              <UiSelectItem :value="true" :text="$t('profile.settings.options.yes')" />
              <UiSelectItem :value="false" :text="$t('profile.settings.options.no')" />
            </UiSelectContent>
          </UiSelect>
        </div>
        <div>
          <UiLabel class="mb-2" for="settings-show-favorites">
            {{ $t('profile.settings.showFavorites') }}
          </UiLabel>
          <UiSelect id="settings-show-favorites" v-model="settingsRef.settings.show_favorites">
            <UiSelectTrigger placeholder="Select an option" />
            <UiSelectContent>
              <UiSelectItem :value="true" :text="$t('profile.settings.options.yes')" />
              <UiSelectItem :value="false" :text="$t('profile.settings.options.no')" />
            </UiSelectContent>
          </UiSelect>
        </div>
        <div>
          <UiLabel class="mb-2" for="settings-show-playlists">
            {{ $t('profile.settings.showPlaylists') }}
          </UiLabel>
          <UiSelect id="settings-show-playlists" v-model="settingsRef.settings.show_playlists">
            <UiSelectTrigger placeholder="Select an option" />
            <UiSelectContent>
              <UiSelectItem :value="true" :text="$t('profile.settings.options.yes')" />
              <UiSelectItem :value="false" :text="$t('profile.settings.options.no')" />
            </UiSelectContent>
          </UiSelect>
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
const props = defineProps<{
  settings: any
}>()

console.log(props.settings)

const settingsRef = ref(props.settings)
</script>

<style scoped></style>
