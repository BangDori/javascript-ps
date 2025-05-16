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

  push(city, dist) {
    this.heap.push({ city, dist });
    this.bubbleUp();
  }

  bubbleUp() {
    let child = this.size() - 1;
    let parent = this.getParentIdx(child);

    while (parent >= 0 && this.heap[parent].dist > this.heap[child].dist) {
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
      (lChild < heapSize && this.heap[lChild].dist < this.heap[parent].dist) ||
      (rChild < heapSize && this.heap[rChild].dist < this.heap[parent].dist)
    ) {
      if (
        rChild < heapSize &&
        this.heap[rChild].dist < this.heap[lChild].dist
      ) {
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

function dijkstra(start, end) {
  const dists = Array(city_count + 1).fill(Infinity);

  const pq = new PriorityQueue();

  dists[start] = 0;
  pq.push(start, 0);

  while (pq.size() > 0) {
    const { city, dist } = pq.pop();

    if (dists[city] < dist) continue;

    for (const [next, extra] of graph[city]) {
      const nextDist = dist + extra;

      if (dists[next] > nextDist) {
        dists[next] = nextDist;
        pq.push(next, nextDist);
      }
    }
  }

  return dists[end];
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [city_count, road_count, party] = input[0].split(" ").map(Number);
const roads = input.slice(1).map((el) => el.split(" ").map(Number));

const graph = Array.from({ length: city_count + 1 }, () => []);

for (const [src, dest, dist] of roads) {
  graph[src].push([dest, dist]);
}

let answer = 0;

for (let i = 1; i <= city_count; i++) {
  if (i === party) continue;

  const dist = dijkstra(i, party) + dijkstra(party, i);
  answer = Math.max(answer, dist);
}

console.log(answer);
