# React

Приоритет раздела: **P1 — ядро собеседования** · Цель: **4** · Текущий уровень: **? (диагностика в процессе, 3 из 5 вопросов)**

Шкала уровней и приоритетов — см. [CLAUDE.md](../CLAUDE.md). Подтемы отсортированы по приоритету: изучаем сверху вниз.

## Подтемы
| # | Приоритет | Подтема | Уровень | Последняя проверка | Заметки |
|---|---|---|---|---|---|
| 1 | P1 | Virtual DOM, reconciliation, Fiber, ключи (key) | ? | — | |
| 2 | P1 | Рендер и commit фазы, когда и почему компонент перерендеривается | 2 | 2026-10-03 | Миф «пропсы — причина рендера»; не назвал контекст и внешние сторы. Фазы render/commit не проверялись |
| 3 | P1 | useState, батчинг обновлений, функциональные апдейты | 3 | 2026-10-03 | Очередь апдейтеров и снимок рендера — уверенно; батчинг не знал (думал 3 рендера) — перепроверить |
| 4 | P1 | useEffect / useLayoutEffect, cleanup, зависимости, stale closure | 3 | 2026-10-03 | Stale closure и deps — верно; последствия отсутствия cleanup и StrictMode не назвал. useLayoutEffect не проверялся |
| 5 | P1 | useMemo, useCallback, React.memo — когда нужны и когда вредят | 2 | 2026-10-03 | Ссылочное равенство понимает; код с 2 ошибками (хук в стрелке, `() => { obj }`), не вынес константу за компонент, «когда вредит» — общо |
| 6 | P1 | useReducer, useContext и проблемы производительности контекста | ? | — | |
| 7 | P1 | Кастомные хуки, правила хуков и почему они такие | ? | — | |
| 8 | P1 | Паттерны: compound components, render props, HOC, controlled / uncontrolled | ? | — | |
| 9 | P2 | useRef, forwardRef, useImperativeHandle | ? | — | |
| 10 | P2 | Concurrent React: useTransition, useDeferredValue, Suspense | ? | — | |
| 11 | P2 | React 19: Actions, use, useOptimistic, useActionState, React Compiler | ? | — | |
| 12 | P2 | Server Components и SSR: концепции, гидрация | ? | — | |
| 13 | P2 | Error boundaries, порталы, StrictMode | ? | — | |
| 14 | P2 | Формы: управляемые поля, react-hook-form, валидация | ? | — | |
| 15 | P2 | Роутинг (React Router), code splitting, lazy | ? | — | |

## Материалы
- [theory/](theory/) — конспекты
- [tasks/](tasks/) — практические задачи с автотестами
- [quizzes/](quizzes/) — история опросов
