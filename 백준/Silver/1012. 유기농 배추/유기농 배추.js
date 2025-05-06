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
    const TC = +input[0];
    const testCases = [];
    let idx = 1;

    for (let t = 0; t < TC; t++) {
      const [M, N, K] = input[idx++].split(" ").map(Number);
      const positions = [];

      for (let k = 0; k < K; k++) {
        const [x, y] = input[idx++].split(" ").map(Number);
        positions.push([x, y]);
      }

      console.log(solution(M, N, positions));
    }

    process.exit();
  });

// 영역의 수 구하기
const dirs = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

function solution(xSize, ySize, positions) {
  let answer = 0;
  const matrix = Array.from({ length: ySize }, () => new Array(xSize).fill(0));

  for (const [x, y] of positions) {
    matrix[y][x] = 1;
  }

  const dfs = (y, x) => {
    if (matrix[y][x] === 0) return;

    matrix[y][x] = 0;

    for (const [dy, dx] of dirs) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny < 0 || ny >= ySize || nx < 0 || nx >= xSize) continue;
      if (matrix[ny][nx] === 0) continue;

      dfs(ny, nx);
    }
  };

  for (let y = 0; y < ySize; y++) {
    for (let x = 0; x < xSize; x++) {
      if (matrix[y][x] === 0) continue;

      answer++;
      dfs(y, x);
    }
  }

  return answer;
}
