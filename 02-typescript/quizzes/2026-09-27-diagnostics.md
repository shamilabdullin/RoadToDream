# Диагностика: TypeScript — 2026-09-27

## 1. unknown vs any, never
**Ответ ученика:** unknown — тип пока неизвестен, но проверки не отключены: обращение к полю даст ошибку; any отключает
все проверки и «заражает» код новыми any. Лучше unknown. never — невозможный тип, который получается в результате
операций с типами.
**Разбор:** unknown / any — верно и с правильной аргументацией. Дополнить: unknown используют после сужения
(typeof, instanceof, type guard); unknown присваивается только в unknown/any, any — куда угодно.
never — верно по сути, но без конкретики: функция, которая всегда бросает исключение или не завершается;
exhaustive check в switch; пересечение несовместимых типов (`string & number`); отбрасывание вариантов в
conditional types (`Exclude`).
**Оценка:** 3 — уверенно объясняет, не хватает практических кейсов never.

## 2. interface vs type
**Ответ ученика:** схожи; interface — для объектов, расширяется через extends; type — для union / intersection /
литералов, гибче. Для объектов рекомендуют interface, поэтому для пропсов — interface.
**Разбор:** практическое разделение верное. Не названы ключевые технические отличия:
declaration merging (интерфейсы с одним именем сливаются, type — нет; так расширяют Window, типы библиотек);
extends сообщает о конфликте свойств, а `&` молча даёт never; type умеет union, tuple, mapped и conditional types,
interface — только формы объектов; interface кешируется компилятором (рекомендация TS team для производительности).
Для пропсов оба варианта нормальны, важна консистентность в проекте.
**Оценка:** 2 — практика верная, технические отличия не знает (прежде всего declaration merging).

## 3. Реализация Pick
**Ответ ученика:** `type MyPick<T, K> =  [keyof K in T]: typeof keyof K`
**Правильно:** `type MyPick<T, K extends keyof T> = { [P in K]: T[P] }`
**Разбор:** идея mapped type + keyof есть. Ошибки: нет ограничения `K extends keyof T`; итерация перевёрнута
(перебираем ключи K, а не keyof K in T); нет фигурных скобок; `typeof` — оператор уровня значений,
тип свойства берётся через indexed access `T[P]`.
**Оценка:** utility types — 1; keyof / typeof / indexed access — 1 (предв.): путает typeof и T[K].

## 4. Типизация getProperty (2026-09-29)
**Ответ ученика (с подсказкой про K extends keyof T):**
`type getPropertyType<T, K extends keyof T> = (obj: T, key: K) => T[K]`
**Разбор:** логика типов верная — ограничение ключа и возвращаемый T[K]. Нюанс: дженерики объявлены на псевдониме типа,
а не на сигнатуре → при использовании нужно явно указывать `getPropertyType<typeof user, 'age'>`, вывода на каждый
вызов не будет. Правильно: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`
или generic call signature `type GetProperty = <T, K extends keyof T>(obj: T, key: K) => T[K]`.
**Оценка:** дженерики — 3 (с подсказкой); keyof / indexed access — поднят до 2 (применил сразу после разбора).

## Итог диагностики TS
Уровень раздела (предварительно): **2**. Сильно: any / unknown / never. Слабо: utility types и их реализация,
технические отличия interface / type (declaration merging), typeof vs T[K].
Быстро применяет новое после разбора.
