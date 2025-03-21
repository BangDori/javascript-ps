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
    const loads = input[1].split(" ").map(Number);
    const costs = input[2].split(" ").map(Number);
    console.log(solution(n, loads, costs));

    process.exit();
  });

function solution(n, loads, costs) {
  let answer = 0n;
  let currCost = costs[0];

  for (let i = 0; i < n - 1; i++) {
    if (costs[i] < currCost) {
      currCost = costs[i];
    }

    answer += BigInt(currCost) * BigInt(loads[i]);
  }

  return answer.toString();
}
