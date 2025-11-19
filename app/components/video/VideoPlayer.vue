<template>
  <div ref="containerRef" class="group relative w-full overflow-hidden rounded-xl bg-black text-white" tabindex="0">
    <!-- VIDEO -->
    <video
      ref="video"
      class="block w-full"
      :poster="poster"
      :loop="loop"
      :preload="preload"
      playsinline
      @click="togglePlay"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
      @ended="isPlaying = false"
    >
      <source :src="currentSource?.src" :type="currentSource?.type || 'video/mp4'">
    </video>

    <!-- BIG PLAY BUTTON -->
    <div v-if="!isPlaying" class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <UButton
        icon="i-lucide-play"
        class="pointer-events-auto bg-black/60 hover:bg-black/80 rounded-full p-4 backdrop-blur"
        size="xl"
        @click.stop="togglePlay"
      />
    </div>

    <!-- CONTROLS -->
    <div
      class="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 transition-opacity"
      :class="showControls ? 'opacity-100' : 'opacity-0'"
    >
      <!-- Progress -->
      <div class="relative">
        <!-- Buffered -->
        <div class="absolute inset-0 h-1 bg-white/20 rounded-full">
          <div class="h-1 bg-white/40 rounded-full" :style="{ width: bufferedPercent + '%' }" />
        </div>
        <USlider
          v-model="progress"
          :min="0"
          :max="100"
          :step="0.1"
          class="relative z-10"
          @update:model-value="onSeek"
        />
      </div>

      <div class="flex items-center justify-between">
        <!-- Left controls -->
        <div class="flex items-center gap-3">
          <UButton :icon="isPlaying ? 'i-lucide-pause' : 'i-lucide-play'" size="xs" @click="togglePlay" />

          <UButton icon="i-lucide-undo-2" size="xs" @click="skip(-10)" />
          <UButton icon="i-lucide-redo-2" size="xs" @click="skip(10)" />

          <!-- Volume -->
          <div class="flex items-center gap-2">
            <UButton
              :icon="isMuted || volume === 0 ? 'i-lucide-volume-x' : volume < 50 ? 'i-lucide-volume-1' : 'i-lucide-volume-2'"
              size="xs"
              @click="toggleMute"
            />
            <USlider
              v-model="volume"
              :min="0"
              :max="100"
              class="w-24"
              @update:model-value="setVolume"
            />
          </div>

          <span class="text-xs tabular-nums">{{ formattedCurrentTime }} / {{ formattedDuration }}</span>
        </div>

        <!-- Right controls -->
        <div class="flex items-center gap-3">
          <!-- Settings -->
          <UPopover>
            <UButton icon="i-lucide-settings-2" size="xs" />

            <template #content>
              <div class="p-3 text-sm space-y-3 w-48">
                <div>
                  <span class="block text-white/70 text-xs mb-1">Quality</span>
                  <USelect
                    v-model="selectedQuality"
                    :items="props.sources.map(s => ({ label: s.label, value: s.quality }))"
                    @change="switchQuality($event)"
                  />
                </div>
              </div>
            </template>
          </UPopover>

          <!-- Fullscreen -->
          <UButton icon="i-lucide-maximize-2" size="xs" @click="toggleFullscreen" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: Rework this component -> chatjibbity created it

import {
  useMagicKeys,
  whenever,
  useFullscreen,
  useMouseInElement,
  useEventListener,
} from '@vueuse/core'

type VideoSource = {
  label: string
  quality: string
  src: string
  type?: string
}

const props = withDefaults(defineProps<{
  sources: VideoSource[]
  poster?: string
  autoplay?: boolean
  loop?: boolean
  preload?: 'auto' | 'metadata' | 'none'
}>(), {
  autoplay: false,
  loop: false,
  preload: 'metadata',
})

const emit = defineEmits<{
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'ended'): void
  (e: 'timeupdate', payload: { currentTime: number, duration: number }): void
  (e: 'quality-change', quality: string): void
}>()

// -------------------------------------------------------------
// STATE
// -------------------------------------------------------------
const containerRef = ref<HTMLElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)

const isPlaying = ref(false)
const duration = ref(0)
const currentTime = ref(0)
const progress = ref(0)
const bufferedEnd = ref(0)

const volume = ref(100)
const isMuted = ref(false)

const selectedQuality = ref(props.sources[0]?.quality ?? '')

const currentSource = computed(() =>
  props.sources.find(s => s.quality === selectedQuality.value)
  ?? props.sources[0],
)

// -------------------------------------------------------------
// FORMAT TIME
// -------------------------------------------------------------
const formattedCurrentTime = computed(() => formatTime(currentTime.value))
const formattedDuration = computed(() => formatTime(duration.value))

function formatTime(time: number): string {
  if (!Number.isFinite(time) || time <= 0) return '0:00'
  const t = Math.floor(time)
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = t % 60
  const mm = h ? String(m).padStart(2, '0') : m
  const ss = String(s).padStart(2, '0')
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

// -------------------------------------------------------------
// PLAYBACK
// -------------------------------------------------------------
function togglePlay() {
  const el = video.value
  if (!el) return

  if (el.paused || el.ended) {
    el.play()
    isPlaying.value = true
    emit('play')
  } else {
    el.pause()
    isPlaying.value = false
    emit('pause')
  }
}

function skip(seconds: number) {
  const el = video.value
  if (!el) return
  el.currentTime = Math.min(Math.max(el.currentTime + seconds, 0), el.duration)
}

function onSeek(val: number | number[]) {
  const el = video.value
  if (!el || !duration.value) return
  const v = Array.isArray(val) ? val[0] : val
  el.currentTime = (v / 100) * duration.value
}

function setVolume(v: number | number[]) {
  const el = video.value
  if (!el) return
  const val = Array.isArray(v) ? v[0] : v
  volume.value = val
  el.volume = val / 100
  isMuted.value = val === 0
}

function toggleMute() {
  const el = video.value
  if (!el) return
  isMuted.value = !isMuted.value
  el.volume = isMuted.value ? 0 : volume.value / 100
}

// -------------------------------------------------------------
// BUFFERING
// -------------------------------------------------------------
function updateBuffered() {
  const el = video.value
  if (!el?.buffered?.length) {
    bufferedEnd.value = 0
    return
  }
  bufferedEnd.value = el.buffered.end(el.buffered.length - 1)
}

const bufferedPercent = computed(() =>
  duration.value ? (bufferedEnd.value / duration.value) * 100 : 0,
)

// -------------------------------------------------------------
// QUALITY SWITCHING
// -------------------------------------------------------------
function switchQuality(quality: string) {
  const el = video.value
  const time = el?.currentTime ?? 0
  const wasPlaying = el && !el.paused

  selectedQuality.value = quality
  emit('quality-change', quality)

  nextTick(() => {
    const v = video.value
    if (!v) return
    v.currentTime = Math.min(time, v.duration)
    if (wasPlaying) v.play()
  })
}

// -------------------------------------------------------------
// METADATA
// -------------------------------------------------------------
function onLoadedMetadata() {
  const el = video.value
  if (!el) return
  duration.value = el.duration
  updateBuffered()
}

function onTimeUpdate() {
  const el = video.value
  if (!el) return
  currentTime.value = el.currentTime
  progress.value = (el.currentTime / duration.value) * 100
  emit('timeupdate', { currentTime: currentTime.value, duration: duration.value })
}

// -------------------------------------------------------------
// FULLSCREEN
// -------------------------------------------------------------
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(containerRef)

// -------------------------------------------------------------
// HOTKEYS (VueUse)
// -------------------------------------------------------------
const keys = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
    }
  },
})

const hasVideo = computed(() => !!video.value)

whenever(keys.space, () => hasVideo.value && togglePlay())
whenever(keys.k, () => hasVideo.value && togglePlay())
whenever(keys.arrowleft, () => hasVideo.value && skip(-10))
whenever(keys.arrowright, () => hasVideo.value && skip(10))
whenever(keys.arrowup, () => hasVideo.value && setVolume(Math.min(volume.value + 5, 100)))
whenever(keys.arrowdown, () => hasVideo.value && setVolume(Math.max(volume.value - 5, 0)))
whenever(keys.m, () => hasVideo.value && toggleMute())
whenever(keys.f, () => hasVideo.value && toggleFullscreen())

// -------------------------------------------------------------
// AUTO HIDE CONTROLS
// -------------------------------------------------------------
const { isOutside } = useMouseInElement(containerRef)
const showControls = ref(true)
let hideTimeout: NodeJS.Timeout | null = null

function resetHideTimer() {
  showControls.value = true
  if (hideTimeout) clearTimeout(hideTimeout)
  hideTimeout = setTimeout(() => {
    if (!isOutside.value && isPlaying.value) showControls.value = false
  }, 2000)
}

useEventListener(containerRef, 'mousemove', resetHideTimer)
useEventListener(containerRef, 'mouseleave', () => {
  if (isPlaying.value) showControls.value = false
})

// -------------------------------------------------------------
// LIFECYCLE
// -------------------------------------------------------------
onMounted(() => {
  const el = video.value
  if (!el) return

  el.volume = volume.value / 100
  if (props.autoplay) el.play()

  useEventListener(el, 'progress', updateBuffered)
})
</script>
