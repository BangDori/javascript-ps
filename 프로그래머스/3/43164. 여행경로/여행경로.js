// ICN 공항에서 출발
// 항공권 정보가 담긴 2차원 배열 (tickets)

// 방문하는 공항 경로를 배열에 담아 return

// 3 <= 공항의 수 <= 10,000
// tickets = [a, b] = a -> b
// 항공곤 모두 사용

// ICN -> JFK
// JFK -> HND
// HND -> IAD

// ICN -> ATL
// ATL -> ICN
// ICN -> SFO
// SFO -> ATL
// ATL -> SFO

// 가능한 모든 경로를 고려해야함
// 이 중 오름차순으로 가능한 경우의 수를 뽑아야 한다.
// = 백트래킹

function solution(tickets) {
    var answer = [];
    let count = 0;
    
    const starts = new Set();
    const graph = {};
        
    for (let i = 0; i < tickets.length; i++) {
        const [src, dest] = tickets[i];
        
        starts.add(src);
        
        if (graph[src]) {
            graph[src].push([dest, i]);
        } else {
            graph[src] = [[dest, i]];
        }
    }
        
    for (const start of starts) {
        graph[start].sort((a, b) => a[0].localeCompare(b[0]));
    }
        
    const used = Array(tickets.length).fill(false);
          
    const dfs = (curr, selected = ["ICN"]) => {
        if (selected.length === tickets.length + 1) {
            return answer.push([...selected]);
        }
        
        if (!graph[curr]) return;
        
        for (const [next, ticketId] of graph[curr]) {
            if (!used[ticketId]) {
                used[ticketId] = true;
                selected.push(next);
                dfs(next, selected);
                selected.pop();
                used[ticketId] = false;
            }
        }
    }
    
    
    dfs("ICN");
    
    return answer[0];
}