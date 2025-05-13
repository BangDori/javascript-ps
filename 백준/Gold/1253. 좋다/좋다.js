const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const array = input[1].split(" ").map(Number);

let count = 0;

array.sort((a, b) => a - b);

for (let i = 0; i < n; i++) {
  const target = array[i];
  let ltr = 0;
  let rtr = n - 1;

  while (ltr < rtr) {
    const result = array[ltr] + array[rtr];

    if (ltr === i) {
      ltr++;
      continue;
    } else if (rtr === i) {
      rtr--;
      continue;
    }

    if (result === target) {
      count++;
      break;
    } else if (result > target) {
      rtr--;
    } else {
      ltr++;
    }
  }
}

console.log(count);
