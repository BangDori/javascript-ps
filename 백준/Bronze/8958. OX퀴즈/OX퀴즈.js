const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push([line]);
  })
  .on("close", function () {
    /**
     * Solution
     */
    const testcase = +input[0];
    const answer = [];

    for (let i = 1; i <= testcase; i++) {
      const quiz = input[i][0];
      const result = getOXQuizResult(quiz);

      answer.push(result);
    }

    console.log(answer.join("\n"));

    process.exit();
  });

function getOXQuizResult(quiz) {
  let total = 0;
  let current = 0;

  for (let i = 0; i < quiz.length; i++) {
    if (quiz[i] === "O") {
      current += 1;
      total += current;
    } else {
      current = 0;
    }
  }

  return total;
}
