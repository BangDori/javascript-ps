const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const array = input[1].split(" ").map(Number);

array.sort((a, b) => a - b);

let answer = [Math.abs(array[0] + array[n - 1]), array[0], array[n - 1]];

let ltr = 0,
  rtr = n - 1;

while (ltr < rtr) {
  const result = Math.abs(array[ltr] + array[rtr]);

  if (result < answer[0]) {
    answer = [result, array[ltr], array[rtr]];
  }

  if (result <= Math.abs(array[ltr + 1] + array[rtr])) {
    rtr--;
  } else {
    ltr++;
  }
}

console.log(`${answer[1]} ${answer[2]}`);
