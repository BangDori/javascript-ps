function solution(s) {
    var answer = [];
    const dict = new Map();
    
    for (let i = 0; i < s.length; i++) {
        if (!dict.has(s[i])) {
            dict.set(s[i], i);
            answer.push(-1);
        } else {
            answer.push(i - dict.get(s[i]));
            dict.set(s[i], i);
        }
    }
    
    return answer;
}