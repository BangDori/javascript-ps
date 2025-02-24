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
  let answer = "";

  const points = [];

  for (let i = 1; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      points.push([i, j]);
    }
  }

  for (const [x, y] of points) {
    const array = devideString(str, x, y).map((s) => reverseString(s));

    const reversed = array.join("");
    if (answer === "") {
      answer = reversed;
      continue;
    }

    if (answer > reversed) answer = reversed;
  }

  return answer;
}

function devideString(str, x, y) {
  return [str.slice(0, x), str.slice(x, y), str.slice(y, str.length)];
}

function reverseString(str) {
  return [...str].reverse().join("");
}