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
    const array = input.slice(1).map(Number);
    console.log(solution(array));

    process.exit();
  });

class Heap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
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

  push(val) {
    const abs = Math.abs(val);

    this.heap.push({ abs, val });
    this.bubbleUp();
  }

  condition(parent, child) {
    return (
      this.heap[parent].abs > this.heap[child].abs ||
      (this.heap[parent].abs === this.heap[child].abs &&
        this.heap[parent].val > this.heap[child].val)
    );
  }

  bubbleUp() {
    let child = this.size() - 1;
    let parent = this.getParentIdx(child);

    while (child >= 1) {
      if (this.condition(parent, child)) {
        this.swap(parent, child);

        child = parent;
        parent = this.getParentIdx(child);
      } else {
        break;
      }
    }
  }

  pop() {
    if (this.size() === 0) return 0;
    if (this.size() === 1) return this.heap.pop().val;

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return top.val;
  }

  bubbleDown() {
    let parent = 0;
    let lChild = this.getLeftChildIdx(parent);
    let rChild = this.getRightChildIdx(parent);

    while (
      (lChild < this.size() && this.condition(parent, lChild)) ||
      (rChild < this.size() && this.condition(parent, rChild))
    ) {
      if (rChild < this.size() && this.condition(lChild, rChild)) {
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

function solution(array) {
  const heap = new Heap();
  const answer = [];

  for (const num of array) {
    switch (num) {
      case 0:
        const top = heap.pop();
        answer.push(top);
        break;
      default:
        heap.push(num);
        break;
    }
  }

  return answer.join("\n");
}
