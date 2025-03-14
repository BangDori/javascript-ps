function solution(n, lost, reserve) {
    let answer = 0;
    const studentsMap = new Map();

    for (let i = 1; i <= n; i++) {
        let count = 1;
        
        if (reserve.includes(i)) count += 1; // 체육복 여벌이 있는 경우
        if (lost.includes(i)) count -= 1; // 여벌이 없거나, 도난을 당한 경우
        
        studentsMap.set(i, count);
    }
    
    for (let i = 1; i <= n; i++) {
        const count = studentsMap.get(i);
        
        if (count <= 1) continue;
        
        const prev = i - 1;
        const next = i + 1;
        if (studentsMap.get(prev) === 0) {
            studentsMap.set(prev, 1);
            studentsMap.set(i, 1);
        } else if (studentsMap.get(next) === 0) {
            studentsMap.set(next, 1);
            studentsMap.set(i, 1);
        }
    }
    
    for (const [student, count] of studentsMap) {
        if (count >= 1) answer += 1;
    }
                  
    return answer;
}

