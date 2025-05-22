function solution(n) {
    let answer = 0;
    
    let ltr = 1, rtr = 1;
    let curr = 0;
    
    while (rtr <= n) {
        if (curr + rtr <= n) {
            curr += rtr;
            rtr++;
        } else {
            curr -= ltr;
            ltr++;
        }
        
        if (curr === n) {
            answer++;
        }
    }
    
    return answer;
}