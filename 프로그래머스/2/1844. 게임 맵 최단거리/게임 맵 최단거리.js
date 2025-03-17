// (0, 0) to (n-1, m-1)

// 상대팀 진영까지 이동하기 위한 "최소 이동거리"
// 벽은 뚫을 수 없다.
// 만약 이동할 수 없다면 -1

const WALL = 0;
const DIRS = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // 동, 서, 남, 북

function solution(maps) {
    var answer = 0;
    
    const rowSize = maps.length;
    const colSize = maps[0].length;
    const visited = Array.from({ length: rowSize }, () => new Array(colSize).fill(false));
    
    const queue = [];
    queue.push([0, 0, 1]);
    
    while (queue.length > 0) {
        const [row, col, count] = queue.shift();
        
        if (row === rowSize-1 && col === colSize-1) {
            return count;
        }
        
        visited[row][col] = true;
        
        for (const [cr, cc] of DIRS) {
            const nr = row + cr;
            const nc = col + cc;
            
            if (nr < 0 || nr >= rowSize) continue;
            if (nc < 0 || nc >= colSize) continue;
            if (visited[nr][nc] || maps[nr][nc] === WALL) continue;
            
            queue.push([nr, nc, count+1]);
            visited[nr][nc] = true;
        }
    }
        
    return -1;
}

// 6 * 7
// 1 1 1 1 1 1
// 0 0 1 0 0 1
// 0 0 1 0 0 1
// 0 1 1 0 0 1
// 0 1 0 0 0 1
// 0 1 0 0 0 1
// 0 1 1 1 1 1
// 12


// 만약 벽을 뚫을 수 있는 경우라면?
