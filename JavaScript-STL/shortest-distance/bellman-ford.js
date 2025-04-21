function bellmanFord(n, distances) {
  const INF = Infinity;
  const dist = new Array(n + 1).fill(INF);

  dist[1] = 0;

  // 거리 갱신
  for (let i = 1; i < n; i++) {
    for (const [src, dest, cost] of distances) {
      if (dist[src] !== INF && dist[dest] > dist[src] + cost) {
        dist[dest] = dist[src] + cost;
      }
    }
  }

  // 음수 사이클
  for (const [src, dest, cost] of distances) {
    if (dist[src] !== INF && dist[dest] > dist[src] + cost) {
      return -1;
    }
  }

  const answer = [];

  for (let i = 2; i <= n; i++) {
    answer.push(dist[i] === INF ? -1 : dist[i]);
  }

  return answer.join("\n");
}

const n = 3;
const distances = [
  [1, 2, 4],
  [1, 3, 3],
  [2, 3, -1],
  [3, 1, -2],
];

console.info(bellmanFord(n, distances));
