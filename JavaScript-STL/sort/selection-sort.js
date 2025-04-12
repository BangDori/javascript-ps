// 선택 정렬
// 하나씩 선택해가면서 가장 작은 값을 앞에 배치

// 최선의 경우: N^2
// 평균: N^2
// 최악의 경우: N^2

function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let current = i;

    for (let j = i; j < array.length; j++) {
      if (array[current] > array[j]) {
        current = j;
      }
    }

    [array[i], array[current]] = [array[current], array[i]];
  }

  return array;
}

const array = [9, 1, 6, 2, 7, 8, 4, 3, 5];
console.info(selectionSort(array));
