// 퀵소트
// 피벗을 기준으로 값을 비교하고 위치를 변경한 후에
// 피벗의 위치를 기준으로 분할하며 정복하는 과정을 거치는 정렬 알고리즘

// 최선: NlogN
// 평균: NlogN
// 최악: N^2

// 고정 피벗을 기준으로 정복 - 1 (왼쪽)
function leftPartition(array, p, right) {
  const pivot = array[p];
  let low, high;

  low = p + 1;
  high = right;

  while (low <= high) {
    while (array[low] < pivot) low++;
    while (array[high] > pivot) high--;

    if (low < high) {
      // 구조 분해 할당을 이용한 swap
      [array[low], array[high]] = [array[high], array[low]];
    }
  }

  [array[p], array[high]] = [array[high], array[p]];

  return high;
}

// 고정 피벗을 기준으로 정복 - 2 (중간)
function middlePartition(array, left, right) {
  const mid = Math.floor((left + right) / 2);
  const pivot = array[mid];

  let low = left;
  let high = right;

  while (low <= high) {
    while (array[low] < pivot) low++;
    while (array[high] > pivot) high--;

    if (low <= high) {
      [array[low], array[high]] = [array[high], array[low]];
      low++;
      high--;
    }
  }

  return low;
}

function quickSort(array, left, right) {
  if (left >= right) return;

  // 피벗을 기준으로 값을 비교하고 위치를 변경한 후에
  const pivot = middlePartition(array, left, right);

  // 피벗을 기준으로 분할
  quickSort(array, left, pivot - 1);
  quickSort(array, pivot, right);
}

const array = [9, 1, 6, 2, 7, 8, 4, 3, 5];
quickSort(array, 0, array.length - 1);
console.info(array); // 정렬 결과 출력
