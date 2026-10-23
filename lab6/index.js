import { SuffixTree } from './suffixTree.js';
import { longestPalindrome } from './longestPalindrome.js';

const tree = new SuffixTree('banana');
console.log('banana содержит "nan":', tree.contains('nan'));
console.log('banana содержит "nab":', tree.contains('nab'));

for (const s of ['babad', 'cbbd', 'forgeeksskeegfor', 'арозаупаланалапуазора']) {
  console.log(`Палиндром в "${s}":`, longestPalindrome(s));
}
