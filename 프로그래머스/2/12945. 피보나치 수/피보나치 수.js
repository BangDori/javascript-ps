const MOD = 1_234_567;

function solution(n) {
    const dp = Array(n+1).fill(0);
    
    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 1;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = (dp[i-1] + dp[i-2]) % MOD;
    }
    
    return dp[n];
}