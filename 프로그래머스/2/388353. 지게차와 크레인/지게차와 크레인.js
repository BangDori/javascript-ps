// 10:37 ~ 11:04

// 세로 n, 가로 m
// n * m

// 알파벳 하나인 경우 접근 가능한 컨테이너만 꺼내기
// 알파벳이 두 번 반복되는 경우에는 요청된 종류의 모든 컨테이너 꺼내기

// storage 2차원 배열
// requests 1차원 배열

// 2차원 배열의 테두리를 생성한 이후에 접근 가능한 영역을 dfs로 확인하기

const BORDER = 1;
const EMPTY = "0";
const dirs = [[-1, 0], [1, 0], [0, 1], [0, -1]];

function solution(storage, requests) {
    const newStorage = remakeStorage(storage);
    
    for (const request of requests) {
        const alpha = request[0];
        const type = request.length;
        
        switch (type) {
            case BORDER:
                removeBfs(newStorage, alpha);
                break;
            default:
                removeAll(newStorage, alpha);
                break;
        }
    }
    
    const answer = getRemainContainerCount(newStorage);
    
    return answer;
}

function remakeStorage(storage) {
    const ySize = storage.length;
    const xSize = storage[0].length;
    
    const newStorage = Array.from({ length: storage.length + 2 }, () => []);
    const border = Array(xSize + 2).fill(EMPTY);
    
    newStorage[0] = border;
    newStorage[ySize+1] = border;
    for (let y = 0; y < ySize; y++) {
        const line = [EMPTY, ...storage[y].split(""), EMPTY];
        newStorage[y+1] = line;
    }
        
    return newStorage;
}

function removeBfs(storage, target) {
    const ySize = storage.length;
    const xSize = storage[0].length;
    
    const visited = Array.from({ length: ySize }, () => Array(xSize).fill(false));
    const queue = [];
    
    const removed = [];
    
    queue.push([0, 0]); // y, x
    visited[0][0] = true;
    
    while (queue.length) {
        const [y, x] = queue.pop();
        
        for (const [dy, dx] of dirs) {
            const ny = y + dy;
            const nx = x + dx;
            
            if (ny < 0 || ny >= ySize || nx < 0 || nx >= xSize) continue;
            if (visited[ny][nx]) continue;
            
            if (storage[ny][nx] === EMPTY) {
                visited[ny][nx] = true;
                queue.push([ny, nx]);
            }
            if (storage[ny][nx] === target && storage[y][x] === EMPTY) {
                visited[ny][nx] = true;
                removed.push([ny, nx]);
            }
        }
    }
    
    for (const [y, x] of removed) {
        storage[y][x] = EMPTY;
    }
}

function removeAll(storage, target) {
    for (let y = 1; y < storage.length - 1; y++) {
        for (let x = 1; x < storage[0].length - 1; x++) {
            if (storage[y][x] === target) {
                storage[y][x] = EMPTY;
            }
        }
    }
}

function getRemainContainerCount(storage) {
    let count = 0;
    
    for (let y = 1; y < storage.length - 1; y++) {
        for (let x = 1; x < storage[0].length - 1; x++) {
            if (storage[y][x] !== EMPTY) {
                count++;
            }
        }
    }
    
    return count;
}