// Auth API calls are isolated in this service to keep views/stores clean.

import { request } from './http'
import type { LoginRequest, LoginResponse } from '../types/task'

export const authService = {
  login(payload: LoginRequest) {
    return request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
