// Правильная скобочная последовательность — условие в README.md.
// Пиши решение здесь. Проверка: открой index.html в браузере (F5 после правки)
// или запусти `npm test -- 04-data-structures/tasks/01-valid-brackets`.

const comparablePairs = {
  '{': '}',
  '[': ']',
  '(': ')'
}

function isValid(string) {
  const stack = []
  const startBracket = Object.keys(comparablePairs)

  if(string.length % 2 !== 0) return false

  for(const el of string) {
    if (startBracket.includes(el)) stack.push(el)
    else {
      if (stack.length === 0) return false
      if (comparablePairs[stack[stack.length - 1]] === el) {
        stack.pop()
      }
      else return false
    }
  }
  
  if (stack.length === 0) return true
  return false;
}
