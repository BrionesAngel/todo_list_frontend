import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authService } from '../services/authService'
import type { LoginRequest, RegisterRequest } from '../types/task'

const TOKEN_KEY = 'task_app_token'

// Setup-store style keeps state and actions close together.
export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => Boolean(token.value))

  function initializeFromStorage() {
    token.value = localStorage.getItem(TOKEN_KEY)
  }

  async function login(credentials: LoginRequest) {
    isLoading.value = true
    try {
      const response = await authService.login(credentials)
      token.value = response.token
      localStorage.setItem(TOKEN_KEY, response.token)
    } finally {
      isLoading.value = false
    }
  }

  async function register(credentials: RegisterRequest) {
    isLoading.value = true
    try {
      const response = await authService.register(credentials)
      token.value = response.token
      localStorage.setItem(TOKEN_KEY, response.token)
    } finally {
      isLoading.value = false
    } 
  }

  function logout() {
    token.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  return {
    token,
    isLoading,
    isAuthenticated,
    initializeFromStorage,
    login,
    register,
    logout,
  }
})
