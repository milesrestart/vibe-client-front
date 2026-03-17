import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { getToken } from '@/utils/token'

export interface ApiResponse<T = unknown> {
  code: number
  msg: string
  data: T
}

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
})

instance.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function unwrapResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
  const res = response.data
  if (res.code !== 200) {
    throw new Error(res.msg || 'Request failed')
  }
  return res.data
}

const http = {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return instance.get<ApiResponse<T>>(url, config).then(unwrapResponse)
  },
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.post<ApiResponse<T>>(url, data, config).then(unwrapResponse)
  },
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.put<ApiResponse<T>>(url, data, config).then(unwrapResponse)
  },
  delete<T>(url: string, config?: AxiosRequestConfig) {
    return instance.delete<ApiResponse<T>>(url, config).then(unwrapResponse)
  }
}

export default http
