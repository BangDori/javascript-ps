const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const maxNum = 1001;
const isPrime = Array.from({ length: maxNum }, () => true);
isPrime[0] = false;
isPrime[1] = false;

for (let i = 2; i <= Math.sqrt(maxNum); i++) {
  if (!isPrime[i]) continue;

  for (let j = i * i; j < maxNum; j += i) {
    isPrime[j] = false;
  }
}

readline
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    /**
     * Solution
     */
    const count = +input[0];
    const nums = input[1].split(" ").map((el) => +el);
    let answer = 0;

    for (const num of nums) {
      if (isPrime[num]) answer += 1;
    }

    console.log(answer);

    process.exit();
  });
