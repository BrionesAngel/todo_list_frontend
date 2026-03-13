# Frontend architecture map

This folder follows a feature-oriented but simple structure suitable for Vue 3 + TypeScript apps.

- `components/` → Reusable UI blocks such as `TaskItem.vue`.
- `views/` → Route pages (`LoginView`, `TasksView`, `CreateTaskView`).
- `stores/` → Pinia stores for cross-page state (`auth.ts`).
- `services/` → API communication layer (`authService`, `taskService`, `http`).
- `router/` → App routes and route guards (`index.ts`).
- `types/` → Shared TypeScript models for backend contracts (`task.ts`).
- `assets/` → Static assets (images, icons, fonts, etc.).

Keeping API calls, state, and UI separate improves maintainability and testing.
