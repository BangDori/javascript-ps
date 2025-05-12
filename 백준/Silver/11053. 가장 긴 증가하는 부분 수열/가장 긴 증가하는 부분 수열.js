const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    const n = +input[0];
    const array = input[1].split(" ").map(Number);

    console.log(solution(n, array));
    process.exit();
  });

function upperbound(array, target) {
  let left = 0,
    right = array.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] === target) {
      return mid;
    }

    if (array[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return right;
}

function solution(n, array) {
  const answer = [array[0]];

  for (let i = 0; i < n; i++) {
    if (answer[answer.length - 1] < array[i]) {
      answer.push(array[i]);
      continue;
    }

    const idx = upperbound(answer, array[i]);

    answer[idx] = array[i];
  }

  return answer.length;
}
