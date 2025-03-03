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
    console.log(solution(n));

    process.exit();
  });

function solution(n) {
  if (n <= 3) return 1;

  const dp = new Array(n + 1).fill(1n);

  for (let i = 4; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 3];
  }

  return dp[n].toString();
}
