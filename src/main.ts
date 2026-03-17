import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/lib/styles/main.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/styles/main.css'

const app = createApp(App)
const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: localStorage.getItem('vibe_theme') || 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#0f4aa1',
          secondary: '#11a79b',
          background: '#f2f5f9',
          surface: '#ffffff'
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#80b3ff',
          secondary: '#54dfd2',
          background: '#121820',
          surface: '#1b2430'
        }
      }
    }
  }
})

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(vuetify)
app.mount('#app')
