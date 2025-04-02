// MinHeap과 MaxHeap 기반의 자료구조
// Root의 인덱스는 0
// ⬇️ 코드는 MinHeap
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  getParentIdx(child) {
    return Math.floor((child - 1) / 2);
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    return this.heap;
  }

  getLeftChildIdx(parent) {
    return parent * 2 + 1;
  }

  getRightChildIdx(parent) {
    return parent * 2 + 2;
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();

    return this.heap;
  }

  bubbleUp() {
    let child = this.size() - 1;
    let parent = this.getParentIdx(child);

    while (this.heap[child] < this.heap[parent]) {
      this.swap(parent, child);

      child = parent;
      parent = this.getParentIdx(child);
    }
  }

  pop() {
    const heapSize = this.size();
    if (heapSize === 0) return null;
    if (heapSize === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return root;
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
        this.heap[rightChild] < this.heap[leftChild]
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
