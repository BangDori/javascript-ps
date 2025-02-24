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
    const [total, count] = input[0].split(" ").map(BigInt);
    const points = [0, ...input[1].split(" ").map(Number)];
    console.log(solution(count, points));
    process.exit();
  });

function solution(count, points) {
  // key: 위치, value: 현재 위치까지의 온 길이
  const visited = new Map();
  const path = [];

  let pos = 1;

  while (!visited.has(pos)) {
    visited.set(pos, path.length);
    path.push(pos);
    pos = points[pos];
  }

  const cycleStart = visited.get(pos);
  const cycleLength = path.length - cycleStart;

  if (count < BigInt(cycleStart)) {
    return path[Number(count)];
  } else {
    const cycleIndex = (count - BigInt(cycleStart)) % BigInt(cycleLength);
    return path[cycleStart + Number(cycleIndex)];
  }
}
