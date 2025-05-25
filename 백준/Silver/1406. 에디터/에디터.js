const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split("\n");

const str = input[0].split("");
const len = input[1];
const commands = input.slice(2).map((el) => el.split(" "));

const lStack = [...str];
const rStack = [];

for (const [cmd, value] of commands) {
  switch (cmd) {
    case "L":
      if (lStack.length) rStack.push(lStack.pop());
      break;
    case "D":
      if (rStack.length) lStack.push(rStack.pop());
      break;
    case "B":
      if (lStack.length) lStack.pop();
      break;
    default:
      lStack.push(value);
      break;
  }
}

while (rStack.length) {
  lStack.push(rStack.pop());
}

console.log(lStack.join(""));
