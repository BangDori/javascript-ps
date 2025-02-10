const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push(+line);
  })
  .on("close", function () {
    /**
     * Solution
     */
    const answer = solution(input);
    console.log(answer);

    process.exit();
  });

function solution(input) {
  const answer = [];
  const heights = [];

  const findCombinations = (tot, current, sum) => {
    if (tot >= 7) {
      if (sum === 100) answer.push([...heights]);
      return;
    }

    for (let i = current; i < input.length; i++) {
      if (sum + input[i] > 100) continue;

      heights.push(input[i]);
      findCombinations(tot + 1, i + 1, sum + input[i]);
      heights.pop();
    }
  };

  findCombinations(0, 0, 0);

  return answer[0].sort((a, b) => a - b).join("\n");
}
