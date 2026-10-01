# Vue Todo — базовые концепции Vue на одном проекте

Vue 3.5 + Vite + TypeScript, Composition API, `<script setup>`.
Теория и сравнительные таблицы — [../../theory/react-to-vue.md](../../theory/react-to-vue.md).

## Запуск
```
cd 18-vue/projects/todo
npm install      # только в первый раз (или после git clone)
npm run dev      # открыть адрес из терминала, обычно http://localhost:5173
```
Правки в `.vue`-файлах применяются в браузере сразу (HMR).

## Структура
```
src/
├── main.ts                       # точка входа: createApp(App).mount('#app')
├── App.vue                       # корень: состояние списка, computed, watchEffect, слоты, v-if/v-for
├── types.ts                      # Task, Filter
├── composables/
│   └── useLocalStorage.ts        # composable (≈ кастомный хук): ref + watch
└── components/
    ├── BaseCard.vue              # слоты: default, именованные, $slots
    ├── TaskInput.vue             # локальный ref, v-model на input, emit, onMounted, template ref
    ├── FilterTabs.vue            # v-model на своём компоненте через defineModel
    └── TaskItem.vue              # defineProps, emit, :class, почему не v-model на пропе
```

## Маршрут разбора (читать в этом порядке)
| # | Файл | Концепции | React-аналог |
|---|---|---|---|
| 1 | `main.ts` | создание приложения | `createRoot().render()` |
| 2 | `App.vue` (script) | `ref`, `computed`, `watchEffect`, мутация данных | `useState`, `useMemo`, `useEffect`, иммутабельные апдейты |
| 3 | `App.vue` (template) | `{{ }}`, `:prop`, `@event`, `v-if`/`v-else`, `v-for`+`:key`, `v-show`, слоты | JSX, `map`, тернарники, `children` |
| 4 | `TaskInput.vue` | `v-model` на input, `defineEmits`, `onMounted`, `useTemplateRef`, `@submit.prevent` | управляемый input, колбэк-проп, `useEffect([])`, `useRef` |
| 5 | `TaskItem.vue` | `defineProps` (read-only), `:class`, события вверх | пропсы, `className`, колбэки |
| 6 | `FilterTabs.vue` | `defineModel` — v-model на своём компоненте | `value` + `onChange` |
| 7 | `BaseCard.vue` | `<slot>`, `<template #name>`, `$slots` | `children`, пропсы-элементы |
| 8 | `useLocalStorage.ts` | composable, `watch` с `deep` | кастомный хук + `useEffect` |

Комментарии `[1]…[13]` в `App.vue` отмечают концепции по порядку.

## Эксперименты (чтобы «пощупать» реактивность)
1. Открой Vue DevTools (расширение браузера) — посмотри дерево компонентов, пропсы, состояние.
2. В `useLocalStorage.ts` убери `{ deep: true }`. Отметь задачу выполненной и обнови страницу — сохранилось?
   Почему удаление задачи при этом сохраняется, а отметка — нет?
3. В `TaskItem.vue` замени `:checked` + `@change` на `v-model="task.done"`. Что скажет Vue в консоли и почему?
4. Замени `v-show` в футере `App.vue` на `v-if` и посмотри в DevTools → Elements, чем отличается DOM.

## Упражнения (пишешь сам)
1. **Счётчик в табах:** показывать количество задач в каждом табе — «Активные (3)». Где посчитать и как передать?
2. **Кнопка «Отметить все»:** если есть активные — отмечает все, иначе снимает отметки. Подсказка: `computed` для текста кнопки.
3. **Сохранение фильтра:** выбранный таб не должен сбрасываться после перезагрузки. Одна строка благодаря composable.
4. **Редактирование по двойному клику:** в `TaskItem` по `@dblclick` показывать input вместо текста, Enter — сохранить
   (новое событие `rename`), Escape — отменить. Понадобятся локальный `ref`, `v-if`, модификаторы `@keyup.enter` / `@keyup.esc`.
5. **Загрузка с сервера:** если в localStorage пусто — в `onMounted` загрузить 5 задач с
   `https://jsonplaceholder.typicode.com/todos?_limit=5` и показать «Загрузка…» пока идёт запрос.
