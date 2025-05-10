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
    const scv = input[1].split(" ").map(Number);
    console.log(solution(n, scv));

    process.exit();
  });

const damage = [
  [9, 3, 1],
  [9, 1, 3],
  [3, 9, 1],
  [3, 1, 9],
  [1, 3, 9],
  [1, 9, 3],
];

// 스플래쉬 데미지가 적용되는 모든 경우의 수를 구하자

const MAX_HP = 60;

function solution(n, scv) {
  if (n === 1) return Math.ceil(scv[0] / 9);
  if (n === 2) scv.push(0);

  const visited = Array.from({ length: MAX_HP + 1 }, () =>
    Array.from({ length: MAX_HP + 1 }, () => new Array(MAX_HP + 1).fill(false))
  );

  scv.sort((a, b) => a - b);

  const queue = [];
  queue.push([...scv, 0]);
  visited[scv[0]][scv[1]][scv[2]] = true;

  while (queue.length) {
    const len = queue.length;

    for (let i = 0; i < len; i++) {
      const [x, y, z, count] = queue.shift();

      if (x + y + z === 0) return count;

      for (const [dx, dy, dz] of damage) {
        const nx = x - dx >= 0 ? x - dx : 0;
        const ny = y - dy >= 0 ? y - dy : 0;
        const nz = z - dz >= 0 ? z - dz : 0;

        if (visited[nx][ny][nz]) continue;

        visited[nx][ny][nz] = true;
        queue.push([nx, ny, nz, count + 1]);
      }
    }
  }

  return -1;
}
