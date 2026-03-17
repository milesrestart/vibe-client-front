import { defineStore } from 'pinia'
import { infoApi, loginApi, logoutApi, registerApi, type RegisterPayload, type UserInfo } from '@/api/auth'
import { getToken, removeToken, setToken } from '@/utils/token'

interface AuthState {
  token: string
  userInfo: UserInfo | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: getToken(),
    userInfo: null
  }),
  actions: {
    async register(payload: RegisterPayload) {
      await registerApi(payload)
    },
    async login(payload: { username: string; password: string }) {
      const res = await loginApi(payload)
      const token = res.token
      this.token = token
      setToken(token)
      await this.fetchUserInfo()
    },
    async fetchUserInfo() {
      const res = await infoApi()
      this.userInfo = res
    },
    async logout() {
      try {
        await logoutApi()
      } finally {
        this.logoutLocal()
      }
    },
    logoutLocal() {
      this.token = ''
      this.userInfo = null
      removeToken()
    }
  }
})
