const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const strings = input.slice(1, 1 + n);
const finds = input.slice(n + 1);

const set = new Set();

for (const string of strings) {
  set.add(string);
}

let count = 0;

for (const find of finds) {
  if (set.has(find)) count++;
}

console.log(count);
