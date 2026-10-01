import { ref, watch, type Ref } from 'vue'

// Composable — функция, которая использует реактивность Vue и переиспользуется между компонентами.
// Аналог кастомного хука React (useLocalStorage), но вызывается один раз в <script setup>,
// а не на каждый рендер, поэтому нет проблем со stale closure и правилами хуков.
export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  const data = ref(read(key, initialValue)) as Ref<T>

  // watch — эффект на изменение конкретного источника. React: useEffect(() => {...}, [data])
  // deep: true — реагировать и на мутации внутри (push в массив, task.done = true),
  // а не только на замену всего значения (data.value = [...]).
  watch(
    data,
    (value) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    { deep: true },
  )

  return data
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
