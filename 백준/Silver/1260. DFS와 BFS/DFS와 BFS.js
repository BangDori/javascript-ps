const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    /**
     * Solution
     */
    const [edges, _, source] = input[0].split(" ").map(Number);
    const connections = input.slice(1);
    console.log(solution(edges, source, connections));

    process.exit();
  });

function solution(edges, start, connections) {
  const matrix = Array.from({ length: edges + 1 }, () => []);
  const visited = new Array(edges + 1).fill(false);

  const answer = [[], []];

  const reset = () => {
    for (let i = 1; i <= edges; i++) {
      matrix[i] = [];
      visited[i] = false;
    }

    for (const connection of connections) {
      const [src, dest] = connection.split(" ").map(Number);
      matrix[src].push(dest);
      matrix[dest].push(src);
    }

    for (let i = 1; i <= edges; i++) {
      matrix[i].sort((a, b) => a - b);
    }
  };

  const dfs = (curr) => {
    if (visited[curr]) return;

    visited[curr] = true;
    answer[0].push(curr);

    for (const next of matrix[curr]) {
      if (visited[next]) continue;

      dfs(next);
    }
  };

  const bfs = (start) => {
    let queue = [];

    visited[start] = true;
    queue.push(start);

    while (queue.length > 0) {
      const nextQueue = [];
      const src = queue.shift();

      answer[1].push(src);

      for (const next of matrix[src]) {
        if (visited[next]) continue;

        nextQueue.push(next);
        visited[next] = true;
      }

      queue = [...queue, ...nextQueue];
    }
  };

  reset();
  dfs(start);
  reset();
  bfs(start);

  answer[0] = answer[0].join(" ");
  answer[1] = answer[1].join(" ");

  return answer.join("\n");
}
