// Task API layer. Views call these functions instead of using fetch directly.

import { request } from './http'
import type { Task } from '../types/task'

export interface CreateTaskPayload {
  title: string
  description?: string
}

export const taskService = {
  getTasks(token: string) {
    return request<Task[]>('/tasks', { method: 'GET', token })
  },

  createTask(payload: CreateTaskPayload, token: string) {
    return request<Task>('/tasks', {
      method: 'POST',
      token,
      body: JSON.stringify(payload),
    })
  },

  updateTask(id: number, task: Partial<Task>, token: string) {
    return request<Task>(`/tasks/${id}`, {
      method: 'PUT',
      token,
      body: JSON.stringify(task),
    })
  },

  deleteTask(id: number, token: string) {
    return request<null>(`/tasks/${id}`, {
      method: 'DELETE',
      token,
    })
  },
}
