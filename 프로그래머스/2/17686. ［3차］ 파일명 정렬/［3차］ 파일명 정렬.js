// "파일명에 포함된 숫자를 반영한 정렬 기능"을 저장소 관리 프로그램에 구현
// 파일명 <= 100
// 영문 대소문자, 숫자, 공백(" "), 마침표("."), 빼기 부호("-")
// 영문자로 시작, 숫자 하나 이상 포함

// 파일명 = HEAD + NUMBER + TAIL
//
// HEAD = 문자 (최소 한 글자 이상)
// NUMBER = 숫자 문자열 (1 <= NUMBERS.length <= 5, 0시작 가능)
// TAIL = 나머지 부분 (숫자가 나타날 수도 있으며, 아무 글자도 없을 수도 있음)

// 첫 번째로, HEAD를 사전 순 정렬
//        1. 대소문자 구분하지 않는다
//        2. 대소문자 차이 외에는 같을 경우, NUMBER의 숫자 순으로 정렬  (숫자 문자열은 숫자값으로 정렬)
//        3. 1, 2가 동일한 경우, 원래 입력에 주어진 순서 유지

function getDetailFiles(files) {
    return files.map((file) => {
        // HEAD / NUMBER / TAIL 분리
        let head = '';
        let number = '';
        let tail = '';
        
        for (const alpha of file) {
            // alpha가 숫자이며, tail에 하나도 추가되지 않았다면?
            if (alpha >= '0' && alpha <= '9' && tail.length === 0) {
                number += alpha; // NUMBER 추가
            } else {
                // 만약 number가 0보다 크다면? number가 종료된 거
                if (number.length > 0) {
                    tail += alpha;
                    continue;
                }
                head += alpha; // HEAD 추가
            }
        }
        
        return [head, number, tail];
    });
}

function solution(files) {
    var answer = getDetailFiles(files);
    answer.sort((aFile, bFile) => {
        const [aHead, aNumber, aTail] = aFile;
        const [bHead, bNumber, bTail] = bFile;    

        // 1. 대소문자를 구분하지 않고, 사전 순 정렬
        if (aHead.toLowerCase() !== bHead.toLowerCase()) {
            return aHead.toLowerCase().localeCompare(bHead.toLowerCase());
        }
        
        // 2. NUMBER의 숫자 순으로 정렬  (숫자 문자열은 숫자값으로 정렬)
        if (parseInt(aNumber, 10) !== parseInt(bNumber, 10)) {
            return parseInt(aNumber, 10) - parseInt(bNumber, 10);
        }
        
        // 3. 원래 입력에 주어진 순서 유지
    });
    
    for (let i = 0; i < answer.length; i++) {
        answer[i] = answer[i].join("");
    }
    
    return answer;
}