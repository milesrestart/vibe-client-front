<template>
  <v-card rounded="lg" elevation="2">
    <v-card-title class="text-h6">个人中心</v-card-title>
    <v-card-text>
      <v-list lines="two">
        <v-list-item title="头像" :subtitle="user?.avatar || '-'" />
        <v-list-item title="用户名" :subtitle="user?.username || '-'" />
        <v-list-item title="昵称" :subtitle="user?.nickname || '-'" />
        <v-list-item title="手机号" :subtitle="user?.phone || '-'" />
        <v-list-item title="邮箱" :subtitle="user?.email || '-'" />
        <v-list-item title="性别" :subtitle="genderText" />
        <v-list-item title="生日" :subtitle="user?.birthday || '-'" />
        <v-list-item title="状态" :subtitle="user?.status === '0' ? '启用' : '禁用'" />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.userInfo)
const genderText = computed(() => {
  if (user.value?.gender === '1') return '男'
  if (user.value?.gender === '2') return '女'
  return '未知'
})
</script>
