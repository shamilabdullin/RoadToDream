# TypeScript

Приоритет раздела: **P1 — ядро собеседования** · Цель: **4** · Текущий уровень: **?**

Шкала уровней и приоритетов — см. [CLAUDE.md](../CLAUDE.md). Подтемы отсортированы по приоритету: изучаем сверху вниз.

## Подтемы
| # | Приоритет | Подтема | Уровень | Последняя проверка | Заметки |
|---|---|---|---|---|---|
| 1 | P1 | Базовые типы, any / unknown / never / void | 3 | 2026-09-27 | unknown vs any — отлично; never без практических кейсов (exhaustive check) |
| 2 | P1 | Interface vs type, расширение, declaration merging | 2 | 2026-09-27 | Практика верная; не знает declaration merging и extends vs & при конфликте |
| 3 | P1 | Union / intersection, сужение типов (narrowing), type guards | ? | — | |
| 4 | P1 | Дженерики и ограничения (extends, default) | ? | — | |
| 5 | P1 | Utility types (Partial, Pick, Omit, Record, ReturnType, Awaited ...) и их реализация | 1 | 2026-09-27 | MyPick: идея mapped type есть, синтаксис и семантика неверны |
| 6 | P1 | Типизация React: пропсы, children, дженерик-компоненты, события, ref | ? | — | |
| 7 | P2 | keyof, typeof, indexed access types | 1 | 2026-09-27 | Предв.: путает typeof (уровень значений) и indexed access T[K] |
| 8 | P2 | Conditional types, infer, дистрибутивность | ? | — | |
| 9 | P2 | Mapped types, key remapping, template literal types | ? | — | |
| 10 | P2 | Enum vs union литералов, as const, satisfies | ? | — | |
| 11 | P3 | Вариантность (ковариантность / контравариантность), structural typing | ? | — | |
| 12 | P3 | tsconfig: strict-флаги, module resolution, d.ts, декларации модулей | ? | — | |

## Материалы
- [theory/](theory/) — конспекты
- [tasks/](tasks/) — практические задачи с автотестами
- [quizzes/](quizzes/) — история опросов
