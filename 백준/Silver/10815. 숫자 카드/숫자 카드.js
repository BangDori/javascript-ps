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

    const n = +input[0];
    const array = input[1].split(" ").map(Number);
    const m = +input[2];
    const targets = input[3].split(" ").map(Number);
    console.log(solution(n, array, m, targets));

    process.exit();
  });

function solution(n, array, m, targets) {
  const answer = [];
  const cardMap = new Map();

  for (const number of array) {
    cardMap.set(number, true);
  }

  for (const target of targets) {
    if (cardMap.has(target)) {
      answer.push(1);
    } else {
      answer.push(0);
    }
  }

  return answer.join(" ");
}
