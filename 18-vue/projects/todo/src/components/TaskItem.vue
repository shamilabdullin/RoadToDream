<script setup lang="ts">
import type { Task } from '../types'

// defineProps — входные данные от родителя. Как и в React, они только для чтения:
// task.done = true здесь вызовет предупреждение Vue. Изменения — через события.
defineProps<{ task: Task }>()

const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>

<template>
  <li class="task" :class="{ done: task.done }">
    <label>
      <!-- Не v-model: проп менять нельзя. Показываем значение (:checked)
           и сообщаем родителю об изменении (@change) — родитель владеет данными -->
      <input type="checkbox" :checked="task.done" @change="emit('toggle', task.id)" />
      <span>{{ task.title }}</span>
    </label>
    <button class="remove" aria-label="Удалить" @click="emit('remove', task.id)">×</button>
  </li>
</template>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}
label {
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
}
.done span {
  color: var(--muted);
  text-decoration: line-through;
}
.remove {
  border: none;
  background: none;
  font-size: 20px;
  color: var(--muted);
  cursor: pointer;
}
.remove:hover {
  color: #e5484d;
}
</style>
