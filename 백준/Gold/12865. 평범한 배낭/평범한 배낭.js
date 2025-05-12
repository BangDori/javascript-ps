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

    const [count, maxWeight] = input[0].split(" ").map(Number);
    const items = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(count, maxWeight, items));

    process.exit();
  });

function solution(count, maxWeight, items) {
  const dp = Array.from({ length: count + 1 }, () =>
    Array(maxWeight + 1).fill(0)
  );

  items.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < count; i++) {
    for (let weight = 0; weight <= maxWeight; weight++) {
      if (weight - items[i][0] >= 0) {
        dp[i + 1][weight] = Math.max(
          dp[i][weight],
          items[i][1] + dp[i][weight - items[i][0]]
        );
      } else {
        dp[i + 1][weight] = dp[i][weight];
      }
    }
  }

  return Math.max(...dp[count]);
}
