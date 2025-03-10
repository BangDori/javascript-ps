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
    const meetings = input.slice(1).map((el) => el.split(" ").map(Number));
    console.log(solution(n, meetings));

    process.exit();
  });

function solution(n, meetings) {
  const sortedMeetings = meetings.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }

    return a[1] - b[1];
  });
  let currEndTime = 0;
  let answer = 0;

  for (const [nextStart, nextEnd] of sortedMeetings) {
    if (currEndTime <= nextStart) {
      answer += 1;
      currEndTime = nextEnd;
    }
  }

  return answer;
}
