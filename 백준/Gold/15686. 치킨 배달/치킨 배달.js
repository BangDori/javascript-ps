const HOUSE = 1;
const CHICKEN = 2;

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [size, target] = input[0].split(" ").map(Number);
const matrix = input.slice(1).map((el) => el.split(" ").map(Number));

// 집들 위치 가져오기
const houses = [];
const chickens = [];

for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if (matrix[y][x] === HOUSE) houses.push([y, x]);
    if (matrix[y][x] === CHICKEN) chickens.push([y, x]);
  }
}

// 거리구하기
let answer = Infinity;

function dfs(start, n, r, selected = []) {
  if (r === selected.length) {
    let total = 0;

    for (const [hy, hx] of houses) {
      let diff = Infinity;

      for (let i = 0; i < r; i++) {
        const [ry, rx] = chickens[selected[i]];
        const dist = Math.abs(hy - ry) + Math.abs(hx - rx);

        diff = Math.min(diff, dist);
      }

      total += diff;
    }

    answer = Math.min(answer, total);

    return;
  }

  for (let i = start; i < n; i++) {
    selected.push(i);
    dfs(i + 1, n, r, selected);
    selected.pop();
  }
}

dfs(0, chickens.length, target);

console.log(answer);
