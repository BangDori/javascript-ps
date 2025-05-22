function getLength(num) {
    return num.toString(2).split("").filter(n => n === "1").length;
}

function solution(n) {
    let answer = 0;
    
    const originalOneLength = getLength(n);
    let curr = n + 1;
    
    while (true) {
        const currOneLength = getLength(curr);
        
        if (originalOneLength === currOneLength) {
            answer = curr;
            break;
        }
        
        curr++;
    }
        
    return answer;
}