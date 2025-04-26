// 네트워크의 수
// 나눠진 네트워크(영역)의 수를 구하는 문제

function solution(n, computers) {
    var answer = 0;
    const visited = new Array(n).fill(false);
    
    const dfs = (node) => {
        if (visited[node]) return;
        visited[node] = true;
        
        for (let next = 0; next < n; next++) {
            if (computers[node][next]) {
                dfs(next);
            }
        }
    }
    
    for (let node = 0; node < n; node++) {
        if (visited[node]) {
            continue;
        }
        
        answer++;
        dfs(node);
    }
    
    return answer;
}

// 모두 연결되어 있는 경우
// n = 3
// computers = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
// return = 1

// 연결되어 있지 않은 경우
// n = 3
// computers = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
// return = 1