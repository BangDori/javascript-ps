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
    const matrix = input.slice(1, n + 1).map((el) => el.split(" ").map(Number));
    const quests = input.slice(n + 1).map((el) => el.split(" ").map(Number));
    console.log(solution(matrix, quests));

    process.exit();
  });

function solution(matrix, quests) {
  const answer = [];
  const acc = Array.from({ length: matrix.length }, () =>
    new Array(matrix.length + 1).fill(0)
  );

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      acc[i][j + 1] = acc[i][j] + matrix[i][j];
    }
  }

  for (const [x1, y1, x2, y2] of quests) {
    let sum = 0;
    for (let i = x1 - 1; i < x2; i++) {
      sum += acc[i][y2] - acc[i][y1 - 1];
    }

    answer.push(sum);
  }

  return answer.join("\n");
}
