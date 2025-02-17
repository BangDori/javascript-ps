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
    const TC = +input[0];
    const parenthesis = input.slice(1);
    console.log(solution(TC, parenthesis));

    process.exit();
  });

function solution(TC, strs) {
  const answer = [];

  for (let i = 0; i < TC; i++) {
    const stack = [];
    const parenthesis = strs[i];
    let isVPS = true;

    for (let j = 0; j < parenthesis.length; j++) {
      switch (parenthesis[j]) {
        case ")":
          if (stack[stack.length - 1] === "(") {
            stack.pop();
          } else {
            stack.push(parenthesis[j]);
            break;
          }
          break;
        default:
          stack.push(parenthesis[j]);
      }
    }

    isVPS = stack.length === 0;

    answer.push(isVPS ? "YES" : "NO");
  }

  return answer.join("\n");
}
