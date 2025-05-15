const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const queries = input.slice(1).map((el) => el.split(" ").map(Number));

const buckets = Array(n).fill(0);

for (const [start, end, ball] of queries) {
  for (let i = start - 1; i < end; i++) {
    buckets[i] = ball;
  }
}

console.log(buckets.join(" "));
