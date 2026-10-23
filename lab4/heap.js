/**
 * Компаратор по умолчанию для данных типа Any.
 * Для разных типов > < работают некорректно, поэтому сначала сравниваем тип,
 * а внутри одного типа — значения. Для объектов нужно передать свой компаратор.
 */
const TYPE_ORDER = ['undefined', 'boolean', 'number', 'bigint', 'string'];

export function defaultCompare(a, b) {
  const ta = TYPE_ORDER.indexOf(typeof a);
  const tb = TYPE_ORDER.indexOf(typeof b);
  if (ta === -1 || tb === -1) {
    throw new TypeError('Для объектов передайте свой компаратор');
  }
  if (ta !== tb) return ta - tb;
  if (Number.isNaN(a) || Number.isNaN(b)) return Number.isNaN(a) - Number.isNaN(b);
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * Двоичная куча на массиве. В корне — минимальный элемент по compare.
 * Родитель i: (i - 1) / 2, дети: 2i + 1 и 2i + 2.
 * push, pop — O(log n), peek — O(1), память — O(n).
 */
export class Heap {
  constructor(compare = defaultCompare) {
    this.compare = compare;
    this.data = [];
  }

  get size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    this.data.push(value);
    siftUp(this.data, this.data.length - 1, this.compare);
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      siftDown(this.data, 0, this.data.length, this.compare);
    }
    return top;
  }
}

/** Min Heap: в корне минимум. */
export const createMinHeap = (compare = defaultCompare) => new Heap(compare);

/** Max Heap: в корне максимум (тот же Heap с обратным компаратором). */
export const createMaxHeap = (compare = defaultCompare) => new Heap((a, b) => compare(b, a));

export function siftUp(a, i, compare) {
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (compare(a[i], a[parent]) >= 0) break;
    [a[i], a[parent]] = [a[parent], a[i]];
    i = parent;
  }
}

export function siftDown(a, i, size, compare) {
  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let smallest = i;

    if (left < size && compare(a[left], a[smallest]) < 0) smallest = left;
    if (right < size && compare(a[right], a[smallest]) < 0) smallest = right;
    if (smallest === i) break;

    [a[i], a[smallest]] = [a[smallest], a[i]];
    i = smallest;
  }
}
