// 진열된 모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간


function solution(gems) {
    let answer = [1, gems.length];
    
    const uniqueGems = new Set(gems);
    const gemSize = uniqueGems.size;
    
    // 초기화
    const purchased = new Map();
    for (const gem of [...uniqueGems]) {
        purchased.set(gem, 0);
    }
    
    let ltr = 0, rtr = 0;
    let purchasedCount = 0;
        
    while (rtr < gems.length) {
        if (purchasedCount === gemSize) {
            const prevLength = answer[1] - answer[0];
            const currLength = rtr - (ltr+1);
            
            if (prevLength > currLength) {
                answer = [ltr+1, rtr];
            }
        }
        
        const lGem = gems[ltr];
        const rGem = gems[rtr];
                
        if (purchased.get(lGem) >= 2) {
            ltr++;
            purchased.set(lGem, purchased.get(lGem) - 1);
        } else if (purchased.get(rGem) == 0) {
            rtr++;
            purchased.set(rGem, 1);
            purchasedCount++;
        } else {
            purchased.set(rGem, purchased.get(rGem) + 1);
            rtr++;
        }
    }
    
    while (purchased.get(gems[ltr]) > 1) {
        const lGem = gems[ltr];

        purchased.set(lGem, purchased.get(lGem) - 1);
        ltr++;
    }

    if (purchasedCount === gemSize) {
        const prevLength = answer[1] - answer[0];
        const currLength = rtr - (ltr+1);

        if (prevLength > currLength) {
            answer = [ltr+1, rtr];
        }
    }

    return answer;
}