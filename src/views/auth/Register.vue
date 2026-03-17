<template>
  <v-app>
    <v-main class="auth-bg">
      <v-container class="fill-height d-flex align-center justify-center px-4">
        <v-sheet class="auth-shell" rounded="xl" elevation="6">
          <div class="auth-banner">
            <h1 class="text-h5 font-weight-bold mb-2">创建 Vibe 会员账号</h1>
            <p class="text-body-2 text-medium-emphasis mb-0">注册后可直接登录客户端并访问个人中心。</p>
          </div>
          <v-card class="auth-card" rounded="xl" elevation="0">
            <v-card-title class="text-h6 font-weight-bold pt-6 px-6">注册</v-card-title>
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
                  autocomplete="new-password"
                  class="mb-2"
                  required
                />
                <v-text-field
                  v-model="form.confirmPassword"
                  label="确认密码"
                  type="password"
                  variant="outlined"
                  density="comfortable"
                  color="primary"
                  autocomplete="new-password"
                  class="mb-4"
                  required
                />
                <v-btn type="submit" color="primary" size="large" block :loading="loading">注册</v-btn>
              </v-form>

              <v-alert v-if="error" type="error" variant="tonal" density="compact" class="mt-4">
                {{ error }}
              </v-alert>
              <v-alert v-if="success" type="success" variant="tonal" density="compact" class="mt-4">
                {{ success }}
              </v-alert>
              <div class="text-body-2 mt-4 text-center">
                已有账号？
                <RouterLink to="/login">去登录</RouterLink>
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
const success = ref('')

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const onSubmit = async () => {
  if (!form.username || !form.password || !form.confirmPassword) {
    error.value = '请完整填写注册信息'
    return
  }

  if (form.password !== form.confirmPassword) {
    error.value = '两次密码不一致'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''
  try {
    await authStore.register(form)
    success.value = '注册成功，正在跳转登录...'
    setTimeout(() => router.push('/login'), 800)
  } catch (e: any) {
    error.value = e?.message || '注册失败'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-shell {
  width: min(920px, 100%);
  min-height: 560px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  overflow: hidden;
  background: #ffffff;
}

.auth-banner {
  padding: 56px 48px;
  background: linear-gradient(145deg, #e8f4fb 0%, #d6ecff 100%);
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

