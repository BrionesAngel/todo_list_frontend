<template>
  <!-- Reusable task row component for list actions (toggle/delete). -->
  <article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-1">
        <h3
          class="text-base font-semibold text-slate-900"
          :class="{ 'line-through text-slate-400': task.completed }"
        >
          {{ task.title }}
        </h3>
        <p v-if="task.description" class="text-sm text-slate-600">
          {{ task.description }}
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="rounded-lg px-3 py-1.5 text-sm font-medium text-white"
          :class="task.completed ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700'"
          @click="$emit('toggle', task)"
        >
          {{ task.completed ? 'Undo' : 'Complete' }}
        </button>

        <button
          type="button"
          class="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-700"
          @click="$emit('delete', task.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Task } from '../types/task'

defineProps<{
  task: Task
}>()

// Emitted events keep parent in control of side effects.
defineEmits<{
  toggle: [task: Task]
  delete: [id: number]
}>()
</script>
