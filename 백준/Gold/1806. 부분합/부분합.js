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
    const [n, target] = input[0].split(" ").map(Number);
    const numbers = input[1].split(" ").map(Number);
    console.log(solution(n, target, numbers));

    process.exit();
  });

function solution(n, target, numbers) {
  let answer = Infinity;

  let partial = 0;
  let start = 0;

  for (let end = 0; end < n; end++) {
    partial += numbers[end];

    while (partial >= target) {
      answer = Math.min(answer, end - start + 1);
      partial -= numbers[start];
      start++;
    }
  }

  return answer === Infinity ? 0 : answer;
}