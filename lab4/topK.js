import { defaultCompare, createMinHeap, createMaxHeap } from './heap.js';

/**
 * Топ-k наибольших: Min Heap размера k, в корне — наименьший из k лучших.
 * Время: O(n log k), память: O(k).
 */
export function topKLargest(array, k, compare = defaultCompare) {
  const heap = createMinHeap(compare);
  for (const x of array) {
    heap.push(x);
    if (heap.size > k) heap.pop();
  }
  return drain(heap).reverse();
}

/**
 * Топ-k наименьших: Max Heap размера k, в корне — наибольший из k лучших.
 * Время: O(n log k), память: O(k).
 */
export function topKSmallest(array, k, compare = defaultCompare) {
  const heap = createMaxHeap(compare);
  for (const x of array) {
    heap.push(x);
    if (heap.size > k) heap.pop();
  }
  return drain(heap).reverse();
}

function drain(heap) {
  const result = [];
  while (heap.size > 0) result.push(heap.pop());
  return result;
}
