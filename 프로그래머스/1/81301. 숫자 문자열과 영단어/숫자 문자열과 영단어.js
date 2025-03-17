const numbersEng = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function solution(s) {
    var answer = 0;
        
    let convertedS = s;
    for (let i = 0; i <= 9; i++) {
        if (convertedS.includes(numbersEng[i])) {
            convertedS = convertedS.replaceAll(numbersEng[i], String(numbers[i]));
        }
    }

    answer = parseInt(convertedS, 10);
        
    return answer;
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