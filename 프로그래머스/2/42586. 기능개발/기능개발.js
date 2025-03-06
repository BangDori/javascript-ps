function solution(progresses, speeds) {
    let remains = progresses.map((progress, idx) => Math.ceil((100 - progress) / speeds[idx])).reverse();
        
    const answer = [];
    let day = 0;
    
    while (remains.length > 0) {
        day = remains[remains.length - 1];
        let count = 0;
        
        do {
            remains.pop();
            count += 1;
        } while (remains[remains.length - 1] <= day)
        
        answer.push(count);
    }
        
    return answer;
}