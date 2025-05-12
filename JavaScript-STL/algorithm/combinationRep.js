// 중복 조합
function combinationRep(start, n, r, selected = []) {
  if (r === selected.length) {
    result.push([...selected]);
    return;
  }

  for (let i = start; i < n; i++) {
    selected.push(array[i]);
    combinationRep(i, n, r, selected);
    selected.pop(array[i]);
  }
}

const array = [1, 2, 3, 4];
const result = [];

combinationRep(0, 4, 4); // array에서 4개 중에서 2개를 고르는 조합 생성

console.log(result);
