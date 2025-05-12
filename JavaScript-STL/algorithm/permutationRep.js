const swap = (arr, idx1, idx2) =>
  ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);

// 중복 순열
function permutationRep(start, n, r, selected = []) {
  if (r === selected.length) {
    result.push([...selected]);
    return;
  }

  for (let i = start; i < n; i++) {
    swap(start, i);
    selected.push(array[i]);
    permutationRep(i, n, r, selected);
    selected.pop();
    swap(start, i);
  }
}

const array = [1, 2, 3, 4];
const result = [];

permutationRep(0, 4, 3);
