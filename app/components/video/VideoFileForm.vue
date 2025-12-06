<template>
  <div class="w-full">
    <div class="mb-5">
      <h1 class="text-lg">
        {{ $t('video.settings') }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ $t('video.settingInfo') }}
      </p>
    </div>
    <div class="w-full grid md:grid-cols-2 grid-cols-1 gap-5">
      <div class="space-y-5">
        <div>
          <UiLabel class="mb-2" for="video-title">
            {{ $t('video.title') }}
          </UiLabel>
          <UiInput
            id="video-title"
            v-model="form.title"
            type="text"
            :placeholder="`${$t('video.title')}...`"
          />
        </div>
        <div>
          <UiLabel class="mb-2" for="video-visibility">
            {{ $t('video.visibility.label') }}
          </UiLabel>
          <UiSelect id="video-visibility" v-model="form.visibility">
            <UiSelectTrigger placeholder="Select an option" />
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem value="public" :text="$t('video.visibility.public')" />
                <UiSelectItem value="private" :text="$t('video.visibility.private')" />
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
          <p class="text-sm text-muted-foreground">
            {{ $t(`video.visibility.${form.visibility}Info`) }}
          </p>
        </div>
      </div>
      <div>
        <UiLabel class="mb-2" for="video-description">
          {{ $t('video.description') }}
        </UiLabel>
        <ClientOnly>
          <!-- TODO: v-model doesn't work here, fix the binding in editor component -->
          <WidgetTipTapEditor id="video-description" v-model="form.description" />
        </ClientOnly>
      </div>
      <!-- TODO: add select for category and maybe tags -->
    </div>
  </div>
</template>

<script setup lang="ts">
export interface VideoFileForm {
  title: string
  description: string
  visibility: 'public' | 'private'
}

const form = ref<VideoFileForm>({
  title: '',
  description: '',
  visibility: 'public',
})
</script>

<style scoped></style>
