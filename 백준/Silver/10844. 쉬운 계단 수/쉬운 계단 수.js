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

const MOD = 1_000_000_000;

function solution(n) {
  const dp = Array.from({ length: n + 1 }, () => new Array(9).fill(0));

  for (let i = 1; i < 10; i++) {
    dp[1][i] = 1;
  }

  for (let digit = 2; digit <= n; digit++) {
    for (let end = 0; end < 10; end++) {
      if (end === 0) dp[digit][0] = dp[digit - 1][1];
      else if (end === 9) dp[digit][9] = dp[digit - 1][8];
      else dp[digit][end] = dp[digit - 1][end - 1] + dp[digit - 1][end + 1];

      dp[digit][end] %= MOD;
    }
  }

  return dp[n].reduce((acc, curr) => (acc + curr) % MOD, 0);
}