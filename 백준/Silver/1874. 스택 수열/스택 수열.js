const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const array = input.slice(1).map(Number).reverse();
const stack = [];
const result = [];

let current = 1;

while (array.length > 0) {
  const target = array.pop();

  for (current; current <= n + 1; current++) {
    if (stack[stack.length - 1] === target) {
      result.push("-");
      stack.pop();
      break;
    }

    result.push("+");
    stack.push(current);
  }
}

const answer = stack.length > 0 ? "NO" : result.join("\n");
console.log(answer);