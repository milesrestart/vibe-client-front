<template>
  <v-card rounded="lg" elevation="2">
    <v-card-title class="text-h6">{{ t('profile.title') }}</v-card-title>
    <v-card-text>
      <div class="profile-head">
        <v-avatar size="96" class="avatar-box">
          <v-img v-if="avatarSrc" :src="avatarSrc" cover />
          <span v-else class="text-h5">{{ userInitial }}</span>
        </v-avatar>

        <div class="profile-meta">
          <p class="text-subtitle-1 mb-1">{{ user?.nickname || user?.username || '-' }}</p>
          <p class="text-body-2 text-medium-emphasis mb-3">{{ user?.username || '-' }}</p>

          <div class="upload-row">
            <v-file-input
              v-model="avatarFile"
              density="comfortable"
              variant="outlined"
              :label="t('profile.chooseAvatar')"
              accept="image/*"
              show-size
              hide-details
              clearable
              :multiple="false"
              style="max-width: 320px"
            />
            <v-btn color="primary" :loading="uploading" @click="doUpload">{{ t('profile.uploadAvatar') }}</v-btn>
          </div>

          <p v-if="uploadMessage" class="text-caption mt-2" :class="uploadError ? 'text-error' : 'text-success'">
            {{ uploadMessage }}
          </p>
        </div>
      </div>

      <v-divider class="my-4" />

      <v-list lines="two">
        <v-list-item :title="t('profile.nickname')" :subtitle="user?.nickname || '-'" />
        <v-list-item :title="t('profile.phone')" :subtitle="user?.phone || '-'" />
        <v-list-item :title="t('profile.email')" :subtitle="user?.email || '-'" />
        <v-list-item :title="t('profile.gender')" :subtitle="genderText" />
        <v-list-item :title="t('profile.birthday')" :subtitle="user?.birthday || '-'" />
        <v-list-item :title="t('profile.status')" :subtitle="user?.status === '0' ? t('profile.enabled') : t('profile.disabled')" />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { t } = useI18n()
const user = computed(() => authStore.userInfo)
const avatarFile = ref<File | File[] | null>(null)
const uploading = ref(false)
const uploadMessage = ref('')
const uploadError = ref(false)
const siteBaseUrl = import.meta.env.VITE_SITE_BASE_URL || `${window.location.protocol}//${window.location.hostname}:8080`

const avatarSrc = computed(() => {
  const raw = user.value?.avatar?.trim()
  if (!raw) return ''
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  if (raw.startsWith('/')) return `${siteBaseUrl}${raw}`
  return `${siteBaseUrl}/${raw}`
})

const userInitial = computed(() => (user.value?.username || 'U').slice(0, 1).toUpperCase())

const genderText = computed(() => {
  if (user.value?.gender === '1') return t('profile.male')
  if (user.value?.gender === '2') return t('profile.female')
  return t('profile.unknown')
})

const getSelectedFile = (): File | null => {
  if (!avatarFile.value) return null
  if (Array.isArray(avatarFile.value)) return avatarFile.value[0] || null
  return avatarFile.value
}

const doUpload = async () => {
  const file = getSelectedFile()
  if (!file) {
    uploadMessage.value = t('profile.uploadPick')
    uploadError.value = true
    return
  }

  uploading.value = true
  uploadMessage.value = ''
  uploadError.value = false

  try {
    await authStore.uploadAvatar(file)
    await authStore.fetchUserInfo()
    uploadMessage.value = t('profile.uploadOk')
    avatarFile.value = null
  } catch (e: any) {
    uploadMessage.value = e?.message || 'Upload failed'
    uploadError.value = true
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.profile-head {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.avatar-box {
  border: 1px solid #e2e8f0;
}

.profile-meta {
  flex: 1;
  min-width: 280px;
}

.upload-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
</style>
