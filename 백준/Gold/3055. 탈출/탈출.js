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

const ROCK = "X";
const ANIMAL = "S";
const WATER = "*";
const DESTINATION = "D";
const EMPTY = ".";

// 고슴도치가 이동 가능한 모든 경우의 수를 확인

const dirs = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

function solution(ySize, xSize, matrix) {
  const { animal, dest, waters } = getPoints(matrix);

  const visited = Array.from({ length: ySize }, () =>
    new Array(xSize).fill(false)
  );

  let time = 0;

  function spreadWater() {
    const spread = [];

    // 물 확장
    for (const water of waters) {
      for (const [dy, dx] of dirs) {
        const ny = water.y + dy;
        const nx = water.x + dx;

        if (ny < 0 || ny >= ySize || nx < 0 || nx >= xSize) continue;
        if (matrix[ny][nx] === EMPTY) {
          matrix[ny][nx] = WATER;
          spread.push({ y: ny, x: nx });
        }
      }
    }

    waters.push(...spread);
  }

  function bfs() {
    const queue = [];
    visited[animal.y][animal.x] = true;
    queue.push({ y: animal.y, x: animal.x, time });

    while (queue.length) {
      const cycle = queue.length;

      // 물 확장
      spreadWater();

      // 고슴도치 이동
      for (let i = 0; i < cycle; i++) {
        const animal = queue.shift();

        if (animal.y === dest.y && animal.x === dest.x) {
          return animal.time;
        }

        for (const [dy, dx] of dirs) {
          const ny = animal.y + dy;
          const nx = animal.x + dx;

          if (ny < 0 || ny >= ySize || nx < 0 || nx >= xSize) continue;
          if (matrix[ny][nx] === ROCK || matrix[ny][nx] === WATER) continue;
          if (visited[ny][nx]) continue;

          queue.push({ y: ny, x: nx, time: animal.time + 1 });
          visited[ny][nx] = true;
        }
      }
    }
  }

  const answer = bfs();

  return answer || "KAKTUS";
}

function getPoints(matrix) {
  const animal = [];
  const waters = [];
  const dest = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] === WATER) waters.push({ y, x });
      if (matrix[y][x] === ANIMAL) animal.push({ y, x });
      if (matrix[y][x] === DESTINATION) dest.push({ y, x });
    }
  }

  return { animal: animal.pop(), waters, dest: dest.pop() };
}
