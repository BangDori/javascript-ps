class Node {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class PhoneBook {
  constructor() {
    this.root = new Node();
  }

  insert(phoneNumber) {
    let node = this.root;

    for (const char of phoneNumber) {
      if (!node.children[char]) node.children[char] = new Node();
      node = node.children[char];
    }
  }

  startsWith(phoneNumber) {
    let node = this.root;

    for (const char of phoneNumber) {
      if (!node.children[char]) return true;
      node = node.children[char];
    }

    return false;
  }
}

function solution(phoneNumbers) {
  const phoneBook = new PhoneBook();

  phoneNumbers.sort((a, b) => b.length - a.length);

  for (const phoneNumber of phoneNumbers) {
    const isUnique = phoneBook.startsWith(phoneNumber);

    if (!isUnique) return "NO";
    phoneBook.insert(phoneNumber);
  }

  return "YES";
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let i = 0;
const TC = +input[i++];

for (let t = 0; t < TC; t++) {
  const phoneNumberCount = +input[i++];
  const phoneNumbers = [];

  for (let k = 0; k < phoneNumberCount; k++) {
    phoneNumbers.push(input[i++]);
  }

  console.log(solution(phoneNumbers));
}
