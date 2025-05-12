const GOLD = "#";
const START = "S";
const EXIT = "E";
const dirs = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .filter(Boolean);

let i = 0;

while (1) {
  const [zSize, ySize, xSize] = input[i++].split(" ").map(Number);

  if (zSize === 0 && ySize === 0 && xSize === 0) break;

  const building = [];

  for (let z = 0; z < zSize; z++) {
    const matrix = [];

    for (let y = 0; y < ySize; y++) {
      matrix.push(input[i++].split(""));
    }

    building.push(matrix);
  }

  console.log(solution(zSize, ySize, xSize, building));
}

function solution(zSize, ySize, xSize, building) {
  const visited = Array.from({ length: zSize }, () =>
    Array.from({ length: ySize }, () => Array(xSize).fill(false))
  );
  const [sz, sy, sx] = getStartPoint(zSize, ySize, xSize, building);

  const queue = [];
  visited[sz][sy][sx] = true;
  queue.push([sz, sy, sx, 0]);

  let i = 0;

  while (i < queue.length) {
    const [z, y, x, time] = queue[i++];

    if (building[z][y][x] === EXIT) return `Escaped in ${time} minute(s).`;

    for (const [dz, dy, dx] of dirs) {
      const nz = z + dz;
      const ny = y + dy;
      const nx = x + dx;

      if (
        nz < 0 ||
        nz >= zSize ||
        ny < 0 ||
        ny >= ySize ||
        nx < 0 ||
        nx >= xSize
      )
        continue;
      if (building[nz][ny][nx] === GOLD || visited[nz][ny][nx]) continue;

      visited[nz][ny][nx] = true;
      queue.push([nz, ny, nx, time + 1]);
    }
  }

  return "Trapped!";
}

function getStartPoint(zSize, ySize, xSize, building) {
  for (let z = 0; z < zSize; z++) {
    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize; x++) {
        if (building[z][y][x] === START) {
          return [z, y, x];
        }
      }
    }
  }
}
