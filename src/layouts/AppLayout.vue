<template>
  <v-app>
    <v-app-bar elevation="1" class="app-bar">
      <div class="brand">Vibe Client</div>

      <template v-if="!mobile">
        <v-btn variant="text" :active="$route.path === '/home'" to="/home">{{ t('common.home') }}</v-btn>
        <v-btn variant="text" :active="$route.path === '/player'" to="/player">{{ t('common.player') }}</v-btn>
        <v-btn variant="text" :active="$route.path === '/profile'" to="/profile">{{ t('common.profile') }}</v-btn>
      </template>

      <v-spacer />

      <v-btn variant="text" @click="toggleTheme">{{ themeLabel }}</v-btn>
      <v-select
        :model-value="uiStore.locale"
        :items="localeItems"
        item-title="label"
        item-value="value"
        density="compact"
        hide-details
        variant="outlined"
        class="locale-select"
        @update:model-value="switchLocale"
      />
      <v-btn variant="text" @click="doLogout">{{ t('common.logout') }}</v-btn>
    </v-app-bar>

    <v-main>
      <div class="page-bg"></div>
      <v-container :class="['main-container', mobile ? 'mobile' : 'desktop']">
        <router-view />
      </v-container>
    </v-main>

    <v-bottom-navigation v-if="mobile" grow class="mobile-nav">
      <v-btn to="/home">
        <span>{{ t('common.home') }}</span>
      </v-btn>
      <v-btn to="/player">
        <span>{{ t('common.player') }}</span>
      </v-btn>
      <v-btn to="/profile">
        <span>{{ t('common.profile') }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay, useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const { mobile } = useDisplay()
const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUiStore()
const theme = useTheme()
const { t, locale } = useI18n()

const localeItems = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
]

watch(
  () => uiStore.theme,
  (value) => {
    theme.global.name.value = value
  },
  { immediate: true }
)

watch(
  () => uiStore.locale,
  (value) => {
    locale.value = value
  },
  { immediate: true }
)

const themeLabel = computed(() => (uiStore.theme === 'light' ? t('common.dark') : t('common.light')))

const toggleTheme = () => uiStore.toggleTheme()
const switchLocale = (value: 'zh-CN' | 'en-US') => uiStore.setLocale(value)

const doLogout = async () => {
  await authStore.logout()
  await router.push('/login')
}
</script>

<style scoped>
.app-bar {
  backdrop-filter: blur(8px);
}

.brand {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.2px;
  margin-right: 12px;
}

.locale-select {
  width: 120px;
  margin-right: 8px;
}

.main-container.desktop {
  max-width: 1100px;
  padding-top: 28px;
  padding-bottom: 24px;
}

.main-container.mobile {
  padding-top: 18px;
  padding-bottom: 92px;
}

.page-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(circle at 8% 10%, rgba(15, 74, 161, 0.14), transparent 38%),
    radial-gradient(circle at 88% 88%, rgba(17, 167, 155, 0.13), transparent 36%);
}

.mobile-nav {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
