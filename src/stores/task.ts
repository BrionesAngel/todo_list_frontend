import { ref } from 'vue'
import { defineStore } from 'pinia'
import { taskService } from '../services/taskService'
import type { Task, TaskRequest } from '../types/task'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const isLoading = ref(false)

  async function fetchTasks(token: string) {
    isLoading.value = true
    try {
      tasks.value = await taskService.getTasks(token)
    } finally {
      isLoading.value = false
    }
  }

  async function createTask(request: TaskRequest, token: string) {
    const newTask = await taskService.createTask(request, token)
    tasks.value.push(newTask)
  }

  async function updateTask(id: number, request: TaskRequest, token: string) {
    const updated = await taskService.updateTask(id, request, token)
    tasks.value = tasks.value.map(t => t.id === id ? updated : t)
  }

  async function deleteTask(id: number, token: string) {
    await taskService.deleteTask(id, token)
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  return { tasks, isLoading, fetchTasks, createTask, updateTask, deleteTask }
})