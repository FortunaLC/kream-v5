<template>
  <div>
    <div class="space-y-4">
      <div v-if="editor" class="rounded-lg border bg-card">
        <div class="flex flex-wrap items-center gap-2 border-b bg-muted/30 p-2">
          <div class="flex items-center gap-0.5">
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('bold')"
                  @click="editor.chain().focus().toggleBold().run()"
                >
                  <Icon name="lucide:bold" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Bold</UiTooltipContent>
            </UiTooltip>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('italic')"
                  @click="editor.chain().focus().toggleItalic().run()"
                >
                  <Icon name="lucide:italic" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Italic</UiTooltipContent>
            </UiTooltip>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiToggle
                  size="sm"
                  :pressed="editor.isActive('strike')"
                  @click="editor.chain().focus().toggleStrike().run()"
                >
                  <Icon name="lucide:strikethrough" class="size-4" />
                </UiToggle>
              </UiTooltipTrigger>
              <UiTooltipContent>Strike</UiTooltipContent>
            </UiTooltip>
          </div>
          <UiSeparator orientation="vertical" class="h-6" />
          <div class="flex items-center gap-0.5">
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton
                  size="icon-sm"
                  variant="ghost"
                  :disabled="!editor.can().undo()"
                  @click="editor.chain().focus().undo().run()"
                >
                  <Icon name="lucide:undo" class="size-4" />
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent>Undo</UiTooltipContent>
            </UiTooltip>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton
                  size="icon-sm"
                  variant="ghost"
                  :disabled="!editor.can().redo()"
                  @click="editor.chain().focus().redo().run()"
                >
                  <Icon name="lucide:redo" class="size-4" />
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent>Redo</UiTooltipContent>
            </UiTooltip>
          </div>
        </div>
        <EditorContent :editor="editor" class="prose prose-sm max-w-none p-4" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const editor = useEditor({
  extensions: [StarterKit],
  content: ``,
  editorProps: {
    attributes: {
      class:
                'min-h-[300px] focus:outline-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:my-3 prose-ul:my-3 prose-li:my-1',
    },
  },
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
:deep(.ProseMirror) {
    outline: none;
}

:deep(.ProseMirror pre) {
    background: hsl(var(--muted));
    border-radius: 0.5rem;
    color: hsl(var(--foreground));
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
}

:deep(.ProseMirror code) {
    background: hsl(var(--muted));
    border-radius: 0.25rem;
    color: hsl(var(--foreground));
    font-size: 0.9rem;
    padding: 0.25em 0.4em;
}

:deep(.ProseMirror pre code) {
    background: none;
    color: inherit;
    font-size: inherit;
    padding: 0;
}

:deep(.ProseMirror blockquote) {
    border-left: 3px solid hsl(var(--border));
    padding-left: 1rem;
    color: hsl(var(--muted-foreground));
}
</style>
