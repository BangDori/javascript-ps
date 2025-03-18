// 오름차순 정렬된 수열, "조건을 만족하는 부분 수열" 찾기

// 1. 기존 수열에서 "임의의 두 인덱스의 원소와 그 사이의 원소를 모두 포함"하는 부분 수열
// 2. 부분 수열의 합 = k
// 3. 합이 k인 부분 수열이 여러 개인 경우, "길이가 가장 짧은 수열"
// 4. 길이가 짧은 수열이 여러 개인 경우, "앞쪽(시작 인덱스가 작은)"에 나온 수열 -> 정렬

// 이 문제도 부분합 문제.
// O(N)?

function solution(sequence, k) {
    var answer = [];
    const acc = new Array(sequence.length+1).fill(0);
    
    for (let i = 0; i < sequence.length; i++) {
        acc[i+1] = acc[i]+sequence[i];
    }
    
    let left = 0;
    let right = 1;
    
    while (left <= right) {
        const group = acc[right] - acc[left];
        
        if (group < k) {
            right++;
        } else {
            if (group === k) {
                answer.push([left, right-1]);
            }
            left++;
        }
    }
    
    answer.sort((a, b) => {
        const aLen = a[1]-a[0];
        const bLen = b[1]-b[0];
        
        if (aLen !== bLen) {
            return aLen - bLen;
        }
        
        return a[0] - b[0];
    })
    
    
    return answer[0];
}

// 1. Acc = [0, 1, 3, 6, 10, 15]
// 2. left(0), right(1)
//   2-1. left ~ right 구간합을 더해서 비교
//   2-2. 만약 구간합이 k 보다 작다? right 이동
//   2-3. 구간합이 k보다 크거나 같은 경우 => answerList에 [left, right]
//   2-4. 구간합이 k보다 크다 => left 이동

// 3. answerList 정렬
//    3-1. 길이순 정렬
//    3-2. 시작 인덱스 기준 정렬

// 4. answer[0]

// [1, 1, 1, 2, 3, 4, 5]
// [0, 1, 2, 3, 5, 8, 12, 17]
// left(0), right(1) = acc[right] - acc[left]
// answerList = [[0, 3], [3, 4], [6, 6]]

// answerList를 렝스를 기준으로 정렬
// answerList
// answerList = [[6, 6], [3, 4], [0, 3]]
// 
// return answerList[0];

// 1 -> (0, 2)
// 2 -> (0, 3)
// 3 -> (0, 4)
// 5 -> (1, 4)
// 4 -> (1, 5)
// 7 -> (2, 5)
// 6 -> (3, 5)
// 5 -> (4, 5)
// 3 -> (4, 6)
// 7 -> (5, 6)
// 4 -> (5, 7)
// 9 -> (6, 7)
// 5