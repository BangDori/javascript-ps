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
    const matrix = input.slice(1).map((el) => el.split(""));
    console.log(solution(ySize, xSize, matrix));

    process.exit();
  });

const WATER = "*";
const ROCK = "X";
const DEST = "D";
const ANIMAL = "S";
const EMPTY = ".";

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function solution(ySize, xSize, matrix) {
  const { animal, dest, waters } = getMatrixInfo(matrix);

  matrix[animal[0]][animal[1]] = EMPTY;

  function spreadWater() {
    const spread = [];
    const len = waters.length;

    for (let i = 0; i < len; i++) {
      const [y, x] = waters.pop();

      for (const [dy, dx] of dirs) {
        const ny = y + dy;
        const nx = x + dx;

        if (!isValidCoord(ny, nx, ySize, xSize)) continue;
        if (matrix[ny][nx] === EMPTY) {
          matrix[ny][nx] = WATER;
          spread.push([ny, nx]);
        }
      }
    }

    waters.push(...spread);
  }
  function bfs() {
    const queue = [];
    const visited = Array.from({ length: ySize }, () =>
      Array(xSize).fill(false)
    );

    queue.push([...animal, 0]);
    visited[animal[0]][animal[1]] = true;

    while (queue.length) {
      const nextQueue = [];
      const len = queue.length;

      spreadWater();

      for (let i = 0; i < len; i++) {
        const [y, x, count] = queue.pop();

        for (const [dy, dx] of dirs) {
          const ny = y + dy;
          const nx = x + dx;

          if (!isValidCoord(ny, nx, ySize, xSize)) continue;
          if (visited[ny][nx]) continue;
          if (matrix[ny][nx] === EMPTY) {
            nextQueue.push([ny, nx, count + 1]);
            visited[ny][nx] = true;
          }
          if (matrix[ny][nx] === DEST) {
            return count + 1;
          }
        }
      }

      queue.push(...nextQueue);
    }
  }

  const answer = bfs();

  return answer || "KAKTUS";
}

function getMatrixInfo(matrix) {
  const animal = [];
  const dest = [];
  const waters = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] === ANIMAL) {
        animal.push([y, x]);
        continue;
      }

      if (matrix[y][x] === DEST) {
        dest.push([y, x]);
        continue;
      }

      if (matrix[y][x] === WATER) {
        waters.push([y, x]);
      }
    }
  }

  return { animal: animal.pop(), dest: dest.pop(), waters };
}

function isValidCoord(y, x, ySize, xSize) {
  return y >= 0 && y < ySize && x >= 0 && x < xSize;
}