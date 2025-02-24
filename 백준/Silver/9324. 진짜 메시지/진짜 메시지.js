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
    const N = input[0];
    const messages = input.slice(1);
    console.log(solution(N, messages));

    process.exit();
  });

function solution(N, messages) {
  const answer = [];

  for (const realMessage of messages) {
    const alphabets = Array.from({ length: 26 }, () => 0);
    let receivedMessage = "";

    for (let i = 0; i < realMessage.length; i++) {
      const index = realMessage[i].charCodeAt() - 65;

      alphabets[index] += 1;
      receivedMessage += realMessage[i];

      if (alphabets[index] === 3) {
        receivedMessage += realMessage[i];
        alphabets[index] = 0;
        i += 1;
      }
    }

    answer.push(realMessage === receivedMessage ? "OK" : "FAKE");
  }

  return answer.join("\n");
}