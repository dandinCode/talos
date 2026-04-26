import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginService, createUser } from '@/services/user'
import { isTokenExpired } from '@/utils/jwt'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const currentToken = token.value

  if (currentToken && isTokenExpired(currentToken)) {
    token.value = null
    localStorage.removeItem('token')
  }

  const isAuthenticated = computed(() => !!token.value)

  function setToken(value: string | null) {
    token.value = value

    if (value) {
      localStorage.setItem('token', value)
    } else {
      localStorage.removeItem('token')
    }
  }

  async function login(email: string, password: string) {
    loading.value = true

    try {
      await loginService(email, password)
    } finally {
      loading.value = false
    }
  }

  async function register(name: string, email: string, password: string) {
    loading.value = true

    try {
      await createUser(name, email, password)
    } finally {
      loading.value = false
    }
  }

  function logout() {
    setToken(null)
    localStorage.removeItem('token')
  }

  return {
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  }
})
