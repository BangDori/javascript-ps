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

    const [n, _] = input[0].split(" ").map(Number);
    const students = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(n, students));

    process.exit();
  });

function solution(n, students) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const indegree = Array(n + 1).fill(0);

  const queue = [];

  for (const [a, b] of students) {
    graph[a].push(b);
    indegree[b]++;
  }

  for (let sid = 1; sid <= n; sid++) {
    if (indegree[sid] === 0) {
      queue.push(sid);
    }
  }

  const answer = [];

  while (queue.length) {
    const curr = queue.shift();

    answer.push(curr);

    for (const next of graph[curr]) {
      indegree[next]--;

      if (indegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return answer.join(" ");
}
