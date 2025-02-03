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
    const num1 = input[0];
    const num2 = input[1];

    const first = num1 * (num2 % 10);
    const second = num1 * Math.floor((num2 % 100) / 10);
    const third = num1 * Math.floor(num2 / 100);

    console.log(first);
    console.log(second);
    console.log(third);
    console.log(third * 100 + second * 10 + first);

    process.exit();
  });
