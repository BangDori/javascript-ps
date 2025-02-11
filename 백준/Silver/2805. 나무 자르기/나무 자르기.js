const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push(line.split(" ").map((el) => +el));
  })
  .on("close", function () {
    /**
     * Solution
     */
    const [_, M] = input[0];
    const trees = input[1];

    const answer = solution(M, trees);
    console.log(answer);

    process.exit();
  });

function solution(M, trees) {
  const left = 0,
    right = Math.max(...trees) - 1;
  let answer = 0;

  const binarySearch = (target, bleft, bright) => {
    while (bleft <= bright) {
      // 만약 현재 길이(mid)로 자른 나무의 길이가 높다면 ? answer 대체
      const mid = Math.floor((bleft + bright) / 2);
      const treeLength = trees.reduce(
        (acc, curr) => acc + Math.max(curr - mid, 0),
        0
      );

      if (treeLength >= target) {
        answer = Math.max(answer, mid);
        bleft = mid + 1;
        continue;
      }

      if (treeLength < target) {
        bright = mid - 1;
        continue;
      }
    }
  };

  binarySearch(M, left, right);

  return answer;
}