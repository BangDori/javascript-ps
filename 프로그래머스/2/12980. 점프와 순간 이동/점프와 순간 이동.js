function solution(n) {
    let answer = 1;
    
    while (n > 1) {
        if (n % 2 === 1) {
            n -= 1;
            answer++;
        }
        
        n /= 2;
    }

    return answer;
}