<template>
  <v-app>
    <v-app-bar color="primary" density="comfortable">
      <v-app-bar-title>vibe client</v-app-bar-title>
      <v-btn variant="text" to="/home">首页</v-btn>
      <v-btn variant="text" to="/profile">个人中心</v-btn>
      <v-spacer />
      <v-btn variant="text" @click="doLogout">退出登录</v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="py-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const doLogout = async () => {
  await authStore.logout()
  await router.push('/login')
}
</script>
