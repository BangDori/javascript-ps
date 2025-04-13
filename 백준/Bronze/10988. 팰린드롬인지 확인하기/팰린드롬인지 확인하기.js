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

    const str = input[0];
    console.log(solution(str));

    process.exit();
  });

function solution(str) {
  let answer = 1;

  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      answer = 0;
      break;
    }
  }
  return answer;
}
