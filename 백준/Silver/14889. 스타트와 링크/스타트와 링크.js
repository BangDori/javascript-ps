function combination(arr, r) {
  const result = [];

  const dfs = (start, n, r, selected = []) => {
    if (r === selected.length) {
      return result.push([...selected]);
    }

    for (let i = start; i < n; i++) {
      selected.push(arr[i]);
      dfs(i + 1, n, r, selected);
      selected.pop();
    }
  };

  dfs(0, arr.length, r);
  return result;
}

function calculateAbility(arr) {
  return arr.reduce((acc, curr) => {
    const [a, b] = curr;

    return acc + matrix[a][b] + matrix[b][a];
  }, 0);
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const matrix = input.slice(1).map((el) => el.split(" ").map(Number));

const people = Array.from({ length: n }, (_, i) => i);

const teams = combination(people, n / 2);

let answer = Infinity;

for (let i = 0; i < teams.length; i++) {
  const team1Comb = combination(teams[i], 2);
  const team2Comb = combination(teams[teams.length - 1 - i], 2);

  const team1 = calculateAbility(team1Comb);
  const team2 = calculateAbility(team2Comb);

  answer = Math.min(Math.abs(team1 - team2), answer);
}

/**
 * 정답 출력
 */
console.log(answer);
