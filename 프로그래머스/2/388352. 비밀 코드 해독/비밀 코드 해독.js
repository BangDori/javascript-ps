// 10:25 ~ 10:37

// 1부터 n까지의 서로 다른 정소 5개 오름차순으로 정렬된 비밀 코드
// 비밀 코드 맞추기

// m 번의 시도

function getCombinations(arr, r) {
    const result = [];
    
    const combination = (start, selected = []) => {
        if (r === selected.length) {
            return result.push([...selected]);
        }
        
        for (let i = start; i < arr.length; i++) {
            selected.push(arr[i]);
            combination(i+1, selected);
            selected.pop();
        }
    }
    
    combination(0);
    return result;
}

function solution(n, q, ans) {
    let comb = getCombinations(Array.from({ length: n }, (_, k) => k + 1), 5);
    
    for (let i = 0; i < q.length; i++) {
        const queries = q[i];
        const existCount = ans[i];
        
        comb = comb.filter((numbers) => {
            let count = 0;
            
            for (const query of queries) {
                if (numbers.includes(query)) {
                    count++;                    
                }
            }
            
            return count === existCount;
        })
    }

    return comb.length;
}

// [
//  [1, 2, 3, 4, 5],        2
//  [6, 7, 8, 9, 10],       3
//  [3, 7, 8, 9, 10],       4
//  [2, 5, 7, 9, 10],       3
//  [3, 4, 5, 6, 7]         3
// ]