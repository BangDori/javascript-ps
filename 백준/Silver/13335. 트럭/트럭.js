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

    const [n, bridge_length, bridge_weight] = input[0].split(" ").map(Number);
    const truck_weights = input[1].split(" ").map(Number);
    console.log(solution(bridge_length, bridge_weight, truck_weights));

    process.exit();
  });

function solution(bridge_length, bridge_weight, truck_weights) {
  const bridge = new Array(bridge_length).fill(0);
  let weightOnBridge = 0;
  let time = 0;

  truck_weights.reverse();

  while (truck_weights.length > 0 || weightOnBridge !== 0) {
    time++;

    weightOnBridge -= bridge.shift();

    if (
      weightOnBridge + truck_weights[truck_weights.length - 1] <=
      bridge_weight
    ) {
      const truck = truck_weights.pop();
      weightOnBridge += truck;
      bridge.push(truck);
    } else {
      bridge.push(0);
    }
  }

  return time;
}
