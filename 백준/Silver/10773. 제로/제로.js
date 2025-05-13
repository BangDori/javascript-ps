const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const array = input.slice(1).map(Number);

const stack = [];
let answer = 0;

for (const num of array) {
  if (num === 0) {
    if (stack.length) {
      answer -= stack.pop();
    }
  } else {
    stack.push(num);
    answer += num;
  }
}

console.log(answer);
