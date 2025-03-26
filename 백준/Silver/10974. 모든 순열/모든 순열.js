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
    const n = +input[0];
    console.log(solution(n));

    process.exit();
  });

function solution(n) {
  const result = [];
  const array = Array.from({ length: n }, (_, index) => index+1);

  const swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]];

  const permutation = (i, arr) => {
    if (i === arr.length) {
      return result.push([...arr]);
    }

    for (let j = i; j < arr.length; j++) {
      swap(arr, i, j);
      permutation(i+1, arr);
      swap(arr, i, j);
    }
  }

  permutation(0, array);
  result.sort()

  return result.map(el => el.join(" ")).join("\n");
}