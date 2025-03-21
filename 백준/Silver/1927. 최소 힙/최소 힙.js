const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class MinHeap {
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

    return this.heap;
  }

  bubbleUp() {
    let child = this.size() - 1;
    let parent = this.getParentIdx(child);

    // 최소 힙
    while (this.heap[child] < this.heap[parent]) {
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
      (lChild <= this.size() - 1 && this.heap[lChild] < this.heap[parent]) ||
      (rChild <= this.size() - 1 && this.heap[rChild] < this.heap[parent])
    ) {
      if (rChild <= this.size() - 1 && this.heap[rChild] < this.heap[lChild]) {
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

function solution(n, nums) {
  const answer = [];
  const heap = new MinHeap();

  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      const data = heap.heapPop();
      answer.push(data);
    } else {
      heap.heapPush(nums[i]);
    }
  }

  return answer.join("\n");
}
