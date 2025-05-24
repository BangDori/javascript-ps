// 10:02 ~ 

// 모든 사람이 심사를 받는데 걸리는 시간을 "최소"로

// 1 <= 입국심사를 기다리는 사람 <= 1,000,000,000
// 1 <= 한 명을 심사하는데 걸리는 시간 <= 1,000,000,000
// 1 <= 심사관 <= 100,000

// 비어있는 심사대로 이동?

// 현재 시간이 n일 때, 몇명의 입국 심사를 하였는지를 확인
// 시간 binary search로

function solution(n, times) {
    let left = 1n, right = BigInt(1e18 + 1);
    
    while (left < right) {
        const currTime = (left + right) / 2n;
        let completed = 0n;
        
        for (const time of times) {
            completed += currTime / BigInt(time);
        }
        
        if (completed >= n) {
            right = currTime;
        } else {
            left = currTime + 1n;
        }
    }
    
    return right;
}