const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [damageA, hpA] = input[0].split(" ").map(Number);
let [damageB, hpB] = input[1].split(" ").map(Number);

while (hpA > 0 && hpB > 0) {
  hpA -= damageB;
  hpB -= damageA;
}

let answer = "";

if (hpA > 0) answer = "PLAYER A";
else if (hpB > 0) answer = "PLAYER B";
else answer = "DRAW";

console.log(answer);
