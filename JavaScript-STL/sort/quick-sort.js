// 퀵소트
// 피벗을 기준으로 값을 비교하고 위치를 변경한 후에
// 피벗의 위치를 기준으로 분할하며 정복하는 과정을 거치는 정렬 알고리즘

// 최선: NlogN
// 평균: NlogN
// 최악: N^2
// 오름차순 / 내림차순과 같이 동일한 데이터 형식이 주어지는 경우 분할이 N번 발생

function partition(array, p, right) {
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

function quickSort(array, left, right) {
  if (left >= right) return;

  // 피벗을 기준으로 값을 비교하고 위치를 변경한 후에
  const pivot = partition(array, left, right);

  // 피벗을 기준으로 분할
  quickSort(array, left, pivot - 1);
  quickSort(array, pivot + 1, right);
}

const array = [9, 1, 6, 2, 7, 8, 4, 3, 5];
quickSort(array, 0, array.length - 1);
console.info(array); // 정렬 결과 출력
