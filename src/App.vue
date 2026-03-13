<template>
  <!-- Root shell: routed pages are rendered here. -->
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>