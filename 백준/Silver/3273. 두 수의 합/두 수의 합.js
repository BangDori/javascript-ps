const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const array = input[1].split(" ").map(Number);
const target = +input[2];

array.sort((a, b) => a - b);

let ltr = 0,
  rtr = n - 1;
let count = 0;

while (ltr < rtr) {
  const result = array[ltr] + array[rtr];

  if (result === target) count++;

  if (result > target) rtr--;
  else ltr++;
}

console.log(count);
