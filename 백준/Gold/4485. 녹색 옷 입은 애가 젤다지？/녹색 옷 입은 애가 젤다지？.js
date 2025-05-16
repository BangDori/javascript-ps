class PriorityQueue {
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

  push(item) {
    this.heap.push(item);
    this.bubbleUp();
  }

  bubbleUp() {
    let child = this.size() - 1;
    let parent = this.getParentIdx(child);

    while (parent >= 0 && this.heap[parent][2] > this.heap[child][2]) {
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
    let lChild = this.getLeftChildIdx(parent);
    let rChild = this.getRightChildIdx(parent);

    const heapSize = this.size();

    while (
      (lChild < heapSize && this.heap[lChild][2] < this.heap[parent][2]) ||
      (rChild < heapSize && this.heap[rChild][2] < this.heap[parent][2])
    ) {
      if (rChild < heapSize && this.heap[rChild][2] < this.heap[lChild][2]) {
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

function solution(n, cave) {
  const dists = Array.from({ length: n }, () => Array(n).fill(Infinity));

  const pq = new PriorityQueue();

  dists[0][0] = cave[0][0];
  pq.push([0, 0, cave[0][0]]);

  while (pq.size() > 0) {
    const [y, x, cost] = pq.pop();

    if (dists[y][x] < cost) continue;

    for (let [dy, dx] of dirs) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;

      const extra = cave[ny][nx];
      const nextCost = cost + extra;

      if (dists[ny][nx] > nextCost) {
        dists[ny][nx] = nextCost;
        pq.push([ny, nx, nextCost]);
      }
    }
  }

  return dists[n - 1][n - 1];
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const dirs = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

let i = 0;
let pid = 0;

while (true) {
  const n = +input[i++];
  pid++;

  if (n === 0) break;

  const cave = [];

  for (let k = 0; k < n; k++) {
    cave.push(input[i++].split(" ").map(Number));
  }

  const answer = solution(n, cave);
  console.log(`Problem ${pid}: ${answer}`);
}
