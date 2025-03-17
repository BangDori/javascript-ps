const dirs = [[1, 0], [0, 1], [-1, -1]];

function solution(n) {
    const matrix = Array.from({ length: n }, () => new Array(n).fill(-1));

    let row = -1, col = 0;
    let count = 1; // MAX = n * (n+1) / 2

    const maxCount = (n * (n+1)) / 2;
    let dir = 0;
    
    while (count <= maxCount) {
        const [xr, xc] = dirs[dir];
        
        row += xr;
        col += xc;

        while (1) {
            matrix[row][col] = count;
            count++;
            
            const nr = row + xr;
            const nc = col + xc;

            if (nr < 0 || nr >= n) break;
            if (nc < 0 || nc >= n) break;
            if (matrix[nr][nc] !== -1) break;
            
            row += xr;
            col += xc;
        }
        
        dir = (dir + 1) % 3;
    }
        
    const answer = [];
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            answer.push(matrix[i][j]);
        }
    }
        
    return answer;
}

// 0
// 0 1
// 0 1 2
// 0 1 2 3
// 0 1 2 3 4