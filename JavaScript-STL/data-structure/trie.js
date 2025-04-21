class Node {
  constructor() {
    this.children = {}; // 자식 노드 (문자 → TrieNode)
    this.isEnd = false; // 단어의 끝인지 여부
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new Node();
      }

      node = node.children[char];
    }

    node.isEnd = true; // 단어의 끝을 표시
  }

  search(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }

    return node.isEnd;
  }

  // 접두어 검색
  startsWith(prefix) {
    let node = this.root;

    for (const char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }

    return true;
  }
}

const trie = new Trie();

trie.insert("hello");
trie.insert("helium");

console.log(trie.search("hello"));
console.log(trie.search("hell"));
console.log(trie.startsWith("hel"));
console.log(trie.startsWith("hex"));
