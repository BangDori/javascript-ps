// lowerbound: target 이상의 첫 번째 인덱스를 찾음
function lowerbound(arr, target) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // arr[mid] >= target이면 mid 포함 범위로 좁힘
    if (arr[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return right; // target 이상 첫 번째 인덱스
}

// upperbound: target 초과 첫 번째 인덱스를 찾음
function upperbound(arr, target) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // arr[mid] > target이면 mid 포함 범위로 좁힘
    if (arr[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return right; // target 초과 첫 번째 인덱스
}

// countByRange: [start, end] 범위의 원소 개수 계산
function countByRange(arr, start, end) {
  const l = lowerbound(arr, start);
  const r = upperbound(arr, end);

  return r - l;
}

const arr = [
  1, 1, 2, 2, 3, 3, 3, 3, 3, 4, 5, 6, 6, 7, 7, 8, 9, 16, 16, 16, 346, 1123,
];

// 2 <= n <= 6인 n의 갯수
const count = countByRange(arr, 2, 6);
console.log(count);
