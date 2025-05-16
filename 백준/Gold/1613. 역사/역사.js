const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [case_count, relation_count] = input[0].split(" ").map(Number);
const relations = input
  .slice(1, relation_count + 1)
  .map((el) => el.split(" ").map(Number));
const queries = input
  .slice(relation_count + 2)
  .map((el) => el.split(" ").map(Number));

const cases = Array.from({ length: case_count }, () =>
  Array(case_count).fill(0)
);

for (const [front, back] of relations) {
  cases[front - 1][back - 1] = 1;
  cases[back - 1][front - 1] = -1;
}

for (let k = 0; k < case_count; k++) {
  for (let i = 0; i < case_count; i++) {
    for (let j = 0; j < case_count; j++) {
      if (cases[i][j] === 0) {
        if (cases[i][k] === 1 && cases[k][j] === 1) cases[i][j] = 1;
        else if (cases[i][k] === -1 && cases[k][j] === -1) cases[i][j] = -1;
      }
    }
  }
}

for (const [front, back] of queries) {
  console.log(cases[back - 1][front - 1]);
}
