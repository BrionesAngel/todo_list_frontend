// Centralized API model types used by services, stores and views.

export interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
}

export interface TaskRequest {
  title: string
  description?: string
  completed?: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface RegisterResponse {
  token: string
}
