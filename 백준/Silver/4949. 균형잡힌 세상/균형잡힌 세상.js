const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let i = 0;

while (true) {
  const stack = []; // []
  const string = input[i++];

  if (string[0] === ".") break;

  for (let alpha of string) {
    if (alpha === "[") {
      stack.push(alpha);
    } else if (alpha === "(") {
      stack.push(alpha);
    } else if (alpha === "]") {
      if (stack.length && stack[stack.length - 1] === "[") {
        stack.pop();
      } else {
        stack.push(alpha);
        break;
      }
    } else if (alpha === ")") {
      if (stack.length && stack[stack.length - 1] === "(") {
        stack.pop();
      } else {
        stack.push(alpha);
        break;
      }
    }
  }

  const isBalanced = stack.length === 0;

  console.log(isBalanced ? "yes" : "no");
}
