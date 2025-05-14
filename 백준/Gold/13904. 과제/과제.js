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

  push(score) {
    this.heap.push(score);
    this.bubbleUp();
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
    let lChild = this.getLeftChildIdx(parent);
    let rChild = this.getRightChildIdx(parent);

    const heapSize = this.size();

    while (
      (lChild < heapSize && this.heap[lChild] < this.heap[parent]) ||
      (rChild < heapSize && this.heap[rChild] < this.heap[parent])
    ) {
      if (rChild < heapSize && this.heap[rChild] < this.heap[lChild]) {
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

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 하루에 한 과제
// 마감일이 있으므로 모든 과제를 끝내지 못할 수 있음
// 마감일이 지난 과제는 점수 X

// 점수의 최댓값

const n = +input[0];
const problems = input.slice(1).map((el) => el.split(" ").map(Number));

problems.sort((a, b) => a[0] - b[0]);

const pq = new PriorityQueue();

for (const [date, score] of problems) {
  const currentday = pq.size() + 1;

  if (date >= currentday) {
    pq.push(score);
  } else {
    const diff = Math.abs(currentday - date);
    const prevScores = [];
    let prevTotal = 0;

    for (let k = 0; k < Math.min(pq.size(), diff); k++) {
      const score = pq.pop();

      prevScores.push(score);
      prevTotal += score;
    }

    if (prevTotal > score) {
      for (const prevScore of prevScores) {
        pq.push(prevScore);
      }
    } else {
      pq.push(score);
    }
  }
}

const answer = pq.heap.reduce((acc, curr) => acc + curr, 0);
console.log(answer);

// 1
// 1 1

// 1

// 1
// 1 1000

// 1000

// 5
// 1 1
// 2 1
// 3 1
// 4 1
// 4 1

// 4

// 7
// 1 100
// 2 50
// 3 30
// 4 60
// 4 40
// 4 10
// 6 5

// 255

// -------

// 5
// 1 23
// 1 50
// 1 70
// 1 60
// 1 100

// 100

// 5
// 1 20
// 2 50
// 1 45
// 2 70
// 2 100

// 170

//

// 7
// 1 20
// 2 50
// 3 30
// 4 60
// 4 40
// 4 10
// 6 5

// 4 2 3 4 6
// 날짜 = 5일째
// LIS
