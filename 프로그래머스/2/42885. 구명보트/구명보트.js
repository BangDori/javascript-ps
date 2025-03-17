// 구명보트 "최대 2명 탑승"
// 무게 제한 이하만 탑승 가능
// PS: "최대한 적게" 사용하여 모든 사람을 구출하려고 할 때, 필요한 횟수

// 역순 정렬 후
// 작은 사람을 기준으로 큰 사람의 포인터를 계속 오른쪽으로 이동해나가며 비교
// 이 과정에서 큰 사람과 작은 사람의 합이 limit을 초과한다면, 큰 사람은 결국 혼자 가야하는 사람이니까
// 빼면서 이동
    

function solution(people, limit) {
    let answer = 0;
    
    const rPeople = people.sort((a, b) => b-a);
    let left = 0, right = rPeople.length-1;
    
    while (left <= right) {
        const total = rPeople[left] + rPeople[right];
        
        if (total > limit) {
            left++;
        } else {
            left++;
            right--;
        }
        
        answer++;
    }
        
    return answer;
}

// [40, 40, 40, 40, 40, 1], 41 => 5 
// [40, 39, 38, 37, 36, 4], 40 => 5

// [40, 40, 40, 40, 40, 4, 3, 2, 1], 40 => 7

// 모든 사람이 혼자 타야하는 경우
// [40, 40, 40, 40], 79 => 4

// 모든 사람이 2명씩 타서 가는 경우
// [40, 40, 40, 40], 80 => 2