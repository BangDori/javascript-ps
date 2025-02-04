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
    const { count, outputs } = solution(n);

    console.log(count.toString());
    if (n <= 20) console.log(outputs.join("\n"));

    process.exit();
  });

function solution(n) {
  const count = 2n ** BigInt(n) - 1n;
  const outputs = [];

  function hanoi(num, start, end, mid) {
    if (num === 1) return outputs.push(`${start} ${end}`);

    hanoi(num - 1, start, mid, end);
    outputs.push(`${start} ${end}`);
    hanoi(num - 1, mid, end, start);
  }

  if (n <= 20) hanoi(n, 1, 3, 2);
  return { count, outputs };
}
