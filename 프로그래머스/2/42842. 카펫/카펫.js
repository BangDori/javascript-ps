function solution(brown, yellow) {
    var answer = [];
    
    const total = brown + yellow;
    
    // 2x + 2y - 4 = brown
    for (let brownX = 3; brownX < brown; brownX++) {
        const brownY = (brown + 4 - (2 * brownX)) / 2;
        
        if (brownX + brownY !== (brown + 4) / 2) continue;
        
        const yellowX = brownX - 2;
        const yellowY = brownY - 2;

        if (yellowX * yellowY === yellow) {
            answer = [brownX, brownY];
        }
    }
    
    return answer;
}