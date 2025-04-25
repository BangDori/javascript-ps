function binarySearch(array, target) {
  let left = 0,
    right = array.length - 1;

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

  return left;
}

function lis(array) {
  const answer = [array[0]];

  for (let i = 1; i < array.length; i++) {
    if (array[i] > answer[answer.length - 1]) {
      answer.push(array[i]);
      continue;
    }

    const idx = binarySearch(answer, array[i]);
    answer[idx] = array[i];
  }

  return answer;
}

const array = [10, 20, 10, 30, 20, 50];
console.log(lis(array));
