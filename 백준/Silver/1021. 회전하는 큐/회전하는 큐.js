const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

class Node {
  constructor(num) {
    this.val = num;
    this.prev = null;
    this.next = null;
  }
}

class Deque {
  constructor(size) {
    this.size = size;
    this.front = null;
    this.rear = null;

    this.init(size);
  }

  init(size) {
    const head = new Node(1);

    this.front = head;
    this.rear = head;

    for (let i = 2; i <= size; i++) {
      const node = new Node(i);

      node.prev = this.rear;
      this.rear.next = node;
      this.rear = node;
    }

    this.rear.next = this.front;
    this.front.prev = this.rear;
  }

  pop() {
    this.front = this.front.next;
    this.front.prev = this.rear;
    this.rear.next = this.front;
    this.size--;
  }
}

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    /**
     * Solution
     */
    const [N] = input[0].split(" ").map(Number);
    const picks = input[1].split(" ").map(Number);
    console.log(solution(N, picks));

    process.exit();
  });

function solution(size, picks) {
  const deque = new Deque(size);

  let answer = 0;

  for (const pick of picks) {
    if (deque.front.val === pick) {
      deque.pop();
      continue;
    }

    let forward = 0,
      backward = 0;
    let nodeF = deque.front,
      nodeB = deque.front;

    while (nodeF.val !== pick && nodeB.val !== pick) {
      nodeF = nodeF.next;
      forward++;

      nodeB = nodeB.prev;
      backward++;
    }

    if (nodeF.val === pick) {
      deque.front = nodeF;
      deque.rear = nodeF.prev;
      answer += forward;
    } else {
      deque.front = nodeB;
      deque.rear = nodeB.prev;
      answer += backward;
    }

    deque.pop();
  }

  return answer;
}
