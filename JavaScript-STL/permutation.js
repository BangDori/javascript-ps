// 배열의 두 요소를 교환하는 함수 (구조 분해 할당 사용)
const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

/**
 * @description
 * 순열(permutation)을 구하는 재귀 함수
 * - 배열에서 selectedNumber개의 순열을 생성
 * @param {number} start 현재 교환을 시작할 인덱스
 * @param {number} n 선택 가능한 원소의 전체 개수 (n)
 * @param {number} selectedNumber 선택할 원소 개수 (r)
 * @param {any[]} selected 현재까지 선택된 원소들을 저장하는 배열
 */
function permutation(start, n, selectedNumber, selected = []) {
  // 원하는 개수만큼 선택이 완료된 경우 결과에 추가
  if (selectedNumber === selected.length) {
    return result.push([...selected]); // 복사본 저장
  }

  // 백트래킹 이용
  for (let j = start; j < n; j++) {
    swap(array, start, j);
    selected.push(array[start]);
    permutation(start + 1, n, selectedNumber, selected);
    selected.pop();
    swap(array, start, j);
  }
}

const array = [1, 2, 3, 4];
const result = [];

permutation(0, 4, 2); // array에서 4개 중에서 2개를 고르는 순열 생성
