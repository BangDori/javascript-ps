// n 개의 섬
// 최소 비용으로 모든 섬이 서로 통행 가능하도록

function solution(n, costs) {
    var answer = 0;
    const matrix = Array.from({ length: n }, () => []);
    const island = new Set();
    
    // 거리별 정렬
    costs.sort((a, b) => a[2] - b[2]);
    
    const isCycle = (initSrc, initDest) => {
        const visited = new Array(n).fill(false);
        const queue = [];
        let curr = 0;
        
        queue.push(initSrc);
        visited[initSrc] = true;
                
        while (queue.length > curr) {
            const src = queue[curr];
                        
            if (src === initDest) return true;
            
            for (const dest of matrix[src]) {
                if (visited[dest]) continue;
                queue.push(dest);
                visited[dest] = true;
            }
            
            curr++;
        }
        
        return false;
    }
    
    for (const [src, dest, cost] of costs) {
        // src와 dest를 연결했을 때, 사이클이 생기는지? 확인
        // cycle이 생긴다면 연결하지 않기
        if (isCycle(src, dest)) {
            continue;
        }

        // 사이클이 생기지 않는 것이기 때문에 연결
        island.add(src);
        island.add(dest);
        matrix[src].push(dest);
        matrix[dest].push(src);
        answer += cost;
    }
    
    return answer;
}