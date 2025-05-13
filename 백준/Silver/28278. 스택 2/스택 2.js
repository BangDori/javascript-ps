const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const commands = input.slice(1).map((el) => el.split(" ").map(Number));

const stack = [];
const answer = [];

for (const command of commands) {
  switch (command[0]) {
    case 2:
      answer.push(stack.length ? stack.pop() : -1);
      break;
    case 3:
      answer.push(stack.length);
      break;
    case 4:
      answer.push(stack.length ? 0 : 1);
      break;
    case 5:
      answer.push(stack.length ? stack[stack.length - 1] : -1);
      break;
    default:
      stack.push(command[1]);
  }
}

console.log(answer.join("\n"));
