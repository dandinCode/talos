import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as loginService, createUser, logout as logoutService, getUser } from '@/services/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<any | null>(null)
  const loading = ref(false)
  const isAuthenticated = ref(false)

  async function login(email: string, password: string) {
    loading.value = true
    try {
      await loginService(email, password)
      await loadUser()
      isAuthenticated.value = true
    } finally {
      loading.value = false
    }
  }

  async function register(name: string, email: string, password: string) {
    loading.value = true

    try {
      await createUser(name, email, password)
      await loadUser()
    } finally {
      loading.value = false
    }
  }

  async function loadUser() {
    user.value = await getUser()
  }

  async function logout() {
    await logoutService()
    isAuthenticated.value = false
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    loadUser,
    register,
    logout,
  }
})
