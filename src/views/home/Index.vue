<template>
  <v-card rounded="xl" elevation="3" class="home-card">
    <v-card-title class="text-h6">{{ t('home.title') }}</v-card-title>
    <v-card-text>
      <p class="text-subtitle-1">{{ t('home.welcome', { name: displayName }) }}</p>
      <p class="text-medium-emphasis">{{ t('home.desc') }}</p>

      <v-row class="mt-2">
        <v-col cols="12" md="6">
          <v-sheet class="feature-block" rounded="lg">
            <h3 class="text-subtitle-1 mb-2">M3U8 HLS</h3>
            <p class="text-body-2 text-medium-emphasis mb-3">Safari native + hls.js fallback</p>
            <v-btn color="primary" to="/player">{{ t('home.gotoPlayer') }}</v-btn>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="6">
          <v-sheet class="feature-block" rounded="lg">
            <h3 class="text-subtitle-1 mb-2">Theme / I18n</h3>
            <p class="text-body-2 text-medium-emphasis mb-0">Material 风格界面，支持中文英文与白天夜间主题。</p>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const authStore = useAuthStore()
const displayName = computed(() => authStore.userInfo?.nickname || authStore.userInfo?.username || '-')
</script>

<style scoped>
.home-card {
  border: 1px solid rgba(15, 74, 161, 0.08);
}

.feature-block {
  padding: 16px;
  border: 1px solid rgba(120, 120, 120, 0.15);
  background: rgba(255, 255, 255, 0.75);
}
</style>
