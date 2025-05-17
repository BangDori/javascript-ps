// 2 <= dice의 길이 (n) <= 10
// n은 2의 배수
// dice[i] = i + 1번 주사위에 쓰인 6개의 수
// dice[i]의 길이 = 6

// 결국 주사위를 모두 던져보는 수 밖에 없나

// 주사위를 던졌을 때 나오는 주사위의 합으로 계산

// n = 10

// max = n C n/2

function solution(dice) {
    let answer = [];
    let maxCount = 0;
    
    // 주사위 뽑기
    const indexs = Array.from({ length: dice.length }, (_, i) => i);
    const selected_dices = getCombinations(indexs, dice.length / 2);
    
    let current = 0;
    
    // 뽑은 주사위들로 합을 구하기
    for (let i = 0; i < selected_dices.length / 2; i++) {
        const a_dices = selected_dices[i];
        const b_dices = selected_dices[selected_dices.length - (i+1)];
        
        // Max = 6 C 1 * 5
        const dices_table_a = calculateDiceTable(dice, a_dices);
        const dices_table_b = calculateDiceTable(dice, b_dices);
                
        const [win, draw, lose] = compareDicesTable(dices_table_a, dices_table_b);
        
        if (maxCount < win) {
            answer = a_dices;
            maxCount = win;
        } 
        
        if (maxCount < lose) {
            answer = b_dices;
            maxCount = lose;
        }
    }

    return answer.map(i => i+1);
}

function getCombinations(arr, r) {
    const result = [];
    
    const combinations = (start, n, selected = []) => {
        if (r === selected.length) {
            return result.push([...selected]);
        }
        
        for (let i = start; i < n; i++) {
            selected.push(i);
            combinations(i+1, n, selected);
            selected.pop();
        }
    }
    combinations(0, arr.length);
    
    return result;
}

function calculateDiceTable(dice, selected_dices) {
    const total = [];
    
    const getDicesSum = (start, sum) => {
        if (start === selected_dices.length) {
            return total.push(sum);
        }
        
        for (let i = 0; i < 6; i++) {
            getDicesSum(start + 1, sum + dice[selected_dices[start]][i]);
        }
    }
    
    getDicesSum(0, 0);
    total.sort((a, b) => a - b);
    return total;
}

// O(N log N)으로 비교
function compareDicesTable(dices_table_a, dices_table_b) {
    const total_count = dices_table_a.length;
    let [win, draw, lose] = [0, 0, 0];
    
    for (let i = 0; i < total_count; i++) {
        const diceA = dices_table_a[i];
        
        const lower = lowerbound(dices_table_b, diceA);
        const upper = upperbound(dices_table_b, diceA);
        
        const dCnt = upper - lower;
        const lCnt = total_count - upper;
        const wCnt = total_count - (dCnt + lCnt);
        
        win += wCnt;
        draw += dCnt;
        lose += lCnt;
    }
    
    return [win, draw, lose];
}

function lowerbound(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return right;
}
    
function upperbound(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] > target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return right;    
}