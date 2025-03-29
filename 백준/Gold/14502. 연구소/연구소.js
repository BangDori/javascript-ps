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

    const [ySize, xSize] = input[0].split(" ").map(Number);
    const matrix = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(ySize, xSize, matrix));

    process.exit();
  });

const EMPTY = 0;
const WALL = 1;
const VIRUS = 2;
const DIRS = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

function solution(ySize, xSize, matrix) {
  let answer = 0;
  const empties = getEmpties(matrix);

  const bfs = (y, x, visited) => {
    let area = 1;
    let isSafeArea = true;

    const queue = [];
    queue.push([y, x, 1]);
    visited[y][x] = true;

    while (queue.length > 0) {
      const [cy, cx] = queue.pop();

      if (matrix[cy][cx] === VIRUS) isSafeArea = false;

      for (const [dy, dx] of DIRS) {
        const ny = cy + dy;
        const nx = cx + dx;

        if (ny < 0 || ny >= ySize) continue;
        if (nx < 0 || nx >= xSize) continue;
        if (visited[ny][nx] || matrix[ny][nx] === WALL) continue;
        if (matrix[ny][nx] === VIRUS) {
          isSafeArea = false;
          continue;
        }

        queue.push([ny, nx]);
        area++;
        visited[ny][nx] = true;
      }
    }

    return isSafeArea ? area : -1;
  };

  const calculatorSafeArea = () => {
    let safeArea = 0;
    const visited = Array.from({ length: ySize }, () =>
      new Array(xSize).fill(false)
    );

    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize; x++) {
        if (visited[y][x] || matrix[y][x] !== EMPTY) continue;

        const area = bfs(y, x, visited);
        if (area > 0) safeArea += area;
      }
    }

    return safeArea;
  };

  // O((NM)^4)
  // 벽 세우기
  for (let i = 0; i < empties.length - 2; i++) {
    const [iy, ix] = empties[i];
    matrix[iy][ix] = WALL;

    for (let j = i + 1; j < empties.length - 1; j++) {
      const [jy, jx] = empties[j];
      matrix[jy][jx] = WALL;

      for (let k = j + 1; k < empties.length; k++) {
        const [ky, kx] = empties[k];
        matrix[ky][kx] = WALL;

        // 벽을 세운 후, 해당 상태에서 안전 영역 계산
        const safeArea = calculatorSafeArea();
        answer = Math.max(answer, safeArea);

        matrix[ky][kx] = EMPTY;
      }

      matrix[jy][jx] = EMPTY;
    }

    matrix[iy][ix] = EMPTY;
  }

  return answer;
}

// O(NM)
function getEmpties(matrix) {
  const result = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] === EMPTY) {
        result.push([y, x]);
      }
    }
  }

  return result;
}