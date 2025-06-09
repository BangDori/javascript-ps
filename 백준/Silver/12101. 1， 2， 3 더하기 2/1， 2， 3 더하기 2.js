const nums = [1, 2, 3];

function solution(n, k) {
  const answer = Array.from({ length: 11 }, () => []);

  const comb = (target, current, subset = []) => {
    if (current === 0) return answer[target].push(subset.join("+"));

    for (const num of nums) {
      if (current - num >= 0) {
        comb(target, current - num, [...subset, num]);
      }
    }
  };

  for (let i = 1; i <= 10; i++) {
    comb(i, i);
  }

  return answer[n].length >= k ? answer[n][k - 1] : -1;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = input[0].split(" ").map(Number);

console.log(solution(n, k));
