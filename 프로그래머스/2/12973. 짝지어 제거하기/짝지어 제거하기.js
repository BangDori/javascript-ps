function solution(s) {
    let answer = 0;
    
    const stack = [];
    
    for (const char of s) {
        if (stack.length && stack[stack.length - 1] === char) {
            stack.pop();
        } else {
            stack.push(char);
        } 
    }
    
    if (stack.length === 0) {
        answer = 1;
    }

    return answer;
}