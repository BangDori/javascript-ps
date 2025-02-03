const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    line.split(" ").map((el) => input.push(parseInt(el, 10)));
  })
  .on("close", function () {
    /**
     * Solution
     */
    const num1 = input[0];
    const num2 = input[1];

    console.log(num1 + num2);
    console.log(num1 - num2);
    console.log(num1 * num2);
    console.log(Math.floor(num1 / num2));
    console.log(num1 % num2);

    process.exit();
  });
