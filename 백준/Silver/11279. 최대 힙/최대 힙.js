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
    const nums = input.slice(1).map(Number);
    console.log(solution(n, nums));

    process.exit();
  });

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    return this.heap;
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

  heapPush(num) {
    this.heap.push(num);
    this.bubbleUp();
  }

  bubbleUp() {
    let child = this.size() - 1;
    let parent = this.getParentIdx(child);

    while (this.heap[parent] < this.heap[child]) {
      this.swap(parent, child);
      child = parent;
      parent = this.getParentIdx(parent);
    }
  }

  heapPop() {
    const heapSize = this.size();
    if (heapSize === 0) return 0;
    if (heapSize === 1) return this.heap.pop();

    const removed = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return removed;
  }

  bubbleDown() {
    let parent = 0;
    let lChild = this.getLeftChildIdx(parent);
    let rChild = this.getRightChildIdx(parent);

    while (
      (lChild <= this.size() - 1 && this.heap[lChild] > this.heap[parent]) ||
      (rChild <= this.size() - 1 && this.heap[rChild] > this.heap[parent])
    ) {
      if (rChild <= this.size() - 1 && this.heap[rChild] > this.heap[lChild]) {
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

function solution(n, nums) {
  const answer = [];
  const heap = new MaxHeap();

  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      const root = heap.heapPop();
      answer.push(root);
    } else {
      heap.heapPush(nums[i]);
    }
  }

  return answer.join("\n");
}
