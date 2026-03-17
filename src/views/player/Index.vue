<template>
  <v-card rounded="xl" elevation="3" class="player-card">
    <v-card-title class="text-h6">{{ t('player.title') }}</v-card-title>
    <v-card-subtitle>{{ t('player.subtitle') }}</v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col cols="12" md="10">
          <v-text-field
            v-model="inputUrl"
            :label="t('player.urlLabel')"
            :placeholder="t('player.urlHint')"
            variant="outlined"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="2" class="d-flex align-center">
          <v-btn color="primary" block @click="startPlay">{{ t('player.play') }}</v-btn>
        </v-col>
      </v-row>

      <div class="mt-3 text-caption text-medium-emphasis">
        {{ t('player.sample') }}:
        <span class="sample" @click="useSample">https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8</span>
      </div>

      <div class="mt-4">
        <M3u8Player v-if="playUrl" :src="playUrl" />
        <v-sheet v-else class="placeholder" rounded="lg">
          {{ t('player.placeholder') }}
        </v-sheet>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import M3u8Player from '@/components/player/M3u8Player.vue'

const { t } = useI18n()
const inputUrl = ref('')
const playUrl = ref('')

const startPlay = () => {
  if (!inputUrl.value) return
  playUrl.value = inputUrl.value.trim()
}

const useSample = () => {
  inputUrl.value = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  playUrl.value = inputUrl.value
}
</script>

<style scoped>
.player-card {
  border: 1px solid rgba(15, 74, 161, 0.08);
}

.placeholder {
  height: 320px;
  display: grid;
  place-items: center;
  color: rgba(120, 120, 120, 0.9);
  background: rgba(17, 167, 155, 0.06);
}

.sample {
  color: #0f4aa1;
  cursor: pointer;
}
</style>
