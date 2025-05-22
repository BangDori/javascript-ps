function getBinary(s) {
    let number = parseInt(s, 10);
    const binary = [];
    
    while (number > 1) {
        binary.push(number % 2);
        number = Math.floor(number / 2);
    }
    
    if (number >= 1) binary.push(1);
    
    return binary.reverse();
}

function solution(s) {
    // 이진 변환의 횟수, 변환 과정에서 제거된 모든 0의 개수
    var answer = [0, 0];
    let original = s.split("").map(Number);
    
    do {
        const binary = original.filter(Boolean);
        const diff = original.length - binary.length;

        answer[0]++;
        answer[1] += diff;
        
        original = getBinary(binary.length);
    } while (original.length !== 1 || original[0] !== 1)
    
    return answer;
}