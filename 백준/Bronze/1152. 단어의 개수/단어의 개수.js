const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    line
      .split(" ")
      .filter(Boolean)
      .map((word) => input.push(word));
  })
  .on("close", function () {
    /**
     * Solution
     */
    console.log(input.length);

    process.exit();
  });
