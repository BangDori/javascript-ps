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
    console.log(solution(input[0]));

    process.exit();
  });

function solution(n) {
  const deque = Array.from({ length: n }, (_, index) => index + 1);
  let front = 0,
    rear = n;

  while (rear - front > 1) {
    front++;
    deque[rear] = deque[front];
    front++;
    rear++;
  }

  return deque.pop();
}
