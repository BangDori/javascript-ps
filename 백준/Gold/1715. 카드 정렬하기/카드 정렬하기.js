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

    const n = +input[0];
    const cards = input.slice(1).map(Number);
    console.log(solution(n, cards));

    process.exit();
  });

//   0
// 1   2

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  getParentIdx(child) {
    return Math.floor((child - 1) / 2);
  }

  getLeftChildIdx(parent) {
    return parent * 2 + 1;
  }

  getRightChildIdx(parent) {
    return parent * 2 + 2;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let child = this.size() - 1;
    let parent = this.getParentIdx(child);

    if (child === 0) return;

    while (this.heap[child] < this.heap[parent]) {
      this.swap(parent, child);

      child = parent;
      parent = this.getParentIdx(child);
    }
  }

  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return min;
  }

  bubbleDown() {
    let parent = 0;
    let lChild = this.getLeftChildIdx(parent);
    let rChild = this.getRightChildIdx(parent);

    while (
      (lChild < this.size() && this.heap[lChild] < this.heap[parent]) ||
      (rChild < this.size() && this.heap[rChild] < this.heap[parent])
    ) {
      if (rChild < this.size() && this.heap[rChild] < this.heap[lChild]) {
        this.swap(parent, rChild);

        parent = rChild;
      } else {
        this.swap(parent, lChild);

        parent = lChild;
      }

      lChild = this.getLeftChildIdx(parent);
      rChild = this.getRightChildIdx(parent);
    }
  }
}

function solution(n, cards) {
  const heap = new MinHeap();

  for (const card of cards) {
    heap.push(card);
  }

  let answer = 0;

  while (heap.size() > 1) {
    const a = heap.pop();
    const b = heap.pop();

    const result = a + b;
    answer += result;

    heap.push(result);
  }

  return answer;
}

// 한 묶음인 경우
// 90
// 90이 아니라 0이네요

// 동일한 묶음이 오는 경우
// 10, 10, 10, 10
// 80

// 두 묶음인 경우
// 80, 50
// 130
