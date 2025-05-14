const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [target, n, m] = [+input[0], +input[1], +input[3]];
const arrA = input[2].split(" ").map(Number);
const arrB = input[4].split(" ").map(Number);

const subsetA = new Map();

for (let i = 0; i < n; i++) {
  let currSum = 0;

  for (let j = i; j < n; j++) {
    currSum += arrA[j];

    if (!subsetA.has(currSum)) subsetA.set(currSum, 0);
    subsetA.set(currSum, subsetA.get(currSum) + 1);
  }
}

let answer = 0;

for (let i = 0; i < m; i++) {
  let currSum = 0;

  for (let j = i; j < m; j++) {
    currSum += arrB[j];

    if (subsetA.has(target - currSum)) answer += subsetA.get(target - currSum);
  }
}

console.log(answer);
