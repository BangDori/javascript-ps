// A보다 큰 애가 있다면?

function lowerbound(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return right;
}

function solution(A, B) {
    var answer = 0;
    
    A.sort((a, b) => b - a);
    B.sort((a, b) => b - a);
        
    for (let i = 0; i < A.length; i++) {
        if (A[i] < B[answer]) {
            answer++;
        }
    }
    
    return answer;
}