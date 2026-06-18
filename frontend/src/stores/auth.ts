import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface AuthUser {
  id: number
  firstName: string | null
  lastName: string | null
  email: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<AuthUser | null>(null)

  const isAuthenticated = computed(() => token.value !== null)

  const setSession = (newToken: string, newUser: AuthUser) => {
    token.value = newToken
    user.value = newUser
    localStorage.setItem('token', newToken)
  }

  const clearSession = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  return { token, user, isAuthenticated, setSession, clearSession }
})
