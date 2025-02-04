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
    const num = +input[0];

    if (num === 0) {
      console.log(1);
      process.exit();
    }

    let answer = 1;

    for (let i = 2; i <= num; i++) {
      answer *= i;
    }

    console.log(answer);

    process.exit();
  });
