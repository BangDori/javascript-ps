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
    const colors = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(n, colors));

    process.exit();
  });

function solution(n, colors) {
  const dp = Array.from({ length: n }, () => new Array(n).fill(Infinity));

  dp[0] = colors[0];

  for (let i = 1; i < n; i++) {
    // dp[i][c]를 만드는 방법
    // dp[i-1][0], dp[i-1][1], dp[i-1][2] 중 dp[i-1][c]를 제외하고, colors[i][c]와 조합하기

    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + colors[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + colors[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + colors[i][2];
  }

  return Math.min(...dp[n - 1]);
}