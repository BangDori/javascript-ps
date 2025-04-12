// 머지소트
// 분할정복

// 최선: NlogN
// 평균: NlogN
// 최악: NlogN

function mergeSort(arr) {
  // 배열 길이가 1 이하이면 정렬할 필요 없음
  if (arr.length <= 1) return arr;

  // 배열을 반으로 나눔
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // 정렬된 두 배열을 병합
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  // 두 배열을 비교해서 작은 값부터 넣음
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  // 남은 값들을 붙여줌
  return result.concat(left.slice(i)).concat(right.slice(j));
}

const array = [9, 1, 6, 2, 7, 8, 4, 3, 5];
const sorted = mergeSort(array);
console.log(sorted);
