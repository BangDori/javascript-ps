const graph = [
  [Infinity, 1, 5],
  [Infinity, Infinity, 2],
  [Infinity, 1, Infinity],
];

const vertexs = graph.length;

for (let k = 0; k < vertexs; k++) {
  for (let i = 0; i < vertexs; i++) {
    for (let j = 0; j < vertexs; j++) {
      if (graph[i][j] > graph[i][k] + graph[k][j]) {
        graph[i][j] = graph[i][k] + graph[k][j];
      }
    }
  }
}
