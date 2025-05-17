const MAX_TIME = BigInt(1e18) + 1n;

function solution(n, times) {
    let left = 1n, right = MAX_TIME;
    
    while (left < right) {
        const mid = (left + right) / 2n;
        
        let total_count = 0n;
        
        for (const time of times) {
            total_count += (mid / BigInt(time));
        }
        
        if (total_count >= BigInt(n)) {
            right = mid;
        } else {
            left = mid + 1n;
        }
    }

    return Number(right);
}