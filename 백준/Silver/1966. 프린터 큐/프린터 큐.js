// 현재 문서보다 중요도가 높은 문서가 하나라도 존재하면, Queue의 가장 뒤에 재배치 -> 원형 큐(Deque)
// 우선순위 기반으로 인쇄 -> 우선순위 관리 배열 필요

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
    const T = +input[0];
    const inputs = input.slice(1);
    console.log(solution(T, inputs));

    process.exit();
  });

class Node {
  constructor(priority, pos) {
    this.priority = priority;
    this.pos = pos;
    this.next = null;
  }
}

class Deque {
  constructor(papers) {
    const sortedPapers = [...papers].sort((a, b) => b - a);
    this.priorities = sortedPapers;
    this.idx = 0;
    this.nextPickPrioirty = sortedPapers[0];

    this.size = papers.length;
    this.head = null;
    this.rear = null;

    this.init(papers);
  }

  init(papers) {
    const head = new Node(papers[0], 0);

    this.head = head;
    this.rear = head;

    for (let i = 1; i < papers.length; i++) {
      const node = new Node(papers[i], i);

      this.rear.next = node;
      this.rear = node;
    }

    this.rear.next = this.head;
  }

  pop() {
    if (this.size === 0) return null;

    this.idx++;
    this.nextPickPrioirty = this.priorities[this.idx];

    this.pick;
    const removed = this.head;
    this.head = this.head.next;
    this.rear.next = this.head;

    removed.next = null;

    return removed;
  }

  move() {
    this.rear = this.head;
    this.head = this.head.next;
  }
}

function solution(T, inputs) {
  const answer = [];

  for (let i = 0; i < T; i++) {
    const [N, M] = inputs[i * 2].split(" ").map(Number);
    const papers = inputs[i * 2 + 1].split(" ").map(Number);
    let count = 0;
    const deque = new Deque(papers);

    while (deque.size > 0) {
      const head = deque.head;

      if (head.priority === deque.nextPickPrioirty) {
        count++;
        deque.pop();

        if (M === head.pos) {
          break;
        }
      } else {
        deque.move();
      }
    }

    answer.push(count);
  }

  return answer.join("\n");
}
