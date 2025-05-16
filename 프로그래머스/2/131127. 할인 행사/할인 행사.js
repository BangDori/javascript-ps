// 1 <= want 길이 (N) <= 10
// 1 <= number[i] <= 10

// 10 <= discount.length (M) <= 100,000

function solution(want, number, discount) {
    let answer = 0;
    
    const size = want.length;
    const productIdMap = new Map();
    
    for (let i = 0; i < size; i++) {
        productIdMap.set(want[i], i);
    }
    
    const products = Array.from({ length: discount.length + 1 }, () => Array(size).fill(0));
    
    // O(N * M)
    for (let i = 1; i <= discount.length; i++) {
        const productId = productIdMap.get(discount[i-1]);
        
        for (let k = 0; k < size; k++) {
            if (k === productId) products[i][k] = products[i-1][k] + 1;
            else products[i][k] = products[i-1][k];
        }
    }
    
    // O(N * M)
    for (let day = 10; day <= discount.length; day++) {
        let isCompleted = true;
        
        for (let id = 0; id < size; id++) {
            if (products[day][id] - products[day-10][id] !== number[id]) {
                isCompleted = false;
            }
        }
        
        if (isCompleted) answer++;
    }
    
    return answer;
}