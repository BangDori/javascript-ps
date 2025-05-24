// 10:08 ~ 

// m * n 격자
// 집 -> 학교

// 일부 지역이 물에 잠겨있음
// 집 = (1, 1), 학교 = (m, n)

// 집 -> 학교로 갈 수 있는 최단경로의 수

// 오른쪽과 아래쪽으로만 이동
// (x, y) = (x-1, y) + (x, y-1)

const PUDDLE = -1;
const MOD = 1_000_000_007;

function solution(m, n, puddles) {
    const dp = Array.from({ length: n+1 }, () => Array(m+1).fill(0));
    
    for (const [x, y] of puddles) {
        dp[y][x] = -1;
    }
    
    dp[1][1] = 1;
    for (let y = 1; y <= n; y++) {
        for (let x = 1; x <= m; x++) {
            if (dp[y][x] === PUDDLE || ((y === 1) && (x === 1))) continue;
            if (dp[y][x-1] === PUDDLE) {
                dp[y][x] = dp[y-1][x] % MOD;
            } else if (dp[y-1][x] === PUDDLE) {
                dp[y][x] = dp[y][x-1] % MOD;
            } else {
                dp[y][x] = (dp[y-1][x] + dp[y][x-1]) % MOD;
            }
        }
    }
    
    return dp[n][m];
}