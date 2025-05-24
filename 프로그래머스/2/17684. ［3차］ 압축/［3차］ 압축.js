// 10:15

// 메시지 압축
// 압축 전 정보를 완벽하게 복원 가능한 무손실 압축 알고리즘 구현

// 압축 알고리즘은 영문 대문자만 처리

// 1 <= msg <= 1,000

// 1. 길이가 1인 모든 단어를 포함하도록 사전 초기화
// 2. 사전에서 현재 입력과 일치하는 가장 긴 문자열 w 탐색
// 3. w에 해당하는 사전의 색인 번호 출력 및 입력에서 w 제거
// 4. 입력에서 처리되지 않은 다음 글자가 남아있다면(c), w+c에 해당하는 단어를 사전에 등록
// 5. 단계 2로 이동

// 종료 조건: 입력에서 처리되지 않은 다음 글자가 없는 경우

const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function solution(msg) {
    const answer = [];
    const dict = new Map();
    
    // 1
    for (let i = 0; i < alphabets.length; i++) {
        dict.set(alphabets[i], i+1);
    }
    
    const visited = Array(msg.length).fill(false);
    const mess = "1234";
    let nextId = 27;

    for (let i = 0; i < msg.length; i++) {
        if (visited[i]) continue;
        if (i === msg.length - 1) {
            answer.push(dict.get(msg[i]));
            break;
        }
        
        let curr = i + 1;
        
        // 2 사전에서 현재 입력과 일치하는 가장 긴 문자열 w 탐색
        while (curr <= msg.length + 1) {
            if (curr === msg.length + 1 || !dict.has(msg.substring(i, curr))) {
                // 3. w에 해당하는 사전의 색인 번호 출력 및 입력에서 w 제거
                const w = msg.substring(i, curr - 1);
                answer.push(dict.get(w));
                
                // 4. 입력에서 처리되지 않은 다음 글자가 남아있다면(c), w+c에 해당하는 단어를 사전에 등록
                const wc = msg.substring(i, curr);
                dict.set(wc, nextId++);
                
                break;
            }
            
            visited[curr-1] = true;
            curr++;
        }
    }

    return answer;
}