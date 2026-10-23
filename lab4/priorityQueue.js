import { defaultCompare, Heap } from './heap.js';

/**
 * Очередь с приоритетом на куче. Первым выходит элемент с наибольшим приоритетом.
 * enqueue, dequeue — O(log n), peek — O(1).
 */
export class PriorityQueue {
  constructor(compare = defaultCompare) {
    this.heap = new Heap((a, b) => compare(b.priority, a.priority));
  }

  get size() {
    return this.heap.size;
  }

  enqueue(value, priority) {
    this.heap.push({ value, priority });
  }

  dequeue() {
    return this.heap.pop()?.value;
  }

  peek() {
    return this.heap.peek()?.value;
  }
}
