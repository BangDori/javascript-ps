function solution(n, stations, w) {
  let answer = 0;
  const dist = [];

  dist.push(stations[0] - w - 1); // 시작 지점과 첫 기지국의 거리
    
  for (let i = 1; i < stations.length; i++) {
    dist.push((stations[i] - w - 1) - (stations[i - 1] + w));
  }
    
  dist.push(n - (stations[stations.length - 1] + w)); // 종료 지점과의 마지막 기지국의 거리
    
  const coverage = 2 * w + 1;

  for (const d of dist) {
    if (d <= 0) continue;
      
    answer += Math.floor(d / coverage) + (d % coverage !== 0 ? 1 : 0);
  }

  return answer;
}