function solution(number, k) {
    let answer = '';
    const stack = [];
    let removeCount = 0;
    
    for (const num of number) {
        while (removeCount < k
               && stack.length > 0
               && stack[stack.length-1] < num
        ) {
            stack.pop();
            removeCount++;
        }
        
        stack.push(num);
    }
    
    answer = stack.slice(0, number.length - k).join("");
    return answer;
}

// 길이를 맞춰줘야 해.