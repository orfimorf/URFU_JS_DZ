/**
 * Суффиксное дерево — сжатый trie всех суффиксов строки.
 * Метка ребра хранится как пара индексов [start, end) в тексте, а не как строка.
 * В конец добавляется уникальный символ END, чтобы каждый суффикс заканчивался в своём листе.
 *
 * Построение: вставляем суффиксы по одному — O(n^2).
 * Узлов: не больше 2n, память O(n).
 * contains(pattern): O(m).
 */
const END = Symbol('$');

export class SuffixTree {
  /** @param {string | Array} text — строка или массив символов */
  constructor(text) {
    this.s = [...text, END];
    this.root = createNode(0, 0, null);
    this.leaves = [];

    for (let i = 0; i < this.s.length; i++) {
      this.leaves[i] = this.insertSuffix(i);
    }
  }

  insertSuffix(i) {
    const s = this.s;
    let node = this.root;
    let pos = i;

    while (true) {
      const child = node.children.get(s[pos]);

      // нет ребра с нужной буквой — создаём лист
      if (!child) {
        const leaf = createNode(pos, s.length, node);
        node.children.set(s[pos], leaf);
        return leaf;
      }

      // идём по ребру, пока символы совпадают
      let k = child.start;
      while (k < child.end && s[k] === s[pos]) {
        k++;
        pos++;
      }

      if (k === child.end) {
        node = child;
        continue;
      }

      // несовпадение посередине ребра — разрезаем его
      const middle = createNode(child.start, k, node);
      node.children.set(s[child.start], middle);
      child.start = k;
      child.parent = middle;
      middle.children.set(s[k], child);

      const leaf = createNode(pos, s.length, middle);
      middle.children.set(s[pos], leaf);
      return leaf;
    }
  }

  /** Является ли pattern подстрокой текста. */
  contains(pattern) {
    const p = [...pattern];
    let node = this.root;
    let i = 0;

    while (i < p.length) {
      const child = node.children.get(p[i]);
      if (!child) return false;
      for (let k = child.start; k < child.end && i < p.length; k++, i++) {
        if (this.s[k] !== p[i]) return false;
      }
      node = child;
    }
    return true;
  }

  /**
   * Длина общего префикса суффиксов, начинающихся в i и j.
   * Это глубина их общего предка (LCA) в дереве. O(n) в худшем случае.
   */
  lcp(i, j) {
    let u = this.leaves[i];
    let v = this.leaves[j];
    while (u !== v) {
      if (u.depth >= v.depth) u = u.parent;
      else v = v.parent;
    }
    return u.depth;
  }
}

function createNode(start, end, parent) {
  return {
    start,
    end,
    parent,
    children: new Map(),
    // depth — длина строки от корня до узла
    depth: parent ? parent.depth + (end - start) : 0,
  };
}
