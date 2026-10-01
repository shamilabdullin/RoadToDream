<script setup lang="ts">
import type { Filter } from '../types'

// defineModel (Vue 3.4+) — поддержка v-model на своём компоненте.
// Под капотом: проп modelValue + событие update:modelValue.
// filter ведёт себя как ref: читаем filter.value, а присваивание отправит событие родителю.
// React: пара пропсов value + onChange, которую компонент вызывает вручную.
const filter = defineModel<Filter>({ required: true })

const options: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'done', label: 'Выполненные' },
]
</script>

<template>
  <div class="tabs">
    <!-- :class с объектом — класс добавляется, если значение true. React: className={cn({ active })} -->
    <button
      v-for="option in options"
      :key="option.value"
      :class="{ active: filter === option.value }"
      @click="filter = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}
button {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  font: inherit;
  cursor: pointer;
}
.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}
</style>
