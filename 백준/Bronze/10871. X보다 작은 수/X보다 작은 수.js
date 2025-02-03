const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    const ary = line.split(" ").map((el) => parseInt(el, 10));
    input.push(ary);
  })
  .on("close", function () {
    /**
     * Solution
     */
    const [_, maxNum] = input[0];
    const nums = input[1];
    const answer = [];

    for (const num of nums) {
      if (num < maxNum) {
        answer.push(num);
      }
    }

    console.log(answer.join(" "));

    process.exit();
  });
