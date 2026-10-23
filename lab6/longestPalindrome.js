import { SuffixTree } from './suffixTree.js';

const SEP = Symbol('#');

/**
 * Самый длинный палиндром в строке с помощью суффиксного дерева.
 *
 * Строим дерево для T = S # reverse(S).
 * Палиндром с центром c: строка, прочитанная от c вправо, совпадает с прочитанной влево.
 * Чтение влево — это чтение вправо в reverse(S), поэтому радиус палиндрома —
 * общий префикс двух суффиксов T, т.е. lcp() в дереве.
 *   нечётная длина, центр в c:          k = lcp(c, 2n - c),     длина 2k - 1
 *   чётная длина, центр между c-1 и c:  k = lcp(c, 2n + 1 - c), длина 2k
 */
export function longestPalindrome(str) {
  const s = [...str];
  const n = s.length;
  if (n < 2) return str;

  const tree = new SuffixTree([...s, SEP, ...s.slice().reverse()]);
  let bestStart = 0;
  let bestLen = 1;

  for (let c = 0; c < n; c++) {
    const odd = tree.lcp(c, 2 * n - c);
    if (2 * odd - 1 > bestLen) {
      bestLen = 2 * odd - 1;
      bestStart = c - odd + 1;
    }

    if (c > 0) {
      const even = tree.lcp(c, 2 * n + 1 - c);
      if (2 * even > bestLen) {
        bestLen = 2 * even;
        bestStart = c - even;
      }
    }
  }

  return s.slice(bestStart, bestStart + bestLen).join('');
}
