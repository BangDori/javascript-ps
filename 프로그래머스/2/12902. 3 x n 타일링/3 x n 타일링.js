const MOD = 1_000_000_007;

function solution(n) {
    const dp = Array(n+1).fill(0n);
    
    dp[0] = 1n;
    dp[2] = 3n;
    
    for (let i = 4; i <= n; i += 2) {
        dp[i] = dp[i - 2] * 4n - dp[i - 4];
    }
    
    return dp[n] % BigInt(MOD);
}