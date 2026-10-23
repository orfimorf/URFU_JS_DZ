import { defaultCompare, siftDown } from './heap.js';

/**
 * Пирамидальная сортировка на месте, по возрастанию.
 * 1. Строим Max Heap из массива — O(n).
 * 2. n раз переносим максимум в конец и просеиваем корень — O(n log n).
 * Время: O(n log n), доп. память: O(1).
 */
export function heapSort(array, compare = defaultCompare) {
  const maxCompare = (a, b) => compare(b, a);
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(array, i, n, maxCompare);
  }

  for (let end = n - 1; end > 0; end--) {
    [array[0], array[end]] = [array[end], array[0]];
    siftDown(array, 0, end, maxCompare);
  }

  return array;
}
