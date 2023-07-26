class TrieNode {
  constructor(char) {
    this.char = char;
    this.isEndOfWord = false;
    this.children = new Map();
  }
}

export default class Trie {
  constructor() {
    this.root = new TrieNode("");
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode(char));
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
  }

  searchPrefix(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (node.children.has(char)) {
        node = node.children.get(char);
      } else {
        return [];
      }
    }
    return this._getWords(node, prefix);
  }

  _getWords(node, prefix) {
    let words = [];
    if (node.isEndOfWord) {
      words.push(prefix);
    }
    for (let [char, childNode] of node.children) {
      words.push(...this._getWords(childNode, prefix + char));
    }
    return words;
  }
}
