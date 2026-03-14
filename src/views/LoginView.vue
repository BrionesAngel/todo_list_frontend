<template>
  <section class="mx-auto flex min-h-screen max-w-md items-center px-4">
    <div class="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      <h1 class="text-2xl font-bold text-slate-900">Task Manager</h1>
      <p class="mt-1 text-sm text-slate-600">Sign in to manage your tasks.</p>

      <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700" for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            autocomplete="current-password"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
          />
        </div>

        <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>

        <button
          type="submit"
          class="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="authStore.isLoading"
        >
          {{ authStore.isLoading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { HttpError } from '../services/http'

const authStore = useAuthStore()
const router = useRouter()

// Reactive form state for the login payload.
const form = reactive({
  email: '',
  password: '',
})

const error = ref('')

async function onSubmit() {
  error.value = ''

  try {
    await authStore.login(form)
    await router.push({ name: 'tasks' })
  } catch (err) {
    error.value = err instanceof HttpError ? err.message : 'Login failed. Please try again.'
  }
}
</script>
