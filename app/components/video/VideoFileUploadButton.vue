<template>
  <div>
    <Motion
      :variants="sequenceContainer"
      initial="hidden"
      in-view="visible"
      :in-view-options="{ once: true }"
      exit="exit"
      layout="position"
      class="mx-auto flex max-w-md flex-col gap-2"
    >
      <!-- Drop area -->
      <Motion as-child :variants="dropAreaContainer">
        <div
          ref="dropzoneRef"
          role="button"
          class="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-input p-4 transition-colors hover:bg-accent/50 has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
          @click="openFileDialog"
        >
          <input
            ref="inputRef"
            hidden
            aria-label="Upload file"
            :disabled="Boolean(currentFile)"
          >

          <div class="flex flex-col items-center justify-center text-center">
            <Motion
              :variants="dropAreaContainerItem"
              class="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
              aria-hidden="true"
            >
              <Icon name="lucide:upload" class="size-4 opacity-60" />
            </Motion>
            <Motion as="p" :variants="dropAreaContainerItem" class="mb-1.5 text-sm font-medium">
              Upload file
            </Motion>
            <Motion as="p" :variants="dropAreaContainerItem" class="text-xs text-muted-foreground">
              Drag & drop or click to browse (max. {{ formatBytes(maxSize) }})
            </Motion>
            <AnimatePresence>
              <Motion
                v-if="currentFile"
                key="message"
                layout="position"
                :variants="dropAreaContainerItem"
                as="p"
                class="mt-1 text-center text-xs text-sky-500"
              >
                Remove the current file to upload a new one.
              </Motion>
            </AnimatePresence>
          </div>
        </div>
      </Motion>

      <Motion
        v-if="errors.length > 0"
        key="errors"
        layout="position"
        :variants="fileListItem"
        class="flex items-center gap-1 text-xs text-destructive"
        role="alert"
      >
        <Icon name="lucide:circle-alert" class="size-3 shrink-0" />
        <span>{{ errors[0] }}</span>
      </Motion>

      <Motion
        v-if="currentFile"
        key="file-list"
        layout="position"
        :variants="fileListItem"
        class="space-y-2"
      >
        <div class="flex items-center justify-between gap-2 rounded-lg border px-4 py-2">
          <div class="flex items-center gap-3 overflow-hidden">
            <Icon name="lucide:paperclip" class="size-4 shrink-0 opacity-60" aria-hidden="true" />
            <div class="min-w-0">
              <p class="truncate text-[13px] font-medium">
                {{ currentFile.file.name }}
              </p>
            </div>
          </div>

          <UiButton
            size="icon"
            variant="ghost"
            class="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
            aria-label="Remove file"
            @click="removeFile(currentFile.id)"
          >
            <Icon name="lucide:x" class="size-4" aria-hidden="true" />
          </UiButton>
        </div>
        <Transition
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          enter-active-class="transition-opacity duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          leave-active-class="transition-opacity duration-300"
        >
          <UiAlert
            v-model="uploadWarningOpen"
            icon="lucide:triangle-alert"
            variant="warning"
            icon-class="mt-0.5"
            description="An error occurred!"
          >
            <UiAlertDescription class="flex w-full items-center justify-between">
              Do not close this site while the upload is in progress!
              <UiButton
                variant="ghost"
                size="icon-xs"
                class="size-5"
                @click="uploadWarningOpen = false"
              >
                <Icon name="lucide:x" class="size-3.5" />
              </UiButton>
            </UiAlertDescription>
          </UiAlert>
        </Transition>
      </Motion>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
import type { MotionProps } from 'motion-v'

const uploadWarningOpen = ref(true)

const maxSize = 10 * 1024 * 1024 // TODO: How much do we want max size to be? 10MB for now

const { files, errors, openFileDialog, removeFile, dropzoneRef, inputRef } = useFileUpload({
  maxSize,
})

const currentFile = computed(() => files.value[0])

const model = defineModel()

watch(currentFile, () => {
  model.value = currentFile.value ? currentFile.value.file : null
  if (currentFile.value) {
    uploadWarningOpen.value = true
  }
})

// Overall sequence container - controls the main timing
const sequenceContainer: MotionProps['variants'] = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4, when: 'beforeChildren' },
  },
}

// Drop area container - handles internal stagger of upload elements
const dropAreaContainer: MotionProps['variants'] = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { staggerChildren: 0.1, when: 'beforeChildren' },
  },
}

// Individual upload elements (icon, text, description)
const dropAreaContainerItem: MotionProps['variants'] = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
}

// File list and other elements that come after drop area
const fileListItem: MotionProps['variants'] = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
  // Add exit animation that matches hidden state
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
}
</script>
