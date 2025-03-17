function solution(numbers) {
    const answer = [];
    const uniqueArray = new Set();
    
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i+1; j < numbers.length; j++) {
            uniqueArray.add(numbers[i] + numbers[j])
        }
    }
    
    for (const num of uniqueArray) {
        answer.push(num);
    }
    
    answer.sort((a, b) => a-b);
        
    return answer;
}