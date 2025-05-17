// 1 ~ n 적힌 카드가 있는 카드 뭉치
// coin 개를 이용한 게임

// 카드 뽑는 순서 고정

// 2. 각 라운드가 시작할 때 카드 두 장 뽑음
// 카드 뭉치에 남은 카드가 없다면 게임 종료
// 뽑은 카드는 카드 한 장당 동전 하나 소모해서 가지거나, 동전을 소모하지 않고 버리기

// 3. 카드에 적힌 수의 합이 n+1이 되도록 카드 두 장을 내고 다음 라운드 진행
// 만약 카드 두 장을 낼 수 없다면 게임 종료

// 0 <= coins <= n
// 6 <= cards.length = n < 1,000
// cards = unique

function solution(coin, cards) {
    // 초기 상태 정의: 두 장에 적힌 수의 합, n/3장의 카드 + 코인
    const required_card_sum = cards.length + 1;
    
    // [card, isCoin]
    const my_cards = new Map(cards.splice(0, cards.length / 3).map(card => [card, false]));
    let current_coin = coin;

    // 게임 라운드를 정의하는 변수
    let game_round = 1;
    
    for (let i = 0; i < cards.length; i += 2) {        
        // 카드 뽑기
        my_cards.set(cards[i], true);
        my_cards.set(cards[i+1], true);
        
        // 카드 제출
        // 반례: 이때 추가적인 카드를 가장 적게 사용하는 경우의 수를 골라야 함
        let used_coin = 2;
        let used_card = -1;
        
        for (const card of [...my_cards.keys()]) {
            if (my_cards.has(required_card_sum - card)) {
                let current_used_coin = 0;
                
                const is_extra1 = my_cards.get(card);
                const is_extra2 = my_cards.get(required_card_sum - card);
                
                if (is_extra1) current_used_coin++;
                if (is_extra2) current_used_coin++;
                
                if (used_coin >= current_used_coin) {
                    used_card = card;
                    used_coin = current_used_coin;
                }
            }
        }
        
        current_coin -= used_coin;
        my_cards.delete(used_card);
        my_cards.delete(required_card_sum - used_card);
        
        // 카드를 제출하지 못했거나 코인이 0보다 작은 경우 게임 오버
        if (used_card === -1 || current_coin < 0) {
            break;
        }

        // 다음 라운드로 이동        
        game_round++;
    }
    
    return game_round;
}