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
    const nums = input[1].split(" ").map((el) => +el);
    const answer = solution(nums);
    console.log(answer);

    process.exit();
  });

function solution(nums) {
  let answer = 0;

  const output = permutation(nums, nums.length);
  output.forEach((array) => {
    answer = Math.max(answer, formula(array));
  });

  return answer;
}

function permutation(arr, n) {
  let result = [];
  const visited = Array(arr.length).fill(false); // 방문 여부를 체크할 배열

  function dfs(current) {
    if (current.length === n) {
      result.push([...current]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (!visited[i]) {
        //방문 여부 체크 후
        visited[i] = true; //방문처리
        current.push(arr[i]);
        dfs(current);
        current.pop();
        visited[i] = false; //다음 반복을 위해 미방문 처리
      }
    }
  }
  dfs([]);

  return result;
}

function formula(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    sum += Math.abs(arr[i] - arr[i + 1]);
  }

  return sum;
}
