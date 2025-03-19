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
    const [m, n, k] = input[0].split(" ").map(Number);
    const sections = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(m, n, sections));

    process.exit();
  });

const WALL = 1;
// 동서남북
const DIRS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function solution(rows, cols, array) {
  const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (const [r1, c1, r2, c2] of array) {
    for (let y = r1; y < r2; y++) {
      for (let x = c1; x < c2; x++) {
        matrix[x][y] = WALL;
      }
    }
  }

  const sections = [];
  let area = 0;

  const dfs = (row, col) => {
    if (matrix[row][col] === WALL) return;

    matrix[row][col] = WALL;
    area += 1;

    for (const [dr, dc] of DIRS) {
      const nr = dr + row;
      const nc = dc + col;

      if (nr < 0 || nr > rows - 1) continue;
      if (nc < 0 || nc > cols - 1) continue;
      if (matrix[nr][nc] === WALL) continue;

      dfs(nr, nc);
    }
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (matrix[r][c] === WALL) continue;
      dfs(r, c);

      sections.push(area);
      area = 0;
    }
  }

  sections.sort((a, b) => a - b);

  return `${sections.length}\n${sections.join(" ")}`;
}