// 삽입 정렬
// 이전 값과 비교하면서 앞으로 계속 이동시키는 방법

// 최선: N
// 평균: N^2
// 최악: N^2

function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    for (let j = i; j >= 0; j--) {
      if (array[j] < array[j - 1]) {
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
      } else {
        break;
      }
    }
  }

  return array;
}

const array = [9, 1, 6, 2, 7, 8, 4, 3, 5];
console.info(insertionSort(array));
