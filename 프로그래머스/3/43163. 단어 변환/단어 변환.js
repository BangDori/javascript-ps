// 23:53 ~ 00:41 (디버깅은 포기)

// begin -> target
// words

// begin -> target, "최소 몇 단계"만에 가능?

// 알파벳을 계속 하나씩 바꿔가면서 비교
// 깊이 우선 탐색으로 만들어야 함.
// 그리고, 만들었다면? 최소한의 경우를 찾아야하기 때문에 백트래킹으로 뒤로 돌아가면서 비교

function solution(begin, target, words) {
    if (!words.includes(target)) return 0;
    
    const visited = new Array(words.length).fill(false);
    var answer = 0;
    
    const dfs = (curr, pos, count) => {
        if (curr.join("") === target) {
            if (answer === 0) answer = count;
            else answer = Math.min(answer, count);
            return;
        }
        if(pos === words.length) return;

        // 단계를 거치지 않은 words가 되어야 한다.
        for (let i = 0; i < words.length; i++) {
            if (visited[i]) continue;
            const word = words[i];
            const diffCount = curr.reduce((acc, cur, i) => cur !== word[i] ? acc + 1 : acc, 0);
            if (diffCount !== 1) continue;
            
            for (let k = 0; k < target.length; k++) {
                if (curr[k] === word[k]) continue;
                
                let prev = curr[k];
                curr[k] = word[k];
                visited[i] = true;
                
                dfs(curr, pos+1, count+1);
                
                curr[k] = prev;
                visited[i] = false;
            }
        }
    }
    
    dfs([...begin], 0, 0);
    
    return answer;
}

// dfs
// 만약 현재와 동일하다면? answer을 최소로 비교하여 return
        
// 반복문을 통해, pos+1부터 탐색
// for (pos+1 ~ words.length 까지 탐색)
//      for (k로 curr 알파벳 길이만큼 반복)
//          curr[k] !== target[k]
//              curr[k] 번재 알파벳 위치를 변경하고
//              dfs(changedCurr[k], pos+1)
//              curr[k]를 다시 원복


// "hit" "TET"