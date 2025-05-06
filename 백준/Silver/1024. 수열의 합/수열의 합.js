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
    const [N, L] = input[0].split(" ").map(Number);
    console.log(solution(N, L));

    process.exit();
  });

// 합이 N
// 길이가 적어도 L인 가장 짧은 연속된 음이 아닌 정수 리스트

// gkq

function solution(N, L) {
  const answer = [];

  const binarySearch = (len) => {
    let left = 0;
    let right = N;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      let sum = 0;

      for (let i = mid; i < mid + len; i++) {
        sum += i;
      }

      if (sum === N) {
        return [mid, mid + len];
      }

      if (sum > N) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return -1;
  };

  for (let len = L; len <= 100; len++) {
    const result = binarySearch(len);

    if (result !== -1) {
      const [start, end] = result;

      for (let k = start; k < end; k++) {
        answer.push(k);
      }
      break;
    }
  }

  return answer.length === 0 ? -1 : answer.join(" ");
}
