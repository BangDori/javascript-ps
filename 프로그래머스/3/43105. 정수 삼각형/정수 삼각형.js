// 7
// 3 8
// 8 1 0
// 2 7 4 4
// 4 5 2 6 5

// dp[1][0] = dp[0][0] + triangle[1][0]
// dp[1][1] = dp[0][0] + triangle[1][1]

// dp[2][0] = dp[1][0] + triangle[2][0]
// dp[2][1] = Math.max(dp[1][0] + triangle[2][1], dp[1][1] + triangle[2][1]);

// 7
// 10 15
// 18 16 15
// 20 25 

function solution(triangle) {    
    const dp = Array.from({ length: triangle.length }, () => Array(triangle.length).fill(0));
    
    dp[0][0] = triangle[0][0];
    
    for (let floor = 1; floor < triangle.length; floor++) {
        for (let col = 0; col <= floor; col++) {
            if (col === 0) dp[floor][col] = dp[floor-1][col] + triangle[floor][col];
            else if (col === floor) dp[floor][col] = dp[floor-1][col-1] + triangle[floor][col];
            else {
                dp[floor][col] = Math.max(dp[floor-1][col-1], dp[floor-1][col]) + triangle[floor][col];
            }
        }
    }
    
    return Math.max(...dp[triangle.length-1]);
}