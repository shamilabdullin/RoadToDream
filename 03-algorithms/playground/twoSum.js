// Two Sum: вернуть индексы двух элементов, сумма которых равна target.
// Один элемент нельзя использовать дважды. Решение ровно одно.

// Версия 1: перебор — твой код как есть. Прогони тесты и посмотри, что он вернёт.
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return [];
}

// Версия 2: O(n) через Map — напиши здесь.
function twoSumFast(nums, target) {
  const numsMap = new Map()
  for (let i = 0; i < nums.length; i++) {
    const oppositeNum = target - nums[i]
    if (numsMap.has(oppositeNum)) return [numsMap.get(oppositeNum), i]
    else numsMap.set(nums[i], i)
  }
  return []
}

// ---------- Тесты ----------
const cases = [
  { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
  { nums: [3, 2, 4], target: 6, expected: [1, 2] },
  { nums: [3, 3], target: 6, expected: [0, 1] },
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

runTests(twoSumBrute);
runTests(twoSumFast);
