// 중복 순열
function permutationRep(start, n, r, selected = []) {
  if (r === selected.length) {
    result.push([...selected]);
    return;
  }

  for (let i = start; i < n; i++) {
    selected.push(array[i]);
    permutationRep(i, n, r, selected);
    selected.pop();
  }
}

const array = [1, 2, 3, 4];
const result = [];

permutationRep(0, 4, 4);

console.log(result);
