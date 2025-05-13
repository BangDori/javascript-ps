const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const string = input[0];

const list = [];
let curr = "";

for (const alpha of string) {
  if (alpha === "<") {
    if (curr) list.push(curr);
    curr = alpha;
  } else if (alpha === ">") {
    curr += alpha;
    list.push(curr);
    curr = "";
  } else {
    if (alpha === " ") {
      if (curr[0] === "<") {
        curr += alpha;
      } else {
        list.push(curr);
        list.push("");
        curr = "";
      }
    } else {
      curr += alpha;
    }
  }
}

if (curr) {
  list.push(curr);
}

const splittedLists = list.map((el) => el.split(""));
let answer = "";

for (const splittedList of splittedLists) {
  if (splittedList[0] === "<") {
    answer += splittedList.join("");
  } else {
    answer += splittedList.length ? splittedList.reverse().join("") : " ";
  }
}

console.log(answer);