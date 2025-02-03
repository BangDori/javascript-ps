const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    input.push(parseInt(line, 10));
  })
  .on("close", function () {
    /**
     * Solution
     */
    const year = input[0];
    let answer = 0;

    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      answer = 1;
    }

    console.log(answer);

    process.exit();
  });
