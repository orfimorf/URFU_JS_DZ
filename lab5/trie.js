/**
 * Словарь на префиксном дереве (trie).
 * Каждый узел — одна буква, общие префиксы слов хранятся один раз.
 *
 * add(word), has(word) — O(L), L — длина слова.
 * addAll(words) — O(N), N — суммарная длина слов.
 * Память — O(K), K — число различных префиксов слов (K <= N).
 */
export class Trie {
  constructor() {
    this.root = { children: new Map(), end: false };
  }

  add(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, { children: new Map(), end: false });
      }
      node = node.children.get(ch);
    }
    node.end = true;
  }

  addAll(words) {
    for (const word of words) this.add(word);
  }

  has(word) {
    let node = this.root;
    for (const ch of word) {
      node = node.children.get(ch);
      if (!node) return false;
    }
    return node.end;
  }
}
