import { defineStore } from 'pinia'

type ThemeName = 'light' | 'dark'
type LocaleName = 'zh-CN' | 'en-US'

interface UiState {
  theme: ThemeName
  locale: LocaleName
}

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    theme: (localStorage.getItem('vibe_theme') as ThemeName) || 'light',
    locale: (localStorage.getItem('vibe_locale') as LocaleName) || 'zh-CN'
  }),
  actions: {
    setTheme(theme: ThemeName) {
      this.theme = theme
      localStorage.setItem('vibe_theme', theme)
    },
    toggleTheme() {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    },
    setLocale(locale: LocaleName) {
      this.locale = locale
      localStorage.setItem('vibe_locale', locale)
    }
  }
})
