<template>
  <section class="mx-auto min-h-screen max-w-2xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-3xl font-bold text-slate-900">Edit Task</h1>
      <RouterLink to="/tasks" class="text-sm font-medium text-indigo-600 hover:text-indigo-700">Back to tasks</RouterLink>
    </div>

    <form class="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm" @submit.prevent="onSubmit">
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="title">Title</label>
        <input
          id="title"
          v-model="title"
          type="text"
          required
          class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="description">Description</label>
        <textarea
          id="description"
          v-model="description"
          rows="4"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="completed">Completed</label>
        <input
          id="completed"
          v-model="completed"
          type="checkbox"
          class="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>

      <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>

      <button
        type="submit"
        class="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="isSaving"
      >
        {{ isSaving ? 'Updating...' : 'Update task' }}
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useTaskStore } from '../stores/task'
import { HttpError } from '../services/http'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const taskStore = useTaskStore()

const taskId = Number(route.params.id)
const task = taskStore.tasks.find(t => t.id === taskId)

const title = ref(task?.title ?? '')        
const description = ref(task?.description ?? '') 
const completed = ref(task?.completed ?? false) 
const isSaving = ref(false)
const error = ref('')

async function onSubmit() {
  if (!authStore.token) return

  isSaving.value = true
  error.value = ''

  try {
    await taskStore.updateTask(
      taskId, 
      {
        title: title.value,
        description: description.value,
        completed: completed.value,
      },
      authStore.token,
    )

    await router.push({ name: 'tasks' })
  } catch (err) {
    error.value = err instanceof HttpError ? err.message : 'Failed to update task.'
  } finally {
    isSaving.value = false
  }
}

onMounted(async () => {
  if (!authStore.token) return
  if (taskStore.tasks.length === 0) {
    await taskStore.fetchTasks(authStore.token)
  }
  const task = taskStore.tasks.find(t => t.id === taskId)
  title.value = task?.title ?? ''
  description.value = task?.description ?? ''
  completed.value = task?.completed ?? false
})
</script>
