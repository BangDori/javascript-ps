function solution(N, road, K) {
    var answer = 0;
    
    const graph = Array.from({ length: N+1 }, () => []);
    const distMap = new Map();
    const visited = new Array(N+1).fill(-1);
    
    for (const [src, dest, dist] of road) {
        graph[src].push(dest);
        graph[dest].push(src);
        
        if (distMap.has(`${src} ${dest}`)) {
            const minDist = Math.min(distMap.get(`${src} ${dest}`), dist);
            distMap.set(`${src} ${dest}`, minDist);
            distMap.set(`${dest} ${src}`,  minDist);
        } else {
            distMap.set(`${src} ${dest}`, dist);
            distMap.set(`${dest} ${src}`, dist);
        }
    }
    
    for (let i = 1; i < N+1; i++) {
        graph[i].sort((a, b) => a-b);
    }
    
    const dfs = (src, currDist) => {
        if (currDist > K) return;
        visited[src] = currDist;
        
        for (const next of graph[src]) {
            const nextDist = currDist + distMap.get(`${src} ${next}`);
            
            if (nextDist > K) continue;
            if (visited[next] === -1 || nextDist < visited[next]) {
                dfs(next, nextDist);
            }
        }
    }
    
    dfs(1, 0);
    answer = visited.reduce((acc, curr) => curr >= 0 ? acc + 1 : acc, 0);
    
    return answer;
}