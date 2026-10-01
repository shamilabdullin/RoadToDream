<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from 'vue'

// defineEmits — объявляем, какие события компонент отправляет родителю.
// React: проп-колбэк onAdd: (title: string) => void
const emit = defineEmits<{ add: [title: string] }>()

// Локальное состояние поля — живёт только внутри этого компонента
const title = ref('')

// Ссылка на DOM-элемент. React: const inputRef = useRef<HTMLInputElement>(null)
// Строка 'input' совпадает с атрибутом ref="input" в шаблоне.
const inputEl = useTemplateRef<HTMLInputElement>('input')

// Хук жизненного цикла: компонент вставлен в DOM. React: useEffect(() => {...}, [])
// До монтирования элемента ещё нет, поэтому фокус ставим здесь, а не в теле <script setup>.
onMounted(() => {
  inputEl.value?.focus()
})

function submit() {
  const trimmed = title.value.trim()
  if (!trimmed) return
  emit('add', trimmed) // React: props.onAdd(trimmed)
  title.value = ''
}
</script>

<template>
  <!-- @submit.prevent — модификатор события: сам вызовет event.preventDefault() -->
  <form class="task-input" @submit.prevent="submit">
    <!-- v-model на input = :value="title" + @input="title = $event.target.value".
         React: <input value={title} onChange={e => setTitle(e.target.value)} /> -->
    <input ref="input" v-model="title" placeholder="Что нужно сделать?" />
    <!-- :disabled — атрибут, вычисляемый из JS-выражения -->
    <button type="submit" :disabled="!title.trim()">Добавить</button>
  </form>
</template>

<style scoped>
.task-input {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font: inherit;
}
button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: var(--accent);
  color: white;
  font: inherit;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
