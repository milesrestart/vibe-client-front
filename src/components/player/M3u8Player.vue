<template>
  <div class="video-wrap">
    <video ref="videoRef" controls playsinline class="video-core"></video>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Hls from 'hls.js'

const props = defineProps<{ src: string }>()
const videoRef = ref<HTMLVideoElement | null>(null)
let hls: Hls | null = null

const bindSource = () => {
  const video = videoRef.value
  if (!video || !props.src) return

  if (hls) {
    hls.destroy()
    hls = null
  }

  if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = props.src
    return
  }

  if (Hls.isSupported()) {
    hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true
    })
    hls.loadSource(props.src)
    hls.attachMedia(video)
  } else {
    video.src = props.src
  }
}

watch(() => props.src, bindSource)
onMounted(bindSource)

onBeforeUnmount(() => {
  if (hls) {
    hls.destroy()
    hls = null
  }
})
</script>

<style scoped>
.video-wrap {
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: #000;
}

.video-core {
  width: 100%;
  max-height: 72vh;
  display: block;
}
</style>
