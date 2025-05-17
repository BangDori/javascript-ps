const MAX = 9_999_999;

const prime_list = Array(MAX + 1).fill(true);

prime_list[0] = false;
prime_list[1] = false;
for (let i = 2; i <= Math.sqrt(MAX); i++) {
    if (prime_list[i]) {
        for (let j = i * i; j <= MAX; j += i) {
            prime_list[j] = false;
        }
    }
}

function solution(numbers) {
    var answer = 0;
    
    const numbers_list = numbers.split("");
    const prime_numbers = new Set();
    
    for (let r = 1; r <= numbers_list.length; r++) {
        const permutation = getPermutation(numbers_list, r);
        
        permutation.map(nums => {
            const number = Number(nums.join(""));
            
            // 고유한 값들에 대해 prime_numbers에 추가하기
            if (prime_list[number]) {
                prime_numbers.add(number);
            }
        });
    }
    
    return prime_numbers.size;
}

function getPermutation(array, r) {
    const result = [];
    
    const swap = (i, j) => [array[i], array[j]] = [array[j], array[i]];
    const permutation = (start, n, selected = []) => {
        if (selected.length === r) {
            return result.push([...selected]);
        }
        
        for (let i = start; i < n; i++) {
            swap(start, i);
            selected.push(array[start]);
            permutation(start+1, n, selected);
            selected.pop();
            swap(start, i);
        }
    }
    
    permutation(0, array.length);
    
    return result;
}