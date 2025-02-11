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
    const [N, C] = input[0].split(" ").map((el) => +el);
    const routers = input
      .slice(1)
      .map((el) => +el)
      .sort((a, b) => a - b);

    const answer = solution(N, C, routers);
    console.info(answer);

    process.exit();
  });

function solution(N, C, routers) {
  let left = 1,
    right = routers[N - 1] - routers[0];
  let answer = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    let count = 1;
    let current = routers[0];

    for (let i = 1; i < N; i++) {
      if (routers[i] >= current + mid) {
        current = routers[i];
        count += 1;
      }
    }

    if (count >= C) {
      left = mid + 1;
      answer = mid;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}
