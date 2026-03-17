<template>
  <v-card rounded="lg" elevation="2">
    <v-card-title class="text-h6">工作台</v-card-title>
    <v-card-text>
      <p>欢迎你，{{ displayName }}</p>
      <p class="text-medium-emphasis">后续视频模块入口已预留。</p>
      <v-alert type="info" variant="tonal" class="mt-4" title="视频模块预留">
        后续将接入视频播放、收藏、历史记录等能力。
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const displayName = computed(() => authStore.userInfo?.nickname || authStore.userInfo?.username || '-')
</script>
