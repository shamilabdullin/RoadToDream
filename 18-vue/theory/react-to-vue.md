# Vue 3 для React-разработчика

Конспект «по верхам» для собеседования в Vue-команду. Всё — Vue 3, Composition API, `<script setup>`.

## 0. Что такое Vue и когда он лучше React / Angular
**Vue** — прогрессивный фреймворк для UI (Эван Ю, 2014). «Прогрессивный» — можно подключить к одной странице
через `<script>`, а можно строить полноценное SPA / SSR-приложение. По философии — посередине:
- **React** — библиотека: только UI, остальное (роутинг, стор, формы) выбираешь сам;
- **Angular** — полный фреймворк: всё из коробки и строгая архитектура (DI, модули, RxJS);
- **Vue** — официальная экосистема (Vue Router, Pinia, Vite, Nuxt), но без жёстких рамок Angular.

| Vue лучше, когда | React лучше, когда | Angular лучше, когда |
|---|---|---|
| нужен быстрый старт и низкий порог входа | нужна максимальная экосистема и большой рынок найма | большой enterprise, много команд |
| фронт пишут бэкендеры / верстальщики — шаблоны близки к HTML | нужен React Native (веб + мобилка) | нужна единая жёсткая структура «как у всех» |
| постепенное внедрение в legacy (серверные шаблоны PHP / Laravel, Django) | сложный продукт с нестандартными решениями | долгоживущий проект: банки, корпоративные системы (Т-Банк) |
| не хочется выбирать библиотеки — есть официальные | команда уже знает React | формы, HTTP, DI, тесты — нужны из коробки |

**Ответ на собесе «почему Vue»:** реактивность без ручной оптимизации (не нужны memo / useCallback),
понятные шаблоны, официальная согласованная экосистема — меньше времени на выбор инструментов и споры в команде.

## 1. Главная разница в одной фразе
**React:** функция компонента перезапускается на каждый рендер, изменения сообщаются явно (`setState`),
зависимости эффектов/мемоизации указываются вручную.
**Vue:** `setup` выполняется **один раз**, реактивная система (Proxy) сама отслеживает, какие данные читал
рендер, и перерисовывает только те компоненты, чьи данные изменились.

Следствия для Vue:
- нет stale closure — переменные в `setup` не пересоздаются, `.value` всегда актуален;
- нет массивов зависимостей, `useMemo` / `useCallback` / `React.memo` не нужны;
- нет «правил хуков» в строгом виде (но composables вызываются синхронно в `setup`);
- данные меняются мутацией (`count.value++`, `user.name = 'X'`), а не созданием копий.

## 2. Однофайловый компонент (SFC)
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
</script>

<template>
  <button @click="count++">{{ count }} × 2 = {{ double }}</button>
</template>

<style scoped>
button { color: teal; } /* scoped — стили только для этого компонента */
</style>
```
Шаблон компилируется в render-функцию, которая создаёт Virtual DOM (как JSX). В шаблоне `ref`
разворачивается автоматически — пишем `count`, а не `count.value`.

## 3. Шаблон: шпаргалка React → Vue
| React | Vue |
|---|---|
| `{value}` | `{{ value }}` |
| `<img src={url} />` | `<img :src="url" />` (`:` = `v-bind`) |
| `onClick={handle}` | `@click="handle"` (`@` = `v-on`) |
| `{cond && <A />}` / тернарник | `v-if` / `v-else-if` / `v-else` |
| `style={{display: cond ? '' : 'none'}}` | `v-show="cond"` (элемент в DOM, переключается `display`) |
| `items.map(i => <li key={i.id}>…)` | `<li v-for="i in items" :key="i.id">` |
| `value` + `onChange` | `v-model` |
| `children` | `<slot />` |

## 4. Связь родитель ↔ ребёнок: props вниз, события вверх
В React ребёнок вызывает **колбэк**, переданный пропсом. Во Vue ребёнок **генерирует событие** (`emit`),
родитель подписывается на него через `@`. Пропсы, как и в React, однонаправленные — мутировать их нельзя
(Vue выдаст предупреждение).

```tsx
// React
function Child({ count, onIncrement }) {
  return <button onClick={() => onIncrement(1)}>{count}</button>
}
<Child count={count} onIncrement={(n) => setCount(c => c + n)} />
```
```vue
<!-- Vue: Child.vue -->
<script setup lang="ts">
const props = defineProps<{ count: number }>()
const emit = defineEmits<{ increment: [step: number] }>()
</script>
<template>
  <button @click="emit('increment', 1)">{{ props.count }}</button>
</template>

<!-- Parent.vue -->
<Child :count="count" @increment="(n) => count += n" />
```
`defineProps` / `defineEmits` — макросы компилятора, импортировать не нужно.

## 5. v-model
**На `<input>`** — синтаксический сахар для двусторонней привязки:
```vue
<input v-model="text" />
<!-- то же самое, что: -->
<input :value="text" @input="text = $event.target.value" />
```
React-аналог — управляемый инпут: `<input value={text} onChange={e => setText(e.target.value)} />`.

**На своём компоненте** — договорённость «проп `modelValue` + событие `update:modelValue`»:
```vue
<MyInput v-model="text" />
<!-- разворачивается в: -->
<MyInput :modelValue="text" @update:modelValue="v => text = v" />
```
```vue
<!-- MyInput.vue, классический способ -->
<script setup lang="ts">
defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
<template>
  <input :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>

<!-- MyInput.vue, Vue 3.4+: defineModel делает то же самое -->
<script setup lang="ts">
const model = defineModel<string>()
</script>
<template>
  <input v-model="model" />
</template>
```
Несколько привязок: `<UserForm v-model:name="name" v-model:email="email" />` → пропсы `name`, `email`,
события `update:name`, `update:email`.

## 6. Слоты ≈ children и render props
```vue
<!-- Card.vue -->
<div class="card">
  <header><slot name="title" /></header>
  <slot />                                  <!-- default slot ≈ children -->
</div>

<Card>
  <template #title>Заголовок</template>
  Основной контент
</Card>
```
Scoped slot — ребёнок передаёт данные в слот (аналог render props):
`<slot :item="item" />` → `<template #default="{ item }">{{ item.name }}</template>`.

## 7. Реактивность и производные данные
| React | Vue | Что делает |
|---|---|---|
| `useState` | `ref` (любые значения), `reactive` (объекты) | реактивное состояние |
| `useMemo` | `computed` | производное значение, кешируется, зависимости — автоматически |
| `useEffect` с зависимостями | `watch(source, cb)` | побочный эффект при изменении конкретного источника; есть старое и новое значение |
| `useEffect` «на всё, что прочитал» | `watchEffect(cb)` | выполняется сразу, зависимости отслеживаются автоматически |

Правило: **вычислить значение → `computed`, сделать что-то (запрос, лог, localStorage) → `watch`.**

## 8. Жизненный цикл
| React | Vue |
|---|---|
| тело компонента при первом рендере | `<script setup>` (выполняется один раз) |
| `useEffect(() => {}, [])` | `onMounted` |
| cleanup в `useEffect` | `onUnmounted` (+ `onBeforeUnmount`) |
| `useEffect` без массива | `onUpdated` (нужен редко) |
| `useLayoutEffect` | `onBeforeMount` / `nextTick` — по ситуации |

## 9. Остальная экосистема — соответствия
| React | Vue |
|---|---|
| Context (`createContext` / `useContext`) | `provide` / `inject` |
| кастомные хуки | composables (`useMouse()` и т.п.), библиотека VueUse |
| Redux / Zustand | Pinia (официальный стор, раньше — Vuex) |
| React Router | Vue Router |
| Next.js | Nuxt |
| `forwardRef` + `useImperativeHandle` | `ref` на компоненте + `defineExpose` |
| `createPortal` | `<Teleport to="body">` |
| `React.lazy` + `Suspense` | `defineAsyncComponent` + `<Suspense>` |

## Типичные вопросы на собеседовании
- Как работает реактивность Vue 3 (Proxy, track / trigger)? Чем отличается от Vue 2 (`Object.defineProperty`)?
- `ref` vs `reactive`; почему деструктуризация `reactive` теряет реактивность (`toRefs`)?
- `computed` vs `watch` vs `watchEffect`.
- `v-if` vs `v-show`; зачем `key` в `v-for`.
- Как работает `v-model` на компоненте?
- Чем Vue отличается от React и почему во Vue не нужны `useMemo` / `useCallback`?
