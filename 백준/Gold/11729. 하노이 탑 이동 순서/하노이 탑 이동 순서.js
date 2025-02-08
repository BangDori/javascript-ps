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

    const outputs = solution(n);

    console.info(2 ** n - 1);
    console.info(outputs.join("\n"));

    process.exit();
  });

function solution(n) {
  const outputs = [];

  const hanoi = (n, start, temp, end) => {
    if (n === 1) {
      outputs.push(`${start} ${end}`);
      return;
    }

    hanoi(n - 1, start, end, temp);
    outputs.push(`${start} ${end}`);
    hanoi(n - 1, temp, start, end);
  };

  hanoi(n, 1, 2, 3);

  return outputs;
}
