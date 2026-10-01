import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// solution.js и cases.js — обычные скрипты без export (чтобы их можно было подключить в index.html),
// поэтому читаем их как текст и достаём функцию и кейсы.
const load = (file) => readFileSync(new URL(file, import.meta.url), 'utf8')
const { isValid, CASES } = new Function(`${load('./cases.js')}\n${load('./solution.js')}\nreturn { isValid, CASES }`)()

const short = (s) => (s.length > 20 ? `${s.slice(0, 20)}… (${s.length} символов)` : JSON.stringify(s))

describe('isValid', () => {
  for (const { s, expected, note } of CASES) {
    it(`${short(s)} → ${expected}${note ? ` (${note})` : ''}`, () => {
      expect(isValid(s)).toBe(expected)
    })
  }
})
