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
    console.info(solution(n));

    process.exit();
  });

function solution(n) {
  let answer = 0;
  const chess = Array.from({ length: n }, () => 0);

  const isPossible = (row, col) => {
    for (let i = 0; i < row; i++) {
      // 세로 검사
      if (chess[i] === col) return false;

      // 대각선 검사
      if (Math.abs(row - i) === Math.abs(col - chess[i])) return false;
    }

    return true;
  };

  const nQueen = (count, row) => {
    if (count === n) {
      answer += 1;
      return;
    }

    for (let col = 0; col < n; col++) {
      let isPossiblePosition = isPossible(row, col);

      if (isPossiblePosition) {
        chess[row] = col;
        nQueen(count + 1, row + 1);
        chess[row] = 0;
      }
    }
  };

  nQueen(0, 0);
  return answer;
}
