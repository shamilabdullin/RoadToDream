<script setup lang="ts">
// ─────────────────────────────────────────────────────────────────────────────
// <script setup> выполняется ОДИН раз при создании компонента.
// В React функция компонента перезапускается на каждый рендер — здесь нет.
// Всё, что объявлено здесь (переменные, функции, импорты компонентов),
// автоматически доступно в <template>.
// ─────────────────────────────────────────────────────────────────────────────
import { ref, computed, watchEffect } from 'vue'
import type { Filter, Task } from './types'
import BaseCard from './components/BaseCard.vue'
import TaskInput from './components/TaskInput.vue'
import FilterTabs from './components/FilterTabs.vue'
import TaskItem from './components/TaskItem.vue'
import { useLocalStorage } from './composables/useLocalStorage'

// [1] ref — реактивное состояние. React: const [filter, setFilter] = useState('all')
// Сеттера нет: меняем через filter.value = 'done', Vue сам заметит изменение.
const filter = ref<Filter>('all')

// [2] Composable — аналог кастомного хука: ref + сохранение в localStorage.
const tasks = useLocalStorage<Task[]>('vue-todo-tasks', [
  { id: 1, title: 'Разобрать этот проект', done: false },
  { id: 2, title: 'Сравнить с React', done: true },
])

// [3] computed — производное значение. React: useMemo, но зависимости
// отслеживаются автоматически: Vue видит, что читались tasks и filter.
const visibleTasks = computed(() => {
  if (filter.value === 'active') return tasks.value.filter((t) => !t.done)
  if (filter.value === 'done') return tasks.value.filter((t) => t.done)
  return tasks.value
})
const activeCount = computed(() => tasks.value.filter((t) => !t.done).length)
const doneCount = computed(() => tasks.value.length - activeCount.value)

// [4] watchEffect — побочный эффект, перезапускается при изменении всего, что прочитал.
// React: useEffect(() => { document.title = ... }, [activeCount]) — но без массива зависимостей.
watchEffect(() => {
  document.title = `Задачи (${activeCount.value})`
})

// [5] Изменение данных — обычная МУТАЦИЯ. В React было бы setTasks([...tasks, newTask]).
function addTask(title: string) {
  tasks.value.push({ id: Date.now(), title, done: false })
}

function toggleTask(id: number) {
  const task = tasks.value.find((t) => t.id === id)
  if (task) task.done = !task.done
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter((t) => t.id !== id)
}

function clearDone() {
  tasks.value = tasks.value.filter((t) => !t.done)
}
</script>

<template>
  <main class="app">
    <!-- [6] Слоты: передаём разметку внутрь компонента. React: children и пропсы-элементы -->
    <BaseCard>
      <template #header>
        <h1>Задачи</h1>
        <!-- [7] {{ }} — интерполяция. ref в шаблоне разворачивается сам: activeCount, а не activeCount.value -->
        <span class="counter">{{ activeCount }} активных</span>
      </template>

      <!-- [8] Событие от ребёнка: @add слушает emit('add', ...). React: onAdd={addTask} -->
      <TaskInput @add="addTask" />

      <!-- [9] v-model на СВОЁМ компоненте: :modelValue="filter" + @update:modelValue="filter = $event" -->
      <FilterTabs v-model="filter" />

      <!-- [10] v-if / v-else — условный рендер (элемента нет в DOM). React: {cond ? <A/> : <B/>} -->
      <ul v-if="visibleTasks.length" class="list">
        <!-- [11] v-for + :key — рендер списка. React: visibleTasks.map(t => <TaskItem key={t.id} />) -->
        <!-- [12] :task — передача пропса (: = v-bind, значение — JS-выражение). React: task={task} -->
        <TaskItem
          v-for="task in visibleTasks"
          :key="task.id"
          :task="task"
          @toggle="toggleTask"
          @remove="removeTask"
        />
      </ul>
      <p v-else class="empty">Здесь пока пусто</p>

      <template #footer>
        <!-- [13] v-show — элемент всегда в DOM, переключается display: none. Для частых переключений -->
        <button v-show="doneCount > 0" class="link" @click="clearDone">
          Очистить выполненные ({{ doneCount }})
        </button>
      </template>
    </BaseCard>
  </main>
</template>

<style scoped>
/* scoped — стили применяются только к этому компоненту (Vue добавляет атрибуты data-v-xxx) */
.app {
  max-width: 480px;
  margin: 48px auto;
  padding: 0 16px;
}
h1 {
  margin: 0;
  font-size: 24px;
}
.counter {
  color: var(--muted);
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.empty {
  color: var(--muted);
  text-align: center;
  padding: 24px 0;
}
</style>
