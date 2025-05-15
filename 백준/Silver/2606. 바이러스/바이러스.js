function getParents(parent, x) {
  if (parent[x] === x) return x;

  return (parent[x] = getParents(parent, parent[x]));
}

function isSameParent(parents, x, y) {
  const px = getParents(parents, x);
  const py = getParents(parents, y);

  return px === py;
}

function unionParent(parents, x, y) {
  const px = getParents(parents, x);
  const py = getParents(parents, y);

  if (px > py) {
    return (parents[px] = py);
  }

  return (parents[py] = px);
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const m = +input[1];
const network = input.slice(2).map((el) => el.split(" ").map(Number));

const computers = Array.from({ length: n + 1 }, (_, i) => i);

for (const [x, y] of network) {
  if (isSameParent(computers, x, y)) continue;

  unionParent(computers, x, y);
}

const answer =
  computers.filter((cid) => cid === 1 || getParents(computers, cid) === 1)
    .length - 1;
console.log(answer);
