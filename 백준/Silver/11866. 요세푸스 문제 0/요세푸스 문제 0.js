// 1, 2, ... N 원형
// 순서대로 K 번 째 사람을 제거
// N명의 사람이 모두 제거될 때 까지 반복

// Space: O(N)
// Time: O(N)

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    /**
     * Solution
     */

    const [N, K] = input[0].split(" ").map(Number);
    console.log(solution(N, K));

    process.exit();
  });

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class CircularQueue {
  constructor() {
    this.size = 0;
    this.head = null;
    this.rear = null;
  }

  push(num) {
    const node = new Node(num);

    if (this.size === 0) {
      this.head = node;
      this.rear = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }

    this.rear.next = this.head;

    this.size++;
  }

  pop() {
    if (this.size === 0) return;

    const removed = this.head;
    this.size--;

    this.head = this.head.next;
    this.rear.next = this.head;

    removed.next = null;

    return removed;
  }

  move(count) {
    for (let i = 0; i < count; i++) {
      this.rear = this.head;
      this.head = this.head.next;
    }
  }
}

function solution(N, K) {
  const answer = [];
  const circularQueue = new CircularQueue();

  // 노드 삽입
  for (let i = 1; i <= N; i++) {
    circularQueue.push(i);
  }

  while (circularQueue.size > 0) {
    circularQueue.move(K - 1);
    const node = circularQueue.pop();

    answer.push(node.val);
  }

  return `<${answer.join(", ")}>`;
}

// 1 100
// <1>

// 2 99
// <1, 2>

// 2 100
// <2, 1>

// 1000 1
