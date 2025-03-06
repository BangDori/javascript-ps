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
    const ps = input.slice(1);

    console.log(solution(T, ps));

    process.exit();
  });

function solution(T, ps) {
  const answer = [];

  for (let i = 0; i < T; i++) {
    let isVPS = true;

    const stack = [];

    for (let j = 0; j < ps[i].length; j++) {
      if (ps[i][j] === "(") {
        stack.push(ps[i][j]);
      } else {
        if (stack[stack.length - 1] === "(") {
          stack.pop();
        } else {
          isVPS = false;
        }
      }
    }

    if (stack.length > 0) isVPS = false;

    answer.push(isVPS ? "YES" : "NO");
  }

  return answer.join("\n");
}
