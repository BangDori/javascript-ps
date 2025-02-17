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

function solution(strs) {
  const stack = [];
  let answer = 0;
  let weight = 1;

  for (let i = 0; i < strs.length; i++) {
    if (strs[i] === "(" || strs[i] === "[") {
      weight *= strs[i] === "(" ? 2 : 3;
      stack.push(strs[i]);
    } else if (strs[i] === ")") {
      if (stack[stack.length - 1] !== "(" || stack.length === 0) {
        answer = 0;
        break;
      }

      // 현재 닫기 괄호에 대해 이전 괄호가 여는 괄호인 경우에만 더하기
      if (strs[i - 1] === "(") {
        answer += weight;
      }

      stack.pop();
      weight = Math.floor(weight / 2);
    } else {
      if (stack[stack.length - 1] !== "[" || stack.length === 0) {
        answer = 0;
        break;
      }

      // 현재 닫기 괄호에 대해 이전 괄호가 여는 괄호인 경우에만 더하기
      if (strs[i - 1] === "[") {
        answer += weight;
      }

      stack.pop();
      weight = Math.floor(weight / 3);
    }
  }

  return stack.length > 0 ? 0 : answer;
}
