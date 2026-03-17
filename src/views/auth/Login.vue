<template>
  <v-app>
    <v-main class="auth-bg">
      <v-container class="fill-height d-flex align-center justify-center px-4">
        <v-sheet class="auth-shell" rounded="xl" elevation="6">
          <div class="auth-banner">
            <h1 class="text-h5 font-weight-bold mb-2">欢迎使用 Vibe 客户端</h1>
            <p class="text-body-2 text-medium-emphasis mb-0">请使用会员账号登录，进入工作台。</p>
          </div>
          <v-card class="auth-card" rounded="xl" elevation="0">
            <v-card-title class="text-h6 font-weight-bold pt-6 px-6">登录</v-card-title>
            <v-card-text class="px-6 pb-6">
              <v-form @submit.prevent="onSubmit">
                <v-text-field
                  v-model="form.username"
                  label="用户名"
                  variant="outlined"
                  density="comfortable"
                  color="primary"
                  class="mb-2"
                  autocomplete="username"
                  required
                />
                <v-text-field
                  v-model="form.password"
                  label="密码"
                  type="password"
                  variant="outlined"
                  density="comfortable"
                  color="primary"
                  autocomplete="current-password"
                  class="mb-4"
                  required
                />
                <v-btn type="submit" color="primary" size="large" block :loading="loading">登录</v-btn>
              </v-form>
              <v-alert v-if="error" type="error" variant="tonal" density="compact" class="mt-4">
                {{ error }}
              </v-alert>
              <div class="text-body-2 mt-4 text-center">
                没有账号？
                <RouterLink to="/register">立即注册</RouterLink>
              </div>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

const form = reactive({
  username: '',
  password: ''
})

const onSubmit = async () => {
  if (!form.username || !form.password) {
    error.value = '请输入用户名和密码'
    return
  }

  loading.value = true
  error.value = ''
  try {
    await authStore.login(form)
    await router.push('/home')
  } catch (e: any) {
    error.value = e?.message || '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-shell {
  width: min(920px, 100%);
  min-height: 540px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  overflow: hidden;
  background: #ffffff;
}

.auth-banner {
  padding: 56px 48px;
  background: linear-gradient(145deg, #eaf2ff 0%, #dbe8ff 100%);
  border-right: 1px solid #e5eaf2;
}

.auth-card {
  background: #ffffff;
}

@media (max-width: 900px) {
  .auth-shell {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .auth-banner {
    padding: 28px 24px;
    border-right: 0;
    border-bottom: 1px solid #e5eaf2;
  }
}
</style>

