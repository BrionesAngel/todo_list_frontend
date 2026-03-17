<template>
  <section class="mx-auto min-h-screen max-w-4xl px-4 py-8">
    <header class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">My Tasks</h1>
        <p class="text-slate-600">Track, complete and remove your tasks.</p>
      </div>

      <div class="flex items-center gap-2">
        <RouterLink
          to="/tasks/create"
          class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Create Task
        </RouterLink>
        <button
          type="button"
          class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          @click="onLogout"
        >
          Logout
        </button>
      </div>
    </header>

    <p v-if="error" class="mb-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{{ error }}</p>

    <div v-if="isLoading" class="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">Loading tasks...</div>

    <div v-else-if="tasks.length === 0" class="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
      No tasks yet. Create your first task.
    </div>

    <div v-else class="space-y-3">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @delete="deleteTask"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import TaskItem from '../components/TaskItem.vue'
import { useAuthStore } from '../stores/auth'
import { useTaskStore } from '../stores/task'
import { HttpError } from '../services/http'
import type { Task } from '../types/task'

const authStore = useAuthStore()
const router = useRouter()

const error = ref('') 

const taskStore = useTaskStore()
const tasks = computed(() => taskStore.tasks) 
const isLoading = computed(() => taskStore.isLoading)

async function loadTasks() {
  if (!authStore.token) return
  await taskStore.fetchTasks(authStore.token)
}

async function toggleTask(task: Task) {
  if (!authStore.token) return
  try {
    await taskStore.updateTask(task.id, {
      title: task.title,
      description: task.description,
      completed: !task.completed,
    }, authStore.token)
  } catch (err) {
    error.value = err instanceof HttpError ? err.message : 'Failed to update task.'
  }
}

async function deleteTask(taskId: number) {
  if (!authStore.token) return
  try {
    await taskStore.deleteTask(taskId, authStore.token)
  } catch (err) {
    error.value = err instanceof HttpError ? err.message : 'Failed to delete task.'
  }
}


function onLogout() {
  authStore.logout()
  router.push({ name: 'login' })
}

onMounted(loadTasks)
</script>
