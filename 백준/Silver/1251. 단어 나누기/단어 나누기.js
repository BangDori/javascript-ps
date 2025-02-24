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
    console.log(solution(input[0]));

    process.exit();
  });

function solution(str) {
  let answer = null;

  for (let i = 1; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      const reversed = [
        [...str.slice(0, i)].reverse().join(""),
        [...str.slice(i, j)].reverse().join(""),
        [...str.slice(j)].reverse().join(""),
      ].join("");

      // 가장 작은 문자열 업데이트
      if (answer === null || reversed < answer) {
        answer = reversed;
      }
    }
  }

  return answer;
}