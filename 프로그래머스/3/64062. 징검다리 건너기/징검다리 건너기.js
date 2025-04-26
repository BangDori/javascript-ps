// 10:00 ~ 

// 징검다리, 디딤돌(숫자)
// 디딤돌을 밟을 때 마다 -1
// 디딤돌 = 0, 더 이상 밟을 수 없음
// 가장 가까운 디딤돌로 건너뛰기

// k는 최대 점프 횟수

// 1 <= stones <= 200,000

// nlogn 이하로 해결

// [위치, 숫자]로 저장
// 위치 -> 다음 위치가 3보다 커지면 out

function solution(stones, k) {
    
    // 이분 탐색
    // 이동거리가 1 ~ 200,000,000
    let answer = 0;
    let left = 1, right = 200000000;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        let count = 0;
        
        for (const stone of stones) {
            if (stone <= mid) count++;
            else count = 0;
            
            if (count >= k) break;
        }
        
        // console.info(left, right, mid, count);
        
        if (count < k) left = mid + 1;
        else {
            answer = mid;
            right = mid - 1;
        }
    }

    return answer;
}


// 원점을 기준으로 점프할 수 없는 경우
// 1 1 1 2, 3
// 1

// 중간중간이 비는 경우
// 1 2 1 2 3 1 2 1 2 3, 9
// 3명
