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

    const [n, m] = input[0].split(" ").map(Number);
    const numbers = input[1].split(" ").map(Number);
    const array = input.slice(2).map((el) => el.split(" ").map(Number));
    console.log(solution(numbers, array));

    process.exit();
  });

function solution(numbers, array) {
  const answer = [];
  const acc = new Array(numbers.length + 1).fill(0);

  for (let i = 0; i < numbers.length; i++) {
    acc[i + 1] = acc[i] + numbers[i];
  }

  for (const [start, end] of array) {
    answer.push(acc[end] - acc[start - 1]);
  }

  return answer.join("\n");
}
