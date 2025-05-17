// 1 <= x, y <= 50

const SIZE = 101;
const dirs = [[-1, 0], [1, 0], [0, 1], [0, -1]];

function solution(rectangle, characterX, characterY, itemX, itemY) {
    var answer = 0;
    const graph = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    
    // 우회 문제로 인해 * 2
    const doubleRectangle = rectangle.map((coords) => coords.map((point) => point * 2));
    
    doubleRectangle.forEach(([x1, y1, x2, y2]) => {
        for (let y = y1; y <= y2; y++) {
            for (let x = x1; x <= x2; x++) {
                if (y === y1 || y === y2 || x === x1 || x === x2) {
                    if (graph[y][x] === 1) continue;
                    else graph[y][x] += 1;
                } else {
                    graph[y][x] += 2;
                }
            }
        }
    })
    
    characterX *= 2;
    characterY *= 2;
    itemX *= 2;
    itemY *= 2;
    
    const queue = [[characterY, characterX, 0]];
    graph[characterY][characterX] = 100;
    
    while (queue.length) {
        const [y, x, dist] = queue.shift();
        
        if (y === itemY && x === itemX) {
            return dist / 2;
        }
        
        for (const [dy, dx] of dirs) {
            const ny = y + dy;
            const nx = x + dx;
            
            if (ny < 0 || ny >= SIZE || nx < 0 || ny >= SIZE) continue;
            if (graph[ny][nx] === 1) {
                queue.push([ny, nx, dist + 1]);
                graph[ny][nx] = 100;
            }
        }
    }
    
    return 1;
}