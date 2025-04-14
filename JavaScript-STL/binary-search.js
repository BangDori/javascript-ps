// 이진 탐색

// 최선 1
// 평균, 최악 logN

function binarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] === target) {
      return mid;
    }

    if (array[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const target = 9;
console.log(binarySearch(array, target));
