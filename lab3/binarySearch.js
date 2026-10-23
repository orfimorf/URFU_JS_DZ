/**
 * Бинарный поиск в отсортированном массиве.
 * Возвращает индекс элемента или -1.
 * Время: O(log n), память: O(1).
 */
export function binarySearch(sorted, target) {
  let left = 0;
  let right = sorted.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
