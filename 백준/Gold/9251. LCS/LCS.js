const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const str1 = input[0].split("");
const str2 = input[1].split("");

const dp = Array.from(Array(input[0].length + 1), () =>
  Array(input[1].length + 1).fill(0)
);

for (let i = 1; i < str1.length + 1; i++) {
  for (let k = 1; k < str2.length + 1; k++) {
    if (str1[i - 1] === str2[k - 1]) {
      dp[i][k] = dp[i - 1][k - 1] + 1;
    } else {
      dp[i][k] = Math.max(dp[i - 1][k], dp[i][k - 1]);
    }
  }
}

console.log(dp[dp.length - 1][dp[0].length - 1]);
