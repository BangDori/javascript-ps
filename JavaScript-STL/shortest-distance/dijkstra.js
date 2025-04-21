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

  push(source, dist) {
    this.heap.push({ source, dist });
    this.bubbleUp();

    return this.heap;
  }

  bubbleUp() {
    let child = this.size() - 1;
    let parent = this.getParentIdx(child);

    while (parent !== -1 && this.heap[child].dist < this.heap[parent].dist) {
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
        this.heap[leftChild].dist < this.heap[parent].dist) ||
      (rightChild <= this.size() - 1 &&
        this.heap[rightChild].dist < this.heap[parent].dist)
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

function dijkstra(n, distances, start, end) {
  const dist = Array.from({ length: n }, () => Infinity);
  const graph = Array.from({ length: n }, () => []);

  for (const [src, dest, dist] of distances) {
    graph[src - 1].push([dest - 1, dist]);
  }

  const pq = new PriorityQueue();
  dist[start - 1] = 0;
  pq.push(start - 1, 0);

  // 최단 거리 갱신
  while (pq.size() > 0) {
    const { source, dist: currentDist } = pq.pop();

    if (currentDist > dist[source]) continue;

    for (const [dest, extra] of graph[source]) {
      const nextDist = currentDist + extra;

      if (dist[dest] > nextDist) {
        dist[dest] = nextDist;
        pq.push(dest, nextDist);
      }
    }
  }

  return dist[end - 1];
}

const n = 5;
const distances = [
  [1, 2, 2],
  [1, 3, 3],
  [1, 4, 1],
  [1, 5, 10],
  [2, 4, 2],
  [3, 4, 1],
  [3, 5, 1],
  [4, 5, 3],
];
const start = 1;
const end = 5;

console.info(dijkstra(n, distances, start, end));
