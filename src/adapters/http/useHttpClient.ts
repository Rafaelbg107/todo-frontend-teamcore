import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { BASE_URL } from '../../constants/ConstantsApp'

export const useHttpClient = () => {
  const client: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor (for auth tokens, etc.)
  client.interceptors.request.use(
    (config) => {
      // const token = localStorage.getItem('authToken')
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor (for error handling, etc.)
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('HTTP Error:', error)
      return Promise.reject(error)
    }
  )

  return {
    get: <T>(url: string, config?: AxiosRequestConfig) => client.get<T>(url, config),
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => client.post<T>(url, data, config),
    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => client.put<T>(url, data, config),
    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) => client.patch<T>(url, data, config),
    delete: <T>(url: string, config?: AxiosRequestConfig) => client.delete<T>(url, config),
  }
}