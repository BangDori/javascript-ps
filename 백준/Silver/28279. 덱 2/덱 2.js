class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class Dequeue {
  constructor() {
    this.head = null;
    this.rear = null;
    this.size = 0;
  }

  pushFront(val) {
    const node = new Node(val);

    if (this.size === 0) {
      this.head = node;
      this.rear = node;
      this.head.next = this.rear;
      this.rear.prev = this.head;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }

    this.size++;
  }

  pushBack(val) {
    const node = new Node(val);

    if (this.size === 0) {
      this.head = node;
      this.rear = node;
      this.head.next = this.rear;
      this.rear.prev = this.head;
    } else {
      this.rear.next = node;
      node.prev = this.rear;
      this.rear = node;
    }

    this.size++;
  }

  popFront() {
    if (this.size === 0) return null;

    const head = this.head;
    this.head = this.head.next;

    head.next = null;
    this.size--;

    if (this.size === 0) {
      this.rear = null;
    }

    return head.val;
  }

  popBack() {
    if (this.size === 0) return null;

    const rear = this.rear;
    this.rear = this.rear.prev;

    rear.next = null;
    this.size--;

    if (this.size === 0) {
      this.head = null;
    }

    return rear.val;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const commands = input.slice(1).map((el) => el.split(" ").map(Number));

const deque = new Dequeue();
const answer = [];

for (const command of commands) {
  switch (command[0]) {
    case 1:
      deque.pushFront(command[1]);
      break;
    case 2:
      deque.pushBack(command[1]);
      break;
    case 3:
      answer.push(deque.size ? deque.popFront() : -1);
      break;
    case 4:
      answer.push(deque.size ? deque.popBack() : -1);
      break;
    case 5:
      answer.push(deque.size);
      break;
    case 6:
      answer.push(deque.size ? 0 : 1);
      break;
    case 7:
      answer.push(deque.size ? deque.head.val : -1);
      break;
    case 8:
      answer.push(deque.size ? deque.rear.val : -1);
      break;
    default:
      break;
  }
}

console.log(answer.join("\n"));
