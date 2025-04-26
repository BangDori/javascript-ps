// 대기실의 크기 5x5

// P = 응시자
// O = 빈 테이블
// X = 파티션

// 안전 여부
// 거리두기 = 응시자들끼리 맨해튼 거리 2 이하 X
// 단, 파티션으로 막혀있는 경우 허용

const SIZE = 5;
const PARTITION = 'X';
const TABLE = 'O';
const PARTICIPANTS = 'P';

const dirs = [[-1, 0], [1, 0], [0, 1], [0, -1]];

function solution(places) {
    var answer = [];

    // visited 체크 안하면 시간 초과 발생할 거 같은데
    const bfs = (place, r, c) => {
        const visited = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => false));
        let queue = [[r, c]];
        visited[r][c] = true;
        
        let distance = 0;
        
        while (queue.length > 0) {
            distance++;
            const nextQueue = [];
            
            for (const [cr, cc] of queue) {
                for (const [dr, dc] of dirs) {
                    const nr = cr + dr;
                    const nc = cc + dc;
                    
                    if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE) continue;
                    if (visited[nr][nc] || place[nr][nc] === PARTITION) continue;
                    if (place[nr][nc] === TABLE) nextQueue.push([nr, nc]);
                    if (place[nr][nc] === PARTICIPANTS) return false;
                }
            }
            
            if (distance >= 2) break;
            queue = nextQueue;
        }
        
        return true;
    }
    
    const checkSafePlace = (place) => {
        for (let r = 0; r < SIZE; r++) {
            for (let c = 0; c < SIZE; c++) {
                if (place[r][c] === PARTICIPANTS) {
                    const isSafe = bfs(place, r, c);
                    
                    if (!isSafe) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    }
    
    for (const place of places) {
        // 강의실에 대해 거리두기가 잘 지켜지고 있는지 확인
        const isSafe = checkSafePlace(place);
        
        answer.push(isSafe ? 1 : 0);
    }
    
    return answer;
}