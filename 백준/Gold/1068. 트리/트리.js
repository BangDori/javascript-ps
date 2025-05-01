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

    const n = +input[0];
    const parents = input[1].split(" ").map(Number);
    const removed = +input[2];
    console.log(solution(n, parents, removed));

    process.exit();
  });

function solution(n, parents, removed) {
  const tree = new Map();
  let rootNode = -1;

  for (let i = 0; i < n; i++) {
    if (parents[i] === -1) rootNode = i;
    if (i === removed) continue;
    if (tree.has(parents[i])) {
      tree.set(parents[i], [...tree.get(parents[i]), i]);
      continue;
    }

    tree.set(parents[i], [i]);
  }

  if (removed === rootNode) return 0;

  // 삭제할 트리 연결 끊기
  tree.delete(removed);

  return getLeaf(tree, rootNode);
}

function getLeaf(tree, rootNode) {
  const queue = [];
  let leafCount = 0;
  let i = 0;

  queue.push(rootNode);

  while (i < queue.length) {
    const node = queue[i];

    if (tree.has(node)) {
      for (const next of tree.get(node)) {
        queue.push(next);
      }
    } else {
      leafCount++;
    }

    i++;
  }

  return leafCount;
}
