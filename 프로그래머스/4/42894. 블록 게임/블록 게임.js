// 10:52 ~ 

// N * N 보드
// 보드 위에 놓인 블록은 회전 불가능

// 검은 블록과 기존에 놓인 블록을 합해 속이 꽉 채워진 직사각형
// -> 단순 직사각형 X
// -> 각 유형별 블록 + 검은색 블록이 합쳐진 직사각형

// 블록은 위에서 아래로만 향한다.
// 방향은 상관없다.
// 아래의 경우에는 깨는게 불가능하다.

// 1, 2, 3, 4
// 5, 6, 7, 8
// 9, 10, 11, 12

// 라고 가정했을 때, 블록 아이디에 해당하는 블록 모양을 정할 수 있다면
// 3, 4, 6, 7, 9만 가능

// or

// 직사각형을 만들기 위해 필요한 블록의 위치만 알 수 있도록
// = 두 좌표의 끝점을 저장

const EMPTY = 0;
const BLACK_BLOCK = -1;

function solution(board) {
    const size = board.length;
    const { blocks, map } = init(board, size);
    let answer = 0;
    
    function dropBlackBlock() {
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (board[x][y] > EMPTY) {
                    break;
                };
                                
                board[x][y] = BLACK_BLOCK;
            }
        }
    }
    
    const removeBlock = () => {
        // 종료        
        if (map.size === 0) return;
        
        let isRemovedBlock = false;
        dropBlackBlock();
                
        map.forEach((val) => {
            const [blockId, y1, x1, y2, x2] = blocks[val];
            let extent = 0;
            
            for (let by = y1; by <= y2; by++) {
                for (let bx = x1; bx <= x2; bx++) {
                    const block = board[by][bx];
                    if (block === blockId || block === BLACK_BLOCK) {
                        extent++;
                    }
                }
            }
            
            if (extent === 6) {
                answer++;
                map.delete(blockId);
                isRemovedBlock = true;
                
                for (let by = y1; by <= y2; by++) {
                    for (let bx = x1; bx <= x2; bx++) {
                        board[by][bx] = EMPTY;
                    }
                }
            }
        })
                        
        // 제거할 수 있는 블록이 하나라도 존재한다면? 재귀
        if (isRemovedBlock) {
            removeBlock();
        }
    }
    
    removeBlock();
    
    return answer;
}

function init(board, size) {
    const blocks = [];
    const map = new Map();
    
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const blockId = board[y][x];
            
            if (blockId === EMPTY || map.has(blockId)) continue;
            
            const y1 = y;
            let y2 = y;
            let x1 = Infinity;
            let x2 = -1;
            
            for (let k = y1; k < size; k++) {
                // y축으로 검사
                if (!board[k].includes(blockId)) break;
                
                y2 = k;
                x1 = Math.min(x1, board[k].indexOf(blockId));
                x2 = Math.max(x1, board[k].lastIndexOf(blockId));
            }
            
            map.set(blockId, blocks.length);
            blocks.push([blockId, y1, x1, y2, x2]);
        }
    }
    
    return { blocks, map };
}