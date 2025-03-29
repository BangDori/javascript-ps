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
    const array = input[1].split(" ").map(Number);
    const operations = input[2].split(" ").map(Number);

    console.log(solution(array, operations));

    process.exit();
  });

const OP = {
  ADD: 0,
  MINUS: 1,
  MULTIPLY: 2,
  DIVIDE: 3,
};

const totalCase = [];

function solution(array, operations) {
  //최댓값, 최솟값
  const answer = [-Infinity, Infinity];

  const opFlat = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < operations[i]; j++) {
      opFlat.push(i);
    }
  }

  permutation(0, opFlat);

  for (const op of totalCase) {
    let result = array[0];

    for (let i = 0; i < op.length; i++) {
      switch (op[i]) {
        case OP.ADD:
          result += array[i + 1];
          break;
        case OP.MINUS:
          result -= array[i + 1];
          break;
        case OP.MULTIPLY:
          result *= array[i + 1];
          break;
        default:
          if (result < 0) {
            result *= -1;
            result = Math.floor(result / array[i + 1]);
            result *= -1;
          } else {
            result = Math.floor(result / array[i + 1]);
          }
          break;
      }
    }

    answer[0] = Math.max(answer[0], result);
    answer[1] = Math.min(answer[1], result);
  }

  return answer.join("\n");
}

const permutation = (i, array) => {
  if (i === array.length) {
    return totalCase.push([...array]);
  }

  for (let j = i; j < array.length; j++) {
    [array[i], array[j]] = [array[j], array[i]];
    permutation(i + 1, array);
    [array[i], array[j]] = [array[j], array[i]];
  }
};
