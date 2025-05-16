const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [user_count, relationship_count] = input[0].split(" ").map(Number);
const relationships = input.slice(1).map((el) => el.split(" ").map(Number));

const user_graph = Array.from({ length: user_count }, () =>
  Array(user_count).fill(Infinity)
);

for (const [a, b] of relationships) {
  user_graph[a - 1][b - 1] = 1;
  user_graph[b - 1][a - 1] = 1;
}

for (let k = 0; k < user_count; k++) {
  for (let i = 0; i < user_count; i++) {
    for (let j = 0; j < user_count; j++) {
      if (user_graph[i][j] > user_graph[i][k] + user_graph[k][j]) {
        user_graph[i][j] = user_graph[i][k] + user_graph[k][j];
      }
      if (i === j) user_graph[i][j] = 0;
    }
  }
}

const users = Array(user_count).fill(0);

for (let i = 0; i < user_count; i++) {
  users[i] = user_graph[i].reduce((acc, curr) => acc + curr, 0);
}

const min_bacon = Math.min(...users);
const answer = users.indexOf(min_bacon) + 1;

console.log(answer);
