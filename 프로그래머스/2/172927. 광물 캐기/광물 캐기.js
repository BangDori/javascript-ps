// <조건>
// 0. 모든 곡괭이의 피로도 = 광물 5개
// 1. "사용할 수 있는" 곡괭이 중 아무거나 하나 선택
// 2. 한 번 사용하기 시작한 곡괭이는, "사용할 수 없을 때까지" 사용
// 3. 광물은 주어진 "순서대로" 캐기
// 4. 모든 광물을 캐거나 or 더 사용할 곡괭이가 없을 때까지 광물 캐기

// 곡괭이 개수를 나타내는 picks = [dia, iron, stone]
// 광물의 순서를 나타내는 minerals (5 <= minerals <= 50)
// 마인이 작업을 끝내기까지 필요한 "최소한의 피로도"

const MINERAL = {
    diamond: 25,
    iron: 5,
    stone: 1,
};

function devideMineralsSubset(minerals) {
    const subset = [];
    let count = 0;
    
    for (let i = 0; i < minerals.length; i++) {
        if (i % 5 === 0) {
            subset.push([]);
            count++;
        }
        
        subset[count-1].push(minerals[i]);
    }
    
    return subset;
}

function convertMineralsToWeight(mineralsSubset) {
    const weights = [];
    
    for (const subset of mineralsSubset) {
        const weight = [];
        let total = 0;
        
        for (const mineral of subset) {
            weight.push(MINERAL[mineral]);
            total += MINERAL[mineral];
        }
        
        weight.push(total);
        weights.push(weight);
    }
    
    return weights;
}

function convertPicksToWeight(picks) {
    const weight = [];
    let quality = 25;
    
    picks.forEach((pick) => {
        if (pick > 0) {
            for (let i = 0; i < pick; i++) {
                weight.push(quality);
            }   
        }
        
        quality /= 5;
    })
    
    return weight;
}

function pickMineral(pick, weight) {
    // 피로도 변수..
    let count = 0;
    
    // 마지막은 합이기 때문에, 제외
    for (let i = 0; i < weight.length-1; i++) {
        count += Math.max(weight[i] / pick, 1);
    }
    
    return count;
}

function solution(picks, minerals) {
    let answer = 0;
    
    const subset = devideMineralsSubset(minerals);
    let weights = convertMineralsToWeight(subset);
    const pickWeights = convertPicksToWeight(picks);
    
    // 광물 집합을 내림차순 정렬
    weights = weights.slice(0, pickWeights.length);
    weights.sort((a, b) => b[b.length-1] - a[a.length-1]);
    for (let i = 0; i < Math.min(weights.length, pickWeights.length); i++) {
        answer += pickMineral(pickWeights[i], weights[i]);
    }
    
    return answer;
}

// 광물을 5개씩 나누기
// [d, d, d, i, i, d, i, s] => [d, d, d, i, i], [d, i, s]
// 각 배열 집합을 보면서, 광물의 수를 계산하기?, 합을 계산하기?

// [25, 25, 25, 5, 5], [25, 5, 1]

// [d, d, d, d, d, i, i, i, i, i, d] => [d, d, d, d, d], [i, i, i, i, i], [d];
// [25, 25, 25, 25, 25, 125], [5, 5, 5, 5, 5, 25], [1, 1]

// [0, 0, 1], ["stone"]
// [1, 0, 0], ["diamond"] => 1
// [1, 1, 2], ["diamond", "diamond", "diamond", "diamond", "diamond", "diamond", "diamond", "diamond", "diamond", "diamond", "diamond", "diamond", "diamond", "diamond", "diamond"] => 151

// [1, 1, 1], ["iron", "iron", "iron", "iron", "iron", "iron", "iron", "iron", "iron", "iron"] => 10
// [1, 1, 1], ["iron", "iron", "iron", "iron", "iron", "iron", "iron", "iron", "iron", "iron", "iron", "iron", "iron", "iron", "iron"] => 