/**
 * @description
 * 특정 원소의 루트(부모) 노드를 찾는 함수 (경로 압축 기법 사용)
 * parent[x]가 자기 자신이면 루트 노드
 * 그렇지 않으면 재귀적으로 루트를 찾아서, 경로 상의 노드를 모두 루트에 직접 연결
 * @param {number[]} parent 부모 노드 배열
 * @param {number} x 현재 노드 인덱스
 * @returns {number} 루트 노드의 인덱스
 */
function getParent(parent, x) {
  if (parent[x] === x) return x;
  return (parent[x] = getParent(parent, parent[x]));
}

/**
 * @description 두 노드가 같은 집합(같은 루트)을 가지는지 확인하는 함수
 * @param {number[]} parent 부모 노드 배열
 * @param {number} x 노드1 인덱스
 * @param {number} y 노드2 인덱스
 * @returns {boolean} 같은 집합이면 true, 아니면 false
 */
function findParent(parent, x, y) {
  const px = getParent(parent, x);
  const py = getParent(parent, y);

  return px === py;
}

/**
 * @description
 * 두 원소가 속한 집합을 하나로 합치는 함수
 * 작은 값을 루트로 삼아 일관성 있게 유지
 * @param {number[]} parent 부모 노드 배열
 * @param {number} x 노드1 인덱스
 * @param {number} y 노드2 인덱스
 */
function unionParent(parent, x, y) {
  const px = getParent(parent, x);
  const py = getParent(parent, y);

  if (px < py) return (parent[py] = px);
  else return (parent[px] = py);
}
