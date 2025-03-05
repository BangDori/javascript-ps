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
    const N = +input[0];
    const commands = input.splice(1);
    console.log(solution(N, commands));

    process.exit();
  });

function solution(N, commands) {
  const queue = [];
  let head = 0,
    tail = 0;
  const answer = [];

  for (const command of commands) {
    switch (command) {
      case "pop":
        if (tail === head) {
          answer.push(-1);
        } else {
          answer.push(queue[head]);
          head++;
        }
        break;
      case "size":
        answer.push(tail - head);
        break;
      case "empty":
        answer.push(tail === head ? 1 : 0);
        break;
      case "front":
        answer.push(tail > head ? queue[head] : -1);
        break;
      case "back":
        answer.push(tail > head ? queue[tail - 1] : -1);
        break;
      default:
        queue.push(command.split(" ")[1]);
        tail++;
    }
  }

  return answer.join("\n");
}
