import { mergeSort } from './sort.js';
import { binarySearch } from './binarySearch.js';
import { isBalanced } from './brackets.js';

const sorted = mergeSort([5, 2, 9, 1, 7, 3]);
console.log('Сортировка:', sorted);
console.log('Поиск 7:', binarySearch(sorted, 7));
console.log('Поиск 4:', binarySearch(sorted, 4));
console.log('({}) ->', isBalanced('({})'));
console.log('({)} ->', isBalanced('({)}'));
