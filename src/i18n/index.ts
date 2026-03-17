import { createI18n } from 'vue-i18n'
import zhCN from '@/locales/zh-CN'
import enUS from '@/locales/en-US'

const fallbackLocale = 'zh-CN'
const locale = localStorage.getItem('vibe_locale') || fallbackLocale

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export default i18n
