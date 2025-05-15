// 불량 사용자
// 아이디 중 일부 문자 *로 가리기

// 불량 사용자 목록에 매핑된 응모자 아아디 = 제재 아이디

// 당첨에서 제외되어야 할 제재 아이디 목록은 몇가지 경우의 수가 가능한 지

// 콤비네이션 방식으로 뽑을 수 있지 않나?

function solution(user_id, banned_id) {    
    const banned_list = [];
    const visited = Array(user_id.length).fill(false);
    
    // r = banned_id.length
    const combinations = (find, n, r, selected = []) => {
        // r === selected.length와 동일한 경우 selected를 banned_list에 삽입
        if (find === r) {
            return banned_list.push([...selected]);
        }
        
        // 반복하면서, banned_id 목록과 매핑되는 애를 집어넣기
        for (let i = 0; i < n; i++) {
            if (visited[i]) continue;
            
            const id = banned_id[find];
            
            if (user_id[i].length !== id.length) continue;

            let isBanned = true;

            for (let k = 0; k < id.length; k++) {
                if (!(user_id[i][k] === id[k] || id[k] === "*")) {
                    isBanned = false;
                    break;
                }
            }

            if (isBanned) {
                visited[i] = true;
                selected.push(user_id[i]);
                combinations(find+1, n, r, selected);
                selected.pop();
                visited[i] = false;
            }
        }
    }
    
    combinations(0, user_id.length, banned_id.length);
    banned_list.forEach(k => k.sort());
    
    const answer = new Set();
    
    for (const banned of banned_list) {
        answer.add(banned.join(" "));
    }

    return answer.size;
}