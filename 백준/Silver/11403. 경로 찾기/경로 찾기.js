const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const vertexs = +input[0];
const graph = input.slice(1).map((el) => el.split(" ").map(Number));

for (let k = 0; k < vertexs; k++) {
  for (let i = 0; i < vertexs; i++) {
    for (let j = 0; j < vertexs; j++) {
      if (graph[i][k] === 1 && graph[k][j] === 1) {
        graph[i][j] = 1;
      }
    }
  }
}

for (const line of graph) {
  console.log(line.join(" "));
}
