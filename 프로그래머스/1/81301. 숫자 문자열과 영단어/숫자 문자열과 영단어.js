const nums = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
};

function solution(s) {
    let answer = '';    
    let currString = '';
    
    for (const alpha of s) {
        if (alpha >= '0' && alpha <= '9') {
            answer += alpha;
            continue;
        }
        
        currString += alpha;
        
        if (nums[currString] !== undefined) {
            answer += nums[currString];
            currString = '';
        }
    }
    
    return parseInt(answer, 10);
}

// 동일한 영어가 2개 이상 나오는 경우
// 4zero4zero -> 440
// 44zerozero -> 4400

// 동일한 영어만 나오는 경우
// oneoneoneone -> 1111

// 하나도 나오지 않는 경우
// 1234 -> 1234

// 전부 나오는 경우
// onetwothreefourfivesixseveneightnine -> 123456789
// onetwothreefourfivesixseveneightninezero -> 1234567890


// 현재 시간 복잡도: n^2
// 만약 s의 길이가 10,000이 넘는다면?