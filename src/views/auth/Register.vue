<template>
  <v-app>
    <v-main class="auth-bg">
      <v-container class="fill-height d-flex align-center justify-center px-4">
        <v-card class="auth-card" rounded="xl" elevation="6">
          <v-card-title class="text-h6 text-center py-6">{{ t('auth.registerTitle') }}</v-card-title>
          <v-card-text class="px-6 pb-6">
            <v-form @submit.prevent="onSubmit">
              <v-text-field v-model="form.username" :label="t('auth.username')" variant="outlined" class="mb-2" />
              <v-text-field v-model="form.password" :label="t('auth.password')" type="password" variant="outlined" class="mb-2" />
              <v-text-field v-model="form.confirmPassword" :label="t('auth.confirmPassword')" type="password" variant="outlined" class="mb-4" />
              <v-btn type="submit" color="primary" block :loading="loading">{{ t('auth.submitRegister') }}</v-btn>
            </v-form>
            <v-alert v-if="error" type="error" variant="tonal" density="compact" class="mt-4">{{ error }}</v-alert>
            <v-alert v-if="success" type="success" variant="tonal" density="compact" class="mt-4">{{ success }}</v-alert>
            <div class="text-body-2 mt-4 text-center">
              <RouterLink to="/login">{{ t('auth.hasAccount') }}</RouterLink>
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
const success = ref('')

const form = reactive({ username: '', password: '', confirmPassword: '' })

const onSubmit = async () => {
  if (!form.username || !form.password || !form.confirmPassword) return
  if (form.password !== form.confirmPassword) {
    error.value = 'Password mismatch'
    return
  }
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    await authStore.register(form)
    success.value = 'Register success, redirecting...'
    setTimeout(() => router.push('/login'), 700)
  } catch (e: any) {
    error.value = e?.message || 'Register failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-card {
  width: min(460px, 100%);
}
</style>
