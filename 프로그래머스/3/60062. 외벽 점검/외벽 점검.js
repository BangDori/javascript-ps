function solution(n, weak, dist) {
    const len = weak.length;
    const linear_weak = new Array(len*2 - 1).fill(0);
  
    for(let i = 0; i < len*2-1; i++) {
        linear_weak[i] = weak[i % len];
        if (i >= len) linear_weak[i] += n;
    }
    
    dist.sort((a, b) => b - a);
    
    for (let need = 1; need <= dist.length; need++) {
        const permutation = getPermutation(dist, need);
        
        console.log(permutation);
        
        for (const people of permutation) {
            for (let j = 0; j < len; j++) {
                // 처리해야 할 작업량
                let tasks = linear_weak.slice(j, len+j);
                
                // need명이 투입되는 모든 경우의 수를 고려하여 작업 처리
                for (const range of people) {
                    const coverage = tasks[0] + range; // 시작 지점 = 남은 작업 + 범위
                    tasks = tasks.filter(e => e > coverage);
                    
                    if (!tasks.length) return need;
                }
            }
        }
    }
    
    return -1;
}

function getPermutation(array, r) {
    const result = [];
    
    const permutation = (start, n, selected = []) => {
        if (selected.length === r) {
            return result.push([...selected]);
        }
        
        for (let i = start; i < n; i++) {
            swap(array, start, i);
            selected.push(array[start]);
            permutation(start+1, n, selected);
            selected.pop();
            swap(array, start, i);
        }
    }
    
    permutation(0, array.length);
    
    return result;
}

const swap = (array, i, j) => [array[i], array[j]] = [array[j], array[i]];