// Auth API calls are isolated in this service to keep views/stores clean.

import { request } from './http'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/task'

export const authService = {
  login(payload: LoginRequest) {
    return request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  register(payload: RegisterRequest) {
    return request<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }
}
