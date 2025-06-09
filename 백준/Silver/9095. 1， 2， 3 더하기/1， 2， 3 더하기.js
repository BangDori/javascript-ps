function solution(array) {
  const answer = [];
  const dp = Array(11).fill(0);

  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  for (let i = 4; i <= 10; i++) {
    dp[i] = dp[i - 3] + dp[i - 2] + dp[i - 1];
  }

  for (const n of array) {
    answer.push(dp[n]);
  }

  return answer.join("\n");
}

const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

console.log(solution(input.slice(1)));
