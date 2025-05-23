function solution(k, tangerine) {
    const countMap = new Map();
    
    for (const t of tangerine) {
        if (!countMap.has(t)) countMap.set(t, 1);
        else countMap.set(t, countMap.get(t) + 1)
    }

    const tangerineCounts = [...countMap.keys()].map((key) => [key, countMap.get(key)]);
    tangerineCounts.sort((a, b) => b[1] - a[1]);
    
    let curr = tangerine.length;
    
    while (curr > k) {
        const [type, count] = tangerineCounts.pop();
        
        curr -= count;
        
        if (curr >= k) continue;
        else {
            tangerineCounts.push([type, k - curr]);
            break;
        }
    }
    
    return tangerineCounts.length;
}