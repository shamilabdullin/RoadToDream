// Two Sum II: массив ОТСОРТИРОВАН по возрастанию.
// Вернуть индексы двух элементов с суммой target или null, если пары нет.
// Ограничение: O(n) по времени и O(1) по памяти — без Map и Set.

function twoSumSorted(nums, target) {
  // твой код
}

// ---------- Тесты ----------
const cases = [
  { nums: [1, 3, 4, 6, 9], target: 12, expected: [1, 4] },
  { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
  { nums: [-5, -2, 0, 3, 8], target: 1, expected: [1, 3] },
  { nums: [1, 2, 3], target: 100, expected: null },
  { nums: [5], target: 10, expected: null },
];

function runTests(fn) {
  console.log(`--- ${fn.name} ---`);
  for (const { nums, target, expected } of cases) {
    const actual = fn(nums, target);
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(
      `${ok ? '✅' : '❌'} ${fn.name}([${nums}], ${target}) → ${JSON.stringify(actual)}` +
        (ok ? '' : `, ожидалось ${JSON.stringify(expected)}`)
    );
  }
}

runTests(twoSumSorted);
