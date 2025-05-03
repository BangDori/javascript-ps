// 유저는 한 번에 한 명의 유저 신고
// 신고 횟수 제한 X

// k번 이상 신고된 유저는 처리 대상
// 몇 번 신고되었는지 확인 필요 -> map O(1)

// 처리 결과를 받아야 한다.
// -> 누가 누구를 신고했는지를 알아야 함
// -> 다음과 같이 정리를 한다고 가정하면? O(report) // report번 반복
// muzi = [frodo, neo]
// frodo = [neo]
// apeach = [frodo, muzi]
// neo = []

// O(report)번을 다시 반복하면서? 처리 횟수를 계산
// -> O(2*report)


// 2 <= id_list <= 1,000
// 1 <= report <= 200,000

function solution(id_list, report, k) {
    var answer = [];
    
    const uniqueReports = new Set(report);
    const users = {};
    const reportCountMap = new Map();
    
    for (const report of uniqueReports) {
        // userA가 userB를 신고
        const [userA, userB] = report.split(" ");
        
        // 중복 신고 검증 로직 필요
        updateReportCount(reportCountMap, userB); // 신고 횟수 갱신
        updateReportTable(users, userA, userB); // 신고 테이블 업데이트
    }
    
    for (const id of id_list) {
        let sendCount = 0;
        
        // 신고한 유저가 없는 경우라면?
        if (!users[id]) {
            answer.push(0);
            continue;
        }
        
        for (const reportId of users[id]) {
            if (reportCountMap.get(reportId) >= k) {
                sendCount += 1;
            }
        }
        
        answer.push(sendCount);
    }
    
    return answer;
}

function updateReportCount(countMap, user) {
    if (countMap.has(user)) {
        countMap.set(user, countMap.get(user) + 1);
    } else {
        countMap.set(user, 1);
    }
}

function updateReportTable(users, userA, userB) {
    if (users[userA]) {
        users[userA] = [...users[userA], userB];
    } else {
        users[userA] = [userB];
    }
}