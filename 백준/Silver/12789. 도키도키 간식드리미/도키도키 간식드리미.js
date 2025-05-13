const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const numbers = input[1].split(" ").map(Number);

const stack = [];
numbers.reverse();

let number = 1;
let count = 0;

while (number <= n) {
  if (number === numbers[numbers.length - 1]) {
    numbers.pop();
    number++;
  } else {
    if (stack.length > 0 && stack[stack.length - 1] === number) {
      stack.pop();
      number++;
    } else {
      if (numbers.length === 0) break;

      stack.push(numbers.pop());
    }
  }
}

const isNice = numbers.length === 0 && stack.length === 0;

console.log(isNice ? "Nice" : "Sad");
