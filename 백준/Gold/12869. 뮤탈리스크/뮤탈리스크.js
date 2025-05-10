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

const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

function permutation(start, n, r, selected = []) {
  if (r === selected.length) {
    return orders.push([...selected]);
  }

  for (let i = start; i < n; i++) {
    swap(damage, start, i);
    selected.push(damage[start]);
    permutation(start + 1, n, r, selected);
    selected.pop();
    swap(damage, start, i);
  }
}

const damage = [9, 3, 1];
const orders = [];

permutation(0, 3, 3);

const MAX_HP = 61;

function solution(n, scv) {
  if (n === 1) return Math.ceil(scv[0] / 9);
  if (n === 2) scv.push(0);

  const queue = [];
  queue.push(scv);

  const dp = Array.from({ length: MAX_HP }, () =>
    Array.from({ length: MAX_HP }, () => new Array(MAX_HP).fill(-1))
  );
  dp[scv[0]][scv[1]][scv[2]] = 0;

  while (queue.length) {
    const nextQueue = [];
    const len = queue.length;

    for (let i = 0; i < len; i++) {
      const [x, y, z] = queue.pop();

      for (const [dx, dy, dz] of orders) {
        const nx = Math.max(0, x - dx);
        const ny = Math.max(0, y - dy);
        const nz = Math.max(0, z - dz);

        if (dp[nx][ny][nz] === -1) {
          dp[nx][ny][nz] = dp[x][y][z] + 1;
          nextQueue.push([nx, ny, nz]);
        }
      }
    }

    queue.push(...nextQueue);
  }

  return dp[0][0][0];
}
