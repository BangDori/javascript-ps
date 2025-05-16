const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = [+input[0], +input[1]];
const buses = input.slice(2).map((el) => el.split(" ").map(Number));
const matrix = Array.from({ length: n }, () => Array(n).fill(Infinity));

for (const [src, dest, cost] of buses) {
  matrix[src - 1][dest - 1] = Math.min(matrix[src - 1][dest - 1], cost);
}

for (let k = 0; k < n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] > matrix[i][k] + matrix[k][j]) {
        matrix[i][j] = matrix[i][k] + matrix[k][j];
      }
    }
  }
}

const answer = [];

for (let y = 0; y < n; y++) {
  const line = [];

  for (let x = 0; x < n; x++) {
    if (y === x) line.push(0);
    else if (matrix[y][x] === Infinity) line.push(0);
    else line.push(matrix[y][x]);
  }

  answer.push(line);
}

for (const line of answer) {
  console.log(line.join(" "));
}
