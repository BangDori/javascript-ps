// K개의 글자

// anta + X + tica
// a n t i c

// 남극언어에는 N개 밖에 없음

// 1 <= n <= 50
// 0 <= k <= 26
// 8 <= word.length <= 15
// word는 고유한 값들로 구성

// 6개의 글자를 가르친다.

// anta + rc + tica
// anta + hello + tica
// anta + car + tica

// a n t i c

// 21개 중에 n개를 뽑는 경우의 수 * 50개 확인

// 21c10이 max이고 50개면

// 21 * 19 * 17 * 13

// 200 * 21 * 19 * 13

// 문자를 읽는다.

// rc     -> r
// hello  -> h e l o
// car    -> r

// 이 중에 이미 읽을 수 있는것도 포함되어 있고, 읽지 못하는 것도 포함되어 있음
// 어떤 걸 가르쳐야 가장 많은 단어를 알 수 있을까?

// 하나씩 다 알려줘버리면 안되나?
// -> 이렇게 되면 1개인 경우에는 가능하지만, 2개 이상이라면 경우의 수가 너무 많아짐
// X

// 각 단어별로 필요한 알파벳을 조사하자

const required = new Set(["a", "c", "n", "t", "i"]);

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = input[0].split(" ").map(Number);
const words = input.slice(1);

// 필수 문자 (a, n, t, i c)
if (k < required.size) {
  console.log(0);
  process.exit();
}

const extra = k - required.size;

const needs = [];
const countMap = new Map();

for (const word of words) {
  const middle = word.substring(4, word.length - 4);
  const need = [];

  if (middle === "") {
    needs.push(need);
    continue;
  }

  for (const alpha of [...new Set(middle)]) {
    if (required.has(alpha)) continue;

    need.push(alpha);
    if (!countMap.has(alpha)) countMap.set(alpha, 0);
    countMap.set(alpha, countMap.get(alpha) + 1);
  }

  needs.push(need);
}

const alphabetList = [...countMap.keys()];
const extraListComb = [];

function combination(start, n, r, selected = []) {
  if (r === selected.length) {
    return extraListComb.push(new Set([...selected]));
  }

  for (let i = start; i < n; i++) {
    selected.push(alphabetList[i]);
    combination(i + 1, n, r, selected);
    selected.pop();
  }
}

// 콤비네이션할떄, r이 n보다 커질 수 없음
combination(0, alphabetList.length, Math.min(extra, alphabetList.length));

let answer = 0;

for (const extraList of extraListComb) {
  let curr = 0;

  for (const need of needs) {
    let isKnown = true;

    for (const alpha of need) {
      if (!extraList.has(alpha)) {
        isKnown = false;
        break;
      }
    }

    if (isKnown) curr++;
  }

  answer = Math.max(answer, curr);
}

console.log(answer);
