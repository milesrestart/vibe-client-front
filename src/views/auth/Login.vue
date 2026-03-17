<template>
  <v-app>
    <v-main class="auth-bg">
      <v-container class="fill-height d-flex align-center justify-center px-4">
        <v-card class="auth-card" rounded="xl" elevation="6">
          <v-card-title class="text-h6 text-center py-6">{{ t('auth.loginTitle') }}</v-card-title>
          <v-card-text class="px-6 pb-6">
            <v-form @submit.prevent="onSubmit">
              <v-text-field v-model="form.username" :label="t('auth.username')" variant="outlined" class="mb-2" />
              <v-text-field v-model="form.password" :label="t('auth.password')" type="password" variant="outlined" class="mb-4" />
              <v-btn type="submit" color="primary" block :loading="loading">{{ t('auth.submitLogin') }}</v-btn>
            </v-form>
            <v-alert v-if="error" type="error" variant="tonal" density="compact" class="mt-4">{{ error }}</v-alert>
            <div class="text-body-2 mt-4 text-center">
              <RouterLink to="/register">{{ t('auth.noAccount') }}</RouterLink>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const error = ref('')

const form = reactive({ username: '', password: '' })

const onSubmit = async () => {
  if (!form.username || !form.password) return
  loading.value = true
  error.value = ''
  try {
    await authStore.login(form)
    await router.push('/home')
  } catch (e: any) {
    error.value = e?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-card {
  width: min(430px, 100%);
}
</style>
