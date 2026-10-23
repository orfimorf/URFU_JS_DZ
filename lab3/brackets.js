const PAIRS = { ')': '(', ']': '[', '}': '{', '>': '<' };

/**
 * Проверяет, что скобки ()[]{}<> сбалансированы.
 * Время: O(n), память: O(n).
 */
export function isBalanced(str) {
  const stack = [];

  for (const ch of str) {
    if ('([{<'.includes(ch)) {
      stack.push(ch);
    } else if (ch in PAIRS && stack.pop() !== PAIRS[ch]) {
      return false;
    }
  }

  return stack.length === 0;
}
