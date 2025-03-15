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
    const array = input[1].split(" ").map(Number);
    console.log(solution(n, array));

    process.exit();
  });

function solution(n, array) {
  const answer = [];

  const sortedArray = [...array].sort((a, b) => a - b);
  const pressMap = new Map();

  for (let i = 0; i < sortedArray.length; i++) {
    if (!pressMap.has(sortedArray[i])) {
      pressMap.set(sortedArray[i], pressMap.size);
    }
  }

  for (const number of array) {
    answer.push(pressMap.get(number));
  }

  return answer.join(" ");
}