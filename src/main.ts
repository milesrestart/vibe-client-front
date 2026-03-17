import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/lib/styles/main.css'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

const app = createApp(App)
const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1565c0',
          secondary: '#4db6ac',
          background: '#f4f7fb',
          surface: '#ffffff'
        }
      }
    }
  }
})

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')


