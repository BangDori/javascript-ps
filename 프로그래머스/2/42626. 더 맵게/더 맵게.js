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

  getParentIdx(childIdx) {
    return Math.floor((childIdx - 1) / 2);
  }

  getLeftChildIdx(parentIdx) {
    return parentIdx * 2 + 1;
  }

  getRightChildIdx(parentIdx) {
    return parentIdx * 2 + 2;
  }

  heapPop() {
    const heapSize = this.size();
    if (!heapSize) return null;
    if (heapSize === 1) return this.heap.pop();

    const value = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return value;
  }

  heapPush(value) {
    this.heap.push(value);
    this.bubbleUp();

    return this.heap;
  }

  bubbleUp() {
    let child = this.size() - 1;
    let parent = this.getParentIdx(child);

    while (this.heap[child] < this.heap[parent]) {
      this.swap(child, parent);
      child = parent;
      parent = this.getParentIdx(parent);
    }
  }

  bubbleDown() {
    let parent = 0;
    let leftChild = this.getLeftChildIdx(parent);
    let rightChild = this.getRightChildIdx(parent);

    while (
      (leftChild <= this.size() - 1 &&
        this.heap[leftChild] < this.heap[parent]) ||
      (rightChild <= this.size() - 1 &&
        this.heap[rightChild] < this.heap[parent])
    ) {
      if (
        rightChild <= this.size() - 1 &&
        this.heap[leftChild] > this.heap[rightChild]
      ) {
        this.swap(parent, rightChild);
        parent = rightChild;
      } else {
        this.swap(parent, leftChild);
        parent = leftChild;
      }
      leftChild = this.getLeftChildIdx(parent);
      rightChild = this.getRightChildIdx(parent);
    }
  }
}

function solution(scoville, K) {
  let answer = 0;

  const heap = new MinHeap();
  scoville.forEach((el) => heap.heapPush(el));

  while (heap.heap[0] < K && heap.size() >= 2) {
    answer++;
    heap.heapPush(heap.heapPop() + heap.heapPop() * 2);
  }

  return heap.heap[0] >= K ? answer : -1;
}
