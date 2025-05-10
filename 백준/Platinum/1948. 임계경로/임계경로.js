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
    const cityCount = +input[0];
    const roadCount = +input[1];
    const roads = input
      .slice(2, 2 + roadCount)
      .map((el) => el.split(" ").map(Number));
    const [start, end] = input[2 + roadCount].split(" ").map(Number);

    console.log(solution(cityCount, roads, start, end));
    process.exit();
  });

function solution(n, roads, start, end) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const reverseGraph = Array.from({ length: n + 1 }, () => []);
  const indegree = Array(n + 1).fill(0);
  const dp = Array(n + 1).fill(0);

  for (const [from, to, cost] of roads) {
    graph[from].push([to, cost]);
    reverseGraph[to].push([from, cost]);
    indegree[to]++;
  }

  const queue = [];
  queue.push(start);

  // 위상 정렬 + dp 계산
  while (queue.length) {
    const curr = queue.shift();
    for (const [next, cost] of graph[curr]) {
      if (dp[next] < dp[curr] + cost) {
        dp[next] = dp[curr] + cost;
      }
      indegree[next]--;
      if (indegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  // 역방향 탐색으로 critical path edge 카운트
  let count = 0;
  const visited = Array(n + 1).fill(false);
  const stack = [end];
  visited[end] = true;

  while (stack.length) {
    const curr = stack.pop();
    for (const [prev, cost] of reverseGraph[curr]) {
      if (dp[curr] === dp[prev] + cost) {
        count++;
        if (!visited[prev]) {
          visited[prev] = true;
          stack.push(prev);
        }
      }
    }
  }

  return [dp[end], count].join("\n");
}
