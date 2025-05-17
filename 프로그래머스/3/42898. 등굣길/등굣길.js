const MOD = 1_000_000_007;

function solution(m, n, puddles) {    
    const dp = Array.from({ length: n+1 }, () => Array(m+1).fill(0));
    
    dp[1][1] = 1;
    for (const [x, y] of puddles) {
        dp[y][x] = -1;
    }
    
    for (let y = 1; y <= n; y++) {
        for (let x = 1; x <= m; x++) {
            if (y === 1 && x === 1) continue;
            if (dp[y][x] === -1) continue;
            
            if (y-1 >= 1 && dp[y-1][x] !== -1) {
                dp[y][x] = (dp[y][x] + dp[y-1][x]) % MOD;
            } 
            if (x-1 >= 1 && dp[y][x-1] !== -1) {
                dp[y][x] = (dp[y][x] + dp[y][x-1]) % MOD;
            }
        }
    }
    
    return dp[n][m];
}