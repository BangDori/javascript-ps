function solution(progresses, speeds) {
    let remains = progresses.map((progress) => 100 - progress);
    
    const answer = [];
    let successCount = 0;
    
    let day = 0;
    while (successCount < progresses.length) {
        day += 1;
        
        for (let i = successCount; i < remains.length; i++) {
            remains[i] -= speeds[i];
        }
        
        if (remains[successCount] > 0) continue;
        
        let successCountByDay = 1;

        for (let i = successCount+1; i < remains.length; i++) {
            if (remains[i] > 0) break;
            successCountByDay++;
        }
        
        answer.push(successCountByDay);
        successCount += successCountByDay;
        
        console.info(day, successCount, remains)
    }
    
    return answer;
}