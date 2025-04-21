/**
 * @description 조합(combination)을 구하는 재귀 함수
 * @param {number} start 현재 선택 가능한 인덱스의 시작점
 * @param {number} n 선택 가능한 원소의 전체 개수 (n)
 * @param {number} selectedNumber 선택할 원소의 개수 (r)
 * @param {any[]} selected 현재까지 선택된 원소들을 저장하는 배열 (기본값은 빈 배열)
 */
function combination(start, n, selectedNumber, selected = []) {
  // 원하는 개수만큼 선택이 완료된 경우 결과에 추가
  if (selectedNumber === selected.length) {
    return result.push([...selected]); // 복사본 저장
  }

  // 백트래킹 이용
  for (let i = start; i < n; i++) {
    selected.push(array[i]);
    combination(i + 1, n, selectedNumber, selected);
    selected.pop();
  }
}

const array = [1, 2, 3, 4];
const result = [];

combination(0, 4, 2); // array에서 4개 중에서 2개를 고르는 조합 생성
