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
    const tc = +input[0];

    for (let i = 1; i <= tc; i++) {
      const line = input[i].split(" ").map((el) => +el);
      const totCount = line[0];
      const scores = line.slice(1);

      const average = getAverage(scores);
      const countAboveAverage = getCountAboveAverage(scores, average);
      const ratio = (countAboveAverage / totCount) * 100;

      console.log(`${ratio.toFixed(3)}%`);
    }

    process.exit();
  });

const getAverage = (scores) =>
  scores.reduce((acc, curr) => acc + curr, 0) / scores.length;
const getCountAboveAverage = (scores, average) =>
  scores.filter((score) => score > average).length;
