// 6이 적어도 3개 이상 연속

// Time: O(N * K) 카운트 * 문자열 길이

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
  if (n === 1) return 666;

  let answer = 667;
  let count = 1;

  while (count < n) {
    if (String(answer).includes("666")) count += 1;
    if (count === n) break;

    answer += 1;
  }

  return answer;
}
