const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.size = 0;
    this.head = null;
    this.rear = null;
  }

  push(val) {
    const node = new Node(val);

    if (this.size === 0) {
      this.head = node;
      this.rear = node;
      this.head.next = this.rear;
    } else {
      this.rear.next = node;
      this.rear = node;
    }

    this.size++;
  }

  pop() {
    if (this.size === 0) return -1;

    const removed = this.head;
    this.size--;

    this.head = this.head.next;

    removed.next = null;

    return removed.val;
  }

  empty() {
    return this.size === 0 ? 1 : 0;
  }

  front() {
    return this.size === 0 ? -1 : this.head.val;
  }

  back() {
    return this.size === 0 ? -1 : this.rear.val;
  }
}

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    /**
     * Solution
     */

    const n = +input[0];
    const ops = input.slice(1);
    console.log(solution(n, ops));

    process.exit();
  });

function solution(n, ops) {
  const answer = [];
  const queue = new Queue();

  for (let i = 0; i < n; i++) {
    const [op, num] = ops[i].split(" ");
    switch (op) {
      case "front":
        answer.push(queue.front());
        break;
      case "back":
        answer.push(queue.back());
        break;
      case "empty":
        answer.push(queue.empty());
        break;
      case "size":
        answer.push(queue.size);
        break;
      case "pop":
        answer.push(queue.pop());
        break;
      default:
        queue.push(Number(num));
    }
  }

  return answer.join("\n");
}
