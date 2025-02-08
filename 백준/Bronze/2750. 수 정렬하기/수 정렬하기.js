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
    const numbers = input.slice(1).map((v) => +v);

    console.info(solution(n, numbers));

    process.exit();
  });

function solution(n, numbers) {
  return numbers.sort((a, b) => a - b).join("\n");
}
