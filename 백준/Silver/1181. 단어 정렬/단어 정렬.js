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
    const words = input.slice(1);
    console.log(solution(words));

    process.exit();
  });

function solution(words) {
  return [...new Set(words)]
    .sort((a, b) => {
      if (a.length === b.length) {
        return a.localeCompare(b);
      }

      return a.length - b.length;
    })
    .join("\n");
}
