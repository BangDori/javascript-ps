const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on("line", function (line) {
    line.split(" ").map((el) => input.push(+el));
  })
  .on("close", function () {
    /**
     * Solution
     */
    const [up, down, height] = input;

    if (up >= height) {
      console.log(1);
      process.exit();
    }

    const daysBeforeLastClimb = Math.floor((height - up) / (up - down));
    const answer =
      (height - up) % (up - down) === 0
        ? daysBeforeLastClimb + 1
        : daysBeforeLastClimb + 2;

    console.log(answer);

    process.exit();
  });
