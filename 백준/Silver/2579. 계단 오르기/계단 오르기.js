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
    const array = input.slice(1).map(Number);
    console.log(solution(n, array));

    process.exit();
  });

function solution(n, array) {
  if (n === 1) return array[0];
  if (n === 2) return array[0] + array[1];

  const dp = new Array(n + 1).fill(0);

  dp[0] = array[0];
  dp[1] = array[0] + array[1];
  dp[2] = Math.max(array[0] + array[2], array[1] + array[2]);

  for (let i = 3; i < n; i++) {
    // dp[i]의 최댓값
    // 1. dp[i-3] + array[i-1] + array[i]
    // 2. dp[i-2] + array[i]

    dp[i] = Math.max(dp[i - 3] + array[i - 1] + array[i], dp[i - 2] + array[i]);
  }

  return dp[n - 1];
}