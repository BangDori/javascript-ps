// 버블 소트
// 인덱스를 이동해나가면서 인덱스+1와 계속 비교하며 변경하는 방식

// 최선의 경우: N^2
// 평균: N^2
// 최악의 경우: N^2

function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return array;
}

const array = [9, 1, 6, 2, 7, 8, 4, 3, 5];
console.info(bubbleSort(array));
