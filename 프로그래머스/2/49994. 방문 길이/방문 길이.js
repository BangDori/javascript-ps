// 23:20 ~ 23:25

// U 왼쪽
// D 아래쪽
// R 오른쪽
// L 왼쫀

// 좌표 -> map 객체에 `${srcX} ${srcY} ${dstX} ${dstY}` 저장하여 길 표시
// 모든 좌표 -5 <= x, y <= 5
// 넘어가면 이동 X

// "처음 걸어"간 길이 -> map 객체에 포함된 갯수
// 처음 걸어간 길의 방향이 아닌, "처음 걸어간 길" -> 역방향도 고려

const directions = {
    "U": [1, 0],
    "D": [-1, 0],
    "R": [0, 1],
    "L": [0, -1],
}

function solution(dirs) {
    var answer = 0;
    let srcX = 0, srcY = 0;
    const moveMap = new Map();
    
    for (const dir of dirs) {
        const [dx, dy] = directions[dir];
        const dstX = srcX+dx;
        const dstY = srcY+dy;
        
        if (dstX < -5 || dstX > 5) continue;
        if (dstY < -5 || dstY > 5) continue;
        
        const move = `${srcX} ${srcY} ${dstX} ${dstY}`
        const reverseMove = `${dstX} ${dstY} ${srcX} ${srcY}`;
        
        if (!moveMap.has(move) && !moveMap.has(reverseMove)) {
            moveMap.set(move);
            moveMap.set(reverseMove);
            answer += 1;
        }
        
        srcX = dstX;
        srcY = dstY;
    }
    
    return answer;
}

// 반례 고려해보기

// 1. 한 번도 안겹치는 경우
// LULDLULD 8
// RRULDDD 7

// 2. 주변을 맴도는경우
// URDLURDLURDL 4
// URDLRULDURDL 4

// 3. 은근슬쩍 겹치는 경우
// LRLLRRRLRRLL 4