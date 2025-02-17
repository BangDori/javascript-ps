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
  const answer = [];
  let stack = Array.from({ length: n }, (_, index) => index + 1);
  stack.reverse();

  while (stack.length > 1) {
    answer.push(stack.pop());
    stack = [stack[stack.length - 1], ...stack.slice(0, stack.length - 1)];
  }

  answer.push(stack.pop());

  return answer.join(" ");
}
