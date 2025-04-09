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
    const [n, x] = input[0].split(" ").map(Number);
    const visitors = input[1].split(" ").map(Number);
    console.log(solution(n, x, visitors));

    process.exit();
  });

function solution(n, x, visitors) {
  let answer = 0;
  let start = 0;
  let total = 0;

  // 초기에 값 설정
  for (let i = 0; i < x; i++) {
    total += visitors[i];
  }

  let maxValue = total;
  let maxCount = 1;

  for (let i = x; i < n; i++) {
    total += visitors[i] - visitors[start];
    start++;

    if (total > maxValue) {
      maxValue = total;
      maxCount = 1;
    } else if (total === maxValue) {
      maxCount++;
    }
  }

  if (maxValue === 0) {
    return "SAD";
  }

  return [maxValue, maxCount].join("\n");
}
