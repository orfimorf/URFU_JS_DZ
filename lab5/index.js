import { Trie } from './trie.js';

const dict = new Trie();
dict.addAll(['кот', 'кота', 'котик', 'код', 'дом']);
dict.add('домик');

console.log('кот:', dict.has('кот'));
console.log('домик:', dict.has('домик'));
console.log('ко:', dict.has('ко'));
console.log('собака:', dict.has('собака'));
