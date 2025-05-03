function solution(bridge_length, weight, truck_weights) {
    let time = 0; // 시간
    let weightOnBridge = 0; // 현재 다리위의 무게
    const bridge = new Array(bridge_length).fill(0);
    
    truck_weights.reverse(); // 역순
    
    // 대기중인 트럭이 존재하거나, 다리 위의 트럭이 있는 경우
    while (truck_weights.length > 0 || weightOnBridge > 0) {
        time++;
        
        // 1초 경과
        weightOnBridge -= bridge.shift();
        
        // 새로운 트럭을 올릴 수 있따면?
        if (truck_weights.length > 0) {
            if (weightOnBridge + truck_weights[truck_weights.length - 1] <= weight) {
                const truck = truck_weights.pop();
                bridge.push(truck);
                weightOnBridge += truck;
            } else {
                bridge.push(0);
            }
        }
    }
    
    return time;
}