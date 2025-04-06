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
    const lines = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(lines));

    process.exit();
  });

function solution(lines) {
  let answer = 0;

  lines.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }

    return a[0] - b[0];
  });
  let [start, end] = lines.shift();

  for (const [nextStart, nextEnd] of lines) {
    if (end >= nextStart && end >= nextEnd) continue;

    if (end >= nextStart && nextEnd >= end) {
      end = nextEnd;
    } else {
      answer += end - start;
      [start, end] = [nextStart, nextEnd];
    }
  }

  answer += end - start;

  return answer;
}