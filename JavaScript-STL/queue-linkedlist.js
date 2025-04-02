class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.size = 0;
    this.front = null;
    this.rear = null;
  }

  push(value) {
    const node = new Node(value);

    if (this.size === 0) {
      this.front = node;
      this.rear = node;
      this.front.next = this.rear;
    } else {
      this.rear.next = node;
      this.rear = node;
    }

    this.size++;
  }

  pop() {
    if (this.size === 0) return null;

    const node = this.front;
    this.front = this.front.next;

    // Node 메모리 해제
    node.next = null;
    this.size--;

    // 사이즈가 0인 경우 rear의 값 null로 초기화
    if (this.size === 0) {
      this.rear = null;
    }

    return node;
  }
}
