const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("");

const stack = [];
let answer = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i] === "(" && input[i + 1] === ")") {
    answer += stack.length;
    i++;
  } else if (input[i] === "(") {
    stack.push(input[i]);
  } else {
    stack.pop();
    answer++;
  }
}

console.log(answer);
