const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

function getParent(parent, x) {
  if (parent[x] === x) return x;
  return (parent[x] = getParent(parent, parent[x]));
}

function findParent(parent, x, y) {
  const px = getParent(parent, x);
  const py = getParent(parent, y);

  return px === py;
}

function unionParent(parent, x, y) {
  const px = getParent(parent, x);
  const py = getParent(parent, y);

  if (px < py) return (parent[py] = px);
  else return (parent[px] = py);
}

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    /**
     * Solution
     */
    const [n, m] = input[0].split(" ").map(Number);
    const ops = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(n, m, ops));

    process.exit();
  });

function solution(n, m, ops) {
  const answer = [];
  const parents = Array.from({ length: n + 1 }, (_, k) => k);

  for (const [op, x, y] of ops) {
    if (op === 0) {
      unionParent(parents, x, y);
    } else {
      const isUnion = findParent(parents, x, y);
      answer.push(isUnion ? "YES" : "NO");
    }
  }

  return answer.join("\n");
}
