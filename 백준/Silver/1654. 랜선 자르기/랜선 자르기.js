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
    const [k, n] = input[0].split(" ").map(Number);
    const lines = input.slice(1).map(Number);
    console.log(solution(k, n, lines));

    process.exit();
  });

function solution(k, n, lines) {
  // K개의 랜선을 X의 길이로 잘라서 N개를 만들 수 있는, X의 최대 길이

  let left = 1;
  let right = Math.max(...lines);
  let answer = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let count = 0;

    for (const line of lines) {
      count += Math.floor(line / mid);
    }

    if (count >= n) {
      answer = Math.max(answer, mid);
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

// 4 5
// 1 2 1 1
