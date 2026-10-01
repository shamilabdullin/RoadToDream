// Общие тест-кейсы для index.html и solution.test.js
var CASES = [
  { s: '()', expected: true },
  { s: '()[]{}', expected: true },
  { s: '([{}])', expected: true },
  { s: '{[]}()', expected: true },
  { s: '(((())))', expected: true },
  { s: '', expected: true },
  { s: '(]', expected: false, note: 'неверный тип пары' },
  { s: '([)]', expected: false, note: 'неверный порядок закрытия' },
  { s: '((', expected: false, note: 'остались незакрытые' },
  { s: '(', expected: false, note: 'одна открывающая' },
  { s: ')', expected: false, note: 'закрывающая без открывающей' },
  { s: '())', expected: false, note: 'лишняя закрывающая в конце' },
  { s: '){', expected: false, note: 'закрывающая раньше открывающей' },
  { s: '([]', expected: false, note: 'незакрытая внешняя' },
  { s: '('.repeat(5000) + ')'.repeat(5000), expected: true, note: 'длинная строка, 10 000 символов' },
  { s: '('.repeat(5000) + ')'.repeat(4999) + ']', expected: false, note: 'длинная, ошибка в последнем символе' },
];
