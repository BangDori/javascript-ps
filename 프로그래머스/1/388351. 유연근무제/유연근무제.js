// 09:56 ~ 10:25

// 일주일간 자신이 설정한 시간 + 10분까지 어플로 출근
// 토, 일 X

// 직원 n 명이 설정한 출근 희망 시각 = schedules
// 직원들이 일주일동한 출근한 시각을 담은 2차원 배열 = timelogs
// 이벤트를 시작한 요일을 의미하는 정수 = startday

const WEEKS = 7;
const SAT = 6;
const SUN = 0;
const EXTRA_TIME = 10;

function solution(schedules, timelogs, startday) {
    let answer = 0;

    const newSchedules = schedules.map((schedule) => convertDecimal(schedule));
    const newTimelogs = timelogs.map((timelog) => {
        return timelog.map((time) => convertDecimal(time));
    });
    
    const maxday = startday + WEEKS;
    
    for (let uid = 0; uid < schedules.length; uid++) {
        const schedule = newSchedules[uid];
        const timelog = newTimelogs[uid];
        
        let currentday = startday % WEEKS;
        let flag = true;
        
        for (const time of timelog) {
            if (currentday !== SAT && currentday !== SUN) {
                if (time > schedule + EXTRA_TIME) {
                    flag = false;
                    break;
                }                
            }
            
            currentday = (currentday + 1) % WEEKS;
        }
        
        if (flag) answer++;
    }

    
    return answer;
}

// 날짜를 10진수로 변환하는 메서드
// ex) 10:32 -> 632
function convertDecimal(time) {
    return Math.floor(time / 100) * 60 + (time % 100);
}