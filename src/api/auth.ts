import http from '@/api/http'

export interface RegisterPayload {
  username: string
  password: string
  confirmPassword: string
  nickname?: string
  phone?: string
  email?: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  gender: string
  birthday: string
  phone: string
  email: string
  status: string
}

export function registerApi(data: RegisterPayload) {
  return http.post('/app/auth/register', data)
}

export function loginApi(data: LoginPayload) {
  return http.post<{ token: string }>('/app/auth/login', data)
}

export function infoApi() {
  return http.get<UserInfo>('/app/auth/info')
}

export function logoutApi() {
  return http.post('/app/auth/logout')
}

export function uploadAvatarApi(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return http.post<{ avatar: string }>('/app/auth/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
