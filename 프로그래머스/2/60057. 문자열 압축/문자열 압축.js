function solution(s) {
    let answer = s.length;
    const MAX_COMPARISION = Math.floor(s.length / 2);
    
    for (let i = 1; i <= MAX_COMPARISION; i++) {
        let str = '', count = 1;
        let comparision = s.substring(0, i); // 초기 비교 대상 설정
        
        for (let j = i; j < s.length; j+=i) {
            const sliced = s.substring(j, j+i);
                        
            if (comparision === sliced) {
                count++;
            } else {
                str += count === 1 ? comparision : `${count}${comparision}`;
                
                comparision = sliced;
                count = 1;
            }
        }
        
        str += count === 1 ? comparision : `${count}${comparision}`;        
        answer = answer > str.length ? str.length : answer;
    }
    
    return answer;
}