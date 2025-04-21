class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    return this.rear - this.front;
  }

  push(value) {
    this.storage[this.rear++] = value;
  }

  pop() {
    if (this.size() === 0) return null;

    const temp = this.storage[this.front];
    delete this.storage[this.front++];

    if (this.front > this.rear) {
      // 초기화
      this.front = 0;
      this.rear = 0;
    }

    return temp;
  }
}
