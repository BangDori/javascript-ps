const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const top7 = [];
let i = 0;

rl.on("line", (line) => {
  if (i === 0) {
    i++;
  } else {
    const num = parseFloat(line);
    if (!isNaN(num)) {
      if (top7.length < 7) {
        top7.push(num);
      } else {
        const max = Math.max(...top7);
        if (num < max) {
          const index = top7.indexOf(max);
          top7[index] = num;
        }
      }
    }
  }
});

rl.on("close", () => {
  top7.sort((a, b) => a - b);
  top7.forEach((num) => console.log(num.toFixed(3)));
  process.exit();
});
