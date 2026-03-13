<template>
  <section class="mx-auto min-h-screen max-w-2xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-3xl font-bold text-slate-900">Create Task</h1>
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

      <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>

      <button
        type="submit"
        class="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="isSaving"
      >
        {{ isSaving ? 'Creating...' : 'Create task' }}
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { HttpError } from '../services/http'
import { taskService } from '../services/taskService'

const router = useRouter()
const authStore = useAuthStore()

const title = ref('')
const description = ref('')
const isSaving = ref(false)
const error = ref('')

async function onSubmit() {
  if (!authStore.token) return

  isSaving.value = true
  error.value = ''

  try {
    await taskService.createTask(
      {
        title: title.value,
        description: description.value,
      },
      authStore.token,
    )

    await router.push({ name: 'tasks' })
  } catch (err) {
    error.value = err instanceof HttpError ? err.message : 'Failed to create task.'
  } finally {
    isSaving.value = false
  }
}
</script>
