// 게임 이용자 m명 증가 => 서버 1대 증설
// 특정 시간대 이용자 m명 미만 => 서버 증설 X

// 특정 시간대 n * m명 이상 ~ (n+1) * m => 최소 n대 증설

// 한 번 증설한 서버는 k시간 동안 운영
// => 그 이후 반납

// k = 5일때, 10시에 서버 증설 => 10 ~ 15시에만 운영

// 최소 증설 횟수

function solution(players, m, k) {
    let answer = 0; // 증설 횟수
    const servers = Array(24).fill(0); // 증설된 서버의 수
    
    // 시간대 확인
    for (let i = 0; i < players.length; i++) {
        // 일단 현재 서버가 견딜 수 있는 수
        const enabledUsers = servers[i] * m;
        const extraUsers = players[i] - enabledUsers;

        if (players[i] >= (servers[i] + 1) * m) {
            const require = Math.floor(players[i] / m) - servers[i];
            answer += require;
            
            for (let j = i; j < i + k; j++) {
                servers[j] += require;
            }
        }
    }
    
    
    return answer;
}