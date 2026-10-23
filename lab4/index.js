import { heapSort } from './heapSort.js';
import { topKLargest, topKSmallest } from './topK.js';
import { PriorityQueue } from './priorityQueue.js';

const data = [5, 1, 9, 3, 7, 2, 8];
console.log('Пирамидальная сортировка:', heapSort(data.slice()));
console.log('Топ-3 сверху:', topKLargest(data, 3));
console.log('Топ-3 снизу:', topKSmallest(data, 3));

const pq = new PriorityQueue();
pq.enqueue('низкий', 1);
pq.enqueue('высокий', 5);
pq.enqueue('средний', 3);
console.log('Очередь:', pq.dequeue(), pq.dequeue(), pq.dequeue());
