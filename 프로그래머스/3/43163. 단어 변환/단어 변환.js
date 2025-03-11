function checkDiff(a, b) {
    let diffCount = 0;
    
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) diffCount++;
    }
    
    if (diffCount === 1) {
        return true;
    }
    
    return false;
}

function solution(begin, target, words) {
    const visited = new Array(words.length).fill(false);
    let answer = words.length;
    
    function dfs(currBegin, step) {
        if (answer <= step) return;
        
        if (currBegin === target) {
            answer = Math.min(answer, step);
            return;
        }

        for (let i = 0; i < words.length; i++) {
            if (!visited[i] && checkDiff(currBegin, words[i])) {
                visited[i] = true;
                dfs(words[i], step+1);
                visited[i] = false;
            }
        }
        
        return;
    }
    
    dfs(begin, 0);
    if (answer >= words.length) return 0;
        
    return answer;
}