<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{ src: string; qualities?: { label: string; src: string }[] }>()

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const progress = ref(0)
const duration = ref(0)
const showSettings = ref(false)
const lastTap = ref<number | null>(null)

const togglePlay = () => {
    if (!videoRef.value) return
    if (videoRef.value.paused) {
        videoRef.value.play()
        isPlaying.value = true
    } else {
        videoRef.value.pause()
        isPlaying.value = false
    }
}

const updateProgress = () => {
    if (!videoRef.value) return
    progress.value = (videoRef.value.currentTime / videoRef.value.duration) * 100
}

const seek = (e: Event) => {
    const el = e.target as HTMLInputElement
    if (!videoRef.value) return
    const newTime = (Number(el.value) / 100) * videoRef.value.duration
    videoRef.value.currentTime = newTime
}

const skip = (sec: number) => {
    if (!videoRef.value) return
    videoRef.value.currentTime = Math.max(0, Math.min(videoRef.value.currentTime + sec, videoRef.value.duration))
}

const handleDoubleTap = (side: 'left' | 'right') => {
    const now = Date.now()
    if (lastTap.value && now - lastTap.value < 300) {
        skip(side === 'right' ? 10 : -10)
    }
    lastTap.value = now
}

const changeQuality = (src: string) => {
    if (!videoRef.value) return
    const currentTime = videoRef.value.currentTime
    videoRef.value.src = src
    videoRef.value.currentTime = currentTime
    videoRef.value.play()
}

onMounted(() => {
    if (!videoRef.value) return
    videoRef.value.addEventListener('loadedmetadata', () => {
        duration.value = videoRef.value?.duration || 0
    })
})
</script>

<template>
    <div class="relative w-full max-w-3xl mx-auto select-none">
        <!-- Video Wrapper -->
        <div class="relative" @click="togglePlay">
            <video ref="videoRef" :src="props.src" class="w-full rounded-xl bg-black" @timeupdate="updateProgress"
                @click.stop="togglePlay"
                @touchstart.stop="(e) => handleDoubleTap(e.touches[0].clientX < window.innerWidth / 2 ? 'left' : 'right')"></video>

            <!-- Skip Zones -->
            <div class="absolute inset-y-0 left-0 w-1/3" @dblclick.stop="skip(-10)"></div>
            <div class="absolute inset-y-0 right-0 w-1/3" @dblclick.stop="skip(10)"></div>

            <!-- Controls -->
            <div
                class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex flex-col gap-3">
                <!-- Timeline -->
                <input type="range" min="0" max="100" v-model="progress" @input="seek" class="w-full" />

                <div class="flex items-center justify-between">
                    <!-- Play / Pause -->
                    <UButton color="neutral" variant="soft" @click.stop="togglePlay">
                        {{ isPlaying ? 'Pause' : 'Play' }}
                    </UButton>

                    <!-- Settings -->
                    <UPopover>
                        <UButton color="neutral" variant="soft">Settings</UButton>
                        <template #content>
                            <div class="p-4 space-y-2 w-40">
                                <p class="text-sm font-semibold mb-2">Quality</p>
                                <div v-for="q in props.qualities" :key="q.label">
                                    <button @click="changeQuality(q.src)" class="w-full text-left hover:text-primary">
                                        {{ q.label }}
                                    </button>
                                </div>
                            </div>
                        </template>
                    </UPopover>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
input[type='range'] {
    --tw-bg-opacity: 0.4;
    accent-color: white;
}
</style>
